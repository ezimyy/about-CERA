import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from './Button'; // reuse cn utility

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full relative pt-4">
        {label && (
          <label className="absolute top-0 left-0 text-[11px] font-medium tracking-wider uppercase text-[var(--color-on-surface-variant)] z-10 transition-all font-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full bg-transparent border-b border-[var(--color-outline-variant)]/20 px-0 py-2 text-2xl font-display text-[var(--color-primary)] placeholder:text-[var(--color-on-surface-variant)]/30 focus-visible:outline-none focus-visible:border-[var(--color-primary-container)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error && 'border-[var(--color-error)] focus-visible:border-[var(--color-error)] text-[var(--color-error)]',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-[var(--color-error)] mt-1 font-body">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
