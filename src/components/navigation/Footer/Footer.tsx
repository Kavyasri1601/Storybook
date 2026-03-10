import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Container } from '../../layout/Container';

export type FooterVariant = 'simple' | 'bordered' | 'dark';

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: FooterVariant;
  /** Logo or brand element */
  logo?: ReactNode;
  /** Footer navigation columns */
  columns?: ReactNode;
  /** Bottom section content (copyright, social links) */
  bottom?: ReactNode;
  /** Container size */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const variantStyles: Record<FooterVariant, string> = {
  simple: 'bg-white dark:bg-secondary-900',
  bordered: 'bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700',
  dark: 'bg-secondary-900 text-white',
};

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      variant = 'bordered',
      logo,
      columns,
      bottom,
      containerSize = 'xl',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'w-full',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <Container size={containerSize}>
          <div className="py-8 md:py-12">
            {/* Main content */}
            {(logo || columns) && (
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                {logo && (
                  <div className="col-span-2 md:col-span-1 lg:col-span-2">
                    {logo}
                  </div>
                )}
                {columns}
              </div>
            )}

            {/* Custom children */}
            {children}

            {/* Bottom section */}
            {bottom && (
              <div className="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-700">
                {bottom}
              </div>
            )}
          </div>
        </Container>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

// Footer sub-components
export interface FooterColumnProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const FooterColumn = forwardRef<HTMLDivElement, FooterColumnProps>(
  ({ title, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {title && (
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white uppercase tracking-wider">
            {title}
          </h3>
        )}
        <ul className="space-y-3">{children}</ul>
      </div>
    );
  }
);

FooterColumn.displayName = 'FooterColumn';

export interface FooterLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ href = '#', className, children, ...props }, ref) => {
    return (
      <li>
        <a
          ref={ref}
          href={href}
          className={cn(
            'text-sm text-secondary-500 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white transition-colors',
            className
          )}
          {...props}
        >
          {children}
        </a>
      </li>
    );
  }
);

FooterLink.displayName = 'FooterLink';

export interface FooterCopyrightProps extends HTMLAttributes<HTMLParagraphElement> {
  year?: number;
  company?: string;
}

export const FooterCopyright = forwardRef<HTMLParagraphElement, FooterCopyrightProps>(
  ({ year = new Date().getFullYear(), company, className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-secondary-500 dark:text-secondary-400', className)}
        {...props}
      >
        {children || `© ${year} ${company || 'Company'}. All rights reserved.`}
      </p>
    );
  }
);

FooterCopyright.displayName = 'FooterCopyright';
