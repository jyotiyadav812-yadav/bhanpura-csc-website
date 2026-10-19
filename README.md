# Bhanpura CSC Website

Monorepo for the Bhanpura Common Service Centre website — a React + Vite frontend and an Express + SQLite backend API.

## Project structure

```
bhanpura-csc-website/
├── frontend/   React 18 + TypeScript + Vite + Tailwind (customer-facing site)
└── backend/    Express 5 + SQLite (auth, services, enquiries)
```

## Getting started

### Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit JWT_SECRET
npm run init-db
npm run dev
```

Runs on `http://localhost:3001` by default. The SQLite database is created at `data/csc.db`, which is gitignored.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`. Point it at the backend API via the config in `src/config/business.js`.

## Environment variables

Backend secrets live in `backend/.env` and are never committed. Copy `.env.example` to `.env` locally and set a real `JWT_SECRET` before deploying.

## Scripts

| Location   | Command            | Description                    |
| ---------- | ------------------ | ------------------------------ |
| `frontend` | `npm run dev`      | Start Vite dev server          |
| `frontend` | `npm run build`    | Production build to `dist/`    |
| `backend`  | `npm run dev`      | Start API with file watching   |
| `backend`  | `npm start`        | Start API server               |
| `backend`  | `npm run init-db`  | Create and seed the database   |

## Deployment

The frontend is a static build and can be hosted on Vercel, Netlify, or GitHub Pages. The backend runs on any Node host (Render, Railway, Fly.io) — set `FRONTEND_URL` to the deployed frontend origin and use a managed database instead of the local SQLite file for production.

## Notes

`backend/data/` holds local user data and is excluded from version control. Do not commit `.env` or database files.