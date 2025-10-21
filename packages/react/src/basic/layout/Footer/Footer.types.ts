import type { CSSProperties, ReactNode } from "react";

/**
 * Spacing scale (design tokens 0-10)
 */
export type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Breakpoints for responsive props
 */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Responsive prop pattern
 */
export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Footer visual variants
 */
export type FooterVariant = "default" | "minimal" | "bordered";

/**
 * Props for the Footer component
 */
export interface FooterProps {
  // === Layout ===

  /**
   * HTML element to render
   * @default 'footer'
   */
  as?: "footer" | "div" | "section";

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: FooterVariant;

  // === Spacing (Token-based: 0-10) ===

  /**
   * Padding on all sides (0-10 scale)
   * @default undefined
   * @responsive
   * @example padding={6} // 24px all sides
   * @example padding={{ xs: 4, md: 6, lg: 8 }}
   */
  padding?: ResponsiveProp<SpacingScale>;

  /**
   * Padding top override
   * @default undefined
   * @responsive
   */
  paddingTop?: ResponsiveProp<SpacingScale>;

  /**
   * Padding bottom override
   * @default undefined
   * @responsive
   */
  paddingBottom?: ResponsiveProp<SpacingScale>;

  /**
   * Padding left override
   * @default undefined
   * @responsive
   */
  paddingLeft?: ResponsiveProp<SpacingScale>;

  /**
   * Padding right override
   * @default undefined
   * @responsive
   */
  paddingRight?: ResponsiveProp<SpacingScale>;

  // === Visual Modifiers ===

  /**
   * Show border (all sides)
   * @default false
   */
  withBorder?: boolean;

  /**
   * Apply background color
   * @default true
   */
  withBackground?: boolean;

  // === Accessibility ===

  /**
   * ARIA label for footer
   * @default undefined
   * @example "Site footer"
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this footer
   * @default undefined
   */
  "aria-labelledby"?: string;

  // === Composition ===

  /**
   * Footer content
   */
  children?: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;
}
