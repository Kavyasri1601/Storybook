import { forwardRef, type SVGAttributes } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'default' | 'muted' | 'primary' | 'error' | 'success' | 'warning' | 'inherit';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'ref'> {
  /** The Lucide icon component to render */
  icon: LucideIcon;
  /** Icon size */
  size?: IconSize;
  /** Icon color */
  color?: IconColor;
  /** Accessible label for screen readers */
  label?: string;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const colorStyles: Record<IconColor, string> = {
  default: 'text-secondary-900 dark:text-white',
  muted: 'text-secondary-500 dark:text-secondary-400',
  primary: 'text-primary-600 dark:text-primary-400',
  error: 'text-error dark:text-error-light',
  success: 'text-success dark:text-success-light',
  warning: 'text-warning dark:text-warning-light',
  inherit: 'text-inherit',
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIcon, size = 'md', color = 'inherit', label, className, ...props }, ref) => {
    const pixelSize = sizeMap[size];

    return (
      <LucideIcon
        ref={ref}
        size={pixelSize}
        className={cn(colorStyles[color], className)}
        aria-hidden={!label}
        aria-label={label}
        role={label ? 'img' : undefined}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
