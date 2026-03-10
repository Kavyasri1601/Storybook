import { forwardRef, type HTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils';

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Error message to display */
  message?: string;
  /** Show icon alongside message */
  showIcon?: boolean;
}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ message, showIcon = true, className, children, ...props }, ref) => {
    const errorContent = message || children;

    if (!errorContent) return null;

    return (
      <p
        ref={ref}
        className={cn(
          'flex items-center gap-1.5 text-sm text-error dark:text-error-light',
          className
        )}
        role="alert"
        {...props}
      >
        {showIcon && <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />}
        <span>{errorContent}</span>
      </p>
    );
  }
);

FormError.displayName = 'FormError';
