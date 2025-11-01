/**
 * DataTable Component
 * Advanced table with sorting, filtering, and pagination
 *
 * @component DataTable
 * @packageName @spexop/react
 * @description Advanced table with built-in sorting, filtering, and pagination
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.2.0
 * @since 2025-10-20
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built on Table primitive
 * - Principle 2: Borders before shadows - Strong 2px borders
 * - Principle 3: Typography before decoration - Font weight for hierarchy
 * - Principle 4: Tokens before magic numbers - Design tokens throughout
 * - Principle 5: Composition before complexity - Composable features
 * - Principle 6: Standards before frameworks - Semantic HTML
 * - Principle 7: Accessibility before aesthetics - Full ARIA support
 *
 * @example
 * ```tsx
 * const columns = [
 *   { id: 'name', header: 'Name', accessor: 'name' },
 *   { id: 'email', header: 'Email', accessor: 'email' },
 *   { id: 'role', header: 'Role', accessor: 'role', align: 'center' },
 * ];
 *
 * const data = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   sortable
 *   filterable
 *   paginated
 * />
 * ```
 */

import { useMemo, useState } from "react";
import { Icon } from "../../indicators/Icon/index.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../Table/index.js";
import styles from "./DataTable.module.css";
import type {
  Column,
  DataTableProps,
  FilterState,
  PaginationState,
  SelectionState,
  SortDirection,
  SortState,
} from "./DataTable.types.js";
import {
  isSimpleColumn,
  normalizeColumns,
} from "./DataTable.types.js";

/**
 * Main DataTable component
 */
