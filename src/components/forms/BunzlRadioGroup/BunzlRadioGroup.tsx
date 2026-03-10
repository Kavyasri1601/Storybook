import { forwardRef, createContext, useContext, useId, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

export type BunzlRadioGroupSize = 'sm' | 'md' | 'lg';
export type BunzlRadioGroupOrientation = 'horizontal' | 'vertical';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size: BunzlRadioGroupSize;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface BunzlRadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Group name for form submission */
  name?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Radio size */
  size?: BunzlRadioGroupSize;
  /** Layout orientation */
  orientation?: BunzlRadioGroupOrientation;
  /** Disabled state */
  disabled?: boolean;
  /** Label for the group */
  label?: string;
}

export const BunzlRadioGroup = forwardRef<HTMLDivElement, BunzlRadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      size = 'md',
      orientation = 'vertical',
      disabled = false,
      label,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedName = useId();
    const groupName = name || generatedName;

    return (
      <RadioGroupContext.Provider value={{ name: groupName, value, onChange, size, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-labelledby={label ? `${groupName}-label` : undefined}
          className={cn(className)}
          {...props}
        >
          {label && (
            <div
              id={`${groupName}-label`}
              className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2"
            >
              {label}
            </div>
          )}
          <div
            className={cn(
              'flex',
              orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row flex-wrap gap-4'
            )}
          >
            {children}
          </div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

BunzlRadioGroup.displayName = 'BunzlRadioGroup';

// Radio Item
export interface BunzlRadioGroupItemProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** Radio value */
  value: string;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
}

const sizeStyles: Record<BunzlRadioGroupSize, { radio: string; label: string }> = {
  sm: {
    radio: 'h-4 w-4',
    label: 'text-sm',
  },
  md: {
    radio: 'h-5 w-5',
    label: 'text-base',
  },
  lg: {
    radio: 'h-6 w-6',
    label: 'text-lg',
  },
};

export const BunzlRadioGroupItem = forwardRef<HTMLLabelElement, BunzlRadioGroupItemProps>(
  ({ value, label, description, disabled: itemDisabled, className, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    if (!context) {
      throw new Error('BunzlRadioGroupItem must be used within a BunzlRadioGroup');
    }

    const { name, value: groupValue, onChange, size, disabled: groupDisabled } = context;
    const isDisabled = itemDisabled || groupDisabled;
    const isChecked = groupValue === value;
    const styles = sizeStyles[size];
    const inputId = `${name}-${value}`;

    return (
      <label
        ref={ref}
        htmlFor={inputId}
        className={cn(
          'flex items-start cursor-pointer',
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        <div className="relative flex items-center">
          <input
            type="radio"
            id={inputId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => onChange?.(value)}
            className={cn(
              'peer appearance-none rounded-full border-2 bg-white transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              'dark:bg-secondary-800 dark:focus:ring-offset-secondary-900',
              styles.radio,
              isChecked
                ? 'border-primary-600 dark:border-primary-500'
                : 'border-secondary-300 dark:border-secondary-600',
              'hover:border-primary-400 dark:hover:border-primary-400',
              'disabled:hover:border-secondary-300 dark:disabled:hover:border-secondary-600'
            )}
          />
          <div
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'rounded-full bg-primary-600 dark:bg-primary-500 transition-transform',
              isChecked ? 'scale-100' : 'scale-0',
              size === 'sm' && 'h-2 w-2',
              size === 'md' && 'h-2.5 w-2.5',
              size === 'lg' && 'h-3 w-3'
            )}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <span
                className={cn(
                  'font-medium text-secondary-900 dark:text-white',
                  styles.label
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <p
                className={cn(
                  'text-secondary-500 dark:text-secondary-400',
                  size === 'sm' ? 'text-xs' : 'text-sm'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);

BunzlRadioGroupItem.displayName = 'BunzlRadioGroupItem';
