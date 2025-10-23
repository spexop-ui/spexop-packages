/**
 * Snackbar Types
 *
 * Type definitions for the Snackbar component following "The Spexop Way":
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliance
 * - Clear, semantic type definitions with proper defaults
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface SnackbarProps {
  /** Snackbar message content */
  message: React.ReactNode;

  /** Snackbar variant for semantic meaning */
  variant?: "info" | "success" | "warning" | "error";

  /** Action button configuration */
  action?: {
    label: string;
    onClick: () => void;
  };

  /** Whether the snackbar is visible */
  isVisible?: boolean;

  /** Auto-hide duration in milliseconds (0 = no auto-hide) */
  autoHideDuration?: number;

  /** Position of the snackbar */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  /** Callback when snackbar closes */
  onClose?: () => void;

  /** Additional CSS class */
  className?: string;

  /** ARIA label for accessibility */
  "aria-label"?: string;

  /** Whether to show close button */
  showCloseButton?: boolean;

  /** Animation type */
  animation?: "slide" | "fade" | "scale" | "none";

  /** Whether to render in portal */
  portal?: boolean;
}
