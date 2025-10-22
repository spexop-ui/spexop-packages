/**
 * EmptyState Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  describe("Rendering", () => {
    it("should render with title", () => {
      render(<EmptyState title="No results found" />);
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("should render with default props", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.firstChild).toHaveClass("empty-state");
      expect(container.firstChild).toHaveClass("size-md");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <EmptyState title="Empty" className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render title as h3", () => {
      render(<EmptyState title="No results" />);
      const title = screen.getByText("No results");
      expect(title.nodeName).toBe("H3");
    });
  });

  describe("Description", () => {
    it("should render without description", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector(".description")).not.toBeInTheDocument();
    });

    it("should render with text description", () => {
      render(
        <EmptyState
          title="No results"
          description="Try adjusting your search"
        />,
      );
      expect(screen.getByText("Try adjusting your search")).toBeInTheDocument();
    });

    it("should render with ReactNode description", () => {
      render(
        <EmptyState
          title="No results"
          description={
            <div>
              <span>Custom</span> description
            </div>
          }
        />,
      );
      expect(screen.getByText("Custom")).toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();
    });

    it("should render description as paragraph", () => {
      render(
        <EmptyState
          title="No results"
          description="Try adjusting your search"
        />,
      );
      const description = screen.getByText("Try adjusting your search");
      expect(description.nodeName).toBe("P");
    });
  });

  describe("Icon", () => {
    it("should render without icon", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector(".icon")).not.toBeInTheDocument();
    });

    it("should render with icon", () => {
      const icon = <span data-testid="custom-icon">📁</span>;
      render(<EmptyState title="Empty" icon={icon} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should render with SVG icon", () => {
      const svgIcon = (
        <svg data-testid="svg-icon" aria-labelledby="svg-title">
          <title id="svg-title">Icon</title>
          <circle cx="10" cy="10" r="5" />
        </svg>
      );
      render(<EmptyState title="Empty" icon={svgIcon} />);
      expect(screen.getByTestId("svg-icon")).toBeInTheDocument();
    });

    it("should render with custom component icon", () => {
      const CustomIcon = () => <div data-testid="component-icon">Icon</div>;
      render(<EmptyState title="Empty" icon={<CustomIcon />} />);
      expect(screen.getByTestId("component-icon")).toBeInTheDocument();
    });
  });

  describe("Action", () => {
    it("should render without action", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.querySelector(".action")).not.toBeInTheDocument();
    });

    it("should render with action button", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="Empty"
          action={
            <button type="button" onClick={handleClick}>
              Add Item
            </button>
          }
        />,
      );

      const button = screen.getByText("Add Item");
      expect(button).toBeInTheDocument();

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render with multiple actions", () => {
      render(
        <EmptyState
          title="Empty"
          action={
            <>
              <button type="button">Primary Action</button>
              <button type="button">Secondary Action</button>
            </>
          }
        />,
      );

      expect(screen.getByText("Primary Action")).toBeInTheDocument();
      expect(screen.getByText("Secondary Action")).toBeInTheDocument();
    });

    it("should render with custom action element", () => {
      render(
        <EmptyState title="Empty" action={<a href="/create">Create New</a>} />,
      );

      expect(screen.getByText("Create New")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render md size by default", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.firstChild).toHaveClass("size-md");
    });

    it("should render sm size", () => {
      const { container } = render(<EmptyState title="Empty" size="sm" />);
      expect(container.firstChild).toHaveClass("size-sm");
    });

    it("should render md size", () => {
      const { container } = render(<EmptyState title="Empty" size="md" />);
      expect(container.firstChild).toHaveClass("size-md");
    });

    it("should render lg size", () => {
      const { container } = render(<EmptyState title="Empty" size="lg" />);
      expect(container.firstChild).toHaveClass("size-lg");
    });
  });

  describe("Accessibility", () => {
    it("should have status role", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.firstChild).toHaveAttribute("role", "status");
    });

    it("should have aria-live polite", () => {
      const { container } = render(<EmptyState title="Empty" />);
      expect(container.firstChild).toHaveAttribute("aria-live", "polite");
    });

    it("should announce content to screen readers", () => {
      const { container } = render(
        <EmptyState title="No results" description="Try again" />,
      );
      expect(container.firstChild).toHaveAttribute("role", "status");
      expect(container.firstChild).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Complete Examples", () => {
    it("should render complete empty state with all props", () => {
      const icon = <span data-testid="icon">📁</span>;
      render(
        <EmptyState
          title="No files"
          description="Upload your first file to get started"
          icon={icon}
          action={<button type="button">Upload File</button>}
          size="lg"
          className="custom"
        />,
      );

      expect(screen.getByText("No files")).toBeInTheDocument();
      expect(
        screen.getByText("Upload your first file to get started"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Upload File")).toBeInTheDocument();
    });

    it("should render minimal empty state", () => {
      render(<EmptyState title="Empty" />);
      expect(screen.getByText("Empty")).toBeInTheDocument();
    });
  });

  describe("Use Cases", () => {
    it("should work as no results state", () => {
      render(
        <EmptyState
          title="No results found"
          description="Try adjusting your search"
          action={<button type="button">Clear filters</button>}
        />,
      );

      expect(screen.getByText("No results found")).toBeInTheDocument();
      expect(screen.getByText("Try adjusting your search")).toBeInTheDocument();
      expect(screen.getByText("Clear filters")).toBeInTheDocument();
    });

    it("should work as no data state", () => {
      render(
        <EmptyState
          title="No data yet"
          description="Add your first item to get started"
          action={<button type="button">Add Item</button>}
        />,
      );

      expect(screen.getByText("No data yet")).toBeInTheDocument();
      expect(
        screen.getByText("Add your first item to get started"),
      ).toBeInTheDocument();
      expect(screen.getByText("Add Item")).toBeInTheDocument();
    });

    it("should work as error state", () => {
      render(
        <EmptyState
          title="Something went wrong"
          description="Please try again later"
          action={<button type="button">Retry</button>}
        />,
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(screen.getByText("Please try again later")).toBeInTheDocument();
      expect(screen.getByText("Retry")).toBeInTheDocument();
    });

    it("should work as empty list state", () => {
      render(<EmptyState title="No items" description="Your list is empty" />);

      expect(screen.getByText("No items")).toBeInTheDocument();
      expect(screen.getByText("Your list is empty")).toBeInTheDocument();
    });
  });

  describe("Content Structure", () => {
    it("should have correct content order", () => {
      const { container } = render(
        <EmptyState
          icon={<span>Icon</span>}
          title="Title"
          description="Description"
          action={<button type="button">Action</button>}
        />,
      );

      const emptyState = container.firstChild;
      const children = emptyState?.childNodes;

      expect(children?.[0]).toHaveClass("icon");
      expect(children?.[1]).toHaveClass("content");
      expect(children?.[2]).toHaveClass("action");
    });

    it("should wrap title and description in content div", () => {
      const { container } = render(
        <EmptyState title="Title" description="Description" />,
      );

      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();
      expect(content?.querySelector(".title")).toBeInTheDocument();
      expect(content?.querySelector(".description")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle ReactNode title", () => {
      render(<EmptyState title={<span>Custom Title</span>} />);
      expect(screen.getByText("Custom Title")).toBeInTheDocument();
    });

    it("should handle empty title", () => {
      render(<EmptyState title="" />);
      const { container } = render(<EmptyState title="" />);
      expect(container.querySelector(".title")).toBeInTheDocument();
    });

    it("should handle very long title", () => {
      const longTitle =
        "This is a very long title that should still render correctly without breaking the layout";
      render(<EmptyState title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle very long description", () => {
      const longDesc =
        "This is a very long description that should still render correctly without breaking the layout and provide helpful information to the user";
      render(<EmptyState title="Empty" description={longDesc} />);
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it("should handle undefined className", () => {
      const { container } = render(
        <EmptyState title="Empty" className={undefined} />,
      );
      expect(container.firstChild).toHaveClass("empty-state");
    });

    it("should handle complex nested content", () => {
      render(
        <EmptyState
          title={
            <>
              <strong>Bold</strong> Title
            </>
          }
          description={
            <>
              <em>Italic</em> description
            </>
          }
        />,
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("Italic")).toBeInTheDocument();
    });
  });

  describe("Multiple EmptyStates", () => {
    it("should render multiple empty states independently", () => {
      render(
        <>
          <EmptyState title="Empty 1" />
          <EmptyState title="Empty 2" />
          <EmptyState title="Empty 3" />
        </>,
      );

      expect(screen.getByText("Empty 1")).toBeInTheDocument();
      expect(screen.getByText("Empty 2")).toBeInTheDocument();
      expect(screen.getByText("Empty 3")).toBeInTheDocument();
    });

    it("should maintain separate props for multiple empty states", () => {
      const { container } = render(
        <>
          <EmptyState title="Small" size="sm" />
          <EmptyState title="Large" size="lg" />
        </>,
      );

      const emptyStates = container.querySelectorAll(".empty-state");
      expect(emptyStates[0]).toHaveClass("size-sm");
      expect(emptyStates[1]).toHaveClass("size-lg");
    });
  });

  describe("Interactive Elements", () => {
    it("should support keyboard navigation for action buttons", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmptyState
          title="Empty"
          action={
            <button type="button" onClick={handleClick}>
              Action
            </button>
          }
        />,
      );

      const button = screen.getByText("Action");
      button.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalled();
    });

    it("should support multiple interactive actions", async () => {
      const user = userEvent.setup();
      const handlePrimary = vi.fn();
      const handleSecondary = vi.fn();

      render(
        <EmptyState
          title="Empty"
          action={
            <>
              <button type="button" onClick={handlePrimary}>
                Primary
              </button>
              <button type="button" onClick={handleSecondary}>
                Secondary
              </button>
            </>
          }
        />,
      );

      await user.click(screen.getByText("Primary"));
      await user.click(screen.getByText("Secondary"));

      expect(handlePrimary).toHaveBeenCalledTimes(1);
      expect(handleSecondary).toHaveBeenCalledTimes(1);
    });
  });
});
