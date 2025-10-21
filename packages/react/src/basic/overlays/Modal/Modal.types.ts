/**
 * Modal Types
 *
 * Type definitions for the Modal component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;

  /** Callback when modal should close */
  onClose: () => void;

  /** Modal title */
  title?: React.ReactNode;

  /** Modal content */
  children?: React.ReactNode;

  /** Footer content (typically buttons) */
  footer?: React.ReactNode;

  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl" | "full";

  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;

  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;

  /** Whether to show close button */
  showCloseButton?: boolean;

  /** Additional CSS class for modal */
  className?: string;

  /** Additional CSS class for backdrop */
  backdropClassName?: string;

  /** ID for accessibility */
  id?: string;

  /** Initial focus element ref */
  initialFocusRef?: React.RefObject<HTMLElement>;

  /** Whether to prevent body scroll when modal is open */
  preventBodyScroll?: boolean;
}
