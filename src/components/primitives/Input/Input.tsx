import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

export type InputSize = 'sm' | 'md' | 'lg' | 'compact';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size variant */
  size?: InputSize;
  /** Whether the input has an error state */
  hasError?: boolean;
  /** Left addon element (icon or text) */
  leftAddon?: React.ReactNode;
  /** Right addon element (icon or text) */
  rightAddon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-2.5 text-lg',
  compact: 'px-2.5 py-2 text-sm h-10 w-[271.5px] rounded-none',
};

const addonSizeStyles: Record<InputSize, string> = {
  sm: 'px-2.5',
  md: 'px-3',
  lg: 'px-4',
  compact: 'px-2.5',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      hasError = false,
      leftAddon,
      rightAddon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasLeftAddon = Boolean(leftAddon);
    const hasRightAddon = Boolean(rightAddon);

    const inputElement = (
      <input
        ref={ref}
        className={cn(
          // Base styles
          'block rounded-md border bg-white text-secondary-900 shadow-sm',
          'placeholder:text-secondary-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'transition-colors duration-200',
          // Dark mode
          'dark:bg-secondary-800 dark:text-white dark:placeholder:text-secondary-500',
          'dark:border-secondary-600',
          // Size
          sizeStyles[size],
          // States
          hasError
            ? 'border-error focus:border-error focus:ring-error dark:border-error-light dark:focus:border-error-light dark:focus:ring-error-light'
            : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400',
          // Disabled
          disabled && 'cursor-not-allowed bg-secondary-50 opacity-50 dark:bg-secondary-800',
          // Width
          fullWidth && 'w-full',
          // Addons
          hasLeftAddon && 'rounded-l-none',
          hasRightAddon && 'rounded-r-none',
          // No addons
          !hasLeftAddon && !hasRightAddon && fullWidth && 'w-full',
          className
        )}
        disabled={disabled}
        aria-invalid={hasError}
        {...props}
      />
    );

    // If no addons, return input directly
    if (!hasLeftAddon && !hasRightAddon) {
      return inputElement;
    }

    // With addons, wrap in a group
    return (
      <div className={cn('flex', fullWidth && 'w-full')}>
        {hasLeftAddon && (
          <span
            className={cn(
              'inline-flex items-center rounded-l-md border border-r-0 bg-secondary-50 text-secondary-500',
              'dark:bg-secondary-700 dark:text-secondary-400 dark:border-secondary-600',
              hasError
                ? 'border-error dark:border-error-light'
                : 'border-secondary-300',
              addonSizeStyles[size]
            )}
          >
            {leftAddon}
          </span>
        )}
        {inputElement}
        {hasRightAddon && (
          <span
            className={cn(
              'inline-flex items-center rounded-r-md border border-l-0 bg-secondary-50 text-secondary-500',
              'dark:bg-secondary-700 dark:text-secondary-400 dark:border-secondary-600',
              hasError
                ? 'border-error dark:border-error-light'
                : 'border-secondary-300',
              addonSizeStyles[size]
            )}
          >
            {rightAddon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
