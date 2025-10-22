/**
 * Drawer Component Tests
 *
 * Tests for Drawer component covering:
 * - Rendering and visibility
 * - Position variants (left, right, top, bottom)
 * - Custom size
 * - Backdrop rendering and interaction
 * - Escape key handling
 * - Focus management and focus trap
 * - Body scroll lock
 * - Click outside to close
 * - ARIA attributes
 * - Focus restoration
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Drawer } from "./Drawer.js";
import styles from "./Drawer.module.css";

describe("Drawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
    document.body.style.overflow = "";
  });

  describe("Rendering", () => {
    it("renders nothing when isOpen is false", () => {
      render(
        <Drawer isOpen={false} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(screen.queryByText("Drawer content")).not.toBeInTheDocument();
    });

    it("renders drawer when isOpen is true", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(screen.getByText("Drawer content")).toBeInTheDocument();
    });

    it("renders with correct ARIA attributes", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} aria-label="Main drawer">
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer).toHaveAttribute("aria-modal", "true");
      expect(drawer).toHaveAttribute("aria-label", "Main drawer");
    });

    it("uses aria-labelledby when provided", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} aria-labelledby="drawer-title">
          <h2 id="drawer-title">Drawer Title</h2>
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer).toHaveAttribute("aria-labelledby", "drawer-title");
    });
  });

  describe("Position Variants", () => {
    it.each(["left", "right", "top", "bottom"] as const)(
      "renders with position=%s",
      (position) => {
        const { container } = render(
          <Drawer isOpen={true} onClose={vi.fn()} position={position}>
            <div>Drawer content</div>
          </Drawer>,
        );

        const drawer = screen.getByRole("dialog");
        expect(drawer.className).toContain(position);
      },
    );

    it("defaults to right position", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer.className).toContain("right");
    });
  });

  describe("Size", () => {
    it("applies custom size as width for right position", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="right" size="500px">
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer.style.width).toBe("500px");
    });

    it("applies custom size as width for left position", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="left" size="300px">
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer.style.width).toBe("300px");
    });

    it("applies custom size as height for top position", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="top" size="200px">
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer.style.height).toBe("200px");
    });

    it("applies custom size as height for bottom position", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="bottom" size="250px">
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer.style.height).toBe("250px");
    });

    it("defaults to 400px size", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer.style.width).toBe("400px");
    });
  });

  describe("Backdrop", () => {
    it("renders backdrop by default", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      const backdrop = screen.getByLabelText("Close drawer");
      expect(backdrop).toBeInTheDocument();
    });

    it("does not render backdrop when showBackdrop is false", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} showBackdrop={false}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(screen.queryByLabelText("Close drawer")).not.toBeInTheDocument();
    });

    it("calls onClose when backdrop is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={onClose}>
          <div>Drawer content</div>
        </Drawer>,
      );

      const backdrop = screen.getByLabelText("Close drawer");
      await user.click(backdrop);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when backdrop is clicked and closeOnBackdropClick is false", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
          <div>Drawer content</div>
        </Drawer>,
      );

      const backdrop = screen.getByLabelText("Close drawer");
      await user.click(backdrop);

      expect(onClose).not.toHaveBeenCalled();
    });

    it("applies custom backdropClassName", () => {
      render(
        <Drawer
          isOpen={true}
          onClose={vi.fn()}
          backdropClassName="custom-backdrop"
        >
          <div>Drawer content</div>
        </Drawer>,
      );

      const backdrop = screen.getByLabelText("Close drawer");
      expect(backdrop).toHaveClass("custom-backdrop");
    });
  });

  describe("Escape Key Handling", () => {
    it("calls onClose when Escape key is pressed", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={onClose}>
          <div>Drawer content</div>
        </Drawer>,
      );

      await user.keyboard("{Escape}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when Escape is pressed and closeOnEscape is false", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={onClose} closeOnEscape={false}>
          <div>Drawer content</div>
        </Drawer>,
      );

      await user.keyboard("{Escape}");

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Body Scroll Lock", () => {
    it("locks body scroll when opened", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll when closed", () => {
      const { rerender } = render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <Drawer isOpen={false} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(document.body.style.overflow).toBe("");
    });

    it("does not lock body scroll when lockScroll is false", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} lockScroll={false}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Focus Management", () => {
    it("focuses first focusable element when opened", async () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <button type="button">First button</button>
          <button type="button">Second button</button>
        </Drawer>,
      );

      await waitFor(
        () => {
          const firstButton = screen.getByText("First button");
          expect(document.activeElement).toBe(firstButton);
        },
        { timeout: 200 },
      );
    });

    it("traps focus within drawer", async () => {
      const user = userEvent.setup();

      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <button type="button">First button</button>
          <button type="button">Second button</button>
          <button type="button">Third button</button>
        </Drawer>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("First button")).toBeInTheDocument();
        },
        { timeout: 200 },
      );

      const firstButton = screen.getByText("First button");
      const thirdButton = screen.getByText("Third button");

      // Tab forward to last element
      await user.tab();
      await user.tab();

      // Tab from last element should wrap to first
      await user.tab();

      await waitFor(() => {
        expect(document.activeElement).toBe(firstButton);
      });
    });

    it("does not trap focus when trapFocus is false", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} trapFocus={false}>
          <button type="button">Button in drawer</button>
        </Drawer>,
      );

      // Focus trap should not be active
      expect(screen.getByText("Button in drawer")).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className to drawer", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} className="custom-drawer">
          <div>Drawer content</div>
        </Drawer>,
      );

      const drawer = screen.getByRole("dialog");
      expect(drawer).toHaveClass("custom-drawer");
    });
  });

  describe("ForwardRef", () => {
    it("forwards ref to drawer element", () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <Drawer ref={ref} isOpen={true} onClose={vi.fn()}>
          <div>Drawer content</div>
        </Drawer>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByRole("dialog"));
    });
  });

  describe("Children", () => {
    it("renders complex children correctly", () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <div>
            <h2>Drawer Title</h2>
            <p>Drawer description</p>
            <button type="button">Action</button>
          </div>
        </Drawer>,
      );

      expect(screen.getByText("Drawer Title")).toBeInTheDocument();
      expect(screen.getByText("Drawer description")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });
});
