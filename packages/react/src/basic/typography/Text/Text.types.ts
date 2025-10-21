/**
 * Text Component Types
 * Paragraph and body text with typography control
 *
 * @component Text
 * @packageName @spexop/react
 * @description Paragraph and body text component
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Text size variants
 */
export type TextSize =
  | "xs" // 12px
  | "sm" // 14px
  | "base" // 16px (default)
  | "lg" // 18px
  | "xl" // 20px
  | "2xl" // 24px
  | "3xl" // 30px
  | "4xl"; // 36px

/**
 * Text weight variants
 */
export type TextWeight =
  | "regular" // 400 (default)
  | "semibold" // 600
  | "bold"; // 700

/**
 * Text alignment options
 */
export type TextAlign = "left" | "center" | "right" | "justify";

/**
 * Text variant for semantic meaning
 */
export type TextVariant =
  | "default" // Default text color
  | "secondary" // Secondary/muted text
  | "success" // Success state (green)
  | "error" // Error state (red)
  | "warning"; // Warning state (yellow/orange)

/**
 * Text component props
 */
export interface TextProps
  extends Omit<
    HTMLAttributes<
      HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLLabelElement
    >,
    "className"
  > {
  /**
   * Text content
   */
  children?: ReactNode;

  /**
   * Font size
   * @default 'base'
   */
  size?: TextSize;

  /**
   * Font weight
   * @default 'regular'
   */
  weight?: TextWeight;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: TextAlign;

  /**
   * Semantic variant for color
   * @default 'default'
   */
  variant?: TextVariant;

  /**
   * Render as different element
   * @default 'p'
   */
  as?: "p" | "span" | "div" | "label";

  /**
   * Remove margin
   * @default false
   */
  noMargin?: boolean;

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Number of lines to clamp (for multi-line truncation)
   */
  clamp?: number;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Custom ID
   */
  id?: string;

  // Accessibility props

  /**
   * ARIA label
   */
  "aria-label"?: string;

  /**
   * ARIA live region
   */
  "aria-live"?: "polite" | "assertive" | "off";

  /**
   * ARIA described by
   */
  "aria-describedby"?: string;
}
