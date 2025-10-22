/// <reference types="@testing-library/jest-dom" />
/**
 * SubmenuPanel Component Tests
 * Tests for rendering, keyboard navigation, accessibility, and animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { SubmenuPanel } from "./SubmenuPanel.js";
import type { SubmenuItem } from "./SubmenuPanel.types.js";

// Mock useMediaQuery hook
vi.mock("../../../hooks/useMediaQuery.js", () => ({
  useMediaQuery: vi.fn(() => false), // Default to desktop
}));

describe("SubmenuPanel", () => {
  const mockItems: SubmenuItem[] = [
    { label: "Button", href: "/button" },
    { label: "Card", href: "/card" },
    { label: "Modal", href: "/modal" },
  ];

  describe("Rendering", () => {
    it("should render with required props", () => {
      render(<SubmenuPanel title="Components" items={mockItems} />);

      expect(screen.getByText("Components")).toBeInTheDocument();
      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Card")).toBeInTheDocument();
      expect(screen.getByText("Modal")).toBeInTheDocument();
    });

    it("should render all menu items", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(mockItems.length);
    });

    it("should render with custom className", () => {
      const { container } = render(
        <SubmenuPanel
          title="Menu"
          items={mockItems}
          className="custom-class"
        />,
      );

      const panel = container.firstChild as HTMLElement;
      expect(panel.className).toContain("custom-class");
    });

    it("should render with top position", () => {
      const { container } = render(
        <SubmenuPanel title="Menu" items={mockItems} top={120} />,
      );

      const panel = container.firstChild as HTMLElement;
      expect(panel.style.top).toBe("120px");
    });

    it("should render without top position", () => {
      const { container } = render(
        <SubmenuPanel title="Menu" items={mockItems} />,
      );

      const panel = container.firstChild as HTMLElement;
      expect(panel.style.top).toBe("");
    });
  });

  describe("Items with Icons", () => {
    const MockIcon = ({
      size = 20,
      strokeWidth = 1,
      color = "currentColor",
    }: {
      size?: number;
      strokeWidth?: number;
      color?: string;
    }) => (
      <svg
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        data-testid="mock-icon"
        aria-hidden="true"
      >
        <title>Mock Icon</title>
        <circle cx="10" cy="10" r="8" fill={color} />
      </svg>
    );

    it("should render items with icons", () => {
      const itemsWithIcons: SubmenuItem[] = [
        { label: "Button", href: "/button", icon: MockIcon },
        { label: "Card", href: "/card", icon: MockIcon },
      ];

      render(<SubmenuPanel title="Menu" items={itemsWithIcons} />);

      const icons = screen.getAllByTestId("mock-icon");
      expect(icons).toHaveLength(2);
    });

    it("should render items without icons", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const icons = screen.queryAllByTestId("mock-icon");
      expect(icons).toHaveLength(0);
    });

    it("should render mixed items with and without icons", () => {
      const mixedItems: SubmenuItem[] = [
        { label: "Button", href: "/button", icon: MockIcon },
        { label: "Card", href: "/card" },
        { label: "Modal", href: "/modal", icon: MockIcon },
      ];

      render(<SubmenuPanel title="Menu" items={mixedItems} />);

      const icons = screen.getAllByTestId("mock-icon");
      expect(icons).toHaveLength(2);
    });
  });

  describe("Animation States", () => {
    it("should not have closing class by default", () => {
      const { container } = render(
        <SubmenuPanel title="Menu" items={mockItems} />,
      );

      const panel = container.firstChild as HTMLElement;
      expect(panel.className).not.toContain("submenuClosing");
    });

    it("should apply closing class when isClosing is true", () => {
      const { container } = render(
        <SubmenuPanel title="Menu" items={mockItems} isClosing={true} />,
      );

      const panel = container.firstChild as HTMLElement;
      expect(panel.className).toContain("submenuClosing");
    });
  });

  describe("Event Handlers", () => {
    it("should call onItemClick when item is clicked", () => {
      const onItemClick = vi.fn();

      render(
        <SubmenuPanel
          title="Menu"
          items={mockItems}
          onItemClick={onItemClick}
        />,
      );

      const firstLink = screen.getByText("Button").closest("a");
      if (firstLink) {
        fireEvent.click(firstLink);
      }

      expect(onItemClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when Escape key is pressed", () => {
      const onClose = vi.fn();

      render(<SubmenuPanel title="Menu" items={mockItems} onClose={onClose} />);

      fireEvent.keyDown(window, { key: "Escape" });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should not throw when onClose is not provided", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      expect(() => {
        fireEvent.keyDown(window, { key: "Escape" });
      }).not.toThrow();
    });

    it("should not throw when onItemClick is not provided", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const firstLink = screen.getByText("Button").closest("a");

      expect(() => {
        if (firstLink) {
          fireEvent.click(firstLink);
        }
      }).not.toThrow();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should focus first item on Home key", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      fireEvent.keyDown(window, { key: "Home" });

      const firstLink = screen.getByText("Button").closest("a");
      expect(document.activeElement).toBe(firstLink);
    });

    it("should focus last item on End key", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      fireEvent.keyDown(window, { key: "End" });

      const lastLink = screen.getByText("Modal").closest("a");
      expect(document.activeElement).toBe(lastLink);
    });

    it("should navigate down with ArrowDown key", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      // Focus first item
      fireEvent.keyDown(window, { key: "Home" });
      const firstLink = screen.getByText("Button").closest("a");
      expect(document.activeElement).toBe(firstLink);

      // Navigate down
      fireEvent.keyDown(window, { key: "ArrowDown" });
      const secondLink = screen.getByText("Card").closest("a");
      expect(document.activeElement).toBe(secondLink);
    });

    it("should navigate up with ArrowUp key", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      // Focus last item
      fireEvent.keyDown(window, { key: "End" });
      const lastLink = screen.getByText("Modal").closest("a");
      expect(document.activeElement).toBe(lastLink);

      // Navigate up
      fireEvent.keyDown(window, { key: "ArrowUp" });
      const secondLink = screen.getByText("Card").closest("a");
      expect(document.activeElement).toBe(secondLink);
    });

    it("should wrap to first item when navigating down from last item", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      // Focus last item
      fireEvent.keyDown(window, { key: "End" });

      // Navigate down (should wrap to first)
      fireEvent.keyDown(window, { key: "ArrowDown" });
      const firstLink = screen.getByText("Button").closest("a");
      expect(document.activeElement).toBe(firstLink);
    });

    it("should wrap to last item when navigating up from first item", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      // Focus first item
      fireEvent.keyDown(window, { key: "Home" });

      // Navigate up (should wrap to last)
      fireEvent.keyDown(window, { key: "ArrowUp" });
      const lastLink = screen.getByText("Modal").closest("a");
      expect(document.activeElement).toBe(lastLink);
    });
  });

  describe("Accessibility", () => {
    it("should have navigation role", () => {
      const { container } = render(
        <SubmenuPanel title="Menu" items={mockItems} />,
      );

      const nav = container.querySelector('[role="navigation"]');
      expect(nav).toBeInTheDocument();
    });

    it("should have aria-label on navigation", () => {
      const { container } = render(
        <SubmenuPanel title="Components" items={mockItems} />,
      );

      const nav = container.querySelector('[role="navigation"]');
      expect(nav).toHaveAttribute("aria-label", "Components submenu");
    });

    it("should have aria-labelledby on nav element", () => {
      const { container } = render(
        <SubmenuPanel title="Resources" items={mockItems} />,
      );

      const navElement = container.querySelector("nav");
      expect(navElement).toHaveAttribute(
        "aria-labelledby",
        "submenu-title-Resources",
      );
    });

    it("should have id on title element", () => {
      render(<SubmenuPanel title="Settings" items={mockItems} />);

      const title = screen.getByText("Settings");
      expect(title).toHaveAttribute("id", "submenu-title-Settings");
    });

    it("should have aria-label on each link", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const buttonLink = screen.getByText("Button").closest("a");
      expect(buttonLink).toHaveAttribute("aria-label", "Button");
    });

    it("should have aria-hidden on icons", () => {
      const MockIcon = () => (
        <svg data-testid="mock-icon" aria-hidden="true">
          <title>Mock Icon</title>
          <circle cx="10" cy="10" r="8" />
        </svg>
      );

      const itemsWithIcons: SubmenuItem[] = [
        { label: "Button", href: "/button", icon: MockIcon },
      ];

      const { container } = render(
        <SubmenuPanel title="Menu" items={itemsWithIcons} />,
      );

      const iconSpan = container.querySelector(".submenuIcon");
      expect(iconSpan).toHaveAttribute("aria-hidden", "true");
    });

    it("should have valid href on all links", () => {
      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const buttonLink = screen.getByText("Button").closest("a");
      expect(buttonLink).toHaveAttribute("href", "/button");

      const cardLink = screen.getByText("Card").closest("a");
      expect(cardLink).toHaveAttribute("href", "/card");
    });
  });

  describe("Mobile Behavior", () => {
    it("should not show close button on desktop", () => {
      const { useMediaQuery } = require("../../../hooks/useMediaQuery.js");
      useMediaQuery.mockReturnValue(false); // Desktop

      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const closeButton = screen.queryByLabelText(/close/i);
      expect(closeButton).not.toBeInTheDocument();
    });

    it("should show close button on mobile", () => {
      const { useMediaQuery } = require("../../../hooks/useMediaQuery.js");
      useMediaQuery.mockReturnValue(true); // Mobile

      render(<SubmenuPanel title="Menu" items={mockItems} />);

      const closeButton = screen.getByLabelText(/close/i);
      expect(closeButton).toBeInTheDocument();
    });

    it("should call onClose when mobile close button is clicked", () => {
      const { useMediaQuery } = require("../../../hooks/useMediaQuery.js");
      useMediaQuery.mockReturnValue(true); // Mobile

      const onClose = vi.fn();

      render(<SubmenuPanel title="Menu" items={mockItems} onClose={onClose} />);

      const closeButton = screen.getByLabelText(/close/i);
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should have descriptive aria-label on mobile close button", () => {
      const { useMediaQuery } = require("../../../hooks/useMediaQuery.js");
      useMediaQuery.mockReturnValue(true); // Mobile

      render(<SubmenuPanel title="Components" items={mockItems} />);

      const closeButton = screen.getByLabelText("Close Components submenu");
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty items array", () => {
      render(<SubmenuPanel title="Empty" items={[]} />);

      expect(screen.getByText("Empty")).toBeInTheDocument();
      const links = screen.queryAllByRole("link");
      expect(links).toHaveLength(0);
    });

    it("should handle single item", () => {
      const singleItem: SubmenuItem[] = [{ label: "Only Item", href: "/only" }];

      render(<SubmenuPanel title="Single" items={singleItem} />);

      expect(screen.getByText("Only Item")).toBeInTheDocument();
    });

    it("should handle long item labels with ellipsis", () => {
      const longLabel = "This is a very long label that should be truncated";
      const itemWithLongLabel: SubmenuItem[] = [
        { label: longLabel, href: "/long" },
      ];

      render(<SubmenuPanel title="Long" items={itemWithLongLabel} />);

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it("should handle items with special characters", () => {
      const specialItems: SubmenuItem[] = [
        { label: "C++ Docs", href: "/cpp" },
        { label: "React & Vue", href: "/react-vue" },
        { label: "TypeScript <3", href: "/ts" },
      ];

      render(<SubmenuPanel title="Special" items={specialItems} />);

      expect(screen.getByText("C++ Docs")).toBeInTheDocument();
      expect(screen.getByText("React & Vue")).toBeInTheDocument();
      expect(screen.getByText("TypeScript <3")).toBeInTheDocument();
    });
  });

  describe("ForwardRef", () => {
    it("should forward ref to the panel element", () => {
      const ref = vi.fn();

      render(<SubmenuPanel ref={ref} title="Menu" items={mockItems} />);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it("should allow accessing panel element via ref", () => {
      const panelRef = React.createRef<HTMLDivElement>();

      render(<SubmenuPanel ref={panelRef} title="Menu" items={mockItems} />);

      expect(panelRef.current).toBeInstanceOf(HTMLDivElement);
      expect(panelRef.current).not.toBeNull();

      if (panelRef.current) {
        expect(panelRef.current.getAttribute("role")).toBe("navigation");
      }
    });
  });
});
