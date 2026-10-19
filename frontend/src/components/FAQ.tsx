import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils/helpers';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
  title?: string;
  subtitle?: string;
}

export function FAQ({ items, className = '', title, subtitle }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className={cn('py-16 lg:py-24', className)} aria-labelledby={title ? 'faq-title' : undefined}>
      {(title || subtitle) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          {subtitle && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-4 py-2 rounded-full mb-4">{subtitle}</span>
          )}
          {title && (
            <>
              <h2 id="faq-title" className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
              <div className="w-20 h-1 rounded-full mx-auto mt-4 bg-gradient-to-r from-blue-600 to-orange-500" />
            </>
          )}
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4" role="list" aria-label="Frequently asked questions">
          {items.map((item, index) => {
            const theme = ['theme-blue', 'theme-green', 'theme-orange', 'theme-purple', 'theme-teal', 'theme-rose'][index % 6];
            return (
            <article
              key={index}
              className={cn(
                'rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                theme,
                'bg-[var(--c-bg)] border-[var(--c-border)]'
              )}
              role="listitem"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{item.question}</span>
                <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white bg-[var(--c-accent)] shadow" aria-hidden="true">
                  {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-label={`Answer to: ${item.question}`}
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-6 pb-5 border-t border-[var(--c-border)]">
                  <p className="text-gray-700 leading-relaxed mt-4">{item.answer}</p>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}