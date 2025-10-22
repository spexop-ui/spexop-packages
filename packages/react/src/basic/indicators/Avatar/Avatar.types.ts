/**
 * Avatar Types
 *
 * Type definitions for the Avatar component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface AvatarProps {
  /** User name (used for initials and alt text) */
  name?: string;

  /** Image source */
  src?: string;

  /** Image alt text (defaults to name) */
  alt?: string;

  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /** Shape variant */
  shape?: "circle" | "square";

  /** Status indicator */
  status?: "online" | "offline" | "away" | "busy";

  /** Whether to show status indicator */
  showStatus?: boolean;

  /** Fallback icon when no image or name */
  fallbackIcon?: React.ReactNode;

  /** Additional CSS class */
  className?: string;

  /** Click handler */
  onClick?: () => void;
}
