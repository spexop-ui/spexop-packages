/**
 * Divider Types
 *
 * Type definitions for the Divider component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface DividerProps {
  /** Orientation */
  orientation?: "horizontal" | "vertical";

  /** Label to display */
  label?: React.ReactNode;

  /** Label alignment */
  labelAlign?: "left" | "center" | "right";

  /** Visual variant */
  variant?: "solid" | "dashed" | "dotted";

  /** Thickness */
  thickness?: "thin" | "normal" | "thick";

  /** Additional CSS class */
  className?: string;

  /** ARIA role override */
  role?: string;
}
