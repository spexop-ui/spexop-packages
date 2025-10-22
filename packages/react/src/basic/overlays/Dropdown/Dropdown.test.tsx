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
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown.js";
import styles from "./Dropdown.module.css";
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

      const menu = screen.getByRole("menu");
      menu.focus();
      await user.keyboard("{ArrowDown}");

      const firstItem = screen.getByRole("menuitem", { name: "Edit" });
      expect(firstItem).toHaveAttribute("tabindex", "0");
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

      const menu = screen.getByRole("menu");
      menu.focus();
      await user.keyboard("{ArrowUp}");

      const lastItem = screen.getByRole("menuitem", { name: "Delete" });
      expect(lastItem).toHaveAttribute("tabindex", "0");
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

      const menu = screen.getByRole("menu");
      menu.focus();
      await user.keyboard("{ArrowDown}");
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

      const menu = screen.getByRole("menu");
      menu.focus();
      await user.keyboard("{ArrowDown}");
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

      const menu = screen.getByRole("menu");
      menu.focus();
      await user.keyboard("{Home}");

      const firstItem = screen.getByRole("menuitem", { name: "Edit" });
      expect(firstItem).toHaveAttribute("tabindex", "0");
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

      const menu = screen.getByRole("menu");
      menu.focus();
      await user.keyboard("{End}");

      const lastItem = screen.getByRole("menuitem", { name: "Delete" });
      expect(lastItem).toHaveAttribute("tabindex", "0");
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

      const menu = screen.getByRole("menu");
      menu.focus();

      // Navigate down from first item
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");

      // Should skip disabled and go to last item
      const deleteItem = screen.getByRole("menuitem", { name: "Delete" });
      expect(deleteItem).toHaveAttribute("tabindex", "0");
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

      await user.click(screen.getByTestId("outside"));

      await waitFor(() => {
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      });
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
});
