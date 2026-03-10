import {
  forwardRef,
  useState,
  useRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';
import { cn } from '@/utils';


export type BunzlDropdownMenuAlign = 'start' | 'center' | 'end';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  align: BunzlDropdownMenuAlign;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export interface BunzlDropdownMenuProps {
  /** Children (Trigger and Content) */
  children: ReactNode;
  /** Alignment of dropdown */
  align?: BunzlDropdownMenuAlign;
}

export const BunzlDropdownMenu = ({ children, align = 'end' }: BunzlDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

//  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, align }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

BunzlDropdownMenu.displayName = 'BunzlDropdownMenu';

// Trigger
export interface BunzlDropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const BunzlDropdownMenuTrigger = forwardRef<HTMLButtonElement, BunzlDropdownMenuTriggerProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('BunzlDropdownMenuTrigger must be used within BunzlDropdownMenu');

    const { isOpen, setIsOpen } = context;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BunzlDropdownMenuTrigger.displayName = 'BunzlDropdownMenuTrigger';

// Content
export interface BunzlDropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of dropdown */
  width?: string | number;
}

const alignStyles: Record<BunzlDropdownMenuAlign, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
};

export const BunzlDropdownMenuContent = forwardRef<HTMLDivElement, BunzlDropdownMenuContentProps>(
  ({ children, className, width, style, ...props }, ref) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('BunzlDropdownMenuContent must be used within BunzlDropdownMenu');

    const { isOpen, align } = context;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          'absolute z-50 mt-1 min-w-[160px] overflow-hidden rounded-md bg-white py-1 shadow-lg',
          'ring-1 ring-black ring-opacity-5',
          'dark:bg-secondary-800 dark:ring-secondary-700',
          'animate-in fade-in-0 zoom-in-95',
          alignStyles[align],
          className
        )}
        style={{ width, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BunzlDropdownMenuContent.displayName = 'BunzlDropdownMenuContent';

// Item
export interface BunzlDropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Disabled state */
  disabled?: boolean;
  /** Destructive/danger item */
  destructive?: boolean;
  /** Icon element */
  icon?: ReactNode;
}

export const BunzlDropdownMenuItem = forwardRef<HTMLDivElement, BunzlDropdownMenuItemProps>(
  ({ children, className, disabled, destructive, icon, onClick, ...props }, ref) => {
    const context = useContext(DropdownContext);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      context?.setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        className={cn(
          'flex items-center px-3 py-2 text-sm cursor-pointer',
          'transition-colors duration-150',
          disabled
            ? 'cursor-not-allowed opacity-50'
            : destructive
            ? 'text-error hover:bg-error/10 dark:text-error-light dark:hover:bg-error/20'
            : 'text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700',
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
        {children}
      </div>
    );
  }
);

BunzlDropdownMenuItem.displayName = 'BunzlDropdownMenuItem';

// Separator
export interface BunzlDropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export const BunzlDropdownMenuSeparator = forwardRef<HTMLDivElement, BunzlDropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('my-1 h-px bg-secondary-200 dark:bg-secondary-700', className)}
      {...props}
    />
  )
);

BunzlDropdownMenuSeparator.displayName = 'BunzlDropdownMenuSeparator';

// Label (for grouping)
export interface BunzlDropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {}

export const BunzlDropdownMenuLabel = forwardRef<HTMLDivElement, BunzlDropdownMenuLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-3 py-2 text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

BunzlDropdownMenuLabel.displayName = 'BunzlDropdownMenuLabel';
