import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'LocalBusiness' | 'Organization' | 'FAQPage' | 'BreadcrumbList';
  data: any;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
