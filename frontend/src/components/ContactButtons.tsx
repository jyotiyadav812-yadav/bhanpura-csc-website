import { Phone, MessageSquare } from 'lucide-react';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { cn } from '../utils/helpers';

interface ContactButtonsProps {
  className?: string;
  serviceName?: string;
  variant?: 'default' | 'compact';
}

export function ContactButtons({ className = '', serviceName, variant = 'default' }: ContactButtonsProps) {
  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage(serviceName));
  const phoneUrl = `tel:+91${businessConfig.contact.phone}`;

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)} role="group" aria-label="Contact options">
        <a
          href={phoneUrl}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Call us"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Contact on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col sm:flex-row gap-4', className)} role="group" aria-label="Contact options">
      <a
        href={phoneUrl}
        className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        <span>Call: {businessConfig.contact.phone}</span>
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Contact on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        <span>Contact on WhatsApp</span>
      </a>
    </div>
  );
}