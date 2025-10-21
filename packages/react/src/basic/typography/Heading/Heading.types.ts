/**
 * Heading Component Types
 * Semantic heading component with typography hierarchy
 *
 * @component Heading
 * @packageName @spexop/react
 * @description Semantic heading component with typography hierarchy
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Heading levels (h1-h6)
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Heading weight variants
 */
export type HeadingWeight =
  | "regular" // 400
  | "semibold" // 600
  | "bold"; // 700

/**
 * Heading alignment options
 */
export type HeadingAlign = "left" | "center" | "right";

/**
 * Heading size override (independent of level)
 */
export type HeadingSize =
  | "xs" // 12px
  | "sm" // 14px
  | "base" // 16px
  | "lg" // 18px
  | "xl" // 20px
  | "2xl" // 24px
  | "3xl" // 30px
  | "4xl"; // 36px

/**
 * Heading component props
 */
export interface HeadingProps {
  /**
   * Heading content
   */
  children?: ReactNode;

  /**
   * Semantic heading level (h1-h6)
   * @default 2
   */
  level?: HeadingLevel;

  /**
   * Font weight
   * @default 'bold'
   */
  weight?: HeadingWeight;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: HeadingAlign;

  /**
   * Size override (overrides default size for level)
   */
  size?: HeadingSize;

  /**
   * Margin bottom spacing
   * @default false
   */
  noMargin?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Custom ID for anchor links
   */
  id?: string;

  // Accessibility props

  /**
   * ARIA label
   */
  "aria-label"?: string;

  /**
   * ARIA described by
   */
  "aria-describedby"?: string;
}
