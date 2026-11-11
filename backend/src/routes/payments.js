const express = require('express');
const { z } = require('zod');
const Razorpay = require('razorpay');
const db = require('../db');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrderSchema = z.object({
  amount: z.number().int().positive('Amount must be a positive number'),
  currency: z.string().default('INR'),
  name: z.string().min(1, 'Name is required').max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  service: z.string().optional(),
  description: z.string().optional(),
});

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

router.post('/create-order', async (req, res) => {
  try {
    const data = createOrderSchema.parse(req.body);

    const options = {
      amount: data.amount * 100,
      currency: data.currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        name: data.name,
        mobile: data.mobile,
        email: data.email || '',
        service: data.service || '',
        description: data.description || '',
      },
    };

    const order = await razorpay.orders.create(options);

    const stmt = db.prepare(`
      INSERT INTO payments (razorpay_order_id, amount, currency, status, name, mobile, email, service, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      order.id,
      data.amount,
      data.currency,
      'created',
      data.name,
      data.mobile,
      data.email || null,
      data.service || null,
      data.description || null
    );

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        key_id: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      const issues = error.issues || error.errors || [];
      return res.status(400).json({
        success: false,
        errors: issues.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }
    console.error('Create order error:', error);
    res.status(500).json({ success: false, error: 'Failed to create payment order' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const data = verifySchema.parse(req.body);

    const crypto = require('crypto');
    const body = data.razorpay_order_id + '|' + data.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === data.razorpay_signature;

    const payment = db.prepare('SELECT * FROM payments WHERE razorpay_order_id = ?').get(data.razorpay_order_id);
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment order not found' });
    }

    const updateStmt = db.prepare(`
      UPDATE payments
      razorpay_payment_id = ?,
      razorpay_signature = ?,
      status = ?,
      updated_at = CURRENT_TIMESTAMP
      WHERE razorpay_order_id = ?
    `);

    updateStmt.run(
      data.razorpay_payment_id,
      data.razorpay_signature,
      isAuthentic ? 'paid' : 'failed',
      data.razorpay_order_id
    );

    const updated = db.prepare('SELECT * FROM payments WHERE razorpay_order_id = ?').get(data.razorpay_order_id);

    if (isAuthentic) {
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment: {
          ...updated,
          amount: updated.amount / 100,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment signature verification failed',
        payment: {
          ...updated,
          amount: updated.amount / 100,
        },
      });
    }
  } catch (error) {
    if (error.name === 'ZodError') {
      const issues = error.issues || error.errors || [];
      return res.status(400).json({
        success: false,
        errors: issues.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }
    console.error('Verify payment error:', error);
    res.status(500).json({ success: false, error: 'Payment verification failed' });
  }
});

module.exports = router;
