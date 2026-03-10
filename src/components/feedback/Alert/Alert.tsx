import { forwardRef, type HTMLAttributes } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Show close button */
  dismissible?: boolean;
  /** Callback when close button is clicked */
  onDismiss?: () => void;
  /** Hide the icon */
  hideIcon?: boolean;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string }> = {
  info: {
    container:
      'bg-info/10 border-info/20 text-info-dark dark:bg-info/20 dark:border-info/30 dark:text-info-light',
    icon: 'text-info dark:text-info-light',
  },
  success: {
    container:
      'bg-success/10 border-success/20 text-success-dark dark:bg-success/20 dark:border-success/30 dark:text-success-light',
    icon: 'text-success dark:text-success-light',
  },
  warning: {
    container:
      'bg-warning/10 border-warning/20 text-warning-dark dark:bg-warning/20 dark:border-warning/30 dark:text-warning-light',
    icon: 'text-warning dark:text-warning-light',
  },
  error: {
    container:
      'bg-error/10 border-error/20 text-error-dark dark:bg-error/20 dark:border-error/30 dark:text-error-light',
    icon: 'text-error dark:text-error-light',
  },
};

const variantIcons: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      dismissible = false,
      onDismiss,
      hideIcon = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const IconComponent = variantIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative rounded-lg border p-4',
          styles.container,
          className
        )}
        {...props}
      >
        <div className="flex">
          {!hideIcon && (
            <div className="shrink-0">
              <IconComponent
                className={cn('h-5 w-5', styles.icon)}
                aria-hidden="true"
              />
            </div>
          )}
          <div className={cn('flex-1', !hideIcon && 'ml-3')}>
            {title && (
              <h3 className="text-sm font-medium">{title}</h3>
            )}
            {children && (
              <div className={cn('text-sm', title && 'mt-1', 'opacity-90')}>
                {children}
              </div>
            )}
          </div>
          {dismissible && (
            <div className="ml-auto pl-3">
              <button
                type="button"
                onClick={onDismiss}
                className={cn(
                  '-m-1.5 inline-flex rounded-md p-1.5',
                  'hover:bg-black/5 dark:hover:bg-white/10',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'focus:ring-current focus:ring-offset-transparent'
                )}
                aria-label="Dismiss"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
