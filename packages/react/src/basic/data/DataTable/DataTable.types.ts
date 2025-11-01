/**
 * DataTable Component Types
 * Advanced table with sorting, filtering, and pagination
 *
 * @component DataTable
 * @packageName @spexop/react
 * @description Advanced table with built-in sorting, filtering, and pagination
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.2.0
 * @since 2025-10-20
 */

import type { ReactNode } from "react";

/**
 * Column sort direction
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Column alignment
 */
export type ColumnAlign = "left" | "center" | "right";

/**
 * Simplified column definition (auto-generates accessor from key)
 */
export interface SimpleColumn<T = unknown> {
  /**
   * Column key (used as both id and accessor)
   */
  key: keyof T;

  /**
   * Column label (displayed in header)
   */
  label: string | ReactNode;

  /**
   * Column alignment
   * @default 'left'
   */
  align?: ColumnAlign;

  /**
   * Column width (CSS value)
   */
  width?: string;
}

/**
 * Type guard to check if column is SimpleColumn
 */
export function isSimpleColumn<T>(
  column: Column<T> | SimpleColumn<T>,
): column is SimpleColumn<T> {
  return "key" in column && !("id" in column);
}

/**
 * Normalize columns - convert SimpleColumn to Column
 */
export function normalizeColumns<T>(
  columns: (Column<T> | SimpleColumn<T>)[],
): Column<T>[] {
  return columns.map((col) => {
    if (isSimpleColumn(col)) {
      return {
        id: String(col.key),
        header: col.label,
        accessor: col.key,
        align: col.align,
        width: col.width,
        sortable: true,
        filterable: true,
      };
    }
    return col;
  });
}

/**
 * Full column definition (for advanced usage)
 */
export interface Column<T = unknown> {
  /**
   * Column unique identifier
   */
  id: string;

  /**
   * Column header label
   */
  header: string | ReactNode;

  /**
   * Data accessor function or property key
   */
  accessor: keyof T | ((row: T) => unknown);

  /**
   * Custom cell renderer
   */
  cell?: (value: unknown, row: T, rowIndex: number) => ReactNode;

  /**
   * Enable sorting for this column
   * @default true
   */
  sortable?: boolean;

  /**
   * Enable filtering for this column
   * @default true
   */
  filterable?: boolean;

  /**
   * Custom sort function
   */
  sortFn?: (a: T, b: T) => number;

  /**
   * Custom filter function
   */
  filterFn?: (row: T, filterValue: string) => boolean;

  /**
   * Column width (CSS value)
   */
  width?: string;

  /**
   * Column alignment
   * @default 'left'
   */
  align?: ColumnAlign;

  /**
   * Column is sticky (fixed position during horizontal scroll)
   * @default false
   */
  sticky?: boolean;
}

/**
 * Sort state
 */
export interface SortState {
  /**
   * Column ID to sort by
   */
  columnId: string | null;

  /**
   * Sort direction
   */
  direction: SortDirection;
}

/**
 * Pagination state
 */
export interface PaginationState {
  /**
   * Current page (0-indexed)
   */
  page: number;

  /**
   * Items per page
   */
  pageSize: number;
}

/**
 * Filter state
 */
export interface FilterState {
  /**
   * Global search filter
   */
  global: string;

  /**
   * Column-specific filters
   */
  columns: Record<string, string>;
}

/**
 * Row selection state
 */
export interface SelectionState {
  /**
   * Selected row IDs
   */
  selectedIds: Set<string | number>;

  /**
   * All rows selected
   */
  allSelected: boolean;
}

/**
 * DataTable component props
 */
export interface DataTableProps<T = unknown> {
  /**
   * Column definitions (supports both simple and full format)
   * Simple: { key, label } - auto-generates accessor
   * Full: { id, header, accessor } - complete control
   */
  columns: (Column<T> | SimpleColumn<T>)[];

  /**
   * Table data
   */
  data: T[];

  /**
   * Row unique identifier key
   * @default 'id'
   */
  rowIdKey?: keyof T;

  /**
   * Enable sorting
   * @default true
   */
  sortable?: boolean;

  /**
   * Enable filtering
   * @default true
   */
  filterable?: boolean;

  /**
   * Enable pagination
   * @default true
   */
  paginated?: boolean;

  /**
   * Enable row selection
   * @default false
   */
  selectable?: boolean;

  /**
   * Initial sort state
   */
  defaultSort?: SortState;

  /**
   * Controlled sort state
   */
  sort?: SortState;

  /**
   * Sort change handler
   */
  onSortChange?: (sort: SortState) => void;

  /**
   * Initial pagination state
   */
  defaultPagination?: PaginationState;

  /**
   * Controlled pagination state
   */
  pagination?: PaginationState;

  /**
   * Pagination change handler
   */
  onPaginationChange?: (pagination: PaginationState) => void;

  /**
   * Initial filter state
   */
  defaultFilter?: FilterState;

  /**
   * Controlled filter state
   */
  filter?: FilterState;

  /**
   * Filter change handler
   */
  onFilterChange?: (filter: FilterState) => void;

  /**
   * Selection change handler
   */
  onSelectionChange?: (selection: SelectionState) => void;

  /**
   * Page size options
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Show global search
   * @default true
   */
  showSearch?: boolean;

  /**
   * Show column filters
   * @default false
   */
  showColumnFilters?: boolean;

  /**
   * Show pagination info
   * @default true
   */
  showPaginationInfo?: boolean;

  /**
   * Empty state message
   */
  emptyMessage?: string | ReactNode;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Loading message
   */
  loadingMessage?: string | ReactNode;

  /**
   * Table variant
   * @default 'bordered'
   */
  variant?:
    | "default"
    | "bordered"
    | "striped"
    | "hover"
    | "minimal"
    | "compact";

  /**
   * Table size
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Enable responsive scrolling
   * @default true
   */
  responsive?: boolean;

  /**
   * Enable sticky header
   * @default true
   */
  stickyHeader?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * ARIA label
   */
  "aria-label"?: string;
}