export function DataTable<T = unknown>({
  columns,
  data,
  rowIdKey = "id" as keyof T,
  sortable = true,
  filterable = true,
  paginated = true,
  selectable = false,
  defaultSort,
  sort: controlledSort,
  onSortChange,
  defaultPagination = { page: 0, pageSize: 10 },
  pagination: controlledPagination,
  onPaginationChange,
  defaultFilter = { global: "", columns: {} },
  filter: controlledFilter,
  onFilterChange,
  onSelectionChange,
  pageSizeOptions = [10, 25, 50, 100],
  showSearch = true,
  showColumnFilters = false,
  showPaginationInfo = true,
  emptyMessage = "No data available",
  loading = false,
  loadingMessage = "Loading...",
  variant = "bordered",
  size = "md",
  responsive = true,
  stickyHeader = true,
  className = "",
  "aria-label": ariaLabel,
}: DataTableProps<T>) {
  // Normalize columns - convert SimpleColumn to Column
  const normalizedColumns = useMemo(() => normalizeColumns(columns), [columns]);

  // State management - support controlled and uncontrolled
  const [internalSort, setInternalSort] = useState<SortState>(
    defaultSort || { columnId: null, direction: null },
  );
  const [internalPagination, setInternalPagination] =
    useState<PaginationState>(defaultPagination);
  const [internalFilter, setInternalFilter] =
    useState<FilterState>(defaultFilter);
  const [selection, setSelection] = useState<SelectionState>({
    selectedIds: new Set(),
    allSelected: false,
  });

  const sortState = controlledSort ?? internalSort;
  const paginationState = controlledPagination ?? internalPagination;
  const filterState = controlledFilter ?? internalFilter;

  // Handle sort change
  const handleSortChange = (columnId: string) => {
    if (!sortable) return;

    const column = normalizedColumns.find((col) => col.id === columnId);
    if (!column || column.sortable === false) return;

    let newDirection: SortDirection = "asc";

    if (sortState.columnId === columnId) {
      if (sortState.direction === "asc") {
        newDirection = "desc";
      } else if (sortState.direction === "desc") {
        newDirection = null;
      }
    }

    const newSort: SortState = {
      columnId: newDirection ? columnId : null,
      direction: newDirection,
    };

    setInternalSort(newSort);
    onSortChange?.(newSort);
  };

  // Handle filter change
  const handleFilterChange = (
    type: "global" | "column",
    value: string,
    columnId?: string,
  ) => {
    const newFilter: FilterState =
      type === "global"
        ? { ...filterState, global: value }
        : {
            ...filterState,
            columns: {
              ...filterState.columns,
              [columnId || ""]: value,
            },
          };

    setInternalFilter(newFilter);
    onFilterChange?.(newFilter);

    // Reset to first page on filter change
    if (paginated) {
      const newPagination = { ...paginationState, page: 0 };
      setInternalPagination(newPagination);
      onPaginationChange?.(newPagination);
    }
  };

  // Handle pagination change
  const handlePaginationChange = (page: number, pageSize?: number) => {
    const newPagination: PaginationState = {
      page,
      pageSize: pageSize ?? paginationState.pageSize,
    };

    setInternalPagination(newPagination);
    onPaginationChange?.(newPagination);
  };

  // Handle selection change
  const handleSelectAll = () => {
    const newSelection: SelectionState = {
      selectedIds: selection.allSelected
        ? new Set()
        : new Set(processedData.map((row) => row[rowIdKey] as string | number)),
      allSelected: !selection.allSelected,
    };

    setSelection(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectRow = (rowId: string | number) => {
    const newSelectedIds = new Set(selection.selectedIds);

    if (newSelectedIds.has(rowId)) {
      newSelectedIds.delete(rowId);
    } else {
      newSelectedIds.add(rowId);
    }

    const newSelection: SelectionState = {
      selectedIds: newSelectedIds,
      allSelected: newSelectedIds.size === processedData.length,
    };

    setSelection(newSelection);
    onSelectionChange?.(newSelection);
  };

  // Process data: filter -> sort -> paginate
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    if (filterable) {
      // Global filter
      if (filterState.global) {
        result = result.filter((row) => {
          return normalizedColumns.some((col) => {
            const value = getCellValue(row, col);
            return String(value)
              .toLowerCase()
              .includes(filterState.global.toLowerCase());
          });
        });
      }

      // Column filters
      for (const [columnId, filterValue] of Object.entries(
        filterState.columns,
      )) {
        if (filterValue) {
          const column = normalizedColumns.find((col) => col.id === columnId);
          if (column) {
            result = result.filter((row) => {
              if (column.filterFn) {
                return column.filterFn(row, filterValue);
              }
              const value = getCellValue(row, column);
              return String(value)
                .toLowerCase()
                .includes(filterValue.toLowerCase());
            });
          }
        }
      }
    }

    // Apply sorting
    if (sortable && sortState.columnId && sortState.direction) {
      const column = normalizedColumns.find((col) => col.id === sortState.columnId);
      if (column) {
        result.sort((a, b) => {
          if (column.sortFn) {
            return sortState.direction === "asc"
              ? column.sortFn(a, b)
              : column.sortFn(b, a);
          }

          const aValue = getCellValue(a, column);
          const bValue = getCellValue(b, column);

          if (aValue === bValue) return 0;
          if (aValue === null || aValue === undefined) return 1;
          if (bValue === null || bValue === undefined) return -1;

          const compareResult = aValue < bValue ? -1 : 1;
          return sortState.direction === "asc" ? compareResult : -compareResult;
        });
      }
    }

    return result;
  }, [data, normalizedColumns, filterState, sortState, sortable, filterable]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return processedData;

    const startIndex = paginationState.page * paginationState.pageSize;
    const endIndex = startIndex + paginationState.pageSize;

    return processedData.slice(startIndex, endIndex);
  }, [processedData, paginationState, paginated]);

  // Pagination calculations
  const totalPages = Math.ceil(processedData.length / paginationState.pageSize);
  const startRow = paginationState.page * paginationState.pageSize + 1;
  const endRow = Math.min(
    (paginationState.page + 1) * paginationState.pageSize,
    processedData.length,
  );

  // Get cell value helper
  function getCellValue(row: T, column: Column<T>): unknown {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return row[column.accessor];
  }

  // Render sort icon
  function renderSortIcon(columnId: string): React.ReactNode {
    if (sortState.columnId !== columnId) {
      return (
        <span className={styles.sortIconNeutral}>
          <Icon name="chevronUp" size="sm" />
          <Icon name="chevronDown" size="sm" />
        </span>
      );
    }
    return sortState.direction === "asc" ? (
      <Icon name="chevronUp" size="sm" />
    ) : (
      <Icon name="chevronDown" size="sm" />
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Toolbar - Search */}
      {filterable && showSearch && (
        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search all columns..."
              value={filterState.global}
              onChange={(e) => handleFilterChange("global", e.target.value)}
              aria-label="Search table"
              aria-describedby="search-help"
            />
            <div id="search-help" className={styles.searchHelp}>
              Search across all columns
            </div>
          </div>
        </div>
      )}

      {/* Column Filters */}
      {filterable && showColumnFilters && (
        <div className={styles.columnFilters}>
          {normalizedColumns
            .filter((col) => col.filterable !== false)
            .map((col) => (
              <div key={col.id} className={styles.filterGroup}>
                <input
                  type="text"
                  className={styles.filterInput}
                  placeholder={`Filter ${col.header}...`}
                  value={filterState.columns[col.id] || ""}
                  onChange={(e) =>
                    handleFilterChange("column", e.target.value, col.id)
                  }
                  aria-label={`Filter ${col.header}`}
                  aria-describedby={`filter-help-${col.id}`}
                />
                <div id={`filter-help-${col.id}`} className={styles.filterHelp}>
                  Filter by {col.header}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <Table
          variant={variant}
          size={size}
          responsive={responsive}
          stickyHeader={stickyHeader}
          aria-label={ariaLabel}
        >
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableCell header className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selection.allSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </TableCell>
              )}
              {normalizedColumns.map((col) => (
                <TableCell
                  key={col.id}
                  header
                  align={col.align}
                  width={col.width}
                  aria-sort={
                    sortState.columnId === col.id
                      ? sortState.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  {sortable && col.sortable !== false ? (
                    <div
                      className={styles.sortableHeader}
                      onClick={() => handleSortChange(col.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSortChange(col.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort by ${col.header}`}
                    >
                      <span>{col.header}</span>
                      <span
                        className={`${styles.sortIcon} ${
                          sortState.columnId === col.id
                            ? styles.sortIconActive
                            : ""
                        }`}
                      >
                        {renderSortIcon(col.id)}
                      </span>
                    </div>
                  ) : (
                    col.header
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={normalizedColumns.length + (selectable ? 1 : 0)}>
                  <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner} />
                    <div>{loadingMessage}</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={normalizedColumns.length + (selectable ? 1 : 0)}>
                  <div className={styles.emptyContainer}>
                    <div className={styles.emptyIcon}>📋</div>
                    <div>{emptyMessage}</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowId = row[rowIdKey] as string | number;
                const isSelected = selection.selectedIds.has(rowId);

                return (
                  <TableRow key={rowId} selected={isSelected}>
                    {selectable && (
                      <TableCell className={styles.checkboxCell}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowId)}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </TableCell>
                    )}
                    {normalizedColumns.map((col) => {
                      const value = getCellValue(row, col);
                      const content = col.cell
                        ? col.cell(value, row, rowIndex)
                        : String(value);

                      return (
                        <TableCell key={col.id} align={col.align}>
                          {content}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginated && !loading && paginatedData.length > 0 && (
        <div className={styles.pagination}>
          {showPaginationInfo && (
            <div className={styles.paginationInfo}>
              Showing {startRow} to {endRow} of {processedData.length} results
            </div>
          )}

          <div className={styles.paginationControls}>
            <select
              className={styles.pageSizeSelect}
              value={paginationState.pageSize}
              onChange={(e) =>
                handlePaginationChange(0, Number.parseInt(e.target.value, 10))
              }
              aria-label="Rows per page"
              aria-describedby="page-size-help"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
            <div id="page-size-help" className={styles.pageSizeHelp}>
              Choose number of rows to display
            </div>

            <div className={styles.pageButtons}>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => handlePaginationChange(0)}
                disabled={paginationState.page === 0}
                aria-label="First page"
                tabIndex={0}
              >
                ««
              </button>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => handlePaginationChange(paginationState.page - 1)}
                disabled={paginationState.page === 0}
                aria-label="Previous page"
                tabIndex={0}
              >
                «
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (paginationState.page < 3) {
                  pageNum = i;
                } else if (paginationState.page > totalPages - 4) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = paginationState.page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`${styles.pageButton} ${
                      pageNum === paginationState.page
                        ? styles.pageButtonActive
                        : ""
                    }`}
                    onClick={() => handlePaginationChange(pageNum)}
                    aria-label={`Page ${pageNum + 1}`}
                    aria-current={
                      pageNum === paginationState.page ? "page" : undefined
                    }
                    tabIndex={0}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}

              <button
                type="button"
                className={styles.pageButton}
                onClick={() => handlePaginationChange(paginationState.page + 1)}
                disabled={paginationState.page >= totalPages - 1}
                aria-label="Next page"
                tabIndex={0}
              >
                »
              </button>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => handlePaginationChange(totalPages - 1)}
                disabled={paginationState.page >= totalPages - 1}
                aria-label="Last page"
                tabIndex={0}
              >
                »»
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
