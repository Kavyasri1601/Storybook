import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/utils';

export type LinkVariant = 'default' | 'muted' | 'nav' | 'underline' | 'brand';
export type LinkSize = 'sm' | 'md' | 'lg';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link visual variant */
  variant?: LinkVariant;
  /** Link size */
  size?: LinkSize;
  /** Whether the link is external (adds icon and security attrs) */
  external?: boolean;
  /** Disable the link */
  disabled?: boolean;
}

const variantStyles: Record<LinkVariant, string> = {
  default:
    'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
  muted:
    'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300',
  nav: 'text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400',
  underline:
    'text-primary-600 underline underline-offset-4 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
  brand:
    'text-[#003e7e] font-bold hover:text-[#002d5c] hover:underline dark:text-[#003e7e] dark:hover:text-[#002d5c]',
};

const sizeStyles: Record<LinkSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      size = 'md',
      external = false,
      disabled = false,
      className,
      children,
      href,
      ...props
    },
    ref
  ) => {
    // External link attributes for security
    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={cn(
          // Base styles
          'inline-flex items-center gap-1 font-medium transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'dark:focus-visible:ring-offset-secondary-900',
          // Variant & size
          variantStyles[variant],
          sizeStyles[size],
          // Disabled
          disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
          className
        )}
        aria-disabled={disabled}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <ExternalLinkIcon
            className={cn(
              'shrink-0',
              size === 'sm' && 'h-3 w-3',
              size === 'md' && 'h-4 w-4',
              size === 'lg' && 'h-5 w-5'
            )}
          />
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

// Simple external link icon to avoid dependency on Lucide for this basic component
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
