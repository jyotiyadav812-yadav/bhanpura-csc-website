# CSC Centre Bhanpura Website

A multipage React website for CSC Centre Bhanpura (Common Service Centre) built with Vite 5, React 18, Tailwind CSS 3, React Router 7, and Lucide React icons.

## Features

- **Pages**: Home, Services, Service Details, How It Works, About, Contact, Enquiry, Privacy Policy, Terms & Conditions, 404
- **Responsive Design**: Mobile-first, fully responsive with hamburger menu
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus states
- **SEO**: Page titles, meta descriptions, static and per-page Open Graph tags
- **Contact Integration**: Click-to-call, WhatsApp deep links, and backend-powered contact/enquiry submission
- **Service Catalogue**: 6 categories, 18 services with detailed descriptions
- **Floating WhatsApp Button**: Mobile-only quick contact
- **Backend API**: Contact and enquiry submissions are stored by the backend

## Tech Stack

- **React 18** with **Vite 5**
- **Tailwind CSS 3**
- **React Router 7**
- **Lucide React** icons
- **React Helmet Async** for SEO
- **TypeScript** for type safety

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ContactButtons.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ScrollToTop.tsx
│   ├── SectionHeading.tsx
│   ├── ServiceCard.tsx
│   ├── ServiceGrid.tsx
│   └── WhatsAppFloat.tsx
├── config/           # Business configuration
│   └── business.js
├── data/             # Service data
│   └── services.js
├── hooks/            # Custom React hooks
│   ├── useMobileMenu.ts
│   └── useScrollToTop.ts
├── layouts/          # Page layouts
│   └── MainLayout.tsx
├── pages/            # Page components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Enquiry.tsx
│   ├── Home.tsx
│   ├── HowItWorks.tsx
│   ├── NotFound.tsx
│   ├── Privacy.tsx
│   ├── Services.tsx
│   ├── ServiceDetails.tsx
│   └── Terms.tsx
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Utility functions
│   └── helpers.ts
├── App.tsx           # App with routing
├── main.tsx          # Entry point
└── index.css         # Global styles (Tailwind)
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
# Navigate to project directory
cd bhanpura-csc

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
# Build for production
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

### Type Check

```bash
npx tsc --noEmit
```

## Business Configuration

Edit `src/config/business.ts` to update:
- Centre name, owner, address
- Phone, WhatsApp, email
- Working hours (when available)

## Service Data

Edit `src/data/services.js` to modify:
- Service categories
- Individual services (descriptions, what we do, documents, disclaimers)
- Popular services list

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:
- `primary` - Blue shades (main brand color)
- `secondary` - Green shades (accent/WhatsApp)

### Fonts

The project uses Inter font from Google Fonts. Update in `index.html` and `tailwind.config.js`.

## Deployment

The `dist/` folder can be deployed to any static hosting:
- Netlify, Vercel, Cloudflare Pages
- GitHub Pages, Firebase Hosting
- AWS S3 + CloudFront, Azure Static Web Apps

### Vercel

1. Import the repository and set **Root Directory** to `frontend`.
2. Use **Build Command** `npm run build` and **Output Directory** `dist`.
3. Set `VITE_API_URL` to `https://bhanpura-csc-backend.onrender.com` for Production and Preview. This is also the built-in default.
4. `vercel.json` includes the SPA rewrite so React Router pages work on refresh and direct links.
5. Open Graph and Twitter share previews use the production URL and `public/og-image.jpg`.

## Important Notes

- **No government logos** or official claims
- **No PIN/OTP/password** requests in payment guidance
- **Prices**: "Contact us for applicable charges" - no fake pricing
- **No fake reviews**, ratings, or customer counts
- Contact and enquiry submissions are stored in the backend database. Email notifications require SMTP settings on the backend.

## License

Private project for CSC Centre Bhanpura.