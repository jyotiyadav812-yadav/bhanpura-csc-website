import { ServiceCard } from './ServiceCard';
import type { Service } from '../types';

interface ServiceGridProps {
  services: Service[];
  variant?: 'default' | 'compact';
  className?: string;
}

export function ServiceGrid({ services, variant = 'default', className = '' }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p className="text-gray-500">No services available in this category.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        grid gap-6 items-stretch
        ${variant === 'compact' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}
        ${className}
      `}
      role="list"
      aria-label="Services"
    >
      {services.map(service => (
        <ServiceCard key={service.id} service={service} variant={variant} />
      ))}
    </div>
  );
}