import { useEffect, type MouseEvent } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
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
  const { isOpen, close, toggle } = useMobileMenu();
  const location = useLocation();

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    close();
    if (location.pathname === href) {
      event.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());
  const phoneUrl = `tel:+91${businessConfig.contact.phone}`;

  return (
<header
        className="fixed top-0 left-0 right-0 z-50 bg-blue-900 shadow-lg border-b border-white/10"
        role="banner"
      >
        <nav className="w-full px-2 sm:px-4 md:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 lg:h-20 gap-2">
            <Link
              to="/"
              onClick={handleNavClick('/')}
              className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 rounded-md flex-shrink-0"
              aria-label={`${businessConfig.name} - Home`}
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="hidden xs:inline sm:hidden md:inline">{businessConfig.name}</span>
            </Link>

          <div className="flex flex-1 items-center justify-between gap-1 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 overflow-x-auto no-scrollbar">
              {navItems.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={handleNavClick(item.href)}
                  className={({ isActive }) =>
                    cn(
                      'whitespace-nowrap text-xs sm:text-sm font-medium transition-colors duration-200 relative after:content-[\"\"] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 py-1 px-1',
                      isActive
                        ? 'text-white font-bold after:w-full'
                        : 'text-white/85 hover:text-white after:w-0 hover:after:w-full'
                    )
                  }
                  end={item.href === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <a
                href={phoneUrl}
                className="inline-flex sm:inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-900 bg-white border border-white rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4 text-blue-900" aria-hidden="true" />
                <span className="hidden sm:inline">{businessConfig.contact.phone}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex sm:inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-green-600 rounded-lg ring-1 ring-white/40 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
                aria-label="Contact us on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        
      </nav>
    </header>
  );
}