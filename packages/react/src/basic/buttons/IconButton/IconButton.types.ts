import type {
  ComponentType,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

/**
 * Icon component props interface
 * Defines the expected shape of icon components from @spexop/icons
 */
export interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * Icon component type
 * Note: Using ComponentType to handle React 18/19 compatibility
 * @spexop/icons uses React 18, this project uses React 19
 */
type IconComponent = ComponentType<IconProps>;

/**
 * IconButton variant types
 */
export type IconButtonVariant =
  | "ghost" // Transparent with hover (default)
  | "solid" // Filled background
  | "outline" // Border with transparent background
  | "primary" // Primary brand color
  | "secondary" // Secondary brand color
  | "danger" // Destructive actions (red)
  | "success" // Positive actions (green)
  | "warning" // Caution actions (yellow/orange)
  | "info" // Informational actions (blue)
  | "neutral"; // Cancel/secondary actions (gray)

/**
 * IconButton size variants
 */
export type IconButtonSize =
  | "sm" // Small: 36x36px
  | "md" // Medium: 44x44px (default)
  | "lg" // Large: 52x52px
  | "compactSm" // Compact small: 32x32px
  | "compactMd"; // Compact medium: 36x36px

/**
 * IconButton type attribute
 */
export type IconButtonType = "button" | "submit" | "reset";

/**
 * IconButton loading state
 */
export interface LoadingState {
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Loading spinner size */
  spinnerSize?: number;
  /** Loading text for screen readers */
  loadingText?: string;
}

/**
 * IconButton accessibility props
 */
export interface AccessibilityProps {
  /** ARIA label for screen readers */
  "aria-label"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
  /** ARIA expanded state */
  "aria-expanded"?: boolean;
  /** ARIA pressed state */
  "aria-pressed"?: boolean;
  /** ARIA controls */
  "aria-controls"?: string;
  /** ARIA live region */
  "aria-live"?: "off" | "polite" | "assertive";
}

/**
 * IconButton interaction props
 */
export interface InteractionProps {
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Keyboard event handler */
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Mouse enter handler */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Mouse leave handler */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * IconButton main props interface
 */
export interface IconButtonProps
  extends AccessibilityProps,
    InteractionProps,
    LoadingState {
  /** Icon component from @spexop/icons or SVG string (legacy) */
  icon: IconComponent | string;
  /** Accessible label (for aria-label and title) - required for accessibility */
  label: string;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Size variant */
  size?: IconButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Button type */
  type?: IconButtonType;
  /** Custom icon size in pixels */
  iconSize?: number;
  /** Custom stroke width for icon */
  strokeWidth?: number;
  /** Custom color for icon */
  iconColor?: string;
  /** Whether to show ripple effect on click */
  ripple?: boolean;
  /** Whether to show press animation */
  pressAnimation?: boolean;
  /** Custom data attributes */
  "data-testid"?: string;
  /** Custom data attributes */
  "data-variant"?: string;
  /** Custom data attributes */
  "data-size"?: string;
  /** Tooltip content */
  tooltip?: string;
  /** Tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Whether the button is currently pressed */
  pressed?: boolean;
  /** Whether the button is currently focused */
  focused?: boolean;
  /** Custom children (for advanced use cases) */
  children?: ReactNode;
}
