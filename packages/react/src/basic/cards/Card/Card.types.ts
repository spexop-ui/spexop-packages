import type { HTMLAttributes, ReactNode } from "react";

/**
 * Card density variants
 * - compact: 16px padding (dashboard context)
 * - normal: 24px padding (default)
 * - spacious: 32px padding (blog/content context)
 */
export type CardDensity = "compact" | "normal" | "spacious";

/**
 * Card visual variants
 * - basic: Default 2px neutral border
 * - highlighted: 2px red border for emphasis
 * - outlined: 3px bold border for structure
 * - interactive: Hover changes border to red
 * - ghost: Dashed border for placeholders
 * - elevated: Colored background (keep for compatibility)
 * - default: Alias for 'basic' (backward compatibility)
 * - outline: Alias for 'outlined' (backward compatibility)
 */
export type CardVariant =
  | "basic"
  | "highlighted"
  | "outlined"
  | "interactive"
  | "ghost"
  | "elevated"
  | "default"
  | "outline";

/**
 * Card component props
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;

  /** Spacing density (padding scale) */
  density?: CardDensity;

  /** Transform to button element when clickable */
  clickable?: boolean;

  /** Stretch card to 100% height of container */
  fullHeight?: boolean;

  /** Card content */
  children?: ReactNode;

  /** Additional CSS class */
  className?: string;

  /** Click handler (requires clickable=true for button element) */
  onClick?: () => void;

  /** @deprecated Use density prop instead */
  size?: CardDensity;

  /** @deprecated Use CardHeader sub-component instead */
  icon?: ReactNode | string;

  /** @deprecated Use CardHeader sub-component instead */
  title?: string;

  /** @deprecated Use CardBody sub-component instead */
  description?: string;
}

/**
 * CardHeader component props
 */
export interface CardHeaderProps {
  /** Header title */
  title?: string;

  /** Optional subtitle */
  subtitle?: string;

  /** Optional badge/tag */
  badge?: ReactNode;

  /** Hide bottom border */
  noBorder?: boolean;

  /** Custom content (if not using title/subtitle) */
  children?: ReactNode;

  /** Additional CSS class */
  className?: string;
}

/**
 * CardBody component props
 */
export interface CardBodyProps {
  /** Body content */
  children?: ReactNode;

  /** Additional CSS class */
  className?: string;
}

/**
 * CardFooter component props
 */
export interface CardFooterProps {
  /** Footer content (typically buttons) */
  children?: ReactNode;

  /** Content alignment */
  align?: "left" | "center" | "right" | "between";

  /** Hide top border */
  noBorder?: boolean;

  /** Additional CSS class */
  className?: string;
}
