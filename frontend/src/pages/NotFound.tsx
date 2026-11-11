import { Link } from 'react-router-dom';
import { Home, MessageSquare, Search } from 'lucide-react';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { PageSEO } from '../components/PageSEO';

export function NotFound() {
  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());

  return (
    <>
      <PageSEO
        title={`Page Not Found | ${businessConfig.name}`}
        description="This page could not be found. Visit CSC Centre Bhanpura online for digital assistance services in Kaithal, Haryana."
        keywords={['CSC Centre Bhanpura']}
        noindex
      />

      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <span className="text-9xl font-bold text-primary-100">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 text-lg mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              Go Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
              Browse Services
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 mb-4">Need help finding something?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}