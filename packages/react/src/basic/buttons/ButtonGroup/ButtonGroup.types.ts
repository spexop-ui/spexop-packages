/**
 * ButtonGroup Component Types
 * Modern button grouping with enhanced accessibility
 *
 * @component ButtonGroup
 * @packageName @spexop/react
 * @description Container for grouped buttons with shared borders
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.3.0
 * @since 2025-10-13
 * @updated 2025-01-20 - Enhanced accessibility and modern features
 *
 */

import type { AriaRole, HTMLAttributes, KeyboardEvent, ReactNode } from "react";

/**
 * Button group direction
 */
export type ButtonGroupDirection =
  | "horizontal" // Default: buttons in a row
  | "vertical"; // Buttons stacked vertically

/**
 * ButtonGroup component props with enhanced accessibility
 */
export interface ButtonGroupProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | "role"
    | "aria-label"
    | "aria-labelledby"
    | "aria-describedby"
    | "aria-orientation"
  > {
  /**
   * Button elements to group
   */
  children?: ReactNode;

  /**
   * Layout direction
   * @default 'horizontal'
   */
  direction?: ButtonGroupDirection;

  /**
   * Compact mode (smaller padding for toolbar use)
   * @default false
   */
  compact?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  // Enhanced Accessibility props

  /**
   * ARIA role
   * @default 'group'
   */
  role?: AriaRole;

  /**
   * ARIA label describing the button group (REQUIRED)
   */
  "aria-label": string;

  /**
   * ARIA labelled by (alternative to aria-label)
   */
  "aria-labelledby"?: string;

  /**
   * ARIA described by (for additional context)
   */
  "aria-describedby"?: string;

  /**
   * ARIA orientation (auto-set based on direction)
   */
  "aria-orientation"?: "horizontal" | "vertical";

  /**
   * Enhanced keyboard event handler
   */
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}
