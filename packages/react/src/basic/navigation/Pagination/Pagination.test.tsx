/**
 * Pagination Component Tests
 *
 * Tests for Pagination component covering:
 * - Page navigation and state changes
 * - Disabled states
 * - Keyboard navigation
 * - ARIA attributes and accessibility
 * - Size variants
 * - Sibling count configuration
 * - First/Last/Prev/Next buttons
 * - Custom labels
 * - Ellipsis display logic
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination.js";
import styles from "./Pagination.module.css";

describe("Pagination", () => {
  describe("Rendering", () => {
    it("renders with correct ARIA label", () => {
      render(
        <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />,
      );

      const nav = screen.getByRole("navigation", { name: "Pagination" });
      expect(nav).toBeInTheDocument();
    });

    it("renders page numbers", () => {
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
      );

      expect(
        screen.getByRole("button", { name: "Page 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 2" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 3" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 4" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 5" }),
      ).toBeInTheDocument();
    });

    it("marks current page with aria-current", () => {
      render(
        <Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />,
      );

      const currentPage = screen.getByRole("button", { name: "Page 3" });
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("renders first/last buttons by default", () => {
      render(
        <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />,
      );

      expect(screen.getByRole("button", { name: "First" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Last" })).toBeInTheDocument();
    });

    it("renders previous/next buttons by default", () => {
      render(
        <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />,
      );

      expect(
        screen.getByRole("button", { name: "Previous" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    });
  });

  describe("Page Navigation", () => {
    it("calls onPageChange when clicking a page number", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />,
      );

      const page3Button = screen.getByRole("button", { name: "Page 3" });
      await user.click(page3Button);

      expect(handlePageChange).toHaveBeenCalledWith(3);
      expect(handlePageChange).toHaveBeenCalledTimes(1);
    });

    it("calls onPageChange when clicking next button", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={handlePageChange}
        />,
      );

      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);

      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it("calls onPageChange when clicking previous button", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={handlePageChange}
        />,
      );

      const prevButton = screen.getByRole("button", { name: "Previous" });
      await user.click(prevButton);

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it("calls onPageChange when clicking first button", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={handlePageChange}
        />,
      );

      const firstButton = screen.getByRole("button", { name: "First" });
      await user.click(firstButton);

      expect(handlePageChange).toHaveBeenCalledWith(1);
    });

    it("calls onPageChange when clicking last button", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={handlePageChange}
        />,
      );

      const lastButton = screen.getByRole("button", { name: "Last" });
      await user.click(lastButton);

      expect(handlePageChange).toHaveBeenCalledWith(10);
    });

    it("does not call onPageChange when clicking current page", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={handlePageChange}
        />,
      );

      const currentPage = screen.getByRole("button", { name: "Page 3" });
      await user.click(currentPage);

      expect(handlePageChange).not.toHaveBeenCalled();
    });
  });

  describe("Disabled States", () => {
    it("disables previous and first buttons on first page", () => {
      render(
        <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />,
      );

      const firstButton = screen.getByRole("button", { name: "First" });
      const prevButton = screen.getByRole("button", { name: "Previous" });

      expect(firstButton).toBeDisabled();
      expect(prevButton).toBeDisabled();
    });

    it("disables next and last buttons on last page", () => {
      render(
        <Pagination currentPage={10} totalPages={10} onPageChange={vi.fn()} />,
      );

      const nextButton = screen.getByRole("button", { name: "Next" });
      const lastButton = screen.getByRole("button", { name: "Last" });

      expect(nextButton).toBeDisabled();
      expect(lastButton).toBeDisabled();
    });

    it("disables current page button", () => {
      render(
        <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />,
      );

      const currentPage = screen.getByRole("button", { name: "Page 5" });
      expect(currentPage).toBeDisabled();
    });

    it("does not navigate when clicking disabled buttons", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={handlePageChange}
        />,
      );

      const firstButton = screen.getByRole("button", { name: "First" });
      await user.click(firstButton);

      expect(handlePageChange).not.toHaveBeenCalled();
    });
  });

  describe("Sibling Count", () => {
    it("shows 1 sibling on each side by default", () => {
      render(
        <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />,
      );

      // Should show: 1 ... 4 5 6 ... 10
      expect(
        screen.getByRole("button", { name: "Page 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 4" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 5" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 6" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 10" }),
      ).toBeInTheDocument();
    });

    it("respects custom sibling count", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={vi.fn()}
          siblingCount={2}
        />,
      );

      // Should show: 1 ... 3 4 5 6 7 ... 10
      expect(
        screen.getByRole("button", { name: "Page 3" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 4" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 5" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 6" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 7" }),
      ).toBeInTheDocument();
    });
  });

  describe("Ellipsis Display", () => {
    it("shows ellipsis when pages are truncated", () => {
      render(
        <Pagination currentPage={5} totalPages={20} onPageChange={vi.fn()} />,
      );

      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it("does not show ellipsis when all pages fit", () => {
      render(
        <Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />,
      );

      const ellipses = screen.queryAllByText("...");
      expect(ellipses.length).toBe(0);
    });

    it("shows left ellipsis when current page is near end", () => {
      render(
        <Pagination currentPage={18} totalPages={20} onPageChange={vi.fn()} />,
      );

      // Should have ellipsis on left side
      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it("shows right ellipsis when current page is near start", () => {
      render(
        <Pagination currentPage={3} totalPages={20} onPageChange={vi.fn()} />,
      );

      // Should have ellipsis on right side
      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });

  describe("Configuration Options", () => {
    it("hides first/last buttons when showFirstLast is false", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={vi.fn()}
          showFirstLast={false}
        />,
      );

      expect(
        screen.queryByRole("button", { name: "First" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Last" }),
      ).not.toBeInTheDocument();
    });

    it("hides prev/next buttons when showPrevNext is false", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={vi.fn()}
          showPrevNext={false}
        />,
      );

      expect(
        screen.queryByRole("button", { name: "Previous" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Next" }),
      ).not.toBeInTheDocument();
    });

    it("hides page numbers when showPageNumbers is false", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={vi.fn()}
          showPageNumbers={false}
        />,
      );

      expect(
        screen.queryByRole("button", { name: "Page 1" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Page 5" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Custom Labels", () => {
    it("uses custom labels for buttons", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={vi.fn()}
          labels={{
            first: "Start",
            previous: "Prev",
            next: "Next Page",
            last: "End",
          }}
        />,
      );

      expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Next Page" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "End" })).toBeInTheDocument();
    });

    it("uses custom page label function", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={vi.fn()}
          labels={{
            page: (p) => `Go to page ${p}`,
          }}
        />,
      );

      expect(
        screen.getByRole("button", { name: "Go to page 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to page 5" }),
      ).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={vi.fn()}
          size="sm"
        />,
      );

      const pagination = container.querySelector("nav");
      expect(pagination).toHaveClass(styles["size-sm"]);
    });

    it("renders with medium size (default)", () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
      );

      const pagination = container.querySelector("nav");
      expect(pagination).toHaveClass(styles["size-md"]);
    });

    it("renders with large size", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={vi.fn()}
          size="lg"
        />,
      );

      const pagination = container.querySelector("nav");
      expect(pagination).toHaveClass(styles["size-lg"]);
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML structure", () => {
      render(
        <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("marks ellipsis as decorative", () => {
      render(
        <Pagination currentPage={10} totalPages={20} onPageChange={vi.fn()} />,
      );

      const ellipses = screen.getAllByText("...");
      for (const ellipsis of ellipses) {
        expect(ellipsis).toHaveAttribute("aria-hidden", "true");
      }
    });

    it("is keyboard navigable", async () => {
      const user = userEvent.setup();
      render(
        <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />,
      );

      const firstButton = screen.getByRole("button", { name: "First" });

      // Tab to first button
      await user.tab();
      expect(firstButton).toHaveFocus();
    });

    it("supports Enter key on buttons", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />,
      );

      const page2Button = screen.getByRole("button", { name: "Page 2" });
      page2Button.focus();

      await user.keyboard("{Enter}");
      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it("supports Space key on buttons", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />,
      );

      const page3Button = screen.getByRole("button", { name: "Page 3" });
      page3Button.focus();

      await user.keyboard("{ }");
      expect(handlePageChange).toHaveBeenCalledWith(3);
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={vi.fn()}
          className="custom-pagination"
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("custom-pagination");
    });
  });

  describe("Edge Cases", () => {
    it("handles single page", () => {
      render(
        <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
      );

      const page1Button = screen.getByRole("button", { name: "Page 1" });
      expect(page1Button).toBeDisabled();

      // All navigation buttons should be disabled
      expect(screen.getByRole("button", { name: "First" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Last" })).toBeDisabled();
    });

    it("handles two pages", () => {
      render(
        <Pagination currentPage={1} totalPages={2} onPageChange={vi.fn()} />,
      );

      expect(
        screen.getByRole("button", { name: "Page 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Page 2" }),
      ).toBeInTheDocument();
    });

    it("does not navigate beyond total pages", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={10}
          totalPages={10}
          onPageChange={handlePageChange}
        />,
      );

      const nextButton = screen.getByRole("button", { name: "Next" });
      await user.click(nextButton);

      expect(handlePageChange).not.toHaveBeenCalled();
    });

    it("does not navigate below page 1", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={handlePageChange}
        />,
      );

      const prevButton = screen.getByRole("button", { name: "Previous" });
      await user.click(prevButton);

      expect(handlePageChange).not.toHaveBeenCalled();
    });
  });
});
