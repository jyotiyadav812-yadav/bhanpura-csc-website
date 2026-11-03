require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./db');

const enquiryRoutes = require('./routes/enquiries');
const contactRoutes = require('./routes/contact');
const serviceRoutes = require('./routes/services');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = new Set(
  (process.env.FRONTEND_URL || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => Boolean(origin) && (
      process.env.NODE_ENV !== 'production' ||
      !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ))
);
allowedOrigins.add('https://bhanpura-csc.vercel.app');
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.add('http://localhost:5173');
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/enquiries', enquiryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const fs = require('fs');
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
const backendDist = path.join(__dirname, '..', 'dist');
let frontendPath = null;

if (fs.existsSync(frontendDist)) {
  frontendPath = frontendDist;
} else if (fs.existsSync(backendDist)) {
  frontendPath = backendDist;
}

if (frontendPath) {
  app.use(express.static(frontendPath));
  app.use((req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;