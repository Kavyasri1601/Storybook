import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Container } from '../../layout/Container';

export type NavbarVariant = 'solid' | 'transparent' | 'bordered';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: NavbarVariant;
  /** Logo or brand element */
  logo?: ReactNode;
  /** Navigation items (usually links) */
  navItems?: ReactNode;
  /** Right side actions (buttons, user menu, etc.) */
  actions?: ReactNode;
  /** Whether the navbar is sticky */
  sticky?: boolean;
  /** Container size */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const variantStyles: Record<NavbarVariant, string> = {
  solid: 'bg-white dark:bg-secondary-900 shadow-sm',
  transparent: 'bg-transparent',
  bordered: 'bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-700',
};

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      variant = 'bordered',
      logo,
      navItems,
      actions,
      sticky = false,
      containerSize = 'xl',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={cn(
          'w-full',
          variantStyles[variant],
          sticky && 'sticky top-0 z-40',
          className
        )}
        {...props}
      >
        <Container size={containerSize}>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            {logo && <div className="flex-shrink-0">{logo}</div>}

            {/* Navigation Items */}
            {navItems && (
              <div className="hidden md:flex md:items-center md:space-x-6">
                {navItems}
              </div>
            )}

            {/* Custom children (for more complex layouts) */}
            {children}

            {/* Actions */}
            {actions && (
              <div className="flex items-center space-x-4">
                {actions}
              </div>
            )}
          </div>
        </Container>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

// Navbar sub-components
export interface NavbarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  active?: boolean;
}

export const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ href = '#', active, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'text-sm font-medium transition-colors duration-200',
          active
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white',
          className
        )}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavbarLink.displayName = 'NavbarLink';

export interface NavbarBrandProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const NavbarBrand = forwardRef<HTMLAnchorElement, NavbarBrandProps>(
  ({ href = '/', className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'flex items-center text-xl font-bold text-secondary-900 dark:text-white',
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavbarBrand.displayName = 'NavbarBrand';
