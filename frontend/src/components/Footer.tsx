import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { businessConfig } from '../config/business';

const MAP_LINK = "https://maps.app.goo.gl/JgaFfhiGEEunbvQ7A";

const footerLinks = {
  services: [
    { label: 'Online Forms & Applications', href: '/services#online-forms' },
    { label: 'Online Payment Assistance', href: '/services#online-payments' },
    { label: 'Photo & Passport Services', href: '/services#photo-passport' },
    { label: 'Document Services', href: '/services#document-services' },
    { label: 'Certificate Assistance', href: '/services#certificate-assistance' },
    { label: 'General Digital Assistance', href: '/services#general-digital' },
  ],
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

export function Footer() {
  const emailUrl = `mailto:${businessConfig.contact.email}`;

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl lg:text-2xl mb-4" aria-label={`${businessConfig.name} - Home`}>
              <svg className="w-8 h-8 text-primary-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>{businessConfig.name}</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for digital services in Village Bhanpura, Kaithal, Haryana.
              We provide assistance with online forms, payments, documents, photos, and certificates.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.services.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Information</h3>
            <address className="not-italic space-y-3 text-sm">
<div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-white">{businessConfig.name}</p>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline">
                  {businessConfig.location.formatted}
                </a>
              </div>
            </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a href="tel:9541611393" className="text-gray-400 hover:text-white transition-colors">
                  {businessConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-[#25D366] flex-shrink-0" aria-hidden="true" />
                <a href="https://wa.me/919541611393" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp: {businessConfig.contact.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a href={emailUrl} className="text-gray-400 hover:text-white transition-colors break-all">
                  {businessConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaInstagram className="w-5 h-5 text-pink-500 flex-shrink-0" aria-hidden="true" />
                <a href="https://www.instagram.com/harinder_csc_bhanpura/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors break-all">
                  {businessConfig.social.instagramHandle}
                </a>
              </div>
              {businessConfig.workingHours.configured && (
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-primary-400 flex-shrink-0">🕐</span>
                  <span className="text-gray-400">{businessConfig.workingHours.details}</span>
                </div>
              )}
            </address>
          </div>
        </div>

        <div className="footer-bottom mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} {businessConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              {footerLinks.legal.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-center md:text-right">
              Not an official government website. We are a private digital assistance centre.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}