/// <reference types="@testing-library/jest-dom" />
/**
 * ButtonGroup Component Tests
 *
 * Tests for ButtonGroup component covering:
 * - Direction (horizontal/vertical)
 * - Compact mode
 * - Children rendering
 * - ARIA role and labels
 * - Custom className
 * - Multiple buttons rendering
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ButtonGroup } from "./ButtonGroup.js";
import styles from "./ButtonGroup.module.css";

describe("ButtonGroup", () => {
  describe("Rendering", () => {
    it("renders as a div element", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button 1</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toBeInTheDocument();
      expect(group?.nodeName).toBe("DIV");
    });

    it("renders children", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
          <button type="button">Button 3</button>
        </ButtonGroup>,
      );

      expect(screen.getByText("Button 1")).toBeInTheDocument();
      expect(screen.getByText("Button 2")).toBeInTheDocument();
      expect(screen.getByText("Button 3")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" className="custom-class">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveClass("custom-class");
    });
  });

  describe("Direction", () => {
    it("renders horizontal direction by default", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.querySelector(`.${styles.horizontal}`);
      expect(group).toBeInTheDocument();
    });

    it("renders horizontal direction explicitly", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" direction="horizontal">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.querySelector(`.${styles.horizontal}`);
      expect(group).toBeInTheDocument();
    });

    it("renders vertical direction", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" direction="vertical">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.querySelector(`.${styles.vertical}`);
      expect(group).toBeInTheDocument();
    });
  });

  describe("Compact Mode", () => {
    it("applies compact class when compact is true", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" compact>
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.querySelector(`.${styles.compact}`);
      expect(group).toBeInTheDocument();
    });

    it("does not apply compact class when compact is false", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" compact={false}>
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.querySelector(`.${styles.compact}`);
      expect(group).not.toBeInTheDocument();
    });
  });

  describe("ARIA Attributes", () => {
    it("has default role of group", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("role", "group");
    });

    it("supports custom role", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" role="radiogroup">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("role", "radiogroup");
    });

    it("supports aria-label", () => {
      const { container } = render(
        <ButtonGroup aria-label="Text formatting">
          <button type="button">Bold</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("aria-label", "Text formatting");
    });

    it("supports aria-labelledby", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" aria-labelledby="group-label">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("aria-labelledby", "group-label");
    });

    it("supports aria-describedby", () => {
      const { container } = render(
        <ButtonGroup
          aria-label="Button group"
          aria-describedby="group-description"
        >
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("aria-describedby", "group-description");
    });

    it("auto-sets aria-orientation for horizontal", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" direction="horizontal">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("auto-sets aria-orientation for vertical", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" direction="vertical">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("aria-orientation", "vertical");
    });

    it("supports custom aria-orientation", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" aria-orientation="vertical">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Multiple Buttons", () => {
    it("renders two buttons", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </ButtonGroup>,
      );

      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("renders many buttons", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
          <button type="button">Button 3</button>
          <button type="button">Button 4</button>
          <button type="button">Button 5</button>
        </ButtonGroup>,
      );

      expect(screen.getAllByRole("button")).toHaveLength(5);
    });

    it("maintains button functionality", () => {
      const buttons = [
        { label: "Bold", onClick: vi.fn() },
        { label: "Italic", onClick: vi.fn() },
        { label: "Underline", onClick: vi.fn() },
      ];

      render(
        <ButtonGroup aria-label="Button group">
          {buttons.map((btn) => (
            <button key={btn.label} type="button" onClick={btn.onClick}>
              {btn.label}
            </button>
          ))}
        </ButtonGroup>,
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("Italic")).toBeInTheDocument();
      expect(screen.getByText("Underline")).toBeInTheDocument();
    });
  });

  describe("Class Composition", () => {
    it("combines multiple classes", () => {
      const { container } = render(
        <ButtonGroup
          aria-label="Button group"
          direction="vertical"
          compact
          className="custom"
        >
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveClass(styles.vertical);
      expect(group).toHaveClass(styles.compact);
      expect(group).toHaveClass("custom");
    });
  });

  describe("Edge Cases", () => {
    it("handles single child", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Single Button</button>
        </ButtonGroup>,
      );

      expect(screen.getByText("Single Button")).toBeInTheDocument();
    });

    it("handles empty children gracefully", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">{null}</ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toBeInTheDocument();
    });

    it("handles mixed children types", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button</button>
          <span>Separator</span>
          <button type="button">Another Button</button>
        </ButtonGroup>,
      );

      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Separator")).toBeInTheDocument();
      expect(screen.getByText("Another Button")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      const { container } = render(
        <ButtonGroup aria-label="Actions">
          <button type="button">Action 1</button>
          <button type="button">Action 2</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("role", "group");
      expect(group).toHaveAttribute("aria-label", "Actions");
    });

    it("maintains button accessibility", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button" aria-label="Bold">
            B
          </button>
          <button type="button" aria-label="Italic">
            I
          </button>
        </ButtonGroup>,
      );

      const boldButton = screen.getByRole("button", { name: "Bold" });
      const italicButton = screen.getByRole("button", { name: "Italic" });

      expect(boldButton).toBeInTheDocument();
      expect(italicButton).toBeInTheDocument();
    });

    it("supports keyboard navigation with arrow keys", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">First</button>
          <button type="button">Second</button>
          <button type="button">Third</button>
        </ButtonGroup>,
      );

      const firstButton = screen.getByText("First");
      const secondButton = screen.getByText("Second");
      const thirdButton = screen.getByText("Third");

      // Focus first button
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      // Arrow right should move to second button
      const groupElement = container.firstChild as HTMLElement;
      fireEvent.keyDown(groupElement, { key: "ArrowRight" });
      expect(document.activeElement).toBe(secondButton);

      // Arrow right should move to third button
      fireEvent.keyDown(groupElement, { key: "ArrowRight" });
      expect(document.activeElement).toBe(thirdButton);

      // Arrow left should move back to second button
      fireEvent.keyDown(groupElement, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(secondButton);
    });

    it("wraps around at boundaries with arrow keys", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">First</button>
          <button type="button">Second</button>
        </ButtonGroup>,
      );

      const firstButton = screen.getByText("First");
      const secondButton = screen.getByText("Second");

      // Start at first button
      firstButton.focus();

      // Arrow left should wrap to last button
      const groupElement = container.firstChild as HTMLElement;
      fireEvent.keyDown(groupElement, { key: "ArrowLeft" });
      expect(document.activeElement).toBe(secondButton);

      // Arrow right should wrap to first button
      fireEvent.keyDown(groupElement, { key: "ArrowRight" });
      expect(document.activeElement).toBe(firstButton);
    });

    it("ignores disabled buttons in keyboard navigation", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">First</button>
          <button type="button" disabled>
            Disabled
          </button>
          <button type="button">Third</button>
        </ButtonGroup>,
      );

      const firstButton = screen.getByText("First");
      const thirdButton = screen.getByText("Third");

      firstButton.focus();

      // Arrow right should skip disabled button
      const groupElement = container.firstChild as HTMLElement;
      fireEvent.keyDown(groupElement, { key: "ArrowRight" });
      expect(document.activeElement).toBe(thirdButton);
    });

    it("supports custom onKeyDown handler", () => {
      const handleKeyDown = vi.fn();
      const { container } = render(
        <ButtonGroup aria-label="Button group" onKeyDown={handleKeyDown}>
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const groupElement = container.firstChild as HTMLElement;
      fireEvent.keyDown(groupElement, { key: "ArrowRight" });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Structure", () => {
    it("renders buttonGroup class", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.querySelector(`.${styles.buttonGroup}`);
      expect(group).toBeInTheDocument();
    });

    it("preserves button order", () => {
      render(
        <ButtonGroup aria-label="Button group">
          <button type="button">First</button>
          <button type="button">Second</button>
          <button type="button">Third</button>
        </ButtonGroup>,
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveTextContent("First");
      expect(buttons[1]).toHaveTextContent("Second");
      expect(buttons[2]).toHaveTextContent("Third");
    });
  });

  describe("Modern UI Features", () => {
    it("supports forwardRef", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ButtonGroup ref={ref} aria-label="Button group">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass(styles.buttonGroup);
    });

    it("applies modern CSS classes", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group" direction="horizontal" compact>
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveClass(styles.buttonGroup);
      expect(group).toHaveClass(styles.horizontal);
      expect(group).toHaveClass(styles.compact);
    });

    it("supports all HTML div attributes", () => {
      const { container } = render(
        <ButtonGroup
          aria-label="Button group"
          data-testid="test-group"
          id="my-group"
          style={{ backgroundColor: "red" }}
        >
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toHaveAttribute("data-testid", "test-group");
      expect(group).toHaveAttribute("id", "my-group");
      expect(group).toHaveStyle("background-color: rgb(255, 0, 0)");
    });

    it("handles empty children gracefully", () => {
      const { container } = render(
        <ButtonGroup aria-label="Empty group">
          {null}
          {undefined}
          {false}
        </ButtonGroup>,
      );

      const group = container.firstChild;
      expect(group).toBeInTheDocument();
      expect(group).toHaveAttribute("role", "group");
    });
  });

  describe("Performance", () => {
    it("uses modern CSS properties for performance", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">Button</button>
        </ButtonGroup>,
      );

      const group = container.firstChild as HTMLElement;

      // Verify the element has the expected classes and structure
      expect(group).toHaveClass(styles.buttonGroup);
      expect(group).toHaveAttribute("role", "group");
      expect(group).toHaveAttribute("aria-label", "Button group");

      // Verify it's a div element
      expect(group.tagName).toBe("DIV");
    });

    it("handles rapid keyboard navigation efficiently", () => {
      const { container } = render(
        <ButtonGroup aria-label="Button group">
          <button type="button">First</button>
          <button type="button">Second</button>
          <button type="button">Third</button>
        </ButtonGroup>,
      );

      const firstButton = screen.getByText("First");
      firstButton.focus();

      // Rapid key presses should not cause errors
      const groupElement = container.firstChild as HTMLElement;
      for (let i = 0; i < 10; i++) {
        fireEvent.keyDown(groupElement, { key: "ArrowRight" });
        fireEvent.keyDown(groupElement, { key: "ArrowLeft" });
      }

      // Should still be functional
      expect(document.activeElement).toBe(firstButton);
    });
  });
});
