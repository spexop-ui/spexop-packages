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
  | "medium" // 500
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
  | "warning" // Warning state (yellow/orange)
  | "info"; // Info state (blue)

/**
 * Text decoration options
 */
export type TextDecoration = "none" | "underline" | "line-through";

/**
 * Text transform options
 */
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

/**
 * Text overflow options
 */
export type TextOverflow = "clip" | "ellipsis" | "string";

/**
 * White space options
 */
export type WhiteSpace = "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";

/**
 * Text component props
 */
export interface TextProps
  extends Omit<
    HTMLAttributes<
      HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLLabelElement
    >,
    "className" | "style"
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
  as?: "p" | "span" | "div" | "label" | "strong" | "em" | "small" | "mark";

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
   * @default undefined
   */
  clamp?: 1 | 2 | 3 | 4 | 5;

  /**
   * Text decoration
   * @default 'none'
   */
  decoration?: TextDecoration;

  /**
   * Text transform
   * @default 'none'
   */
  transform?: TextTransform;

  /**
   * Text overflow behavior
   * @default 'clip'
   */
  overflow?: TextOverflow;

  /**
   * White space handling
   * @default 'normal'
   */
  whiteSpace?: WhiteSpace;

  /**
   * Custom line height
   * @default undefined (uses theme default)
   */
  lineHeight?: number;

  /**
   * Letter spacing
   * @default undefined (uses theme default)
   */
  letterSpacing?: number;

  /**
   * Word spacing
   * @default undefined (uses theme default)
   */
  wordSpacing?: number;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;

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

  /**
   * ARIA atomic
   */
  "aria-atomic"?: boolean;

  /**
   * ARIA relevant
   */
  "aria-relevant"?:
    | "additions"
    | "additions removals"
    | "additions text"
    | "all"
    | "removals"
    | "text";

  /**
   * Role for screen readers
   */
  role?: string;

  /**
   * Tab index for keyboard navigation
   * @default -1 (not focusable by default)
   */
  tabIndex?: number;
}
