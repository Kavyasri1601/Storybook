import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Description text below label */
  description?: string;
  /** Error state */
  hasError?: boolean;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Indeterminate state (partial selection) */
  indeterminate?: boolean;
}

const sizeStyles: Record<CheckboxSize, { box: string; icon: string; label: string }> = {
  sm: {
    box: 'h-4 w-4',
    icon: 'h-3 w-3',
    label: 'text-sm',
  },
  md: {
    box: 'h-5 w-5',
    icon: 'h-3.5 w-3.5',
    label: 'text-base',
  },
  lg: {
    box: 'h-6 w-6',
    icon: 'h-4 w-4',
    label: 'text-lg',
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      hasError,
      size = 'md',
      indeterminate,
      disabled,
      className,
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const styles = sizeStyles[size];

    return (
      <div className={cn('flex items-start', className)}>
        <div className="relative flex items-center">
          <input
            ref={(node) => {
              // Handle indeterminate state
              if (node) {
                node.indeterminate = indeterminate ?? false;
              }
              // Forward ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="checkbox"
            id={id}
            disabled={disabled}
            className={cn(
              'peer appearance-none rounded border-2 bg-white transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              'dark:bg-secondary-800 dark:focus:ring-offset-secondary-900',
              styles.box,
              hasError
                ? 'border-error dark:border-error-light'
                : 'border-secondary-300 dark:border-secondary-600',
              'checked:border-primary-600 checked:bg-primary-600',
              'dark:checked:border-primary-500 dark:checked:bg-primary-500',
              'hover:border-primary-400 dark:hover:border-primary-400',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'disabled:hover:border-secondary-300 dark:disabled:hover:border-secondary-600'
            )}
            aria-invalid={hasError}
            {...props}
          />
          <Check
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'text-white opacity-0 transition-opacity',
              'peer-checked:opacity-100',
              styles.icon
            )}
            aria-hidden="true"
            strokeWidth={3}
          />
          {indeterminate && (
            <div
              className={cn(
                'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'h-0.5 w-2/3 rounded bg-white opacity-0 transition-opacity',
                'peer-indeterminate:opacity-100'
              )}
              aria-hidden="true"
            />
          )}
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'font-medium text-secondary-900 dark:text-white',
                  styles.label,
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  'text-secondary-500 dark:text-secondary-400',
                  size === 'sm' ? 'text-xs' : 'text-sm',
                  disabled && 'opacity-50'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
