/**
 * Link Component Types
 * General-purpose link component with variants and accessibility
 *
 * @component Link
 * @packageName @spexop/react
 * @description General-purpose link component with variants and accessibility
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Link variant types
 */
export type LinkVariant =
  | "text" // Text-only link with underline on hover
  | "ghost" // Transparent with hover background
  | "outline" // Border-based link style
  | "secondary" // Subtle bordered style
  | "primary"; // Primary colored link

/**
 * Link size variants
 */
export type LinkSize =
  | "sm" // Small: 14px font
  | "md" // Medium (default): 16px font
  | "lg"; // Large: 18px font

/**
 * Link component props
 */
export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  /**
   * URL to navigate to
   */
  href: string;

  /**
   * Link content (text, icons, or both)
   */
  children?: ReactNode;

  /**
   * Visual style variant
   * @default 'text'
   */
  variant?: LinkVariant;

  /**
   * Link size
   * @default 'md'
   */
  size?: LinkSize;

  /**
   * Whether this link represents the current page
   * @default false
   */
  active?: boolean;

  /**
   * Whether the link should take full width of container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * External link (opens in new tab with security)
   * @default false
   */
  external?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  // Accessibility props

  /**
   * ARIA label for links without clear text
   */
  "aria-label"?: string;

  /**
   * ARIA current state (for navigation)
   */
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | boolean;

  /**
   * ARIA described by (ID of element describing link)
   */
  "aria-describedby"?: string;
}
