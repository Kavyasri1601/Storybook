import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Divider orientation */
  orientation?: DividerOrientation;
  /** Divider line style */
  variant?: DividerVariant;
  /** Text to display in the middle of the divider */
  label?: string;
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

type SpacingKey = 'none' | 'sm' | 'md' | 'lg';
const spacingStyles: Record<SpacingKey, { horizontal: string; vertical: string }> = {
  none: { horizontal: '', vertical: '' },
  sm: { horizontal: 'my-2', vertical: 'mx-2' },
  md: { horizontal: 'my-4', vertical: 'mx-4' },
  lg: { horizontal: 'my-6', vertical: 'mx-6' },
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      label,
      spacing = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';

    // If there's a label, render a div with flex layout
    if (label && isHorizontal) {
      return (
        <div
          className={cn(
            'flex items-center',
            spacingStyles[spacing].horizontal,
            className
          )}
          role="separator"
          aria-orientation="horizontal"
        >
          <div
            className={cn(
              'flex-grow border-t border-secondary-200 dark:border-secondary-700',
              variantStyles[variant]
            )}
          />
          <span className="px-3 text-sm text-secondary-500 dark:text-secondary-400">
            {label}
          </span>
          <div
            className={cn(
              'flex-grow border-t border-secondary-200 dark:border-secondary-700',
              variantStyles[variant]
            )}
          />
        </div>
      );
    }

    // Simple hr element
    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'border-secondary-200 dark:border-secondary-700',
          variantStyles[variant],
          isHorizontal
            ? cn('w-full border-t', spacingStyles[spacing].horizontal)
            : cn('h-full border-l inline-block', spacingStyles[spacing].vertical),
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
