import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Clock, AlertCircle, MessageSquare, Phone } from 'lucide-react';
import { ContactButtons } from '../components/ContactButtons';
import { getServiceById, serviceCategories } from '../data/services';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { PageSEO } from '../components/PageSEO';

export function ServiceDetails() {
  const { id } = useParams();
  const service = getServiceById(id || '');
  const category = serviceCategories.find(c => c.id === service?.category);

  if (!service) {
    return (
      <>
        <PageSEO
          title={`Service Not Found | ${businessConfig.name}`}
          description="This service page could not be found. Browse the services available from CSC Centre Bhanpura in Kaithal."
          keywords={['CSC Centre Bhanpura services']}
          noindex
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h1>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been moved.</p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Back to All Services
            </Link>
          </div>
        </div>
      </>
    );
  }

  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage(service.name));
  const phoneUrl = `tel:+91${businessConfig.contact.phone}`;

  return (
    <>
      <PageSEO
        title={`${service.name} in Bhanpura, Kaithal | ${businessConfig.name}`}
        description={`${service.description} Get local assistance at CSC Centre Bhanpura, Kaithal, Haryana.`}
        keywords={[service.name, `${service.name} in Kaithal`, `${service.category.replace(/-/g, ' ')} assistance`, 'CSC Centre Bhanpura']}
      />

      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary-50 via-white to-secondary-50" aria-labelledby="service-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back to All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <article>
                <header className="mb-6">
                  {category && (
                    <span className="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full mb-3">
                      {category.name}
                    </span>
                  )}
                  <h1 id="service-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
                  <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
                </header>

                <section aria-labelledby="what-we-do-title" className="border-t border-gray-100 pt-8">
                  <h2 id="what-we-do-title" className="text-2xl font-bold text-gray-900 mb-4">How We Can Help</h2>
                  <ul className="space-y-3" role="list">
                    {service.whatWeDo.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border-2 border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400">
                        <span className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow">
                          <FileText className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="documents-title" className="border-t border-gray-100 pt-8">
                  <h2 id="documents-title" className="text-2xl font-bold text-gray-900 mb-4">Documents That May Be Needed</h2>
                  <p className="text-gray-600 mb-4">Requirements vary by the specific application or authority. Common documents include:</p>
                  <ul className="space-y-2" role="list">
                    {service.typicalDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border-2 border-green-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-400">
                        <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center shadow">
                          <Shield className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <span className="text-gray-700 leading-relaxed">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="disclaimer-title" className="border-t border-gray-100 pt-8">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6" role="alert">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 id="disclaimer-title" className="text-lg font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
                        <p className="text-amber-700">{service.disclaimer}</p>
                        <p className="text-amber-700 mt-2"><strong>We are a private digital assistance centre, not an official government office.</strong> Final decisions, approvals, fees, and timelines are determined solely by the respective government authorities.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section aria-labelledby="price-title" className="border-t border-gray-100 pt-8">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 border-2 border-orange-200">
                    <span className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center shadow">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 id="price-title" className="font-semibold text-gray-900">Service Charges</h3>
                      <p className="text-gray-600">{service.priceNote}</p>
                    </div>
                  </div>
                </section>
              </article>

              <section aria-labelledby="request-title" className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24">
                <h2 id="request-title" className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Request This Service</h2>
                <p className="text-gray-600 mb-5 text-sm sm:text-base">Get in touch with us to start the process or ask any questions.</p>
                <ContactButtons serviceName={service.name} variant="default" />
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                  <a
                    href={phoneUrl}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors touch-manipulation"
                    aria-label="Call us"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Call: {businessConfig.contact.phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors touch-manipulation"
                    aria-label="Contact on WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                    WhatsApp Enquiry
                  </a>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/enquiry"
                    className="block w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Submit Detailed Enquiry
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                    Quick WhatsApp Chat
                  </a>
                  <a
                    href={phoneUrl}
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Call Now
                  </a>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Visit Us</h3>
                <address className="not-italic text-gray-600 space-y-2">
                  <p className="font-medium">{businessConfig.name}</p>
                  <p>{businessConfig.location.formatted}</p>
                  <p className="mt-4">
                    <a href={phoneUrl} className="text-primary-600 hover:underline">Call: {businessConfig.contact.phone}</a>
                  </p>
                </address>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}