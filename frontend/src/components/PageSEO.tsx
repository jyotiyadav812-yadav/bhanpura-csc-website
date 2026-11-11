import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://bhanpura-csc.vercel.app';
const SHARE_IMAGE = 'https://bhanpura-csc.vercel.app/og-image.jpg';

interface PageSEOProps {
  title: string;
  description: string;
  keywords: string[];
  noindex?: boolean;
}

export function PageSEO({ title, description, keywords, noindex = false }: PageSEOProps) {
  const { pathname } = useLocation();
  const keywordList = keywords.join(', ');
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const pageUrl = new URL(normalizedPath, SITE_URL).href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordList} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CSC Centre Bhanpura" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={SHARE_IMAGE} />
      <meta property="og:image:secure_url" content={SHARE_IMAGE} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="CSC Centre Bhanpura - local digital assistance services in Kaithal" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SHARE_IMAGE} />
    </Helmet>
  );
}
