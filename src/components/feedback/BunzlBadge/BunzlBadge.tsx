import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

export type BunzlBadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info';
export type BunzlBadgeSize = 'sm' | 'md' | 'lg';

export interface BunzlBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BunzlBadgeVariant;
  /** Badge size */
  size?: BunzlBadgeSize;
  /** Removable badge */
  removable?: boolean;
  /** Callback when remove is clicked */
  onRemove?: () => void;
  /** Dot indicator instead of content */
  dot?: boolean;
}

const variantStyles: Record<BunzlBadgeVariant, string> = {
  default: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-300',
  outline: 'border border-secondary-300 text-secondary-700 dark:border-secondary-600 dark:text-secondary-300',
  success: 'bg-success/10 text-success-dark dark:bg-success/20 dark:text-success-light',
  warning: 'bg-warning/10 text-warning-dark dark:bg-warning/20 dark:text-warning-light',
  error: 'bg-error/10 text-error-dark dark:bg-error/20 dark:text-error-light',
  info: 'bg-info/10 text-info-dark dark:bg-info/20 dark:text-info-light',
};

const sizeStyles: Record<BunzlBadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
};

const dotSizeStyles: Record<BunzlBadgeSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

export const BunzlBadge = forwardRef<HTMLSpanElement, BunzlBadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      removable = false,
      onRemove,
      dot = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (dot) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex rounded-full',
            variantStyles[variant].split(' ').filter(c => c.startsWith('bg-')).join(' '),
            dotSizeStyles[size],
            className
          )}
          {...props}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'ml-0.5 -mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full',
              'hover:bg-black/10 dark:hover:bg-white/10',
              'focus:outline-none focus:ring-2 focus:ring-current'
            )}
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

BunzlBadge.displayName = 'BunzlBadge';
