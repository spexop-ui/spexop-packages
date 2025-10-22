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

import { render, screen } from "@testing-library/react";
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
});
