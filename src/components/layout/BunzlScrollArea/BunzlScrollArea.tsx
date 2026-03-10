import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

export type BunzlScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface BunzlScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Max height of scrollable area */
  maxHeight?: string | number;
  /** Max width of scrollable area */
  maxWidth?: string | number;
  /** Scroll orientation */
  orientation?: BunzlScrollAreaOrientation;
  /** Hide scrollbar */
  hideScrollbar?: boolean;
  /** Always show scrollbar */
  alwaysShowScrollbar?: boolean;
}

export const BunzlScrollArea = forwardRef<HTMLDivElement, BunzlScrollAreaProps>(
  (
    {
      maxHeight,
      maxWidth,
      orientation = 'vertical',
      hideScrollbar = false,
      alwaysShowScrollbar = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const overflowStyles = {
      vertical: 'overflow-y-auto overflow-x-hidden',
      horizontal: 'overflow-x-auto overflow-y-hidden',
      both: 'overflow-auto',
    };

    return (
      <div
        ref={ref}
        className={cn(
          overflowStyles[orientation],
          // Custom scrollbar styles
          !hideScrollbar && [
            'scrollbar-thin',
            'scrollbar-thumb-secondary-300 dark:scrollbar-thumb-secondary-600',
            'scrollbar-track-secondary-100 dark:scrollbar-track-secondary-800',
            'hover:scrollbar-thumb-secondary-400 dark:hover:scrollbar-thumb-secondary-500',
          ],
          hideScrollbar && 'scrollbar-hide',
          alwaysShowScrollbar && 'scrollbar-always',
          className
        )}
        style={{
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BunzlScrollArea.displayName = 'BunzlScrollArea';

// Viewport (for more complex scroll areas)
export interface BunzlScrollAreaViewportProps extends HTMLAttributes<HTMLDivElement> {}

export const BunzlScrollAreaViewport = forwardRef<HTMLDivElement, BunzlScrollAreaViewportProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('h-full w-full', className)} {...props}>
      {children}
    </div>
  )
);

BunzlScrollAreaViewport.displayName = 'BunzlScrollAreaViewport';
