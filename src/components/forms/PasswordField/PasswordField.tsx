import { forwardRef, useState, useId, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils';
import { type InputSize } from '../../primitives/Input';
import { FormLabel } from '../FormLabel';
import { FormError } from '../FormError';

export interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text (shown when no error) */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Input size */
  size?: InputSize;
  /** Full width field */
  fullWidth?: boolean;
  /** Show strength indicator */
  showStrength?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-2.5 py-1.5 text-sm pr-9',
  md: 'px-3 py-2 text-base pr-10',
  lg: 'px-4 py-2.5 text-lg pr-11',
  compact: 'px-2.5 py-2 text-sm h-10 w-[271.5px] pr-9 rounded-none',
};

const buttonSizeStyles: Record<InputSize, string> = {
  sm: 'right-2 h-4 w-4',
  md: 'right-3 h-5 w-5',
  lg: 'right-3 h-6 w-6',
  compact: 'right-2 h-4 w-4',
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      disabled,
      size = 'md',
      fullWidth = false,
      showStrength: _showStrength = false,
      id: customId,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <FormLabel htmlFor={id} required={required} disabled={disabled}>
            {label}
          </FormLabel>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
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
              error
                ? 'border-error focus:border-error focus:ring-error dark:border-error-light dark:focus:border-error-light dark:focus:ring-error-light'
                : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400',
              // Disabled
              disabled && 'cursor-not-allowed bg-secondary-50 opacity-50 dark:bg-secondary-800',
              // Width
              fullWidth && 'w-full'
            )}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...props}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded',
              'dark:text-secondary-500 dark:hover:text-secondary-300',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              buttonSizeStyles[size]
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-full w-full" aria-hidden="true" />
            ) : (
              <Eye className="h-full w-full" aria-hidden="true" />
            )}
          </button>
        </div>
        {error ? (
          <FormError id={errorId} message={error} />
        ) : helperText ? (
          <p
            id={helperId}
            className="text-sm text-secondary-500 dark:text-secondary-400"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
