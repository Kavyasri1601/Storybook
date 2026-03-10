import { forwardRef, type HTMLAttributes, type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';

export type BunzlDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface BunzlDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog should close */
  onOpenChange: (open: boolean) => void;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Dialog size */
  size?: BunzlDialogSize;
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Dialog content */
  children?: ReactNode;
  /** Class name for content */
  className?: string;
}

const sizeStyles: Record<BunzlDialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

export const BunzlDialog = forwardRef<HTMLDivElement, BunzlDialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      size = 'md',
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      children,
      className,
    },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, open, onOpenChange]);

    // Prevent body scroll when open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity"
          onClick={() => closeOnOverlayClick && onOpenChange(false)}
          aria-hidden="true"
        />

        {/* Dialog */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'dialog-title' : undefined}
              aria-describedby={description ? 'dialog-description' : undefined}
              className={cn(
                'relative w-full rounded-lg bg-white shadow-xl',
                'dark:bg-secondary-800',
                'transform transition-all',
                sizeStyles[size],
                className
              )}
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    'absolute right-4 top-4 rounded-md p-1',
                    'text-secondary-400 hover:text-secondary-500',
                    'dark:text-secondary-500 dark:hover:text-secondary-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500'
                  )}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}

              {/* Header */}
              {(title || description) && (
                <div className="px-6 pt-6 pb-4">
                  {title && (
                    <h2
                      id="dialog-title"
                      className="text-lg font-semibold text-secondary-900 dark:text-white"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="dialog-description"
                      className="mt-1 text-sm text-secondary-500 dark:text-secondary-400"
                    >
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={cn('px-6 pb-6', !title && !description && 'pt-6')}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BunzlDialog.displayName = 'BunzlDialog';

// Sub-components for flexibility
export interface BunzlDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const BunzlDialogHeader = forwardRef<HTMLDivElement, BunzlDialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pt-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

BunzlDialogHeader.displayName = 'BunzlDialogHeader';

export interface BunzlDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const BunzlDialogTitle = forwardRef<HTMLHeadingElement, BunzlDialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold text-secondary-900 dark:text-white', className)}
      {...props}
    >
      {children}
    </h2>
  )
);

BunzlDialogTitle.displayName = 'BunzlDialogTitle';

export interface BunzlDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const BunzlDialogDescription = forwardRef<HTMLParagraphElement, BunzlDialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('mt-1 text-sm text-secondary-500 dark:text-secondary-400', className)}
      {...props}
    >
      {children}
    </p>
  )
);

BunzlDialogDescription.displayName = 'BunzlDialogDescription';

export interface BunzlDialogContentProps extends HTMLAttributes<HTMLDivElement> {}

export const BunzlDialogContent = forwardRef<HTMLDivElement, BunzlDialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pb-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

BunzlDialogContent.displayName = 'BunzlDialogContent';

export interface BunzlDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const BunzlDialogFooter = forwardRef<HTMLDivElement, BunzlDialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pb-6 flex items-center justify-end gap-3', className)}
      {...props}
    >
      {children}
    </div>
  )
);

BunzlDialogFooter.displayName = 'BunzlDialogFooter';
