# Bhanpura CSC Centre Website

A multipage React website for Bhanpura CSC Centre (Common Service Centre) built with Vite, React 19, Tailwind CSS v4, React Router v7, and Lucide React icons.

## Features

- **Pages**: Home, Services, Service Details, How It Works, About, Contact, Enquiry, Privacy Policy, Terms & Conditions, 404
- **Responsive Design**: Mobile-first, fully responsive with hamburger menu
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus states
- **SEO**: Page titles, meta descriptions, Open Graph tags via react-helmet-async
- **Contact Integration**: Click-to-call, WhatsApp deep links with prefilled messages
- **Service Catalogue**: 6 categories, 18 services with detailed descriptions
- **Floating WhatsApp Button**: Mobile-only quick contact
- **No Backend**: Frontend-only, client-side validation only

## Tech Stack

- **React 19** with **Vite 8**
- **Tailwind CSS v4** (via @tailwindcss/vite)
- **React Router v7**
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
│   ├── WhatsAppFloat.tsx
│   └── EnquiryForm.tsx
├── config/           # Business configuration
│   └── business.ts
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

- Node.js 18+
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

### Linting

```bash
# Run linter
npm run lint
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

## Important Notes

- **No government logos** or official claims
- **No PIN/OTP/password** requests in payment guidance
- **Prices**: "Contact us for applicable charges" - no fake pricing
- **No fake reviews**, ratings, or customer counts
- **Frontend only** - no backend, database, or authentication

## License

Private project for Bhanpura CSC Centre.