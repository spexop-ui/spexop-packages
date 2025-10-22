/**
 * Skeleton Types
 *
 * Type definitions for the Skeleton component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface SkeletonProps {
  /** Width (CSS value or preset) */
  width?: string | number;

  /** Height (CSS value or preset) */
  height?: string | number;

  /** Shape variant */
  variant?: "text" | "circular" | "rectangular";

  /** Whether to animate */
  animate?: boolean;

  /** Additional CSS class */
  className?: string;
}
