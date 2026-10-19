import { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { cn } from '../utils/helpers';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, close, toggle } = useMobileMenu();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());
  const phoneUrl = `tel:+91${businessConfig.contact.phone}`;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/70 backdrop-blur-md shadow-lg'
          : 'bg-white/50 backdrop-blur-md'
      )}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-700 font-bold text-xl lg:text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
            aria-label={`${businessConfig.name} - Home`}
          >
            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span className="hidden sm:block">{businessConfig.name}</span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors duration-200 relative after:content-[\"\"] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary-600 after:transition-all after:duration-300',
                    isActive
                      ? 'text-primary-600 after:w-full'
                      : 'text-gray-600 hover:text-primary-600 after:w-0 hover:after:w-full'
                  )
                }
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <a
              href={phoneUrl}
              className="btn btn-light btn-sm"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{businessConfig.contact.phone}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              aria-label="Contact us on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-700'
                  )
                }
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href={phoneUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>Call: {businessConfig.contact.phone}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-green-600 rounded-lg"
                aria-label="Contact us on WhatsApp"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}