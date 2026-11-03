import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getServiceById } from '../data/services';

const SITE_URL = 'https://bhanpura-csc.vercel.app';
const CANONICAL_PATHS = new Set([
  '/',
  '/services',
  '/how-it-works',
  '/about',
  '/contact',
  '/enquiry',
  '/privacy',
  '/terms',
]);

export function CanonicalUrl() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const serviceMatch = normalizedPath.match(/^\/services\/([^/]+)$/);
  const isKnownPage = CANONICAL_PATHS.has(normalizedPath) ||
    (serviceMatch !== null && getServiceById(serviceMatch[1]) !== undefined);

  if (!isKnownPage) return null;

  const canonicalUrl = new URL(normalizedPath, SITE_URL).href;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
