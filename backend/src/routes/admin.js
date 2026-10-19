const express = require('express');
const db = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const totalEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries').get().count;
    const newEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = "new"').get().count;
    const inProgressEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = "in_progress"').get().count;
    const completedEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = "completed"').get().count;

    const recentEnquiries = db.prepare(`
      SELECT * FROM enquiries
      ORDER BY created_at DESC
      LIMIT 10
    `).all();

    const enquiriesByStatus = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM enquiries
      GROUP BY status
    `).all();

    const enquiriesByService = db.prepare(`
      SELECT service, COUNT(*) as count
      FROM enquiries
      GROUP BY service
      ORDER BY count DESC
      LIMIT 10
    `).all();

    const totalServices = db.prepare('SELECT COUNT(*) as count FROM services WHERE is_active = 1').get().count;

    res.json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        inProgressEnquiries,
        completedEnquiries,
        totalServices,
        recentEnquiries: recentEnquiries.map(e => ({ ...e, privacy_consent: Boolean(e.privacy_consent) })),
        enquiriesByStatus,
        enquiriesByService
      }
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

module.exports = router;