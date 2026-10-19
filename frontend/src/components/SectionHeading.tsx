import { cn } from '../utils/helpers';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  className = '',
  textAlign = 'center',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-12 lg:mb-16', alignClasses[textAlign], className)}>
      {subtitle && (
        <p className={cn('inline-block text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-4 py-2 rounded-full mb-4', subtitleClassName)}>
          {subtitle}
        </p>
      )}
      <h2 className={cn('text-3xl lg:text-4xl font-bold text-gray-900 mb-4', titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className={cn('text-lg text-gray-600 max-w-2xl mx-auto', textAlign !== 'center' && 'mx-0', descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}