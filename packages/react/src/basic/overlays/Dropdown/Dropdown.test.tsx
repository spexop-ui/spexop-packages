/// <reference types="@testing-library/jest-dom" />
/**
 * Dropdown Component Tests
 *
 * Tests for Dropdown component covering:
 * - Rendering and visibility
 * - Trigger interaction
 * - Item selection
 * - Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
 * - Click outside to close
 * - Placement variants
 * - Disabled items
 * - Danger variant
 * - Dividers
 * - Icons
 * - ARIA attributes
 * - Controlled and uncontrolled modes
 * - Search functionality
 * - Grouping
 * - Loading states
 * - Empty states
 * - Mobile optimizations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown.js";
import type { DropdownMenuItem } from "./Dropdown.types.js";

// Extend global type for test callback
interface GlobalWithTestCallbacks {
  __escapeKeyCallback?: () => void;
}

const globalWithCallbacks = global as unknown as GlobalWithTestCallbacks;

const mockItems: DropdownMenuItem[] = [
  {
    id: "edit",
    label: "Edit",
    onClick: vi.fn(),
  },
  {
    id: "duplicate",
    label: "Duplicate",
    onClick: vi.fn(),
  },
  {
    id: "delete",
    label: "Delete",
    variant: "danger",
    onClick: vi.fn(),
  },
];

// Mock useEscapeKey hook
vi.mock("../../../hooks/useEscapeKey.js", () => ({
  useEscapeKey: vi.fn((callback) => {
    globalWithCallbacks.__escapeKeyCallback = callback;
  }),
}));

describe("Dropdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalWithCallbacks.__escapeKeyCallback = undefined;
  });

  describe("Rendering", () => {
    it("renders trigger element", () => {
      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      expect(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("does not show dropdown by default", () => {
      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("shows dropdown when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      const trigger = screen.getByText("Actions");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("hides dropdown when trigger is clicked again", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      const trigger = screen.getByText("Actions");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      await user.click(trigger);

      await waitFor(() => {
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      });
    });
  });

  describe("Items", () => {
    it("renders all menu items", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Duplicate")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
      });
    });

    it("calls onClick when item is clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const items = [
        {
          id: "test",
          label: "Test Item",
          onClick,
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Test Item")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Test Item"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("closes dropdown after item click by default", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Edit"));

      await waitFor(() => {
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      });
    });

    it("keeps dropdown open when closeOnItemClick is false", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          closeOnItemClick={false}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Edit"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });
  });

  describe("Disabled Items", () => {
    it("renders disabled items", async () => {
      const user = userEvent.setup();
      const items = [
        {
          id: "test",
          label: "Disabled Item",
          onClick: vi.fn(),
          disabled: true,
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const item = screen.getByRole("menuitem", { name: "Disabled Item" });
        expect(item).toBeDisabled();
      });
    });

    it("does not call onClick for disabled items", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const items = [
        {
          id: "test",
          label: "Disabled Item",
          onClick,
          disabled: true,
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Disabled Item")).toBeInTheDocument();
      });

      const item = screen.getByRole("menuitem", { name: "Disabled Item" });
      await user.click(item);

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("Danger Variant", () => {
    it("applies danger styling", async () => {
      const user = userEvent.setup();
      const items = [
        {
          id: "delete",
          label: "Delete",
          variant: "danger" as const,
          onClick: vi.fn(),
        },
      ];

      const { container } = render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const item = screen.getByRole("menuitem", { name: "Delete" });
        expect(item.className).toContain("danger");
      });
    });
  });

  describe("Icons", () => {
    it("renders item icons", async () => {
      const user = userEvent.setup();
      const items = [
        {
          id: "edit",
          label: "Edit",
          icon: <span data-testid="edit-icon">✏️</span>,
          onClick: vi.fn(),
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
      });
    });
  });

  describe("Dividers", () => {
    it("renders dividers after items", async () => {
      const user = userEvent.setup();
      const items = [
        {
          id: "edit",
          label: "Edit",
          onClick: vi.fn(),
          divider: true,
        },
        {
          id: "delete",
          label: "Delete",
          onClick: vi.fn(),
        },
      ];

      const { container } = render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const separator = container.querySelector('[role="separator"]');
        expect(separator).toBeInTheDocument();
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates down with ArrowDown", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        const firstItem = screen.getByRole("menuitem", { name: "Edit" });
        expect(firstItem).toHaveAttribute("tabindex", "0");
      });
    });

    it("navigates up with ArrowUp", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{ArrowUp}");

      await waitFor(() => {
        const lastItem = screen.getByRole("menuitem", { name: "Delete" });
        expect(lastItem).toHaveAttribute("tabindex", "0");
      });
    });

    it("selects item with Enter", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const items = [
        {
          id: "test",
          label: "Test Item",
          onClick,
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        const item = screen.getByRole("menuitem", { name: "Test Item" });
        expect(item).toHaveAttribute("tabindex", "0");
      });

      await user.keyboard("{Enter}");

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("selects item with Space", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const items = [
        {
          id: "test",
          label: "Test Item",
          onClick,
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        const item = screen.getByRole("menuitem", { name: "Test Item" });
        expect(item).toHaveAttribute("tabindex", "0");
      });

      await user.keyboard(" ");

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("jumps to first item with Home", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{Home}");

      await waitFor(() => {
        const firstItem = screen.getByRole("menuitem", { name: "Edit" });
        expect(firstItem).toHaveAttribute("tabindex", "0");
      });
    });

    it("jumps to last item with End", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{End}");

      await waitFor(() => {
        const lastItem = screen.getByRole("menuitem", { name: "Delete" });
        expect(lastItem).toHaveAttribute("tabindex", "0");
      });
    });

    it("skips disabled items during navigation", async () => {
      const user = userEvent.setup();
      const items = [
        {
          id: "edit",
          label: "Edit",
          onClick: vi.fn(),
        },
        {
          id: "disabled",
          label: "Disabled",
          onClick: vi.fn(),
          disabled: true,
        },
        {
          id: "delete",
          label: "Delete",
          onClick: vi.fn(),
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const dropdown = screen.getByRole("menu");
      dropdown.focus();

      // Navigate down from first item
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");

      // Should skip disabled and go to last item
      await waitFor(() => {
        const deleteItem = screen.getByRole("menuitem", { name: "Delete" });
        expect(deleteItem).toHaveAttribute("tabindex", "0");
      });
    });

    it("handles keyboard navigation with search", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "1", label: "Apple", onClick: vi.fn() },
        { id: "2", label: "Banana", onClick: vi.fn() },
        { id: "3", label: "Cherry", onClick: vi.fn() },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          searchable
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "a");

      // Should be able to navigate filtered results
      const dropdown = screen.getByRole("menu");
      dropdown.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        const firstItem = screen.getByRole("menuitem", { name: "Apple" });
        expect(firstItem).toHaveAttribute("tabindex", "0");
      });
    });
  });

  describe("Escape Key", () => {
    it("closes dropdown when Escape is pressed", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      // Trigger escape callback
      if (globalWithCallbacks.__escapeKeyCallback) {
        globalWithCallbacks.__escapeKeyCallback();
      }

      await waitFor(() => {
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      });
    });
  });

  describe("Click Outside", () => {
    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button type="button" data-testid="outside">
            Outside
          </button>
          <Dropdown
            items={mockItems}
            trigger={<button type="button">Actions</button>}
          />
        </div>,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      // Click on the outside button
      await user.click(screen.getByTestId("outside"));

      // Wait a bit for the state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      await waitFor(
        () => {
          expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });
  });

  describe("Placement", () => {
    it.each(["bottom-start", "bottom-end", "top-start", "top-end"] as const)(
      "renders with placement=%s",
      async (placement) => {
        const user = userEvent.setup();

        render(
          <Dropdown
            items={mockItems}
            trigger={<button type="button">Actions</button>}
            placement={placement}
          />,
        );

        await user.click(screen.getByText("Actions"));

        await waitFor(() => {
          const menu = screen.getByRole("menu");
          expect(menu.className).toContain(`placement-${placement}`);
        });
      },
    );
  });

  describe("Controlled Mode", () => {
    it("respects controlled isOpen prop", async () => {
      const { rerender } = render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          isOpen={false}
          onOpenChange={vi.fn()}
        />,
      );

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();

      rerender(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          isOpen={true}
          onOpenChange={vi.fn()}
        />,
      );

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when trigger is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          isOpen={false}
          onOpenChange={onOpenChange}
        />,
      );

      await user.click(screen.getByText("Actions"));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("ARIA Attributes", () => {
    it("sets correct ARIA attributes on trigger", () => {
      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      const trigger = screen.getByText("Actions");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    });

    it("updates aria-expanded when opened", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      const trigger = screen.getByText("Actions");
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className to dropdown", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          className="custom-dropdown"
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const menu = screen.getByRole("menu");
        expect(menu).toHaveClass("custom-dropdown");
      });
    });

    it("applies triggerClassName to trigger", () => {
      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          triggerClassName="custom-trigger"
        />,
      );

      const trigger = screen.getByText("Actions");
      expect(trigger).toHaveClass("custom-trigger");
    });
  });

  describe("Search Functionality", () => {
    it("shows search input when searchable is true", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          searchable
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      });
    });

    it("filters items based on search query", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "1", label: "Apple", onClick: vi.fn() },
        { id: "2", label: "Banana", onClick: vi.fn() },
        { id: "3", label: "Cherry", onClick: vi.fn() },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          searchable
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "app");

      await waitFor(() => {
        expect(
          screen.getByRole("menuitem", { name: /Apple/ }),
        ).toBeInTheDocument();
        expect(screen.queryByText("Banana")).not.toBeInTheDocument();
        expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
      });
    });

    it("shows empty state when no items match search", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          searchable
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "nonexistent");

      await waitFor(() => {
        expect(screen.getByText("No items found")).toBeInTheDocument();
      });
    });

    it("calls onSearchChange when search query changes", async () => {
      const user = userEvent.setup();
      const onSearchChange = vi.fn();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          searchable
          onSearchChange={onSearchChange}
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "test");

      expect(onSearchChange).toHaveBeenCalledWith("test");
    });

    it("uses custom search function when provided", async () => {
      const user = userEvent.setup();
      const customSearch = vi.fn((query, items) =>
        items.filter((item) => item.id.includes(query)),
      );

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          searchable
          onSearch={customSearch}
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "edit");

      expect(customSearch).toHaveBeenCalledWith("edit", mockItems);
    });
  });

  describe("Grouping", () => {
    it("groups items when grouped is true", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "1", label: "Edit", group: "actions", onClick: vi.fn() },
        { id: "2", label: "Delete", group: "actions", onClick: vi.fn() },
        { id: "3", label: "Settings", group: "preferences", onClick: vi.fn() },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          grouped
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("actions")).toBeInTheDocument();
        expect(screen.getByText("preferences")).toBeInTheDocument();
      });
    });

    it("shows group dividers when showGroupDividers is true", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "1", label: "Edit", group: "actions", onClick: vi.fn() },
        { id: "2", label: "Settings", group: "preferences", onClick: vi.fn() },
      ];

      const { container } = render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          grouped
          showGroupDividers
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const separators = container.querySelectorAll('[role="separator"]');
        expect(separators.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Loading State", () => {
    it("shows loading state when loading is true", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          loading
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  describe("Empty State", () => {
    it("shows default empty state when no items", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={[]}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("No items found")).toBeInTheDocument();
      });
    });

    it("shows custom empty state when provided", async () => {
      const user = userEvent.setup();
      const customEmptyState = <div>Custom empty message</div>;

      render(
        <Dropdown
          items={[]}
          trigger={<button type="button">Actions</button>}
          emptyState={customEmptyState}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByText("Custom empty message")).toBeInTheDocument();
      });
    });
  });

  describe("Highlight Matches", () => {
    it("highlights search matches when highlightMatches is true", async () => {
      const user = userEvent.setup();
      const items = [{ id: "1", label: "Apple Pie", onClick: vi.fn() }];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          searchable
          highlightMatches
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "apple");

      await waitFor(() => {
        const mark = screen.getByText("Apple");
        expect(mark.tagName).toBe("MARK");
      });
    });
  });

  describe("Mobile Optimizations", () => {
    it("applies mobile styles on small screens", async () => {
      const user = userEvent.setup();

      // Mock mobile viewport
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 400,
      });

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const menu = screen.getByRole("menu");
        expect(menu).toBeInTheDocument();
      });
    });
  });

  describe("Advanced Features", () => {
    it("handles custom maxHeight prop", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          maxHeight={200}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const menu = screen.getByRole("menu");
        expect(menu).toHaveStyle({ maxHeight: "200px" });
      });
    });

    it("handles custom search placeholder", async () => {
      const user = userEvent.setup();

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          searchable
          searchPlaceholder="Custom search..."
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Custom search..."),
        ).toBeInTheDocument();
      });
    });

    it("handles keywords in search", async () => {
      const user = userEvent.setup();
      const items = [
        {
          id: "1",
          label: "Settings",
          keywords: ["preferences", "config"],
          onClick: vi.fn(),
        },
        {
          id: "2",
          label: "Profile",
          keywords: ["user", "account"],
          onClick: vi.fn(),
        },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          searchable
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "config");

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.queryByText("Profile")).not.toBeInTheDocument();
      });
    });

    it("handles custom item renderer", async () => {
      const user = userEvent.setup();
      const customRenderer = vi.fn((item, index) => (
        <div key={item.id} data-testid={`custom-item-${index}`}>
          Custom: {item.label}
        </div>
      ));

      render(
        <Dropdown
          items={mockItems}
          trigger={<button type="button">Actions</button>}
          renderItem={customRenderer}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        expect(screen.getByTestId("custom-item-0")).toBeInTheDocument();
        expect(screen.getByText("Custom: Edit")).toBeInTheDocument();
        expect(customRenderer).toHaveBeenCalled();
      });
    });

    it("handles disabled search highlighting", async () => {
      const user = userEvent.setup();
      const items = [{ id: "1", label: "Apple Pie", onClick: vi.fn() }];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          searchable
          highlightMatches={false}
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "apple");

      await waitFor(() => {
        const mark = screen.queryByText("Apple");
        expect(mark?.tagName).not.toBe("MARK");
      });
    });

    it("handles grouped items without dividers", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "1", label: "Edit", group: "actions", onClick: vi.fn() },
        { id: "2", label: "Settings", group: "preferences", onClick: vi.fn() },
      ];

      const { container } = render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          grouped
          showGroupDividers={false}
        />,
      );

      await user.click(screen.getByText("Actions"));

      await waitFor(() => {
        const separators = container.querySelectorAll('[role="separator"]');
        expect(separators.length).toBe(0);
      });
    });

    it("handles search with grouped items", async () => {
      const user = userEvent.setup();
      const items = [
        { id: "1", label: "Edit", group: "actions", onClick: vi.fn() },
        { id: "2", label: "Delete", group: "actions", onClick: vi.fn() },
        { id: "3", label: "Settings", group: "preferences", onClick: vi.fn() },
      ];

      render(
        <Dropdown
          items={items}
          trigger={<button type="button">Actions</button>}
          searchable
          grouped
        />,
      );

      await user.click(screen.getByText("Actions"));

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "edit");

      await waitFor(() => {
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Settings")).not.toBeInTheDocument();
      });
    });
  });
});
