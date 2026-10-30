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
    <div className={cn('mb-12', alignClasses[textAlign], className)}>
      {subtitle && (
        <p className={cn('inline-block text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-4 py-2 rounded-full mb-4', subtitleClassName)}>
          {subtitle}
        </p>
      )}
      <Heading id={id} className={cn('text-3xl md:text-5xl font-extrabold text-blue-900 mb-4', titleClassName)}>
        {title}
      </Heading>
      <span className={cn('block w-20 h-1 bg-orange-500 rounded', underlineAlign)} aria-hidden="true" />
      {description && (
        <p className={cn('mt-5 text-lg text-slate-600 max-w-2xl', descriptionAlign, descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
