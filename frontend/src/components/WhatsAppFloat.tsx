import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl } from '../utils/helpers';

export function WhatsAppFloat() {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappUrl = getWhatsAppUrl('Hello, I need help');
  const phoneUrl = `tel:+91${businessConfig.contact.phone}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-sm:bottom-4 max-sm:left-4" role="region" aria-label="Quick contact actions">
      <div className="flex flex-col items-start gap-3">
        {isExpanded && (
          <>
            <a
              href={phoneUrl}
              className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-x-1"
              aria-label="Call us"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55.45-1 1-1 1.24 0 2.45-.2 3.57-.57.11-.35.03-.74-.25-1.02l-2.2-2.2z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Call: {businessConfig.contact.phone}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-x-1"
              aria-label="Chat on WhatsApp"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <MessageSquare className="w-5 h-5 text-green-600" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-gray-700">WhatsApp Chat</span>
            </a>
          </>
        )}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl flex items-center justify-center transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Close contact options' : 'Chat on WhatsApp'}
        >
          {isExpanded ? <X className="w-7 h-7" aria-hidden="true" /> : <MessageSquare className="w-7 h-7" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
