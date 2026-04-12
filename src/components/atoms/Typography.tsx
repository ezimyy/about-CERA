import type { ElementType, HTMLAttributes } from 'react';
import { cn } from './Button';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: 'display-lg' | 'display-md' | 'headline-sm' | 'body-lg' | 'label-sm';
}

export const Typography = ({ as, variant = 'body-lg', className, children, ...props }: TypographyProps) => {
  let Component = as || 'p';
  
  const variants = {
    'display-lg': 'font-display text-5xl tracking-tight text-[var(--color-on-surface)]', // approx 3.5rem? using tailwind text-5xl (3rem) or text-7xl but we keep it simpler
    'display-md': 'font-display text-4xl tracking-tight text-[var(--color-on-surface)]',
    'headline-sm': 'font-display text-2xl font-semibold text-[var(--color-on-surface)] left-align-offset', // ~1.5rem
    'body-lg': 'font-body text-base text-[var(--color-on-surface-variant)] leading-relaxed',
    'label-sm': 'font-body text-[11px] uppercase tracking-wider text-[var(--color-on-surface-variant)]',
  };

  // Adjust defaults based on variant if `as` not provided
  if (!as) {
    if (variant.startsWith('display')) Component = 'h1';
    else if (variant.startsWith('headline')) Component = 'h2';
    else if (variant === 'label-sm') Component = 'span';
  }

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};
