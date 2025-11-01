/**
 * Table Component Types
 * Border-first table system with comprehensive styling and accessibility
 *
 * @component Table
 * @packageName @spexop/react
 * @description Primitives-first table system following "The Spexop Way"
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.2.0
 * @since 2025-10-20
 */

import type { ReactNode } from "react";

/**
 * Table variant types - emphasizes borders over shadows
 */
export type TableVariant =
  | "default" // Standard table with 2px borders
  | "bordered" // All cells with borders
  | "striped" // Alternating row background
  | "hover" // Row hover effects
  | "minimal" // Clean, minimal borders
  | "compact"; // Reduced padding for dense data

/**
 * Table size variants
 */
export type TableSize =
  | "sm" // Small: tight padding for dense data
  | "md" // Medium (default): balanced padding
  | "lg"; // Large: generous padding for readability

/**
 * Table layout mode
 */
export type TableLayout = "auto" | "fixed";

/**
 * Table component props
 */
export interface TableProps {
  /**
   * Table content (TableHeader, TableBody, TableFooter)
   */
  children?: ReactNode;

  /**
   * Visual style variant (convenience prop, use boolean props for combinations)
   * @default 'default'
   */
  variant?: TableVariant;

  /**
   * Add borders to all cells (can be combined with other boolean props)
   * @default false
   */
  bordered?: boolean;

  /**
   * Add striped row backgrounds (can be combined with other boolean props)
   * @default false
   */
  striped?: boolean;

  /**
   * Enable row hover effects (can be combined with other boolean props)
   * @default false
   */
  hoverable?: boolean;

  /**
   * Use compact padding (can be combined with other boolean props)
   * @default false
   */
  compact?: boolean;

  /**
   * Table size
   * @default 'md'
   */
  size?: TableSize;

  /**
   * Table layout mode
   * @default 'auto'
   */
  layout?: TableLayout;

  /**
   * Full width table
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Enable responsive scrolling
   * @default false
   */
  responsive?: boolean;

  /**
   * Enable sticky header
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA described by (ID of element describing table)
   */
  "aria-describedby"?: string;
}

/**
 * TableHeader component props
 */
export interface TableHeaderProps {
  /**
   * Table header content (TableRow with th cells)
   */
  children?: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * TableBody component props
 */
export interface TableBodyProps {
  /**
   * Table body content (TableRow components)
   */
  children?: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * TableFooter component props
 */
export interface TableFooterProps {
  /**
   * Table footer content (TableRow components)
   */
  children?: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * TableRow component props
 */
export interface TableRowProps {
  /**
   * Table row content (TableCell components)
   */
  children?: ReactNode;

  /**
   * Selected state
   * @default false
   */
  selected?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * TableCell component props
 */
export interface TableCellProps {
  /**
   * Cell content
   */
  children?: ReactNode;

  /**
   * Header cell (th) vs data cell (td)
   * @default false
   */
  header?: boolean;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right";

  /**
   * Column span
   */
  colSpan?: number;

  /**
   * Row span
   */
  rowSpan?: number;

  /**
   * Cell width (CSS value)
   */
  width?: string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * ARIA sort direction (for sortable columns)
   */
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
}
