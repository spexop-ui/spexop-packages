/**
 * Stack component types
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type { CSSProperties, ElementType, ReactNode } from "react";
import type { ResponsiveProp } from "../../../hooks/index.js";
import type { SpacingScale } from "../types.js";

/**
 * Stack direction
 */
export type StackDirection = "vertical" | "horizontal";

/**
 * Stack alignment options
 */
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Stack justify options
 */
export type StackJustify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly";

/**
 * Stack component props
 */
export interface StackProps {
  /**
   * Stack items
   */
  children?: ReactNode;

  /**
   * Stack direction
   * @default "vertical"
   */
  direction?: ResponsiveProp<StackDirection>;

  /**
   * Gap between stack items (maps to --s-spacing-* tokens)
   * @default 4
   */
  gap?: ResponsiveProp<SpacingScale>;

  /**
   * Cross-axis alignment
   * @default "stretch"
   */
  align?: ResponsiveProp<StackAlign>;

  /**
   * Main-axis distribution
   * @default "start"
   */
  justify?: ResponsiveProp<StackJustify>;

  /**
   * Enable wrapping
   * @default false
   */
  wrap?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;

  /**
   * HTML element type
   * @default "div"
   */
  as?: ElementType;
}
