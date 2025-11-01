/**
 * NavLink Component Types
 * Enhanced navigation link with extensive customization options
 *
 * @component NavLink
 * @packageName @spexop/react
 * @description Enhanced navigation link for sidebar navigation with full customization
 * @author @spexop-ui | github.com/spexop-ui |  @olmstedian | github.com/olmstedian
 * @version 0.2.0
 * @since 2025-10-13
 */

import type { MouseEvent, ReactNode } from "react";

/**
 * Size variants for NavLink
 */
export type NavLinkSize = "sm" | "md" | "lg";

/**
 * Visual variant styles
 */
export type NavLinkVariant = "default" | "minimal" | "highlighted" | "outlined";

/**
 * Hover effect styles
 */
export type NavLinkHoverEffect =
  | "background"
  | "underline"
  | "scale"
  | "slide"
  | "glow"
  | "none";

/**
 * Font weight options
 */
export type NavLinkFontWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Font size options
 */
export type NavLinkFontSize = "xs" | "sm" | "base" | "lg";

/**
 * Animation easing functions
 */
export type NavLinkEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "cubic-bezier";

export interface NavLinkProps {
  /**
   * Link destination URL
   */
  href: string;

  /**
   * Link content (text or elements)
   */
  children?: ReactNode;

  /**
   * Whether this link is currently active
   * @default false
   */
  active?: boolean;

  /**
   * Whether this link is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler for custom navigation logic
   */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Size variant (controls height and padding)
   * @default "md"
   */
  size?: NavLinkSize;

  /**
   * Visual variant style
   * @default "default"
   */
  variant?: NavLinkVariant;

  /**
   * Hover effect style
   * @default "background"
   */
  hoverEffect?: NavLinkHoverEffect;

  /**
   * Custom height (overrides size)
   */
  height?: string | number;

  /**
   * Font size
   * @default "sm"
   */
  fontSize?: NavLinkFontSize;

  /**
   * Font weight
   * @default "medium"
   */
  fontWeight?: NavLinkFontWeight;

  /**
   * Active font weight (overrides fontWeight when active)
   */
  activeFontWeight?: NavLinkFontWeight;

  /**
   * Text color (CSS color value)
   */
  color?: string;

  /**
   * Active state text color
   */
  activeColor?: string;

  /**
   * Hover state text color
   */
  hoverColor?: string;

  /**
   * Disabled state text color
   */
  disabledColor?: string;

  /**
   * Background color (CSS color value)
   */
  backgroundColor?: string;

  /**
   * Active state background color
   */
  activeBackgroundColor?: string;

  /**
   * Hover state background color
   */
  hoverBackgroundColor?: string;

  /**
   * Border color
   */
  borderColor?: string;

  /**
   * Active border color
   */
  activeBorderColor?: string;

  /**
   * Border width (CSS value)
   * @default "3px"
   */
  borderWidth?: string;

  /**
   * Active border width
   * @default "4px"
   */
  activeBorderWidth?: string;

  /**
   * Border position
   * @default "left"
   */
  borderPosition?: "left" | "right" | "top" | "bottom" | "all";

  /**
   * Icon to display before the link text
   */
  icon?: ReactNode;

  /**
   * Icon to display after the link text
   */
  iconRight?: ReactNode;

  /**
   * Badge or count to display
   */
  badge?: ReactNode;

  /**
   * Badge position
   * @default "right"
   */
  badgePosition?: "left" | "right";

  /**
   * Transition duration in milliseconds
   * @default 150
   */
  transitionDuration?: number;

  /**
   * Transition easing function
   * @default "ease"
   */
  transitionEasing?: NavLinkEasing;

  /**
   * Padding (CSS value or spacing token)
   * If not provided, uses size-based padding
   */
  padding?: string | number;

  /**
   * Padding top
   */
  paddingTop?: string | number;

  /**
   * Padding bottom
   */
  paddingBottom?: string | number;

  /**
   * Padding left
   */
  paddingLeft?: string | number;

  /**
   * Padding right
   */
  paddingRight?: string | number;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA current state
   */
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | boolean;
}
