/**
 * NavLink Component Tests
 *
 * Tests for NavLink component covering:
 * - Rendering with href
 * - Active state
 * - Click handlers
 * - ARIA attributes
 * - Keyboard navigation
 * - Custom class names
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { NavLink } from "./NavLink.js";
import styles from "./NavLink.module.css";

describe("NavLink", () => {
  describe("Rendering", () => {
    it("renders as an anchor tag", () => {
      render(<NavLink href="/home">Home</NavLink>);

      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
    });

    it("renders with correct href", () => {
      render(<NavLink href="/about">About</NavLink>);

      const link = screen.getByRole("link", { name: "About" });
      expect(link).toHaveAttribute("href", "/about");
    });

    it("renders children content", () => {
      render(
        <NavLink href="/products">
          <span>Products</span>
        </NavLink>,
      );

      expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("renders with icons", () => {
      render(
        <NavLink href="/settings">
          <span data-testid="icon">⚙️</span>
          <span>Settings</span>
        </NavLink>,
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  describe("Active State", () => {
    it("applies active class when active is true", () => {
      const { container } = render(
        <NavLink href="/current" active>
          Current Page
        </NavLink>,
      );

      const link = container.querySelector("a");
      expect(link).toHaveClass(styles.active);
    });

    it("does not apply active class by default", () => {
      const { container } = render(<NavLink href="/page">Page</NavLink>);

      const link = container.querySelector("a");
      expect(link).not.toHaveClass(styles.active);
    });

    it("sets aria-current when active", () => {
      render(
        <NavLink href="/current" active>
          Current
        </NavLink>,
      );

      const link = screen.getByRole("link", { name: "Current" });
      expect(link).toHaveAttribute("aria-current", "page");
    });

    it("does not set aria-current when not active", () => {
      render(<NavLink href="/page">Page</NavLink>);

      const link = screen.getByRole("link", { name: "Page" });
      expect(link).not.toHaveAttribute("aria-current");
    });
  });

  describe("Click Handler", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn((e) => e.preventDefault());

      render(
        <NavLink href="/page" onClick={handleClick}>
          Click Me
        </NavLink>,
      );

      const link = screen.getByRole("link", { name: "Click Me" });
      await user.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("navigates normally when no onClick provided", () => {
      render(<NavLink href="/page">Page</NavLink>);

      const link = screen.getByRole("link", { name: "Page" });
      expect(link).toHaveAttribute("href", "/page");
    });

    it("passes event object to onClick", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn((e) => {
        expect(e).toBeDefined();
        expect(e.type).toBe("click");
        e.preventDefault();
      });

      render(
        <NavLink href="/page" onClick={handleClick}>
          Page
        </NavLink>,
      );

      const link = screen.getByRole("link", { name: "Page" });
      await user.click(link);

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("is focusable via keyboard", async () => {
      const user = userEvent.setup();
      render(<NavLink href="/page">Page</NavLink>);

      const link = screen.getByRole("link", { name: "Page" });

      await user.tab();
      expect(link).toHaveFocus();
    });

    it("has tabindex of 0", () => {
      render(<NavLink href="/page">Page</NavLink>);

      const link = screen.getByRole("link", { name: "Page" });
      expect(link).toHaveAttribute("tabindex", "0");
    });

    it("activates on Enter key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn((e) => e.preventDefault());

      render(
        <NavLink href="/page" onClick={handleClick}>
          Page
        </NavLink>,
      );

      const link = screen.getByRole("link", { name: "Page" });
      link.focus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(
        <NavLink href="/page" className="custom-nav-link">
          Page
        </NavLink>,
      );

      const link = container.querySelector("a");
      expect(link).toHaveClass("custom-nav-link");
    });

    it("combines custom className with base class", () => {
      const { container } = render(
        <NavLink href="/page" className="custom">
          Page
        </NavLink>,
      );

      const link = container.querySelector("a");
      expect(link).toHaveClass(styles.navLink);
      expect(link).toHaveClass("custom");
    });

    it("combines custom className with active class", () => {
      const { container } = render(
        <NavLink href="/page" active className="custom">
          Page
        </NavLink>,
      );

      const link = container.querySelector("a");
      expect(link).toHaveClass(styles.navLink);
      expect(link).toHaveClass(styles.active);
      expect(link).toHaveClass("custom");
    });
  });

  describe("Accessibility", () => {
    it("has proper link role", () => {
      render(<NavLink href="/page">Page</NavLink>);

      const link = screen.getByRole("link", { name: "Page" });
      expect(link).toBeInTheDocument();
    });

    it("provides accessible name from children", () => {
      render(
        <NavLink href="/complex">
          <span>Icon</span> <span>Label</span>
        </NavLink>,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAccessibleName();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string href", () => {
      render(<NavLink href="">Empty</NavLink>);

      const link = screen.getByRole("link", { name: "Empty" });
      expect(link).toHaveAttribute("href", "");
    });

    it("handles hash links", () => {
      render(<NavLink href="#section">Section</NavLink>);

      const link = screen.getByRole("link", { name: "Section" });
      expect(link).toHaveAttribute("href", "#section");
    });

    it("handles external links", () => {
      render(<NavLink href="https://example.com">External</NavLink>);

      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("href", "https://example.com");
    });
  });
});
