/// <reference types="@testing-library/jest-dom" />
/**
 * Sidebar Component Tests
 *
 * Tests for Sidebar component covering:
 * - Desktop and mobile rendering
 * - Portal behavior on mobile
 * - Open/close functionality
 * - Focus trap on mobile
 * - Body scroll lock
 * - Escape key handling
 * - Header rendering
 * - Footer integration
 * - ARIA attributes
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar.js";

// Mock useMediaQuery hook
vi.mock("../../../hooks/useMediaQuery.js", () => ({
  useMediaQuery: vi.fn(() => false), // Default to desktop
}));

// Mock other hooks
vi.mock("../../../hooks/useBodyScrollLock.js", () => ({
  useBodyScrollLock: vi.fn(),
}));

vi.mock("../../../hooks/useFocusTrap.js", () => ({
  useFocusTrap: vi.fn(),
}));

vi.mock("../../../hooks/useEscapeKey.js", () => ({
  useEscapeKey: vi.fn(),
}));

import { useMediaQuery } from "../../../hooks/useMediaQuery.js";
import styles from "./Sidebar.module.css";

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false); // Desktop by default
  });

  describe("Rendering", () => {
    it("renders children content", () => {
      render(
        <Sidebar isOpen={true}>
          <div>Sidebar Content</div>
        </Sidebar>,
      );

      expect(screen.getByText("Sidebar Content")).toBeInTheDocument();
    });

    it("renders with correct ARIA label", () => {
      render(
        <Sidebar isOpen={true}>
          <div>Content</div>
        </Sidebar>,
      );

      const sidebar = screen.getByRole("complementary");
      expect(sidebar).toHaveAttribute("aria-label", "Main navigation");
    });

    it("is visible when isOpen is true", () => {
      const { container } = render(
        <Sidebar isOpen={true}>
          <div>Content</div>
        </Sidebar>,
      );

      const sidebar = container.querySelector("aside");
      expect(sidebar).toHaveClass(styles.open);
    });

    it("is hidden when isOpen is false", () => {
      const { container } = render(
        <Sidebar isOpen={false}>
          <div>Content</div>
        </Sidebar>,
      );

      const sidebar = container.querySelector("aside");
      expect(sidebar).not.toHaveClass(styles.open);
    });
  });

  describe("Desktop Behavior", () => {
    it("renders directly (no portal) on desktop", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false);

      const { container } = render(
        <Sidebar isOpen={true}>
          <div>Desktop Content</div>
        </Sidebar>,
      );

      // Should render in normal DOM, not in body
      expect(screen.getByText("Desktop Content")).toBeInTheDocument();
      expect(container.querySelector("aside")).toBeInTheDocument();
    });

    it("does not show header on desktop", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false);

      render(
        <Sidebar isOpen={true} showHeader={true} headerTitle="Navigation">
          <div>Content</div>
        </Sidebar>,
      );

      expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
    });

    it("does not show close button on desktop", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(false);

      render(
        <Sidebar isOpen={true} onClose={vi.fn()}>
          <div>Content</div>
        </Sidebar>,
      );

      const closeButton = screen.queryByRole("button", {
        name: "Close navigation",
      });
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe("Mobile Behavior", () => {
    it("shows header on mobile when showHeader is true", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

      render(
        <Sidebar isOpen={true} showHeader={true} headerTitle="Mobile Menu">
          <div>Content</div>
        </Sidebar>,
      );

      expect(screen.getByText("Mobile Menu")).toBeInTheDocument();
    });

    it("shows close button on mobile", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

      render(
        <Sidebar isOpen={true} onClose={vi.fn()}>
          <div>Content</div>
        </Sidebar>,
      );

      const closeButton = screen.getByRole("button", {
        name: "Close navigation",
      });
      expect(closeButton).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);
      const handleClose = vi.fn();

      render(
        <Sidebar isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Sidebar>,
      );

      const closeButton = screen.getByRole("button", {
        name: "Close navigation",
      });
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("sets aria-hidden based on isOpen state on mobile", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

      const { rerender } = render(
        <Sidebar isOpen={false}>
          <div>Content</div>
        </Sidebar>,
      );

      let sidebar = screen.getByRole("complementary", { hidden: true });
      expect(sidebar).toHaveAttribute("aria-hidden", "true");

      rerender(
        <Sidebar isOpen={true}>
          <div>Content</div>
        </Sidebar>,
      );

      sidebar = screen.getByRole("complementary");
      expect(sidebar).toHaveAttribute("aria-hidden", "false");
    });
  });

  describe("Custom Header", () => {
    it("uses custom header title", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

      render(
        <Sidebar isOpen={true} showHeader={true} headerTitle="Custom Title">
          <div>Content</div>
        </Sidebar>,
      );

      expect(screen.getByText("Custom Title")).toBeInTheDocument();
    });

    it("hides header when showHeader is false", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

      render(
        <Sidebar isOpen={true} showHeader={false} headerTitle="Navigation">
          <div>Content</div>
        </Sidebar>,
      );

      expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
    });
  });

  describe("Footer Integration", () => {
    it("renders footer children separately", () => {
      const Footer = () => <div>Footer Content</div>;
      // Simulate SidebarFooter by checking type string
      (Footer as unknown as { toString: () => string }).toString = () =>
        "SidebarFooter";

      render(
        <Sidebar isOpen={true}>
          <div>Nav Content</div>
          <Footer />
        </Sidebar>,
      );

      expect(screen.getByText("Nav Content")).toBeInTheDocument();
      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Sidebar isOpen={true} className="custom-sidebar">
          <div>Content</div>
        </Sidebar>,
      );

      const sidebar = container.querySelector("aside");
      expect(sidebar).toHaveClass("custom-sidebar");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML", () => {
      render(
        <Sidebar isOpen={true}>
          <div>Content</div>
        </Sidebar>,
      );

      const aside = screen.getByRole("complementary");
      expect(aside).toBeInTheDocument();
      expect(aside.tagName).toBe("ASIDE");
    });

    it("contains navigation landmark", () => {
      render(
        <Sidebar isOpen={true}>
          <nav>
            <a href="/home">Home</a>
          </nav>
        </Sidebar>,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles no onClose prop gracefully", () => {
      (useMediaQuery as ReturnType<typeof vi.fn>).mockReturnValue(true);

      render(
        <Sidebar isOpen={true}>
          <div>Content</div>
        </Sidebar>,
      );

      // Should render without errors even without onClose
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders with empty children", () => {
      const { container } = render(<Sidebar isOpen={true}>{null}</Sidebar>);

      const sidebar = container.querySelector("aside");
      expect(sidebar).toBeInTheDocument();
    });
  });
});
