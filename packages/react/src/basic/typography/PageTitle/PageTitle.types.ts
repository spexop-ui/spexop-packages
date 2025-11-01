/**
 * PageTitle Component Types
 * Page title component with title and optional description
 *
 * @component PageTitle
 * @packageName @spexop/react
 * @description Page title with optional description/subtitle
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-01-23
 */

import type { HTMLAttributes, ReactNode } from "react";
import type { HeadingLevel } from "../Heading/Heading.types.js";
import type { HeadingSize } from "../Heading/Heading.types.js";

/**
 * PageTitle component props
 */
export interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Main title text
   */
  title: string;

  /**
   * Optional description/subtitle below the title
   */
  description?: ReactNode;

  /**
   * Semantic heading level for the title
   * @default 1
   */
  level?: HeadingLevel;

  /**
   * Size override for the title
   */
  titleSize?: HeadingSize;

  /**
   * Description text size
   * @default 'sm'
   */
  descriptionSize?: "xs" | "sm" | "base" | "lg";

  /**
   * Title alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right";

  /**
   * Gap between title and description
   * @default 2
   */
  gap?: 1 | 2 | 3 | 4;

  /**
   * Show bottom border accent
   * @default false
   */
  showBorder?: boolean;

  /**
   * Show accent band below title (horizontal bar in primary color)
   * @default false
   */
  showAccent?: boolean;

  /**
   * Accent band width
   * @default 'short' (60px)
   */
  accentWidth?: "short" | "medium" | "long" | "full";

  /**
   * Add padding around the title section
   * @default false
   */
  padded?: boolean;

  /**
   * Visual emphasis variant
   * @default 'default'
   */
  emphasis?: "default" | "strong";

  /**
   * Additional CSS class
   */
  className?: string;

  // Accessibility props

  /**
   * ARIA label for the title section
   */
  "aria-label"?: string;

  /**
   * ARIA described by
   */
  "aria-describedby"?: string;
}

