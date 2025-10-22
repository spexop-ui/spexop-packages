/**
 * Breadcrumb Component Tests
 *
 * Tests for Breadcrumb navigation component covering:
 * - Rendering with different configurations
 * - Click handlers (href and onClick)
 * - Keyboard navigation
 * - ARIA attributes and accessibility
 * - Size variants
 * - Custom separators
 * - Icons support
 * - Collapsible behavior
 * - Disabled items
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "./Breadcrumb.js";
import styles from "./Breadcrumb.module.css";
import type { BreadcrumbItem } from "./Breadcrumb.types.js";

describe("Breadcrumb", () => {
  const defaultItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Category", href: "/products/category" },
    { label: "Current Page" },
  ];

  describe("Rendering", () => {
    it("renders all breadcrumb items", () => {
      render(<Breadcrumb items={defaultItems} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("renders with correct ARIA label", () => {
      render(<Breadcrumb items={defaultItems} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    });

    it("renders with custom ARIA label", () => {
      render(<Breadcrumb items={defaultItems} aria-label="Page navigation" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Page navigation");
    });

    it("marks last item as current page", () => {
      render(<Breadcrumb items={defaultItems} />);

      const currentItem = screen.getByText("Current Page");
      expect(currentItem).toHaveAttribute("aria-current", "page");
    });

    it("renders separators between items", () => {
      const { container } = render(<Breadcrumb items={defaultItems} />);

      const separators = container.querySelectorAll('[aria-hidden="true"]');
      // Should have 3 separators (between 4 items)
      expect(separators.length).toBe(3);
    });
  });

  describe("Links and Buttons", () => {
    it("renders links for items with href", () => {
      render(<Breadcrumb items={defaultItems} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toHaveAttribute("href", "/");

      const productsLink = screen.getByRole("link", { name: /products/i });
      expect(productsLink).toHaveAttribute("href", "/products");
    });

    it("renders buttons for items with onClick", () => {
      const handleClick = vi.fn();
      const items: BreadcrumbItem[] = [
        { label: "Home", onClick: handleClick },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      const button = screen.getByRole("button", { name: /home/i });
      expect(button).toBeInTheDocument();
    });

    it("calls onClick handler when item is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const items: BreadcrumbItem[] = [
        { label: "Home", onClick: handleClick },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      const button = screen.getByRole("button", { name: /home/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick for links with both href and onClick", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/", onClick: handleClick },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      const link = screen.getByRole("link", { name: /home/i });
      await user.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(
        <Breadcrumb items={defaultItems} size="sm" />,
      );

      const breadcrumb = container.querySelector("nav");
      expect(breadcrumb).toHaveClass(styles["size-sm"]);
    });

    it("renders with medium size (default)", () => {
      const { container } = render(<Breadcrumb items={defaultItems} />);

      const breadcrumb = container.querySelector("nav");
      expect(breadcrumb).toHaveClass(styles["size-md"]);
    });

    it("renders with large size", () => {
      const { container } = render(
        <Breadcrumb items={defaultItems} size="lg" />,
      );

      const breadcrumb = container.querySelector("nav");
      expect(breadcrumb).toHaveClass(styles["size-lg"]);
    });
  });

  describe("Custom Separator", () => {
    it("renders with custom text separator", () => {
      render(<Breadcrumb items={defaultItems} separator="/" />);

      expect(screen.getAllByText("/")).toHaveLength(3);
    });

    it("renders with custom React element separator", () => {
      const customSeparator = <span data-testid="custom-sep">→</span>;
      render(<Breadcrumb items={defaultItems} separator={customSeparator} />);

      expect(screen.getAllByTestId("custom-sep")).toHaveLength(3);
    });
  });

  describe("Icons", () => {
    it("renders items with icons", () => {
      const items: BreadcrumbItem[] = [
        {
          label: "Home",
          href: "/",
          icon: <span data-testid="home-icon">🏠</span>,
        },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    });
  });

  describe("Collapsible Behavior", () => {
    it("shows all items when maxItems is not set", () => {
      const longItems: BreadcrumbItem[] = [
        { label: "Item 1", href: "/1" },
        { label: "Item 2", href: "/2" },
        { label: "Item 3", href: "/3" },
        { label: "Item 4", href: "/4" },
        { label: "Item 5", href: "/5" },
        { label: "Current" },
      ];

      render(<Breadcrumb items={longItems} />);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
      expect(screen.getByText("Item 4")).toBeInTheDocument();
      expect(screen.getByText("Item 5")).toBeInTheDocument();
    });

    it("collapses items when maxItems is set", () => {
      const longItems: BreadcrumbItem[] = [
        { label: "Item 1", href: "/1" },
        { label: "Item 2", href: "/2" },
        { label: "Item 3", href: "/3" },
        { label: "Item 4", href: "/4" },
        { label: "Item 5", href: "/5" },
        { label: "Current" },
      ];

      render(<Breadcrumb items={longItems} maxItems={4} />);

      // Should show: Item 1 / ... / Item 5 / Current
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("...")).toBeInTheDocument();
      expect(screen.getByText("Item 5")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();

      // Middle items should not be visible
      expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
      expect(screen.queryByText("Item 4")).not.toBeInTheDocument();
    });

    it("marks ellipsis as disabled", () => {
      const longItems: BreadcrumbItem[] = [
        { label: "Item 1", href: "/1" },
        { label: "Item 2", href: "/2" },
        { label: "Item 3", href: "/3" },
        { label: "Current" },
      ];

      const { container } = render(
        <Breadcrumb items={longItems} maxItems={3} />,
      );

      const ellipsis = screen.getByText("...");
      expect(ellipsis.className).toContain("disabled");
    });
  });

  describe("Disabled Items", () => {
    it("renders disabled items as spans", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Private", disabled: true },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      const privateItem = screen.getByText("Private");
      expect(privateItem.tagName).toBe("SPAN");
      expect(privateItem.className).toContain("disabled");
    });

    it("does not render link for disabled item even with href", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Private", href: "/private", disabled: true },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      const privateLink = screen.queryByRole("link", { name: /private/i });
      expect(privateLink).not.toBeInTheDocument();

      const privateSpan = screen.getByText("Private");
      expect(privateSpan.tagName).toBe("SPAN");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML structure", () => {
      render(<Breadcrumb items={defaultItems} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("marks separators as decorative", () => {
      const { container } = render(<Breadcrumb items={defaultItems} />);

      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });

    it("is keyboard navigable", async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={defaultItems} />);

      const homeLink = screen.getByRole("link", { name: /home/i });

      // Tab to first link
      await user.tab();
      expect(homeLink).toHaveFocus();

      // Tab to next link
      await user.tab();
      const productsLink = screen.getByRole("link", { name: /products/i });
      expect(productsLink).toHaveFocus();
    });

    it("supports Enter key on links", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/", onClick: handleClick },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      homeLink.focus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Breadcrumb items={defaultItems} className="custom-breadcrumb" />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("custom-breadcrumb");
    });
  });

  describe("Edge Cases", () => {
    it("renders with single item", () => {
      const items: BreadcrumbItem[] = [{ label: "Only Item" }];

      render(<Breadcrumb items={items} />);

      expect(screen.getByText("Only Item")).toBeInTheDocument();
      expect(screen.getByText("Only Item")).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("renders with empty items array", () => {
      const { container } = render(<Breadcrumb items={[]} />);

      const list = container.querySelector("ol");
      expect(list?.children.length).toBe(0);
    });

    it("handles items with React elements as labels", () => {
      const items: BreadcrumbItem[] = [
        { label: <strong>Bold Home</strong>, href: "/" },
        { label: "Current" },
      ];

      render(<Breadcrumb items={items} />);

      expect(screen.getByText("Bold Home")).toBeInTheDocument();
      expect(screen.getByText("Bold Home").tagName).toBe("STRONG");
    });
  });
});
