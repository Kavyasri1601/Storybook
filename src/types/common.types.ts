import type { ReactNode } from 'react';

/**
 * Common size variants used across components
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Extended size variants including extra small and extra large
 */
export type ExtendedSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Semantic color variants for feedback components
 */
export type SemanticColor = 'info' | 'success' | 'warning' | 'error';

/**
 * Common component variants
 */
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * Props for components that can have children
 */
export interface ChildrenProps {
  children?: ReactNode;
}

/**
 * Props for components with loading state
 */
export interface LoadingProps {
  /** Whether the component is in a loading state */
  isLoading?: boolean;
}

/**
 * Props for components with disabled state
 */
export interface DisabledProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Props for components that can be full width
 */
export interface FullWidthProps {
  /** Whether the component should take full width of its container */
  fullWidth?: boolean;
}

/**
 * Base props for form elements
 */
export interface FormElementProps {
  /** The name attribute for form submission */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is read-only */
  readOnly?: boolean;
  /** Unique identifier for the element */
  id?: string;
}

/**
 * Props for form elements with validation states
 */
export interface ValidationProps {
  /** Whether the field has an error */
  hasError?: boolean;
  /** Error message to display */
  errorMessage?: string;
}

/**
 * Polymorphic component props for "as" prop support
 */
export type AsProps<T extends React.ElementType> = {
  as?: T;
};

/**
 * Merge props with polymorphic "as" support
 */
export type PolymorphicProps<T extends React.ElementType, P = object> = AsProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof AsProps<T> | keyof P> &
  P;
