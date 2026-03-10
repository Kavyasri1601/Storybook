import { forwardRef, type HTMLAttributes, useEffect, useState } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/utils';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast variant */
  variant?: ToastVariant;
  /** Toast title */
  title?: string;
  /** Toast message */
  message?: string;
  /** Show close button */
  dismissible?: boolean;
  /** Callback when close button is clicked or auto-dismiss */
  onDismiss?: () => void;
  /** Auto dismiss after duration (ms). Set to 0 to disable */
  duration?: number;
  /** Whether the toast is visible */
  isVisible?: boolean;
}

const variantStyles: Record<ToastVariant, { container: string; icon: string }> = {
  info: {
    container: 'bg-white dark:bg-secondary-800 border-info/30',
    icon: 'text-info',
  },
  success: {
    container: 'bg-white dark:bg-secondary-800 border-success/30',
    icon: 'text-success',
  },
  warning: {
    container: 'bg-white dark:bg-secondary-800 border-warning/30',
    icon: 'text-warning',
  },
  error: {
    container: 'bg-white dark:bg-secondary-800 border-error/30',
    icon: 'text-error',
  },
};

const variantIcons: Record<ToastVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      message,
      dismissible = true,
      onDismiss,
      duration = 5000,
      isVisible = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(isVisible);
    const styles = variantStyles[variant];
    const IconComponent = variantIcons[variant];

    useEffect(() => {
      setVisible(isVisible);
    }, [isVisible]);

    useEffect(() => {
      if (duration > 0 && visible) {
        const timer = setTimeout(() => {
          setVisible(false);
          onDismiss?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, visible, onDismiss]);

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    if (!visible) return null;

    const content = children || message;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          'pointer-events-auto w-full max-w-md overflow-hidden rounded-lg border shadow-elevation-3',
          'transform transition-all duration-300',
          styles.container,
          className
        )}
        {...props}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">
              <IconComponent
                className={cn('h-5 w-5', styles.icon)}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1">
              {title && (
                <p className="text-sm font-medium text-secondary-900 dark:text-white">
                  {title}
                </p>
              )}
              {content && (
                <p className={cn('text-sm text-secondary-500 dark:text-secondary-400', title && 'mt-1')}>
                  {content}
                </p>
              )}
            </div>
            {dismissible && (
              <div className="ml-4 flex shrink-0">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className={cn(
                    'inline-flex rounded-md text-secondary-400 hover:text-secondary-500',
                    'dark:text-secondary-500 dark:hover:text-secondary-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    'dark:focus:ring-offset-secondary-800'
                  )}
                  aria-label="Dismiss"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast container for positioning multiple toasts
export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  position?: ToastPosition;
}

const positionStyles: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ position = 'top-right', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'pointer-events-none fixed z-50 flex flex-col gap-2',
          positionStyles[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';
