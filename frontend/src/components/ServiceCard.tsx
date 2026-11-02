import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import type { Service } from '../types';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  Send: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>,
  GraduationCap: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>,
  CreditCard: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  Camera: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Image: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  Plane: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 21h14M5 10h14M10 18V8a2 2 0 00-2-2H4a2 2 0 00-2 2v10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10a2 2 0 00-2-2h-2a2 2 0 00-2 2v10"/></svg>,
  Printer: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>,
  Scan: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>,
  FileType: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>,
  Layout: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>,
  Minimize: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M4 12l4-4m0 0l4 4m-4-4v12"/></svg>,
  Baby: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Award: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  HelpCircle: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  MessageSquare: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
};

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'compact';
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const IconComponent = iconComponents[service.icon] || iconComponents.HelpCircle;
  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage(service.name));

  if (variant === 'compact') {
    return (
      <Link
        to={`/services/${service.id}`}
        className="svc-card"
        aria-label={service.name}
      >
        <div className="svc-icon">
          <IconComponent className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h4>{service.name}</h4>
          <p className="text-sm mt-1 line-clamp-2">{service.description}</p>
        </div>
        <span className="svc-arrow">
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </Link>
    );
  }

  return (
    <article className="group color-card service-card border-t-4 border-t-transparent hover:border-t-orange-500 overflow-hidden hover:-translate-y-1 transform transition-all duration-300">
      <div className="p-5 sm:p-6">
        <div className="card-icon group-hover:bg-primary-700 transition-colors w-11 h-11 sm:w-12 sm:h-12">
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{service.name}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{service.description}</p>
        <ul className="space-y-2 mb-6" role="list" aria-label="What we do">
          {service.whatWeDo.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>{item}</span>
            </li>
          ))}
          {service.whatWeDo.length > 3 && (
            <li className="text-sm text-primary-600 font-medium">+{service.whatWeDo.length - 3} more</li>
          )}
        </ul>
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">{service.priceNote}</span>
        </div>
      </div>
      <div className="mt-auto px-5 sm:px-6 pb-5 pt-0 flex flex-col gap-3">
        <Link
          to={`/services/${service.id}`}
          className="btn-primary"
        >
          View Details & Request
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          WhatsApp Enquiry
        </a>
      </div>
    </article>
  );
}