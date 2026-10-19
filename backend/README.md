# Bhanpura CSC Centre - Backend API

Backend API for the Bhanpura CSC Centre frontend. Built with Node.js, Express, and SQLite.

## Features

- **Enquiry Management** - Store and manage contact/enquiry forms
- **Service Catalogue API** - CRUD for services and categories
- **Admin Authentication** - JWT-based auth for admin dashboard
- **Dashboard Stats** - Enquiry counts, status breakdown, service analytics
- **SQLite Database** - Zero-config, file-based database

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm run dev

# Start production server
npm start
```

Server runs on **http://localhost:3001**

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Enquiries (Public)
- `POST /api/enquiries` - Submit enquiry form

### Enquiries (Admin - requires JWT)
- `GET /api/enquiries` - List enquiries (query: status, page, limit, search)
- `GET /api/enquiries/:id` - Get single enquiry
- `PATCH /api/enquiries/:id/status` - Update status
- `DELETE /api/enquiries/:id` - Delete enquiry

### Services (Public)
- `GET /api/services` - List services (query: category, active)
- `GET /api/services/categories` - Get categories with counts
- `GET /api/services/:id` - Get single service

### Services (Admin)
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/auth/change-password` - Change password

### Admin Dashboard
- `GET /api/admin/stats` - Dashboard statistics

## Default Admin

- **Username:** `admin`
- **Password:** `admin123`

**Change the password after first login!**

## Environment Variables

Create `.env` file:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
FRONTEND_URL=http://localhost:5173
DB_PATH=./data/csc.db
```

## Database

SQLite database file: `data/csc.db`

Tables:
- `enquiries` - Contact form submissions
- `admins` - Admin users
- `services` - Service catalogue

## Frontend Integration

Update frontend `.env` or API calls to point to:
```
http://localhost:3001/api
```

Example frontend fetch:
```javascript
const response = await fetch('http://localhost:3001/api/enquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Set `FRONTEND_URL` to your production domain
4. Use process manager (PM2, systemd)
5. Reverse proxy with Nginx
6. Enable HTTPS

```bash
npm install -g pm2
pm2 start src/index.js --name bhanpura-csc-api
pm2 startup
pm2 save
```