import type { CSSProperties, ElementType, ReactNode } from "react";
import type { ResponsiveProp } from "../../../hooks/index.js";
import type { ContainerMaxWidth } from "../../primitives/Container/Container.types.js";
import type { SpacingScale } from "../../primitives/types.js";

/**
 * Semantic spacing variants for improved developer experience
 */
export type SpacingVariant = "none" | "sm" | "md" | "lg" | "xl";

/**
 * PageLayout component props
 */
export interface PageLayoutProps {
  /**
   * Page content
   */
  children?: ReactNode;

  /**
   * Maximum width of page container
   * @default "page" (1600px)
   */
  maxWidth?: ContainerMaxWidth;

  /**
   * Padding around content
   * Accepts both semantic string variants ('lg') or numeric SpacingScale (8)
   * String variants map to responsive padding:
   * - 'none' → 0 (0px)
   * - 'sm' → 4 (16px)
   * - 'md' → 6 (24px)
   * - 'lg' → 8 (40px base, responsive 24px→40px→64px)
   * - 'xl' → 10 (64px)
   * @default "lg"
   */
  padding?: SpacingScale | SpacingVariant | ResponsiveProp<SpacingScale>;

  /**
   * Center container horizontally
   * @default true
   */
  centered?: boolean;

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
