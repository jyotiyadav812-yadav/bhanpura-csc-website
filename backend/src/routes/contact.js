const express = require('express');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const db = require('../db');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages, try later' },
});

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().trim().email('Invalid email').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  subject: z.string().trim().max(100).optional().or(z.literal('')),
  _hp: z.string().optional(),
});

let transporter = null;
let emailConfigured = false;

function setupTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });
    emailConfigured = true;
  } else {
    emailConfigured = false;
  }
}

setupTransporter();

async function sendNotification(data) {
  if (!emailConfigured) {
    console.warn('Email not configured: SMTP_HOST/SMTP_USER/SMTP_PASS missing. Message saved to database only.');
    return;
  }
  const to = process.env.NOTIFY_TO || 'digitalbhanpura@gmail.com';
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `New contact message from ${data.name}`,
      text: `Name: ${data.name}\nMobile: ${data.mobile}\nEmail: ${data.email || '-'}\nSubject: ${data.subject || '-'}\n\nMessage:\n${data.message}`,
    });
  } catch (err) {
    console.error('Email send failed:', err);
  }
}

router.post('/', contactLimiter, async (req, res) => {
  try {
    const data = contactSchema.parse(req.body || {});

    if (data._hp && data._hp.trim() !== '') {
      return res.status(200).json({ ok: true });
    }

    const service = data.subject && data.subject.trim() !== '' ? data.subject.trim() : 'Contact Form';

    const stmt = db.prepare(`
      INSERT INTO enquiries (name, mobile, email, service, message, privacy_consent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.mobile,
      data.email || null,
      service,
      data.message,
      1
    );

    const row = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(result.lastInsertRowid);

    await sendNotification({ ...data, subject: service });

    res.status(201).json({ ok: true, id: row.id });
  } catch (error) {
    if (error && error.name === 'ZodError') {
      return res.status(400).json({
        ok: false,
        errors: error.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
      });
    }
    console.error('Contact submission error:', error);
    res.status(500).json({ ok: false, error: 'Failed to submit message' });
  }
});

module.exports = router;
