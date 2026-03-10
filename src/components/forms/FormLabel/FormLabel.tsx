import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cn } from '@/utils';

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Label size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ required, disabled, size = 'md', className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block font-medium text-secondary-700 dark:text-secondary-300',
          sizeStyles[size],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-error ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';
