const express = require('express');
const { z } = require('zod');
const db = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  service: z.string().min(1, 'Service is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  privacyConsent: z.boolean().refine(val => val === true, 'Privacy consent is required'),
  _hp: z.string().optional()
});

router.post('/', async (req, res) => {
  try {
    const data = enquirySchema.parse(req.body);

    if (data._hp && data._hp.trim() !== '') {
      return res.status(200).json({ success: true });
    }

    const stmt = db.prepare(`
      INSERT INTO enquiries (name, mobile, email, service, message, privacy_consent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.name,
      data.mobile,
      data.email || null,
      data.service,
      data.message,
      data.privacyConsent ? 1 : 0
    );

    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry: {
        ...enquiry,
        privacy_consent: Boolean(enquiry.privacy_consent)
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      const issues = error.issues || error.errors || [];
      return res.status(400).json({
        success: false,
        errors: issues.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }
    console.error('Enquiry creation error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit enquiry' });
  }
});

router.get('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params = [];

    if (status) {
      whereClause += ' WHERE status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ' (name LIKE ? OR mobile LIKE ? OR service LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    const enquiries = db.prepare(`
      SELECT * FROM enquiries
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    const total = db.prepare(`
      SELECT COUNT(*) as count FROM enquiries ${whereClause}
    `).get(...params).count;

    res.json({
      success: true,
      enquiries: enquiries.map(e => ({ ...e, privacy_consent: Boolean(e.privacy_consent) })),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Enquiries fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch enquiries' });
  }
});

router.get('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    res.json({ success: true, enquiry: { ...enquiry, privacy_consent: Boolean(enquiry.privacy_consent) } });
  } catch (error) {
    console.error('Enquiry fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch enquiry' });
  }
});

router.patch('/:id/status', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const result = db.prepare('UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }

    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    res.json({ success: true, enquiry: { ...enquiry, privacy_consent: Boolean(enquiry.privacy_consent) } });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('Enquiry deletion error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete enquiry' });
  }
});

module.exports = router;