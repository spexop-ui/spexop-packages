import type { CSSProperties, ElementType, ReactNode } from "react";
import type { ResponsiveProp } from "../../../hooks/index.js";
import type { SpacingScale } from "../types.js";

/**
 * Grid alignment options
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 */
export type GridAlign = "start" | "center" | "end" | "stretch";

/**
 * Grid justify options (horizontal distribution of columns)
 */
export type GridJustify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly";

/**
 * Grid column modes
 */
export type GridColumns =
  | number
  | ResponsiveProp<number>
  | "auto-fit"
  | "auto-fill";

/**
 * Grid component props
 */
export interface GridProps {
  /**
   * Grid items
   */
  children?: ReactNode;

  /**
   * Number of columns or auto-fit/auto-fill mode
   * @default 12
   */
  columns?: GridColumns;

  /**
   * Gap between all grid items (maps to --s-spacing-* tokens)
   * @default 4
   */
  gap?: ResponsiveProp<SpacingScale>;

  /**
   * Gap between rows (overrides gap for rows)
   */
  rowGap?: ResponsiveProp<SpacingScale>;

  /**
   * Gap between columns (overrides gap for columns)
   */
  columnGap?: ResponsiveProp<SpacingScale>;

  /**
   * Named grid areas for semantic layouts
   * @example ["header header", "sidebar content", "footer footer"]
   */
  areas?: string[];

  /**
   * Enable fluid column sizing with clamp()
   * @default false
   */
  fluid?: boolean;

  /**
   * Minimum column width for auto-fit/auto-fill grids
   * @default "250px"
   */
  minColumnWidth?: ResponsiveProp<string>;

  /**
   * Maximum column width for auto-fit/auto-fill grids
   */
  maxColumnWidth?: ResponsiveProp<string>;

  /**
   * Vertical alignment of grid items
   * @default "stretch"
   */
  align?: GridAlign;

  /**
   * Horizontal distribution of grid columns (use "center" to center grid, "space-between" to distribute)
   * @default "start"
   */
  justify?: GridJustify;

  /**
   * Enable container queries (progressive enhancement)
   * @default false
   */
  container?: boolean;

  /**
   * Use CSS subgrid for nested layouts
   * @default false
   */
  subgrid?: boolean;

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
