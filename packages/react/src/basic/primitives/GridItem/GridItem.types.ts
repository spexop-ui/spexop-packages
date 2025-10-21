/**
 * GridItem component props
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */
import type { CSSProperties, ElementType, ReactNode } from "react";
import type { ResponsiveProp } from "../../../hooks/index.js";

/**
 * Grid item alignment options
 */
export type GridItemAlign = "start" | "center" | "end" | "stretch";

/**
 * Grid item justify options
 */
export type GridItemJustify = "start" | "center" | "end" | "stretch";

/**
 * GridItem component props
 */
export interface GridItemProps {
  /**
   * Content of the grid item
   */
  children?: ReactNode;

  /**
   * Number of columns to span (1-24)
   * @default 1
   */
  span?: ResponsiveProp<number>;

  /**
   * Column start position (1-24)
   */
  start?: ResponsiveProp<number>;

  /**
   * Column end position (1-24)
   */
  end?: ResponsiveProp<number>;

  /**
   * Row position
   */
  row?: ResponsiveProp<number>;

  /**
   * Number of rows to span
   */
  rowSpan?: ResponsiveProp<number>;

  /**
   * Row start position
   */
  rowStart?: ResponsiveProp<number>;

  /**
   * Row end position
   */
  rowEnd?: ResponsiveProp<number>;

  /**
   * Named grid area (for use with Grid areas prop)
   */
  area?: string;

  /**
   * Vertical alignment within grid cell
   * @default "stretch"
   */
  align?: GridItemAlign;

  /**
   * Horizontal alignment within grid cell
   * @default "stretch"
   */
  justify?: GridItemJustify;

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
