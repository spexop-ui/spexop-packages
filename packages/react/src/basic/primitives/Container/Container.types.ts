import type { CSSProperties, ElementType, ReactNode } from "react";
import type { ResponsiveProp } from "../../../hooks/index.js";
import type { SpacingScale } from "../types.js";

/**
 * Container max-width options
 */
export type ContainerMaxWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

/**
 * Container component props
 */
export interface ContainerProps {
  /**
   * Container content
   */
  children?: ReactNode;

  /**
   * Maximum width of container
   * @default "xl"
   */
  maxWidth?: ResponsiveProp<ContainerMaxWidth>;

  /**
   * Padding around content (maps to --s-spacing-* tokens)
   * @default 4
   */
  padding?: ResponsiveProp<SpacingScale>;

  /**
   * Left padding (overrides padding)
   */
  paddingLeft?: ResponsiveProp<SpacingScale>;

  /**
   * Right padding (overrides padding)
   */
  paddingRight?: ResponsiveProp<SpacingScale>;

  /**
   * Top padding (overrides padding)
   */
  paddingTop?: ResponsiveProp<SpacingScale>;

  /**
   * Bottom padding (overrides padding)
   */
  paddingBottom?: ResponsiveProp<SpacingScale>;

  /**
   * Center container horizontally
   * @default true
   */
  centered?: boolean;

  /**
   * No max-width constraints (full width)
   * @default false
   */
  fluid?: boolean;

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
