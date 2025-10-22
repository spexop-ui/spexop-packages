/**
 * EmptyState Types
 *
 * Type definitions for the EmptyState component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface EmptyStateProps {
  /** Title */
  title: React.ReactNode;

  /** Description */
  description?: React.ReactNode;

  /** Icon or image */
  icon?: React.ReactNode;

  /** Action button(s) */
  action?: React.ReactNode;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Additional CSS class */
  className?: string;
}
