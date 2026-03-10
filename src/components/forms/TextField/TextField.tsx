import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Input, type InputSize } from '../../primitives/Input';
import { FormLabel } from '../FormLabel';
import { FormError } from '../FormError';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  /** Left addon */
  leftAddon?: React.ReactNode;
  /** Right addon */
  rightAddon?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      disabled,
      size = 'md',
      fullWidth = false,
      leftAddon,
      rightAddon,
      id: customId,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <FormLabel htmlFor={id} required={required} disabled={disabled}>
            {label}
          </FormLabel>
        )}
        <Input
          ref={ref}
          id={id}
          size={size}
          disabled={disabled}
          hasError={!!error}
          fullWidth={fullWidth}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />
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

TextField.displayName = 'TextField';
