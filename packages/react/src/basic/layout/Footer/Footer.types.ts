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
export type FooterVariant =
  | "default"
  | "minimal"
  | "bordered"
  | "modern"
  | "elegant"
  | "accent";

/**
 * Footer column for structured layout
 */
export interface FooterColumn {
  /**
   * Column title
   */
  title?: string;

  /**
   * Column links or content
   */
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;

  /**
   * Custom content (alternative to links)
   */
  content?: ReactNode;
}

/**
 * Social link definition
 */
export interface SocialLink {
  /**
   * Social network name
   */
  name: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Icon name (from @spexop/icons)
   */
  icon?: string;

  /**
   * ARIA label
   */
  label?: string;
}

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
   * - default: Standard footer with top border
   * - minimal: Transparent with no decorations
   * - bordered: Full border with secondary background
   * - modern: Contemporary with subtle gradient
   * - elegant: Refined with enhanced typography
   * - accent: Bold with primary color accents
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
   * Padding on all sides (shorthand alias)
   * @default undefined
   * @responsive
   */
  paddingAll?: ResponsiveProp<SpacingScale>;

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

  /**
   * Vertical padding (top and bottom)
   * Shorthand for setting both paddingTop and paddingBottom
   * @default undefined
   * @responsive
   */
  paddingY?: ResponsiveProp<SpacingScale>;

  /**
   * Horizontal padding (left and right)
   * Shorthand for setting both paddingLeft and paddingRight
   * @default undefined
   * @responsive
   */
  paddingX?: ResponsiveProp<SpacingScale>;

  /**
   * Top margin
   * @default undefined
   * @responsive
   */
  marginTop?: ResponsiveProp<SpacingScale>;

  /**
   * Bottom margin
   * @default undefined
   * @responsive
   */
  marginBottom?: ResponsiveProp<SpacingScale>;

  /**
   * Left margin
   * @default undefined
   * @responsive
   */
  marginLeft?: ResponsiveProp<SpacingScale>;

  /**
   * Right margin
   * @default undefined
   * @responsive
   */
  marginRight?: ResponsiveProp<SpacingScale>;

  /**
   * Vertical margin (top and bottom)
   * Shorthand for setting both marginTop and marginBottom
   * @default undefined
   * @responsive
   */
  marginY?: ResponsiveProp<SpacingScale>;

  /**
   * Horizontal margin (left and right)
   * Shorthand for setting both marginLeft and marginRight
   * @default undefined
   * @responsive
   */
  marginX?: ResponsiveProp<SpacingScale>;

  // === Custom Styling ===

  /**
   * Custom background color (CSS color value)
   * Overrides variant background color if provided
   * @example backgroundColor="#ffffff"
   * @example backgroundColor="var(--theme-surface)"
   */
  backgroundColor?: string;

  /**
   * Custom text color (CSS color value)
   * @example textColor="#1f2937"
   * @example textColor="var(--theme-text)"
   */
  textColor?: string;

  /**
   * Custom link color (CSS color value)
   * @example linkColor="#3b82f6"
   * @example linkColor="var(--theme-primary)"
   */
  linkColor?: string;

  /**
   * Custom border color (CSS color value)
   * @example borderColor="#e5e7eb"
   * @example borderColor="var(--theme-border)"
   */
  borderColor?: string;

  /**
   * Border width (CSS value)
   * Overrides default theme border width if provided
   * @example borderWidth="1px"
   * @example borderWidth="2px"
   */
  borderWidth?: string;

  /**
   * Border radius (CSS value)
   * @example borderRadius="8px"
   * @example borderRadius="var(--theme-radius-lg)"
   */
  borderRadius?: string;

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
   * Footer content (for custom layouts, takes precedence over structured props)
   */
  children?: ReactNode;

  /**
   * Footer columns for structured layout
   * Only used if children is not provided
   */
  columns?: FooterColumn[];

  /**
   * Copyright text
   * Only used if children is not provided
   */
  copyright?: string | ReactNode;

  /**
   * Social media links
   * Only used if children is not provided
   */
  socialLinks?: SocialLink[];

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;
}
