import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographyColor = 'default' | 'muted' | 'primary' | 'error' | 'success' | 'warning';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Text color */
  color?: TypographyColor;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  /** Whether to truncate text with ellipsis */
  truncate?: boolean;
  /** Font weight override */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

const variantStyles: Record<TypographyVariant, string> = {
  display: 'text-[40px] font-semibold tracking-tight',
  h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wider font-medium',
};

const colorStyles: Record<TypographyColor, string> = {
  default: 'text-secondary-900 dark:text-white',
  muted: 'text-secondary-500 dark:text-secondary-400',
  primary: 'text-primary-600 dark:text-primary-400',
  error: 'text-error dark:text-error-light',
  success: 'text-success dark:text-success-light',
  warning: 'text-warning dark:text-warning-light',
};

const weightStyles: Record<string, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignStyles: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// Default element for each variant
const variantElement: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body1',
      color = 'default',
      as,
      truncate = false,
      weight,
      align,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = (as || variantElement[variant]) as 'div';

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          variantStyles[variant],
          colorStyles[color],
          weight && weightStyles[weight],
          align && alignStyles[align],
          truncate && 'truncate',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

// Convenience components
export const Heading1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h1" {...props} />
);
Heading1.displayName = 'Heading1';

export const Heading2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h2" {...props} />
);
Heading2.displayName = 'Heading2';

export const Heading3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h3" {...props} />
);
Heading3.displayName = 'Heading3';

export const Text = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="body1" {...props} />
);
Text.displayName = 'Text';

export const Caption = forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="caption" {...props} />
);
Caption.displayName = 'Caption';
