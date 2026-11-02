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
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
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
  as: Heading = 'h2',
  id,
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const underlineAlign = textAlign === 'center' ? 'mx-auto' : textAlign === 'right' ? 'ml-auto' : '';
  const descriptionAlign = textAlign === 'center' ? 'mx-auto' : textAlign === 'right' ? 'ml-auto' : '';

  return (
    <div className={cn('mb-10 md:mb-12', alignClasses[textAlign], className)}>
      {subtitle && (
        <p className={cn('inline-block text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full mb-3 md:mb-4', subtitleClassName)}>
          {subtitle}
        </p>
      )}
      <Heading id={id} className={cn('text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3 md:mb-4', titleClassName)}>
        {title}
      </Heading>
      <span className={cn('block w-16 sm:w-20 h-1 bg-orange-500 rounded', underlineAlign)} aria-hidden="true" />
      {description && (
        <p className={cn('mt-4 md:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl', descriptionAlign, descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
