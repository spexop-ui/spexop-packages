/**
 * Popover Types
 *
 * Type definitions for the Popover component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactElement;

  /** Popover content */
  children?: React.ReactNode;

  /** Popover title */
  title?: React.ReactNode;

  /** Placement */
  placement?: "top" | "right" | "bottom" | "left";

  /** Whether popover is open (controlled) */
  isOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Trigger type */
  triggerType?: "click" | "hover";

  /** Whether to show arrow */
  showArrow?: boolean;

  /** Additional CSS class for popover */
  className?: string;

  /** Additional CSS class for trigger */
  triggerClassName?: string;
}
