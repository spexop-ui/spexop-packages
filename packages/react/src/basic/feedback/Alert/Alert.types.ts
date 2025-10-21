/**
 * Alert Types
 *
 * Type definitions for the Alert component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface AlertProps {
  /** Alert content */
  children?: React.ReactNode;

  /** Alert title */
  title?: React.ReactNode;

  /** Alert variant (semantic color) */
  variant?: "info" | "success" | "warning" | "error";

  /** Whether alert can be dismissed */
  dismissible?: boolean;

  /** Callback when alert is dismissed */
  onDismiss?: () => void;

  /** Icon to display */
  icon?: React.ReactNode;

  /** Whether to show default icon */
  showIcon?: boolean;

  /** Additional CSS class */
  className?: string;

  /** ARIA role override */
  role?: "alert" | "status" | "region";
}
