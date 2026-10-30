import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceGrid } from '../components/ServiceGrid';
import { serviceCategories, getServicesByCategory } from '../data/services';
import { businessConfig } from '../config/business';
import { Helmet } from 'react-helmet-async';

export function Services() {
  return (
    <>
      <Helmet>
        <title>All Services | {businessConfig.name}</title>
        <meta name="description" content="Browse all digital assistance services at Bhanpura CSC Centre - Online forms, payments, photos, documents, certificates, and general digital help." />
        <meta property="og:title" content={`All Services | ${businessConfig.name}`} />
        <meta property="og:description" content="Browse all digital assistance services at Bhanpura CSC Centre." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section id="services" className="py-20 md:py-24 scroll-mt-24 bg-gradient-to-b from-blue-50 via-white to-orange-50/40" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="services-title"
            title="All Services"
            subtitle="Complete Catalogue"
            description="Online forms, payments, documents, photos and most online services, with friendly local support."
          />
          <div className="space-y-16">
            {serviceCategories.map((category, index) => {
              const categoryServices = getServicesByCategory(category.id);
              const theme = ['theme-blue', 'theme-orange', 'theme-green', 'theme-purple', 'theme-teal', 'theme-rose'][index % 6];
              return (
                <section key={category.id} id={category.id} className={`scroll-mt-24 min-w-0 ${theme}`} aria-labelledby={`${category.id}-title`}>
                  <div className="cat-header">
                    <div className="cat-icon">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div>
                      <h3 id={`${category.id}-title`}>{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <ServiceGrid services={categoryServices} />
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary-600 text-white text-center" aria-label="Contact for services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Help Choosing a Service?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Not sure which service you need? Contact us and we'll guide you to the right assistance.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 font-semibold text-lg rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}