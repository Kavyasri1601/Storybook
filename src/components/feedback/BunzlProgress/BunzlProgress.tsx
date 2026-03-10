import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

export type BunzlProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type BunzlProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface BunzlProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Progress bar size */
  size?: BunzlProgressSize;
  /** Progress bar color */
  color?: BunzlProgressColor;
  /** Show value label */
  showValue?: boolean;
  /** Custom label */
  label?: string;
  /** Indeterminate state (animated) */
  indeterminate?: boolean;
  /** Striped pattern */
  striped?: boolean;
  /** Animated stripes */
  animated?: boolean;
}

const sizeStyles: Record<BunzlProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const colorStyles: Record<BunzlProgressColor, string> = {
  primary: 'bg-primary-600 dark:bg-primary-500',
  secondary: 'bg-secondary-600 dark:bg-secondary-500',
  success: 'bg-success dark:bg-success-light',
  warning: 'bg-warning dark:bg-warning-light',
  error: 'bg-error dark:bg-error-light',
};

export const BunzlProgress = forwardRef<HTMLDivElement, BunzlProgressProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      color = 'primary',
      showValue = false,
      label,
      indeterminate = false,
      striped = false,
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Label and Value */}
        {(label || showValue) && (
          <div className="flex justify-between mb-1">
            {label && (
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Progress Track */}
        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-secondary-200 dark:bg-secondary-700',
            sizeStyles[size]
          )}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Progress Bar */}
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-in-out',
              colorStyles[color],
              indeterminate && 'animate-indeterminate w-1/3',
              striped && 'bg-stripes',
              animated && striped && 'animate-stripes'
            )}
            style={!indeterminate ? { width: `${percentage}%` } : undefined}
          />
        </div>
      </div>
    );
  }
);

BunzlProgress.displayName = 'BunzlProgress';
