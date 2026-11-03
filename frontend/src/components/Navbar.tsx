import { useEffect, type MouseEvent } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
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
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      'whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
      isActive ? 'text-white font-bold' : 'text-white/85 hover:text-white'
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-blue-900 shadow-lg" role="banner">
      <nav className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:h-20">
          <Link
            to="/"
            onClick={handleNavClick('/')}
            className="flex min-w-0 items-center gap-2 rounded-md text-base font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-lg lg:text-xl"
            aria-label={`${businessConfig.name} - Home`}
          >
            <svg className="h-7 w-7 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="truncate">{businessConfig.name}</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex lg:gap-3">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={handleNavClick(item.href)}
                className={linkClassName}
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={phoneUrl}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm font-medium text-blue-900 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              aria-label={`Call ${businessConfig.contact.phone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">{businessConfig.contact.phone}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/40 transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
            onClick={toggle}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="border-t border-white/15 pb-4 pt-2 md:hidden">
            <div className="flex flex-col">
              {navItems.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={handleNavClick(item.href)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-3 text-base font-medium transition-colors',
                      isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
                    )
                  }
                  end={item.href === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 px-1">
              <a href={phoneUrl} className="btn btn-light min-h-11 px-3 text-sm">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp min-h-11 px-3 text-sm">
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
