/**
 * NavSection Component Tests
 *
 * Tests for NavSection component covering:
 * - Expand/collapse functionality
 * - Default open state
 * - Click handlers
 * - ARIA attributes
 * - Keyboard interaction
 * - Icon rotation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { NavSection } from "./NavSection.js";
import styles from "./NavSection.module.css";

describe("NavSection", () => {
  describe("Rendering", () => {
    it("renders section label", () => {
      render(
        <NavSection label="Projects">
          <div>Content</div>
        </NavSection>,
      );

      expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    it("renders as a button", () => {
      render(
        <NavSection label="Settings">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /settings/i });
      expect(button).toBeInTheDocument();
    });

    it("renders children content", () => {
      render(
        <NavSection label="Menu" defaultOpen={true}>
          <div>Menu Items</div>
        </NavSection>,
      );

      expect(screen.getByText("Menu Items")).toBeInTheDocument();
    });

    it("renders toggle icon", () => {
      const { container } = render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
      expect(icon?.textContent).toBe("+");
    });
  });

  describe("Expand/Collapse", () => {
    it("is collapsed by default", () => {
      const { container } = render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const content = container.querySelector("section");
      expect(content).not.toHaveClass(styles.open);
    });

    it("is expanded when defaultOpen is true", () => {
      const { container } = render(
        <NavSection label="Section" defaultOpen={true}>
          <div>Content</div>
        </NavSection>,
      );

      const content = container.querySelector("section");
      expect(content).toHaveClass(styles.open);
    });

    it("toggles on button click", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });
      const content = container.querySelector("section");

      // Initially closed
      expect(content).not.toHaveClass(styles.open);

      // Click to open
      await user.click(button);
      expect(content).toHaveClass(styles.open);

      // Click to close
      await user.click(button);
      expect(content).not.toHaveClass(styles.open);
    });

    it("calls onToggle callback when toggled", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      render(
        <NavSection label="Section" onToggle={handleToggle}>
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });

      // Open
      await user.click(button);
      expect(handleToggle).toHaveBeenCalledWith(true);

      // Close
      await user.click(button);
      expect(handleToggle).toHaveBeenCalledWith(false);

      expect(handleToggle).toHaveBeenCalledTimes(2);
    });
  });

  describe("ARIA Attributes", () => {
    it("sets aria-expanded correctly", async () => {
      const user = userEvent.setup();
      render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });

      // Initially collapsed
      expect(button).toHaveAttribute("aria-expanded", "false");

      // After click, expanded
      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("connects button to content with aria-controls", () => {
      render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });
      const contentId = button.getAttribute("aria-controls");

      expect(contentId).toBeTruthy();

      const content = document.getElementById(contentId as string);
      expect(content).toBeInTheDocument();
    });

    it("connects content to button with aria-labelledby", () => {
      render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });
      const buttonId = button.getAttribute("id");

      const { container } = render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );
      const content = container.querySelector("section");
      const labelledBy = content?.getAttribute("aria-labelledby");

      expect(labelledBy).toBeTruthy();
    });
  });

  describe("Icon Rotation", () => {
    it("applies open class to icon when expanded", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const icon = container.querySelector('[aria-hidden="true"]');
      const button = screen.getByRole("button", { name: /section/i });

      // Initially not open
      expect(icon).not.toHaveClass(styles.open);

      // Click to expand
      await user.click(button);
      expect(icon).toHaveClass(styles.open);
    });
  });

  describe("Keyboard Navigation", () => {
    it("is focusable via keyboard", async () => {
      const user = userEvent.setup();
      render(
        <NavSection label="Section">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });

      await user.tab();
      expect(button).toHaveFocus();
    });

    it("toggles on Enter key", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      render(
        <NavSection label="Section" onToggle={handleToggle}>
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });
      button.focus();

      await user.keyboard("{Enter}");
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it("toggles on Space key", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      render(
        <NavSection label="Section" onToggle={handleToggle}>
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button", { name: /section/i });
      button.focus();

      await user.keyboard("{ }");
      expect(handleToggle).toHaveBeenCalledWith(true);
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(
        <NavSection label="Section" className="custom-section">
          <div>Content</div>
        </NavSection>,
      );

      const section = container.querySelector(".navSection");
      expect(section).toHaveClass("custom-section");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label", () => {
      render(
        <NavSection label="">
          <div>Content</div>
        </NavSection>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles empty children", () => {
      render(<NavSection label="Empty Section">{null}</NavSection>);

      const button = screen.getByRole("button", { name: /empty section/i });
      expect(button).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <NavSection label="Section" defaultOpen={true}>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </NavSection>,
      );

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });
  });
});
