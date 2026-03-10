import { forwardRef, type HTMLAttributes, useId } from 'react';
import { cn } from '@/utils';
import { FormLabel } from '../FormLabel';
import { FormError } from '../FormError';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text (shown when no error) */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Custom ID for the form field */
  fieldId?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      disabled,
      fieldId,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = fieldId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div ref={ref} className={cn('space-y-1.5', className)} {...props}>
        {label && (
          <FormLabel htmlFor={id} required={required} disabled={disabled}>
            {label}
          </FormLabel>
        )}
        {children}
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

FormField.displayName = 'FormField';
