import { forwardRef, useState, useRef, useId, type ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils';

export type BunzlSelectSize = 'sm' | 'md' | 'lg';

export interface BunzlSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BunzlSelectProps {
  /** Select options */
  options: BunzlSelectOption[];
  /** Current value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Select size */
  size?: BunzlSelectSize;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  hasError?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Label */
  label?: string;
  /** Custom trigger content */
  triggerContent?: ReactNode;
  /** Class name */
  className?: string;
}

const sizeStyles: Record<BunzlSelectSize, string> = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-2.5 text-lg',
};

export const BunzlSelect = forwardRef<HTMLDivElement, BunzlSelectProps>(
  (
    {
      options,
      value,
      placeholder = 'Select an option',
      onChange,
      size = 'md',
      disabled = false,
      hasError = false,
      fullWidth = false,
      label,
      triggerContent,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();

   // useClickOutside(containerRef, () => setIsOpen(false));

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        className={cn('relative', fullWidth && 'w-full', className)}
      >
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
          >
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          {/* Trigger */}
          <button
            id={generatedId}
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={cn(
              'relative w-full rounded-md border bg-white text-left shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'transition-colors duration-200',
              'dark:bg-secondary-800 dark:text-white',
              sizeStyles[size],
              hasError
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500',
              disabled && 'cursor-not-allowed opacity-50 bg-secondary-50 dark:bg-secondary-800',
              fullWidth && 'w-full'
            )}
          >
            <span className={cn('block truncate', !selectedOption && 'text-secondary-400')}>
              {triggerContent || selectedOption?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-secondary-400 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <ul
              role="listbox"
              className={cn(
                'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg',
                'ring-1 ring-black ring-opacity-5 focus:outline-none',
                'dark:bg-secondary-800 dark:ring-secondary-700'
              )}
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    'relative cursor-pointer select-none py-2 pl-10 pr-4',
                    'text-secondary-900 dark:text-white',
                    option.disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-primary-50 dark:hover:bg-primary-900/20',
                    value === option.value && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                >
                  <span
                    className={cn(
                      'block truncate',
                      value === option.value ? 'font-medium' : 'font-normal'
                    )}
                  >
                    {option.label}
                  </span>
                  {value === option.value && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-400">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

BunzlSelect.displayName = 'BunzlSelect';
