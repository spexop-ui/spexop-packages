/**
 * SplitButton Component Types
 * Button with primary action + dropdown menu
 *
 * @component SplitButton
 * @packageName @spexop/react
 * @description Split button with main action and dropdown options
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.2.0
 * @since 2025-10-13
 *
 */

import type { ReactNode } from "react";

/**
 * Split button dropdown menu item
 */
export interface SplitButtonMenuItem {
  /**
   * Display label for the menu item
   */
  label: string;

  /**
   * Unique value identifier
   */
  value: string;

  /**
   * Click handler for this option
   */
  onClick: () => void;

  /**
   * Optional icon before label
   */
  icon?: ReactNode;

  /**
   * Disabled state for this option
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional ARIA label
   */
  "aria-label"?: string;

  /**
   * Optional description text below label
   */
  description?: string;

  /**
   * Optional badge or count
   */
  badge?: string | number;

  /**
   * Optional keyboard shortcut
   */
  shortcut?: string;
}

/**
 * Split button dropdown divider
 */
export interface SplitButtonMenuDivider {
  /**
   * Type identifier for divider
   */
  type: "divider";
}

/**
 * Split button dropdown group
 */
export interface SplitButtonMenuGroup {
  /**
   * Type identifier for group
   */
  type: "group";
  /**
   * Group label
   */
  label: string;
  /**
   * Items in this group
   */
  items: SplitButtonMenuItem[];
}

/**
 * Union type for all menu items
 */
export type SplitButtonMenuOption =
  | SplitButtonMenuItem
  | SplitButtonMenuDivider
  | SplitButtonMenuGroup;

/**
 * Button variant for styling - matches Button component variants
 */
export type SplitButtonVariant =
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
export type SplitButtonSize = "sm" | "md" | "lg";

/**
 * Compact mode for dense UIs
 */
export type SplitButtonCompact = "sm" | "md";

/**
 * SplitButton component props
 */
export interface SplitButtonProps {
  /**
   * Main button label (primary action)
   */
  label: string;

  /**
   * Main button click handler
   */
  onClick: () => void;

  /**
   * Array of dropdown menu options
   */
  menuItems: SplitButtonMenuOption[];

  /**
   * Button variant
   * @default 'primary'
   */
  variant?: SplitButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: SplitButtonSize;

  /**
   * Compact mode for dense UIs
   */
  compact?: SplitButtonCompact;

  /**
   * Disabled state (affects both main button and dropdown)
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading state (shows spinner and disables interaction)
   * @default false
   */
  loading?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Optional icon for main button
   */
  icon?: ReactNode;

  /**
   * Optional loading icon (overrides default spinner)
   */
  loadingIcon?: ReactNode;

  // Accessibility props

  /**
   * ARIA label for main button (overrides label)
   */
  "aria-label"?: string;

  /**
   * ARIA label for dropdown toggle button
   * @default "Show more options"
   */
  "aria-label-toggle"?: string;

  /**
   * ARIA described by for additional context
   */
  "aria-describedby"?: string;

  /**
   * ARIA expanded state (controlled)
   */
  "aria-expanded"?: boolean;

  /**
   * ARIA controls for menu
   */
  "aria-controls"?: string;

  /**
   * ARIA live region for announcements
   */
  "aria-live"?: "off" | "polite" | "assertive";
}
