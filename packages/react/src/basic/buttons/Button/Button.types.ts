/**
 * Button Component Types
 * Primitives-first button system with comprehensive variants
 *
 * @component Button
 * @packageName @spexop/react
 * @description Primitives-first button system with comprehensive variants
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import type { ElementType, MouseEvent, ReactNode } from "react";

/**
 * Button variant types
 */
export type ButtonVariant =
  | "primary" // Filled with primary color
  | "secondary" // Border-based, neutral
  | "outline" // Border with primary color
  | "ghost" // Transparent with hover
  | "text" // Text-only link style
  | "pill" // Rounded pill shape
  | "border-emphasis" // Bold 3px border
  | "danger" // Destructive actions (red)
  | "success" // Positive actions (green)
  | "warning" // Caution actions (yellow/orange)
  | "info" // Informational actions (blue)
  | "neutral"; // Cancel/secondary actions (gray)

/**
 * Button size variants
 */
export type ButtonSize =
  | "sm" // Small: 14px font, 8px 12px padding
  | "md" // Medium (default): 16px font, 12px 20px padding
  | "lg"; // Large: 18px font, 16px 24px padding

/**
 * Compact size variants (no-label/toolbar buttons)
 */
export type ButtonCompact =
  | "sm" // 32×32px square (icon-only)
  | "md" // 36×36px square (icon-only)
  | false; // Not compact (default)

/**
 * Text color option for button variants
 */
export type ButtonTextColor =
  | "auto" // Theme-based (dark text in light mode, light text in dark mode)
  | "light" // Always light/white text
  | "dark"; // Always dark/black text

/**
 * Border weight options (aligned with separation through borders principle)
 */
export type ButtonBorderWeight =
  | "thin" // 1px borders (ultra minimal, subtle)
  | "normal" // 2px borders (default)
  | "thick"; // 4px borders (strong emphasis)

/**
 * Border style options for visual hierarchy
 */
export type ButtonBorderStyle =
  | "solid" // Solid border (default)
  | "dashed" // Dashed border
  | "dotted"; // Dotted border

/**
 * Button component props
 * Supports polymorphic rendering via 'as' prop
 */
export interface ButtonProps {
  /**
   * Additional props (supports polymorphic element props like href, to, etc.)
   * Using any is intentional here to support polymorphic component pattern
   */
  // biome-ignore lint/suspicious/noExplicitAny: Required for polymorphic props
  [key: string]: any;
  /**
   * Render button as a different element (e.g., 'a', Link component)
   * Enables polymorphic rendering for links and custom components
   * @default 'button'
   */
  as?: ElementType;

  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Text color preference (useful for Primary, Outline, Pill variants)
   * @default 'auto'
   */
  textColor?: ButtonTextColor;

  /**
   * Border thickness (aligned with separation through borders principle)
   * @default 'normal'
   */
  borderWeight?: ButtonBorderWeight;

  /**
   * Border style for visual hierarchy
   * @default 'solid'
   */
  borderStyle?: ButtonBorderStyle;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Compact mode for toolbars/dense UIs
   * @default false
   */
  compact?: ButtonCompact;

  /**
   * Icon-only mode (square shape, requires aria-label)
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Full-width button (block display)
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Loading state (shows spinner, disables interaction)
   * @default false
   */
  loading?: boolean;

  /**
   * Button type attribute
   * @default 'button'
   */
  type?: "button" | "submit" | "reset";

  /**
   * Click handler
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Button content (text, icons, or both)
   */
  children?: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  // Accessibility props

  /**
   * ARIA label (required when iconOnly={true})
   */
  "aria-label"?: string;

  /**
   * ARIA pressed state (for toggle buttons)
   */
  "aria-pressed"?: boolean | "true" | "false" | "mixed";

  /**
   * ARIA expanded state (for buttons that control expandable content)
   */
  "aria-expanded"?: boolean | "true" | "false";

  /**
   * ARIA controls (ID of element controlled by button)
   */
  "aria-controls"?: string;

  /**
   * ARIA described by (ID of element describing button)
   */
  "aria-describedby"?: string;

  /**
   * ARIA has popup (for buttons that open menus/dialogs)
   */
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
}
