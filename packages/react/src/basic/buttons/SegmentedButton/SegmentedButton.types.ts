/**
 * SegmentedButton Component Types
 * Radio-style button group with exclusive selection
 *
 * @component SegmentedButton
 * @packageName @spexop/react
 * @description Radio-style button selection with keyboard navigation
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import type { ReactNode } from "react";

/**
 * Segmented button option
 */
export interface SegmentedButtonOption {
  /**
   * Unique value identifier
   */
  value: string;

  /**
   * Display label
   */
  label: string;

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
   * Optional ARIA label (overrides label for screen readers)
   */
  "aria-label"?: string;
}

/**
 * SegmentedButton size variants
 */
export type SegmentedButtonSize = "sm" | "md" | "lg";

/**
 * SegmentedButton component props (controlled component)
 */
export interface SegmentedButtonProps {
  /**
   * Current selected value (controlled)
   */
  value: string;

  /**
   * Change handler when selection changes
   */
  onChange: (value: string) => void;

  /**
   * Array of button options
   */
  options: SegmentedButtonOption[];

  /**
   * Size variant
   * @default "md"
   */
  size?: SegmentedButtonSize;

  /**
   * Full width mode
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  // Accessibility props (required)

  /**
   * ARIA label describing the button group (REQUIRED)
   */
  "aria-label": string;

  /**
   * ARIA labelled by (alternative to aria-label)
   */
  "aria-labelledby"?: string;
}
