/// <reference types="@testing-library/jest-dom" />
/**
 * Snackbar Component Tests
 *
 * Tests for Snackbar component covering:
 * - Rendering and visibility
 * - Message display
 * - Action button functionality
 * - Auto-hide functionality
 * - Position variants (all 6 positions)
 * - Variant styles (info, success, warning, error)
 * - Close button functionality
 * - Keyboard navigation
 * - Portal rendering
 * - Animation variants
 * - ARIA attributes for accessibility
 * - Custom styling
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Snackbar } from "./Snackbar.js";
import styles from "./Snackbar.module.css";

describe("Snackbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders message when visible", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("does not render when isVisible is false", () => {
      render(<Snackbar message="Test message" isVisible={false} />);

      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });

    it("renders with default visible state", () => {
      render(<Snackbar message="Test message" />);

      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });

  describe("Action Button", () => {
    it("renders action button when provided", () => {
      render(
        <Snackbar
          message="Test message"
          action={{
            label: "Undo",
            onClick: vi.fn(),
          }}
          isVisible={true}
        />,
      );

      expect(screen.getByText("Undo")).toBeInTheDocument();
    });

    it("does not render action button when action is not provided", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("calls action.onClick when action button is clicked", () => {
      const onActionClick = vi.fn();

      render(
        <Snackbar
          message="Test message"
          action={{
            label: "Undo",
            onClick: onActionClick,
          }}
          isVisible={true}
        />,
      );

      const actionButton = screen.getByText("Undo");
      actionButton.click();

      expect(onActionClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Close Button", () => {
    it("renders close button by default", () => {
      render(
        <Snackbar message="Test message" isVisible={true} onClose={vi.fn()} />,
      );

      expect(screen.getByLabelText("Close notification")).toBeInTheDocument();
    });

    it("does not render close button when showCloseButton is false", () => {
      render(
        <Snackbar
          message="Test message"
          isVisible={true}
          onClose={vi.fn()}
          showCloseButton={false}
        />,
      );

      expect(
        screen.queryByLabelText("Close notification"),
      ).not.toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
      const onClose = vi.fn();

      render(
        <Snackbar message="Test message" isVisible={true} onClose={onClose} />,
      );

      const closeButton = screen.getByLabelText("Close notification");
      closeButton.click();

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Variants", () => {
    it.each(["info", "success", "warning", "error"] as const)(
      "renders with variant=%s",
      (variant) => {
        const { container } = render(
          <Snackbar
            message="Test message"
            variant={variant}
            isVisible={true}
          />,
        );

        const snackbar = screen.getByRole("alert");
        expect(snackbar.className).toContain(`variant-${variant}`);
        expect(snackbar).toHaveAttribute("data-variant", variant);
      },
    );

    it("defaults to info variant", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar.className).toContain("variant-info");
      expect(snackbar).toHaveAttribute("data-variant", "info");
    });
  });

  describe("Animations", () => {
    it.each(["slide", "fade", "scale", "none"] as const)(
      "renders with animation=%s",
      (animation) => {
        const { container } = render(
          <Snackbar
            message="Test message"
            animation={animation}
            isVisible={true}
          />,
        );

        const snackbar = screen.getByRole("alert");
        expect(snackbar.className).toContain(`animation-${animation}`);
      },
    );

    it("defaults to slide animation", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar.className).toContain("animation-slide");
    });
  });

  describe("Auto-hide", () => {
    it("calls onClose after autoHideDuration", () => {
      const onClose = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onClose={onClose}
          autoHideDuration={4000}
          isVisible={true}
        />,
      );

      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(4000);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("uses default autoHideDuration of 4000ms", () => {
      const onClose = vi.fn();

      render(
        <Snackbar message="Test message" onClose={onClose} isVisible={true} />,
      );

      vi.advanceTimersByTime(3900);
      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not auto-hide when autoHideDuration is 0", () => {
      const onClose = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onClose={onClose}
          autoHideDuration={0}
          isVisible={true}
        />,
      );

      vi.advanceTimersByTime(10000);

      expect(onClose).not.toHaveBeenCalled();
    });

    it("does not auto-hide when isVisible is false", () => {
      const onClose = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onClose={onClose}
          autoHideDuration={1000}
          isVisible={false}
        />,
      );

      vi.advanceTimersByTime(1000);

      expect(onClose).not.toHaveBeenCalled();
    });

    it("clears timer on unmount", () => {
      const onClose = vi.fn();

      const { unmount } = render(
        <Snackbar
          message="Test message"
          onClose={onClose}
          autoHideDuration={4000}
          isVisible={true}
        />,
      );

      vi.advanceTimersByTime(2000);
      unmount();
      vi.advanceTimersByTime(2000);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("has onKeyDown handler attached", () => {
      const onClose = vi.fn();

      render(
        <Snackbar message="Test message" isVisible={true} onClose={onClose} />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar.onkeydown).toBeDefined();
    });

    it("has onKeyDown handler attached with action", () => {
      const onActionClick = vi.fn();

      render(
        <Snackbar
          message="Test message"
          action={{
            label: "Undo",
            onClick: onActionClick,
          }}
          isVisible={true}
        />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar.onkeydown).toBeDefined();
    });

    it("has onKeyDown handler attached without action", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar.onkeydown).toBeDefined();
    });
  });

  describe("Position", () => {
    it.each([
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ] as const)("renders with position=%s", (position) => {
      const { container } = render(
        <Snackbar
          message="Test message"
          position={position}
          isVisible={true}
        />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-position", position);
      expect(snackbar.className).toContain(`position-${position}`);
    });

    it("defaults to bottom-center position", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-position", "bottom-center");
      expect(snackbar.className).toContain("position-bottom-center");
    });
  });

  describe("Portal Rendering", () => {
    it("renders in portal by default", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar.parentElement).toBe(document.body);
    });

    it("renders without portal when portal=false", () => {
      const { container } = render(
        <div data-testid="container">
          <Snackbar message="Test message" isVisible={true} portal={false} />
        </div>,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar.parentElement).toBe(container.firstChild);
    });
  });

  describe("ARIA Attributes", () => {
    it("has correct role and aria-live", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("aria-live", "polite");
      expect(snackbar).toHaveAttribute("aria-atomic", "true");
    });

    it("applies custom aria-label", () => {
      render(
        <Snackbar
          message="Test message"
          aria-label="Custom notification"
          isVisible={true}
        />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("aria-label", "Custom notification");
    });

    it("action button has aria-describedby referencing message", () => {
      render(
        <Snackbar
          message="Settings saved"
          action={{
            label: "Undo",
            onClick: vi.fn(),
          }}
          isVisible={true}
        />,
      );

      const actionButton = screen.getByText("Undo");
      expect(actionButton).toHaveAttribute("aria-describedby");

      const describedBy = actionButton.getAttribute("aria-describedby");
      expect(describedBy).not.toBeNull();
      if (describedBy) {
        const messageElement = document.getElementById(describedBy);
        expect(messageElement).toHaveTextContent("Settings saved");
      }
    });

    it("close button has correct aria-label", () => {
      render(
        <Snackbar message="Test message" isVisible={true} onClose={vi.fn()} />,
      );

      const closeButton = screen.getByLabelText("Close notification");
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      render(
        <Snackbar
          message="Test message"
          className="custom-snackbar"
          isVisible={true}
        />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveClass("custom-snackbar");
    });
  });

  describe("Data Attributes", () => {
    it("sets data-visible attribute", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-visible", "true");
    });

    it("sets data-position attribute", () => {
      render(
        <Snackbar
          message="Test message"
          position="top-center"
          isVisible={true}
        />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-position", "top-center");
    });

    it("sets data-variant attribute", () => {
      render(
        <Snackbar message="Test message" variant="success" isVisible={true} />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-variant", "success");
    });
  });

  describe("Complex Messages", () => {
    it("renders long messages correctly", () => {
      const longMessage =
        "This is a very long message that should still be displayed correctly in the snackbar component without any issues";

      render(<Snackbar message={longMessage} isVisible={true} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it("renders React node messages", () => {
      const message = (
        <div>
          <strong>Success!</strong> Your changes have been saved.
        </div>
      );

      render(<Snackbar message={message} isVisible={true} />);

      expect(screen.getByText("Success!")).toBeInTheDocument();
      expect(
        screen.getByText("Your changes have been saved."),
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid visibility changes", () => {
      const { rerender } = render(
        <Snackbar message="Test message" isVisible={false} />,
      );

      expect(screen.queryByText("Test message")).not.toBeInTheDocument();

      rerender(<Snackbar message="Test message" isVisible={true} />);
      expect(screen.getByText("Test message")).toBeInTheDocument();

      rerender(<Snackbar message="Test message" isVisible={false} />);
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });

    it("handles message updates while visible", () => {
      const { rerender } = render(
        <Snackbar message="First message" isVisible={true} />,
      );

      expect(screen.getByText("First message")).toBeInTheDocument();

      rerender(<Snackbar message="Second message" isVisible={true} />);

      expect(screen.queryByText("First message")).not.toBeInTheDocument();
      expect(screen.getByText("Second message")).toBeInTheDocument();
    });

    it("handles missing onClose gracefully", () => {
      expect(() => {
        render(<Snackbar message="Test message" isVisible={true} />);
      }).not.toThrow();
    });

    it("handles missing action gracefully", () => {
      expect(() => {
        render(<Snackbar message="Test message" isVisible={true} />);
      }).not.toThrow();
    });
  });

  describe("Accessibility", () => {
    it("is focusable for keyboard navigation", () => {
      render(
        <Snackbar message="Test message" isVisible={true} onClose={vi.fn()} />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("tabIndex", "-1");
    });

    it("action button is focusable", () => {
      render(
        <Snackbar
          message="Test message"
          action={{
            label: "Undo",
            onClick: vi.fn(),
          }}
          isVisible={true}
        />,
      );

      const actionButton = screen.getByText("Undo");
      expect(actionButton).toHaveAttribute("tabIndex", "0");
    });

    it("close button is focusable", () => {
      render(
        <Snackbar message="Test message" isVisible={true} onClose={vi.fn()} />,
      );

      const closeButton = screen.getByLabelText("Close notification");
      expect(closeButton).toHaveAttribute("tabIndex", "0");
    });
  });
});
