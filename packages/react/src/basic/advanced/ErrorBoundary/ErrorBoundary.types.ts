/**
 * ErrorBoundary Types
 * TypeScript type definitions for the ErrorBoundary component
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type { ReactNode } from "react";

/**
 * Error information object
 */
export interface ErrorInfo {
  /** Component stack trace */
  componentStack: string;
  /** Error digest (React 18+) */
  digest?: string;
}

/**
 * Component variants
 */
export type ErrorBoundaryVariant = "default" | "minimal" | "inline";

/**
 * Props for ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /**
   * Child components to render
   */
  children?: ReactNode;

  /**
   * Custom fallback UI to display when an error occurs
   * If not provided, uses default error UI
   */
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);

  /**
   * Component variant
   * - default: Full-featured error display with stack trace
   * - minimal: Simple error message without details
   * - inline: Compact error display for inline contexts
   * @default "default"
   */
  variant?: ErrorBoundaryVariant;

  /**
   * Callback when an error is caught
   * @param error - The error that was caught
   * @param errorInfo - Additional error information
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;

  /**
   * Callback when user clicks reset button
   */
  onReset?: () => void;

  /**
   * Enable reset functionality
   * Allows users to attempt to recover from the error
   * @default true
   */
  enableReset?: boolean;

  /**
   * Show detailed error information (stack trace, component stack)
   * Useful for development, should be disabled in production
   * @default false
   */
  showDetails?: boolean;

  /**
   * Custom error title
   * @default "Something went wrong"
   */
  errorTitle?: string;

  /**
   * Custom error message
   * @default "An unexpected error occurred. Please try again."
   */
  errorMessage?: string;

  /**
   * Custom reset button label
   * @default "Try Again"
   */
  resetLabel?: string;

  /**
   * Custom toggle details button label
   * @default "Show Details"
   */
  toggleDetailsLabel?: string;

  /**
   * Custom toggle details button label when details are shown
   * @default "Hide Details"
   */
  hideDetailsLabel?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ARIA label for the error boundary
   */
  "aria-label"?: string;
}

/**
 * Internal state for ErrorBoundary
 */
export interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error: Error | null;
  /** Additional error information */
  errorInfo: ErrorInfo | null;
  /** Whether details are currently shown */
  detailsVisible: boolean;
}
