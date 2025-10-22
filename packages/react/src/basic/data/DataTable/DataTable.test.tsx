/**
 * DataTable Component Tests
 * Comprehensive test suite for DataTable component
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable.js";
import type {
  Column,
  FilterState,
  PaginationState,
  SortState,
} from "./DataTable.types.js";

// Test data types
interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  age: number;
}

// Sample test data
const testUsers: TestUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    age: 30,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "Active",
    age: 25,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Editor",
    status: "Inactive",
    age: 35,
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "User",
    status: "Active",
    age: 28,
  },
  {
    id: 5,
    name: "Eve Wilson",
    email: "eve@example.com",
    role: "Admin",
    status: "Inactive",
    age: 32,
  },
];

// Basic column definitions
const basicColumns: Column<TestUser>[] = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "email", header: "Email", accessor: "email" },
  { id: "role", header: "Role", accessor: "role" },
];

describe("DataTable", () => {
  describe("Basic Rendering", () => {
    it("renders table with data", () => {
      render(<DataTable columns={basicColumns} data={testUsers} />);

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      // Admin appears multiple times in test data, so use getAllByText
      const adminCells = screen.getAllByText("Admin");
      expect(adminCells.length).toBeGreaterThan(0);
    });

    it("renders all column headers", () => {
      render(<DataTable columns={basicColumns} data={testUsers} />);

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();
    });

    it("renders all rows", () => {
      render(<DataTable columns={basicColumns} data={testUsers} />);

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
      expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
      expect(screen.getByText("Diana Prince")).toBeInTheDocument();
      expect(screen.getByText("Eve Wilson")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          className="custom-table"
        />,
      );

      const tableContainer = container.querySelector(".custom-table");
      expect(tableContainer).toBeInTheDocument();
    });

    it("renders with aria-label", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          aria-label="Test users table"
        />,
      );

      expect(screen.getByLabelText("Test users table")).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    it("enables sorting by default", () => {
      render(<DataTable columns={basicColumns} data={testUsers} sortable />);

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toHaveAttribute("role", "button");
    });

    it("sorts ascending on first click", async () => {
      const user = userEvent.setup();
      render(<DataTable columns={basicColumns} data={testUsers} sortable />);

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toBeInTheDocument();
      if (nameHeader) await user.click(nameHeader);

      const rows = screen.getAllByRole("row");
      const firstDataRow = within(rows[1]).getAllByRole("cell");
      expect(firstDataRow[0]).toHaveTextContent("Alice Johnson");
    });

    it("sorts descending on second click", async () => {
      const user = userEvent.setup();
      render(<DataTable columns={basicColumns} data={testUsers} sortable />);

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toBeInTheDocument();
      if (nameHeader) {
        await user.click(nameHeader);
        await user.click(nameHeader);
      }

      const rows = screen.getAllByRole("row");
      const firstDataRow = within(rows[1]).getAllByRole("cell");
      expect(firstDataRow[0]).toHaveTextContent("Eve Wilson");
    });

    it("clears sort on third click", async () => {
      const user = userEvent.setup();
      render(<DataTable columns={basicColumns} data={testUsers} sortable />);

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toBeInTheDocument();
      if (nameHeader) {
        await user.click(nameHeader);
        await user.click(nameHeader);
        await user.click(nameHeader);
      }

      const rows = screen.getAllByRole("row");
      const firstDataRow = within(rows[1]).getAllByRole("cell");
      expect(firstDataRow[0]).toHaveTextContent("Alice Johnson");
    });

    it("handles custom sort function", async () => {
      const user = userEvent.setup();
      const columns: Column<TestUser>[] = [
        {
          id: "age",
          header: "Age",
          accessor: "age",
          sortFn: (a, b) => a.age - b.age,
        },
      ];

      render(<DataTable columns={columns} data={testUsers} sortable />);

      const ageHeader = screen.getByText("Age").closest("div");
      expect(ageHeader).toBeInTheDocument();
      if (ageHeader) await user.click(ageHeader);

      const rows = screen.getAllByRole("row");
      const firstDataRow = within(rows[1]).getAllByRole("cell");
      expect(firstDataRow[0]).toHaveTextContent("25");
    });

    it("calls onSortChange when sort changes", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();

      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          sortable
          onSortChange={onSortChange}
        />,
      );

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toBeInTheDocument();
      if (nameHeader) await user.click(nameHeader);

      expect(onSortChange).toHaveBeenCalledWith({
        columnId: "name",
        direction: "asc",
      });
    });

    it("supports controlled sorting", () => {
      const sort: SortState = { columnId: "name", direction: "asc" };
      render(<DataTable columns={basicColumns} data={testUsers} sort={sort} />);

      const rows = screen.getAllByRole("row");
      const firstDataRow = within(rows[1]).getAllByRole("cell");
      expect(firstDataRow[0]).toHaveTextContent("Alice Johnson");
    });

    it("disables sorting when sortable is false", () => {
      render(
        <DataTable columns={basicColumns} data={testUsers} sortable={false} />,
      );

      const nameHeader = screen.getByText("Name");
      expect(nameHeader.closest("div")).not.toHaveAttribute("role", "button");
    });

    it("supports keyboard navigation for sorting", async () => {
      const user = userEvent.setup();
      render(<DataTable columns={basicColumns} data={testUsers} sortable />);

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toBeInTheDocument();
      if (nameHeader) {
        nameHeader.focus();
        await user.keyboard("{Enter}");
      }

      const rows = screen.getAllByRole("row");
      const firstDataRow = within(rows[1]).getAllByRole("cell");
      expect(firstDataRow[0]).toHaveTextContent("Alice Johnson");
    });

    it("sets aria-sort attribute correctly", async () => {
      const user = userEvent.setup();
      render(<DataTable columns={basicColumns} data={testUsers} sortable />);

      const nameCell = screen.getByText("Name").closest("th");
      expect(nameCell).toHaveAttribute("aria-sort", "none");

      const nameHeader = screen.getByText("Name").closest("div");
      expect(nameHeader).toBeInTheDocument();
      if (nameHeader) {
        await user.click(nameHeader);

        expect(nameCell).toHaveAttribute("aria-sort", "ascending");

        await user.click(nameHeader);
        expect(nameCell).toHaveAttribute("aria-sort", "descending");
      }
    });
  });

  describe("Filtering", () => {
    it("renders global search input", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showSearch
        />,
      );

      expect(
        screen.getByPlaceholderText("Search all columns..."),
      ).toBeInTheDocument();
    });

    it("filters data with global search", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showSearch
        />,
      );

      const searchInput = screen.getByPlaceholderText("Search all columns...");
      await user.type(searchInput, "Alice");

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    });

    it("shows column filters when enabled", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showColumnFilters
        />,
      );

      expect(screen.getByPlaceholderText("Filter Name...")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Filter Email..."),
      ).toBeInTheDocument();
    });

    it("filters by column", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showColumnFilters
        />,
      );

      const nameFilter = screen.getByPlaceholderText("Filter Name...");
      await user.type(nameFilter, "Bob");

      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });

    it("handles custom filter function", async () => {
      const user = userEvent.setup();
      const columns: Column<TestUser>[] = [
        {
          id: "age",
          header: "Age",
          accessor: "age",
          filterFn: (row, filterValue) => row.age >= Number(filterValue),
        },
      ];

      render(
        <DataTable
          columns={columns}
          data={testUsers}
          filterable
          showColumnFilters
        />,
      );

      const ageFilter = screen.getByPlaceholderText("Filter Age...");
      await user.type(ageFilter, "30");

      expect(screen.getByText("30")).toBeInTheDocument();
      expect(screen.getByText("35")).toBeInTheDocument();
      expect(screen.queryByText("25")).not.toBeInTheDocument();
    });

    it("calls onFilterChange when filter changes", async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();

      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showSearch
          onFilterChange={onFilterChange}
        />,
      );

      const searchInput = screen.getByPlaceholderText("Search all columns...");
      await user.type(searchInput, "test");

      expect(onFilterChange).toHaveBeenCalled();
    });

    it("resets to first page when filtering", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showSearch
          paginated
          defaultPagination={{ page: 1, pageSize: 2 }}
        />,
      );

      const searchInput = screen.getByPlaceholderText("Search all columns...");
      await user.type(searchInput, "Alice");

      expect(screen.getByText(/Showing 1 to 1 of 1/)).toBeInTheDocument();
    });

    it("supports controlled filtering", () => {
      const filter: FilterState = { global: "Alice", columns: {} };
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showSearch
          filter={filter}
        />,
      );

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    });
  });

  describe("Pagination", () => {
    it("paginates data by default", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 0, pageSize: 2 }}
        />,
      );

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
      expect(screen.queryByText("Charlie Brown")).not.toBeInTheDocument();
    });

    it("shows pagination info", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 0, pageSize: 2 }}
          showPaginationInfo
        />,
      );

      expect(screen.getByText(/Showing 1 to 2 of 5/)).toBeInTheDocument();
    });

    it("navigates to next page", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 0, pageSize: 2 }}
        />,
      );

      const nextButton = screen.getByLabelText("Next page");
      await user.click(nextButton);

      expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });

    it("navigates to previous page", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 1, pageSize: 2 }}
        />,
      );

      const prevButton = screen.getByLabelText("Previous page");
      await user.click(prevButton);

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Charlie Brown")).not.toBeInTheDocument();
    });

    it("navigates to first page", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 2, pageSize: 2 }}
        />,
      );

      const firstButton = screen.getByLabelText("First page");
      await user.click(firstButton);

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    });

    it("navigates to last page", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 0, pageSize: 2 }}
        />,
      );

      const lastButton = screen.getByLabelText("Last page");
      await user.click(lastButton);

      expect(screen.getByText("Eve Wilson")).toBeInTheDocument();
    });

    it("changes page size", async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          pageSizeOptions={[2, 5, 10]}
        />,
      );

      const pageSizeSelect = screen.getByLabelText("Rows per page");
      await user.selectOptions(pageSizeSelect, "5");

      expect(screen.getByText(/Showing 1 to 5 of 5/)).toBeInTheDocument();
    });

    it("disables previous button on first page", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 0, pageSize: 2 }}
        />,
      );

      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toBeDisabled();
    });

    it("disables next button on last page", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          defaultPagination={{ page: 2, pageSize: 2 }}
        />,
      );

      const nextButton = screen.getByLabelText("Next page");
      expect(nextButton).toBeDisabled();
    });

    it("calls onPaginationChange when page changes", async () => {
      const user = userEvent.setup();
      const onPaginationChange = vi.fn();

      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          onPaginationChange={onPaginationChange}
        />,
      );

      const nextButton = screen.getByLabelText("Next page");
      await user.click(nextButton);

      expect(onPaginationChange).toHaveBeenCalled();
    });

    it("supports controlled pagination", () => {
      const pagination: PaginationState = { page: 1, pageSize: 2 };
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          paginated
          pagination={pagination}
        />,
      );

      expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
      expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });
  });

  describe("Row Selection", () => {
    it("renders checkboxes when selectable", () => {
      render(<DataTable columns={basicColumns} data={testUsers} selectable />);

      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it("selects single row", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[1]); // First data row

      expect(onSelectionChange).toHaveBeenCalled();
    });

    it("selects all rows", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );

      const selectAllCheckbox = screen.getByLabelText("Select all rows");
      await user.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(
        expect.objectContaining({ allSelected: true }),
      );
    });

    it("deselects all rows", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );

      const selectAllCheckbox = screen.getByLabelText("Select all rows");
      await user.click(selectAllCheckbox);
      await user.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ allSelected: false }),
      );
    });
  });

  describe("Custom Cell Renderers", () => {
    it("renders custom cell content", () => {
      const columns: Column<TestUser>[] = [
        {
          id: "name",
          header: "Name",
          accessor: "name",
          cell: (value) => (
            <strong data-testid="custom-cell">{String(value)}</strong>
          ),
        },
      ];

      render(<DataTable columns={columns} data={testUsers} />);

      const customCell = screen.getByTestId("custom-cell");
      expect(customCell).toHaveTextContent("Alice Johnson");
      expect(customCell.tagName).toBe("STRONG");
    });

    it("passes row data to custom cell renderer", () => {
      const columns: Column<TestUser>[] = [
        {
          id: "fullInfo",
          header: "Full Info",
          accessor: "name",
          cell: (_value, row) => (
            <span data-testid="full-info">
              {row.name} - {row.email}
            </span>
          ),
        },
      ];

      render(<DataTable columns={columns} data={[testUsers[0]]} />);

      const fullInfo = screen.getByTestId("full-info");
      expect(fullInfo).toHaveTextContent("Alice Johnson - alice@example.com");
    });
  });

  describe("Loading and Empty States", () => {
    it("shows loading state", () => {
      render(<DataTable columns={basicColumns} data={testUsers} loading />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows custom loading message", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          loading
          loadingMessage="Fetching data..."
        />,
      );

      expect(screen.getByText("Fetching data...")).toBeInTheDocument();
    });

    it("shows empty state", () => {
      render(<DataTable columns={basicColumns} data={[]} />);

      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("shows custom empty message", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={[]}
          emptyMessage="No results found"
        />,
      );

      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("renders custom empty message component", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={[]}
          emptyMessage={
            <div data-testid="custom-empty">Custom Empty State</div>
          }
        />,
      );

      expect(screen.getByTestId("custom-empty")).toBeInTheDocument();
    });
  });

  describe("Variants and Sizes", () => {
    it("renders with bordered variant", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          variant="bordered"
        />,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with striped variant", () => {
      render(
        <DataTable columns={basicColumns} data={testUsers} variant="striped" />,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with hover variant", () => {
      render(
        <DataTable columns={basicColumns} data={testUsers} variant="hover" />,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with minimal variant", () => {
      render(
        <DataTable columns={basicColumns} data={testUsers} variant="minimal" />,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with compact variant", () => {
      render(
        <DataTable columns={basicColumns} data={testUsers} variant="compact" />,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with small size", () => {
      render(<DataTable columns={basicColumns} data={testUsers} size="sm" />);

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with medium size", () => {
      render(<DataTable columns={basicColumns} data={testUsers} size="md" />);

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with large size", () => {
      render(<DataTable columns={basicColumns} data={testUsers} size="lg" />);

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper table semantics", () => {
      render(<DataTable columns={basicColumns} data={testUsers} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row").length).toBeGreaterThan(0);
      expect(screen.getAllByRole("columnheader").length).toBe(
        basicColumns.length,
      );
    });

    it("supports aria-label", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          aria-label="User table"
        />,
      );

      expect(screen.getByLabelText("User table")).toBeInTheDocument();
    });

    it("has accessible search input", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={testUsers}
          filterable
          showSearch
        />,
      );

      const searchInput = screen.getByLabelText("Search table");
      expect(searchInput).toBeInTheDocument();
    });

    it("has accessible pagination controls", () => {
      render(<DataTable columns={basicColumns} data={testUsers} paginated />);

      expect(screen.getByLabelText("First page")).toBeInTheDocument();
      expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeInTheDocument();
      expect(screen.getByLabelText("Last page")).toBeInTheDocument();
    });

    it("has accessible page size selector", () => {
      render(<DataTable columns={basicColumns} data={testUsers} paginated />);

      expect(screen.getByLabelText("Rows per page")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("enables responsive mode", () => {
      render(<DataTable columns={basicColumns} data={testUsers} responsive />);

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("enables sticky header", () => {
      render(
        <DataTable columns={basicColumns} data={testUsers} stickyHeader />,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Column Configuration", () => {
    it("supports column alignment", () => {
      const columns: Column<TestUser>[] = [
        { id: "name", header: "Name", accessor: "name", align: "left" },
        { id: "email", header: "Email", accessor: "email", align: "center" },
        { id: "role", header: "Role", accessor: "role", align: "right" },
      ];

      render(<DataTable columns={columns} data={testUsers} />);

      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("supports column width", () => {
      const columns: Column<TestUser>[] = [
        { id: "name", header: "Name", accessor: "name", width: "200px" },
      ];

      render(<DataTable columns={columns} data={testUsers} />);

      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("disables sorting per column", () => {
      const columns: Column<TestUser>[] = [
        { id: "name", header: "Name", accessor: "name", sortable: false },
      ];

      render(<DataTable columns={columns} data={testUsers} sortable />);

      const nameHeader = screen.getByText("Name");
      expect(nameHeader.closest("div")).not.toHaveAttribute("role", "button");
    });

    it("disables filtering per column", () => {
      const columns: Column<TestUser>[] = [
        { id: "name", header: "Name", accessor: "name", filterable: false },
      ];

      render(
        <DataTable
          columns={columns}
          data={testUsers}
          filterable
          showColumnFilters
        />,
      );

      expect(
        screen.queryByPlaceholderText("Filter Name..."),
      ).not.toBeInTheDocument();
    });
  });

  describe("Accessor Functions", () => {
    it("supports accessor functions", () => {
      const columns: Column<TestUser>[] = [
        {
          id: "fullName",
          header: "Full Name",
          accessor: (row) => `${row.name} (${row.role})`,
        },
      ];

      render(<DataTable columns={columns} data={[testUsers[0]]} />);

      expect(screen.getByText("Alice Johnson (Admin)")).toBeInTheDocument();
    });
  });
});
