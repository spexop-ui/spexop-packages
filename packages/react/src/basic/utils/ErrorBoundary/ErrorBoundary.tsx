/**
 * ErrorBoundary - React error boundary component
 *
 * A refined error boundary component following "The Spexop Way":
 * - Borders before shadows (strong 2-3px borders)
 * - Typography before decoration (font weight for hierarchy)
 * - High contrast (WCAG AAA compliance)
 * - Token-based design (no magic numbers)
 * - Accessibility-first (ARIA support, keyboard navigation)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   variant="minimal"
 *   onError={(error, errorInfo) => logError(error, errorInfo)}
 * >
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */

import { AlertCircle, ChevronDown, RotateCcw } from "@spexop/icons";
import { Component } from "react";
import type { ErrorInfo as ReactErrorInfo } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./ErrorBoundary.module.css";
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorInfo,
} from "./ErrorBoundary.types.js";

/**
 * ErrorBoundary Component
 * Catches JavaScript errors in child components and displays fallback UI
 * @version 1.0.0
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      detailsVisible: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ReactErrorInfo): void {
    // Convert React's ErrorInfo to our ErrorInfo type
    const info: ErrorInfo = {
      componentStack: errorInfo.componentStack || "",
      digest: (errorInfo as { digest?: string }).digest,
    };

    // Update state with error details
    this.setState({
      errorInfo: info,
    });

    // Call the onError callback if provided
    this.props.onError?.(error, info);

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error);
      console.error("Component Stack:", info.componentStack);
    }
  }

  handleReset = (): void => {
    // Reset state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      detailsVisible: false,
    });

    // Call the onReset callback if provided
    this.props.onReset?.();
  };

  handleToggleDetails = (): void => {
    this.setState((prevState) => ({
      detailsVisible: !prevState.detailsVisible,
    }));
  };

  handleKeyDown = (event: React.KeyboardEvent, callback: () => void): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  renderDefaultFallback(): React.ReactNode {
    const { error, errorInfo, detailsVisible } = this.state;
    const {
      variant = "default",
      enableReset = true,
      showDetails = false,
      errorTitle = "Something went wrong",
      errorMessage = "An unexpected error occurred. Please try again.",
      resetLabel = "Try Again",
      toggleDetailsLabel = "Show Details",
      hideDetailsLabel = "Hide Details",
      className,
      "aria-label": ariaLabel,
    } = this.props;

    const isMinimal = variant === "minimal";
    const isInline = variant === "inline";

    return (
      <div
        className={cn(
          styles.errorBoundary,
          isMinimal && styles["errorBoundary--minimal"],
          isInline && styles["errorBoundary--inline"],
          className,
        )}
        role="alert"
        aria-live="assertive"
        aria-label={ariaLabel || "Error occurred"}
      >
        <div className={styles.content}>
          {/* Icon */}
          <div className={styles.iconWrapper}>
            <AlertCircle
              className={styles.icon}
              size={32}
              strokeWidth={2.5}
              color="currentColor"
            />
          </div>

          {/* Error Message */}
          <div className={styles.messageWrapper}>
            <h2 className={styles.title}>{errorTitle}</h2>
            <p className={styles.message}>{errorMessage}</p>

            {/* Error Name */}
            {!isMinimal && error && (
              <p className={styles.errorName}>
                <strong>Error:</strong> {error.name || "Error"}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {enableReset && (
              <button
                type="button"
                className={cn(styles.btn, styles["btn--primary"])}
                onClick={this.handleReset}
                onKeyDown={(e) => this.handleKeyDown(e, this.handleReset)}
                aria-label={resetLabel}
              >
                <RotateCcw
                  className={styles.btnIcon}
                  size={16}
                  strokeWidth={2}
                  color="currentColor"
                />
                {resetLabel}
              </button>
            )}

            {showDetails && !isMinimal && error && (
              <button
                type="button"
                className={styles.btn}
                onClick={this.handleToggleDetails}
                onKeyDown={(e) =>
                  this.handleKeyDown(e, this.handleToggleDetails)
                }
                aria-label={
                  detailsVisible ? hideDetailsLabel : toggleDetailsLabel
                }
                aria-expanded={detailsVisible}
              >
                <ChevronDown
                  className={cn(
                    styles.btnIcon,
                    detailsVisible && styles["btnIcon--rotated"],
                  )}
                  size={16}
                  strokeWidth={2}
                  color="currentColor"
                />
                {detailsVisible ? hideDetailsLabel : toggleDetailsLabel}
              </button>
            )}
          </div>

          {/* Error Details */}
          {showDetails && detailsVisible && !isMinimal && (
            <div className={styles.details}>
              {/* Error Message */}
              {error?.message && (
                <div className={styles.detailSection}>
                  <h3 className={styles.detailTitle}>Error Message</h3>
                  <pre className={styles.detailContent}>{error.message}</pre>
                </div>
              )}

              {/* Stack Trace */}
              {error?.stack && (
                <div className={styles.detailSection}>
                  <h3 className={styles.detailTitle}>Stack Trace</h3>
                  <pre className={styles.detailContent}>{error.stack}</pre>
                </div>
              )}

              {/* Component Stack */}
              {errorInfo?.componentStack && (
                <div className={styles.detailSection}>
                  <h3 className={styles.detailTitle}>Component Stack</h3>
                  <pre className={styles.detailContent}>
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        if (typeof fallback === "function") {
          // Only call function fallback if error exists
          if (this.state.error) {
            return fallback(
              this.state.error,
              this.state.errorInfo || { componentStack: "" },
            );
          }
          // If no error, use default fallback
          return this.renderDefaultFallback();
        }
        // Static fallback
        return fallback;
      }

      // Use default fallback
      return this.renderDefaultFallback();
    }

    // No error, render children normally
    return children;
  }
}
