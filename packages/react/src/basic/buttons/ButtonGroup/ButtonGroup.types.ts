/**
 * ButtonGroup Component Types
 * Primitives-first button grouping with horizontal/vertical direction
 *
 * @component ButtonGroup
 * @packageName @spexop/react
 * @description Container for grouped buttons with shared borders
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import type { AriaRole, ReactNode } from "react";

/**
 * Button group direction
 */
export type ButtonGroupDirection =
  | "horizontal" // Default: buttons in a row
  | "vertical"; // Buttons stacked vertically

/**
 * ButtonGroup component props
 */
export interface ButtonGroupProps {
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

  // Accessibility props (required)

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
}
