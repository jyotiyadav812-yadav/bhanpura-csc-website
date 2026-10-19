const express = require('express');
const db = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { category, active } = req.query;
    let whereClause = '';
    const params = [];

    if (category) {
      whereClause += ' WHERE category = ?';
      params.push(category);
    }

    if (active !== undefined) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ' is_active = ?';
      params.push(active === 'true' ? 1 : 0);
    }

    const services = db.prepare(`
      SELECT * FROM services
      ${whereClause}
      ORDER BY category, sort_order, name
    `).all(...params);

    res.json({
      success: true,
      services: services.map(s => ({
        ...s,
        what_we_do: JSON.parse(s.what_we_do),
        typical_documents: JSON.parse(s.typical_documents),
        is_active: Boolean(s.is_active)
      }))
    });
  } catch (error) {
    console.error('Services fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
});

router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT category, COUNT(*) as count
      FROM services
      WHERE is_active = 1
      GROUP BY category
      ORDER BY category
    `).all();

    res.json({ success: true, categories });
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({
      success: true,
      service: {
        ...service,
        what_we_do: JSON.parse(service.what_we_do),
        typical_documents: JSON.parse(service.typical_documents),
        is_active: Boolean(service.is_active)
      }
    });
  } catch (error) {
    console.error('Service fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch service' });
  }
});

router.post('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { id, category, name, description, icon, what_we_do, typical_documents, disclaimer, price_note, is_active, sort_order } = req.body;

    if (!id || !category || !name) {
      return res.status(400).json({ success: false, error: 'id, category, and name are required' });
    }

    const existing = db.prepare('SELECT id FROM services WHERE id = ?').get(id);
    if (existing) {
      return res.status(409).json({ success: false, error: 'Service with this ID already exists' });
    }

    const stmt = db.prepare(`
      INSERT INTO services (id, category, name, description, icon, what_we_do, typical_documents, disclaimer, price_note, is_active, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, category, name, description || '', icon || 'HelpCircle',
      JSON.stringify(what_we_do || []),
      JSON.stringify(typical_documents || []),
      disclaimer || '',
      price_note || 'Contact us for applicable charges',
      is_active ? 1 : 0,
      sort_order || 0
    );

    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
    res.status(201).json({
      success: true,
      service: {
        ...service,
        what_we_do: JSON.parse(service.what_we_do),
        typical_documents: JSON.parse(service.typical_documents),
        is_active: Boolean(service.is_active)
      }
    });
  } catch (error) {
    console.error('Service creation error:', error);
    res.status(500).json({ success: false, error: 'Failed to create service' });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { category, name, description, icon, what_we_do, typical_documents, disclaimer, price_note, is_active, sort_order } = req.body;

    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    const stmt = db.prepare(`
      UPDATE services SET
        category = COALESCE(?, category),
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        icon = COALESCE(?, icon),
        what_we_do = COALESCE(?, what_we_do),
        typical_documents = COALESCE(?, typical_documents),
        disclaimer = COALESCE(?, disclaimer),
        price_note = COALESCE(?, price_note),
        is_active = COALESCE(?, is_active),
        sort_order = COALESCE(?, sort_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      category, name, description, icon,
      what_we_do ? JSON.stringify(what_we_do) : null,
      typical_documents ? JSON.stringify(typical_documents) : null,
      disclaimer, price_note,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      sort_order,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id);
    res.json({
      success: true,
      service: {
        ...updated,
        what_we_do: JSON.parse(updated.what_we_do),
        typical_documents: JSON.parse(updated.typical_documents),
        is_active: Boolean(updated.is_active)
      }
    });
  } catch (error) {
    console.error('Service update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update service' });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Service deletion error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete service' });
  }
});

module.exports = router;