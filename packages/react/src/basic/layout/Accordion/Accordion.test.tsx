/**
 * Accordion Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion.types";

describe("Accordion", () => {
  const mockItems: AccordionItem[] = [
    { id: "1", title: "Section 1", content: <div>Content 1</div> },
    { id: "2", title: "Section 2", content: <div>Content 2</div> },
    { id: "3", title: "Section 3", content: <div>Content 3</div> },
  ];

  describe("Rendering", () => {
    it("should render all items", () => {
      render(<Accordion items={mockItems} />);

      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
      expect(screen.getByText("Section 3")).toBeInTheDocument();
    });

    it("should render with default props", () => {
      const { container } = render(<Accordion items={mockItems} />);
      expect(container.firstChild).toHaveClass("accordion");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Accordion items={mockItems} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render with size variants", () => {
      const { container: smallContainer } = render(
        <Accordion items={mockItems} size="sm" />,
      );
      expect(smallContainer.firstChild).toHaveClass("size-sm");

      const { container: largeContainer } = render(
        <Accordion items={mockItems} size="lg" />,
      );
      expect(largeContainer.firstChild).toHaveClass("size-lg");
    });

    it("should render with visual variants", () => {
      const { container: borderedContainer } = render(
        <Accordion items={mockItems} variant="bordered" />,
      );
      expect(borderedContainer.firstChild).toHaveClass("variant-bordered");

      const { container: separatedContainer } = render(
        <Accordion items={mockItems} variant="separated" />,
      );
      expect(separatedContainer.firstChild).toHaveClass("variant-separated");
    });
  });

  describe("Expansion Behavior", () => {
    it("should toggle item expansion on click", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should collapse other items when allowMultiple is false", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} allowMultiple={false} />);

      const button1 = screen.getByText("Section 1");
      const button2 = screen.getByText("Section 2");

      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "true");

      await user.click(button2);
      expect(button1).toHaveAttribute("aria-expanded", "false");
      expect(button2).toHaveAttribute("aria-expanded", "true");
    });

    it("should allow multiple items expanded when allowMultiple is true", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} allowMultiple={true} />);

      const button1 = screen.getByText("Section 1");
      const button2 = screen.getByText("Section 2");

      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "true");

      await user.click(button2);
      expect(button1).toHaveAttribute("aria-expanded", "true");
      expect(button2).toHaveAttribute("aria-expanded", "true");
    });

    it("should honor defaultExpandedItems", () => {
      render(<Accordion items={mockItems} defaultExpandedItems={["1", "2"]} />);

      const button1 = screen.getByText("Section 1");
      const button2 = screen.getByText("Section 2");

      expect(button1).toHaveAttribute("aria-expanded", "true");
      expect(button2).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Controlled Mode", () => {
    it("should work in controlled mode", async () => {
      const user = userEvent.setup();
      const handleExpandedChange = vi.fn();
      const { rerender } = render(
        <Accordion
          items={mockItems}
          expandedItems={["1"]}
          onExpandedChange={handleExpandedChange}
        />,
      );

      const button2 = screen.getByText("Section 2");
      await user.click(button2);

      expect(handleExpandedChange).toHaveBeenCalledWith(["1", "2"]);

      // Update to reflect controlled state change
      rerender(
        <Accordion
          items={mockItems}
          expandedItems={["1", "2"]}
          onExpandedChange={handleExpandedChange}
        />,
      );

      expect(screen.getByText("Section 1")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      expect(screen.getByText("Section 2")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("should call onExpandedChange when expanding", async () => {
      const user = userEvent.setup();
      const handleExpandedChange = vi.fn();
      render(
        <Accordion items={mockItems} onExpandedChange={handleExpandedChange} />,
      );

      await user.click(screen.getByText("Section 1"));
      expect(handleExpandedChange).toHaveBeenCalledWith(["1"]);
    });

    it("should call onExpandedChange when collapsing", async () => {
      const user = userEvent.setup();
      const handleExpandedChange = vi.fn();
      render(
        <Accordion
          items={mockItems}
          defaultExpandedItems={["1"]}
          onExpandedChange={handleExpandedChange}
        />,
      );

      await user.click(screen.getByText("Section 1"));
      expect(handleExpandedChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Disabled Items", () => {
    it("should not expand disabled items", async () => {
      const user = userEvent.setup();
      const disabledItems = [
        ...mockItems,
        {
          id: "4",
          title: "Disabled Section",
          content: <div>Content</div>,
          disabled: true,
        },
      ];

      render(<Accordion items={disabledItems} />);

      const button = screen.getByText("Disabled Section");
      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toBeDisabled();
    });

    it("should apply disabled class to disabled items", () => {
      const disabledItems = [
        {
          id: "1",
          title: "Section 1",
          content: <div>Content</div>,
          disabled: true,
        },
      ];

      const { container } = render(<Accordion items={disabledItems} />);
      const item = container.querySelector(".item");
      expect(item).toHaveClass("disabled");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should navigate with ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button1 = screen.getByText("Section 1");
      button1.focus();

      await user.keyboard("{ArrowDown}");
      expect(screen.getByText("Section 2")).toHaveFocus();
    });

    it("should navigate with ArrowUp", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button2 = screen.getByText("Section 2");
      button2.focus();

      await user.keyboard("{ArrowUp}");
      expect(screen.getByText("Section 1")).toHaveFocus();
    });

    it("should navigate to first item with Home", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button3 = screen.getByText("Section 3");
      button3.focus();

      await user.keyboard("{Home}");
      expect(screen.getByText("Section 1")).toHaveFocus();
    });

    it("should navigate to last item with End", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button1 = screen.getByText("Section 1");
      button1.focus();

      await user.keyboard("{End}");
      expect(screen.getByText("Section 3")).toHaveFocus();
    });

    it("should skip disabled items in keyboard navigation", async () => {
      const user = userEvent.setup();
      const itemsWithDisabled = [
        mockItems[0],
        { ...mockItems[1], disabled: true },
        mockItems[2],
      ];

      render(<Accordion items={itemsWithDisabled} />);

      const button1 = screen.getByText("Section 1");
      button1.focus();

      await user.keyboard("{ArrowDown}");
      expect(screen.getByText("Section 3")).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      expect(button).toHaveAttribute("aria-expanded");
      expect(button).toHaveAttribute("aria-controls");
    });

    it("should link header to panel with aria-controls", () => {
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId as string);

      expect(panel).toBeInTheDocument();
      expect(panel).toHaveAttribute("role", "region");
    });

    it("should link panel to header with aria-labelledby", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      await user.click(button);

      const buttonId = button.getAttribute("id");
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId as string);

      expect(panel).toHaveAttribute("aria-labelledby", buttonId);
    });

    it("should hide icon from screen readers", () => {
      const { container } = render(<Accordion items={mockItems} />);
      const icon = container.querySelector(".icon");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should hide collapsed panels", () => {
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId as string);

      expect(panel).toHaveAttribute("hidden");
    });

    it("should show expanded panels", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      await user.click(button);

      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId as string);

      expect(panel).not.toHaveAttribute("hidden");
    });
  });

  describe("Content Rendering", () => {
    it("should render ReactNode content", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      await user.click(screen.getByText("Section 1"));
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("should render complex content", async () => {
      const user = userEvent.setup();
      const complexItems = [
        {
          id: "1",
          title: <span>Complex Title</span>,
          content: (
            <div>
              <h4>Complex Content</h4>
              <p>With multiple elements</p>
            </div>
          ),
        },
      ];

      render(<Accordion items={complexItems} />);

      await user.click(screen.getByText("Complex Title"));
      expect(screen.getByText("Complex Content")).toBeInTheDocument();
      expect(screen.getByText("With multiple elements")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty items array", () => {
      const { container } = render(<Accordion items={[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle single item", async () => {
      const user = userEvent.setup();
      const singleItem = [mockItems[0]];

      render(<Accordion items={singleItem} />);

      const button = screen.getByText("Section 1");
      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("should handle rapid clicks", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("should handle items with duplicate IDs gracefully", () => {
      const duplicateItems = [
        { id: "1", title: "Section 1", content: <div>Content 1</div> },
        { id: "1", title: "Section 2", content: <div>Content 2</div> },
      ];

      // Should render without crashing
      const { container } = render(<Accordion items={duplicateItems} />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Visual States", () => {
    it("should apply expanded class when item is expanded", async () => {
      const user = userEvent.setup();
      const { container } = render(<Accordion items={mockItems} />);

      const button = screen.getByText("Section 1");
      await user.click(button);

      const item = container.querySelector(".item");
      expect(item).toHaveClass("expanded");
    });

    it("should remove expanded class when item is collapsed", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Accordion items={mockItems} defaultExpandedItems={["1"]} />,
      );

      const button = screen.getByText("Section 1");
      const item = container.querySelector(".item");

      expect(item).toHaveClass("expanded");

      await user.click(button);
      expect(item).not.toHaveClass("expanded");
    });
  });
});
