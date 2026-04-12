import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility to merge tailwind classes */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-variant disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] hover:bg-[var(--color-primary)] shadow-sm active:scale-95',
      ghost: 'bg-transparent text-[var(--color-on-surface)] hover:bg-[var(--color-surface-bright)] active:scale-95',
      outline: 'border border-[var(--color-outline-variant)]/20 bg-transparent text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] active:scale-95',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size !== 'icon' ? size : 'icon'], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
