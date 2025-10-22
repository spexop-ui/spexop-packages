/**
 * Toast Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

/// <reference path="../../../vitest.d.ts" />

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";
import styles from "./Toast.module.css";

describe("Toast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("should not render when isOpen is false", () => {
      render(<Toast isOpen={false} onClose={vi.fn()} message="Test message" />);
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });
    });

    it("should render portal to document.body", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        const toast = screen.getByRole("status");
        expect(toast.parentElement).toBe(document.body);
      });
    });

    it("should render with default variant", async () => {
      const { container } = render(
        <Toast isOpen={true} onClose={vi.fn()} message="Test message" />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["variant-info"]}`);
        expect(toast).toBeInTheDocument();
      });
    });

    it("should have open class when isOpen is true", async () => {
      const { container } = render(
        <Toast isOpen={true} onClose={vi.fn()} message="Test message" />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles.open}`);
        expect(toast).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    it("should render info variant", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Info message"
          variant="info"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["variant-info"]}`);
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render success variant", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Success message"
          variant="success"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["variant-success"]}`);
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render warning variant", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Warning message"
          variant="warning"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["variant-warning"]}`);
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render error variant", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Error message"
          variant="error"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["variant-error"]}`);
        expect(toast).toBeInTheDocument();
      });
    });
  });

  describe("Position Variants", () => {
    it("should render at top-left position", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          position="top-left"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(
          `.${styles["position-top-left"]}`,
        );
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render at top-center position", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          position="top-center"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(
          `.${styles["position-top-center"]}`,
        );
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render at top-right position", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          position="top-right"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(
          `.${styles["position-top-right"]}`,
        );
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render at bottom-left position", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          position="bottom-left"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(
          `.${styles["position-bottom-left"]}`,
        );
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render at bottom-center position (default)", async () => {
      const { container } = render(
        <Toast isOpen={true} onClose={vi.fn()} message="Test" />,
      );

      await waitFor(() => {
        const toast = container.querySelector(
          `.${styles["position-bottom-center"]}`,
        );
        expect(toast).toBeInTheDocument();
      });
    });

    it("should render at bottom-right position", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          position="bottom-right"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(
          `.${styles["position-bottom-right"]}`,
        );
        expect(toast).toBeInTheDocument();
      });
    });
  });

  describe("Auto-dismiss Functionality", () => {
    it("should auto-dismiss after default duration (5000ms)", async () => {
      const onClose = vi.fn();

      render(
        <Toast isOpen={true} onClose={onClose} message="Auto-dismiss test" />,
      );

      await waitFor(() => {
        expect(screen.getByText("Auto-dismiss test")).toBeInTheDocument();
      });

      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(5000);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should auto-dismiss after custom duration", async () => {
      const onClose = vi.fn();

      render(
        <Toast
          isOpen={true}
          onClose={onClose}
          message="Custom duration"
          duration={3000}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Custom duration")).toBeInTheDocument();
      });

      vi.advanceTimersByTime(2999);
      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should not auto-dismiss when duration is 0", async () => {
      const onClose = vi.fn();

      render(
        <Toast
          isOpen={true}
          onClose={onClose}
          message="Persistent toast"
          duration={0}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Persistent toast")).toBeInTheDocument();
      });

      vi.advanceTimersByTime(10000);
      expect(onClose).not.toHaveBeenCalled();
    });

    it("should clear timer when isOpen changes to false", async () => {
      const onClose = vi.fn();

      const { rerender } = render(
        <Toast
          isOpen={true}
          onClose={onClose}
          message="Test"
          duration={5000}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Test")).toBeInTheDocument();
      });

      rerender(
        <Toast
          isOpen={false}
          onClose={onClose}
          message="Test"
          duration={5000}
        />,
      );

      vi.advanceTimersByTime(5000);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Manual Dismiss", () => {
    it("should render close button", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        expect(screen.getByLabelText("Close notification")).toBeInTheDocument();
      });
    });

    it("should call onClose when close button is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      const onClose = vi.fn();

      render(<Toast isOpen={true} onClose={onClose} message="Test message" />);

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("Close notification");
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when close button is activated with Enter", async () => {
      const user = userEvent.setup({ delay: null });
      const onClose = vi.fn();

      render(<Toast isOpen={true} onClose={onClose} message="Test message" />);

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("Close notification");
      closeButton.focus();
      await user.keyboard("{Enter}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when close button is activated with Space", async () => {
      const user = userEvent.setup({ delay: null });
      const onClose = vi.fn();

      render(<Toast isOpen={true} onClose={onClose} message="Test message" />);

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("Close notification");
      closeButton.focus();
      await user.keyboard(" ");

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Action Button", () => {
    it("should not render action button by default", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
      });

      expect(
        screen.queryByRole("button", { name: /undo/i }),
      ).not.toBeInTheDocument();
    });

    it("should render action button when provided", async () => {
      const action = {
        label: "Undo",
        onClick: vi.fn(),
      };

      render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Item deleted"
          action={action}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Undo")).toBeInTheDocument();
      });
    });

    it("should call action onClick when action button is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      const actionClick = vi.fn();
      const action = {
        label: "Undo",
        onClick: actionClick,
      };

      render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Item deleted"
          action={action}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Undo")).toBeInTheDocument();
      });

      const actionButton = screen.getByText("Undo");
      await user.click(actionButton);

      expect(actionClick).toHaveBeenCalledTimes(1);
    });

    it("should call action onClick when action button is activated with Enter", async () => {
      const user = userEvent.setup({ delay: null });
      const actionClick = vi.fn();
      const action = {
        label: "Retry",
        onClick: actionClick,
      };

      render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Failed to load"
          action={action}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Retry")).toBeInTheDocument();
      });

      const actionButton = screen.getByText("Retry");
      actionButton.focus();
      await user.keyboard("{Enter}");

      expect(actionClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("ARIA Attributes", () => {
    it("should have role='status'", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        const toast = screen.getByRole("status");
        expect(toast).toBeInTheDocument();
      });
    });

    it("should have aria-live='polite'", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        const toast = screen.getByRole("status");
        expect(toast).toHaveAttribute("aria-live", "polite");
      });
    });

    it("should have aria-atomic='true'", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="Test message" />);

      await waitFor(() => {
        const toast = screen.getByRole("status");
        expect(toast).toHaveAttribute("aria-atomic", "true");
      });
    });
  });

  describe("Complex Messages", () => {
    it("should render ReactNode message", async () => {
      render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message={
            <div>
              <strong>Error:</strong> Something went wrong
            </div>
          }
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Error:")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      });
    });

    it("should render string message", async () => {
      render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Simple string message"
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Simple string message")).toBeInTheDocument();
      });
    });
  });

  describe("Custom Styling", () => {
    it("should apply custom className", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          className="custom-toast"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["custom-toast"]}`);
        expect(toast).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty message", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message="" />);

      await waitFor(() => {
        const toast = screen.getByRole("status");
        expect(toast).toBeInTheDocument();
      });
    });

    it("should handle message with zero", async () => {
      render(<Toast isOpen={true} onClose={vi.fn()} message={0} />);

      await waitFor(() => {
        expect(screen.getByText("0")).toBeInTheDocument();
      });
    });

    it("should handle very long message", async () => {
      const longMessage =
        "This is a very long toast message that should still render correctly and wrap appropriately within the toast container without breaking the layout or causing any visual issues.";

      render(<Toast isOpen={true} onClose={vi.fn()} message={longMessage} />);

      await waitFor(() => {
        expect(screen.getByText(longMessage)).toBeInTheDocument();
      });
    });

    it("should handle undefined className", async () => {
      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Test"
          className={undefined}
        />,
      );

      await waitFor(() => {
        const toast = screen.getByRole("status");
        expect(toast).toBeInTheDocument();
      });
    });
  });

  describe("Multiple Toasts", () => {
    it("should render multiple toasts independently", async () => {
      render(
        <>
          <Toast isOpen={true} onClose={vi.fn()} message="Toast 1" />
          <Toast isOpen={true} onClose={vi.fn()} message="Toast 2" />
          <Toast isOpen={true} onClose={vi.fn()} message="Toast 3" />
        </>,
      );

      await waitFor(() => {
        expect(screen.getByText("Toast 1")).toBeInTheDocument();
        expect(screen.getByText("Toast 2")).toBeInTheDocument();
        expect(screen.getByText("Toast 3")).toBeInTheDocument();
      });
    });

    it("should maintain separate timers for multiple toasts", async () => {
      const onClose1 = vi.fn();
      const onClose2 = vi.fn();

      render(
        <>
          <Toast
            isOpen={true}
            onClose={onClose1}
            message="Toast 1"
            duration={3000}
          />
          <Toast
            isOpen={true}
            onClose={onClose2}
            message="Toast 2"
            duration={5000}
          />
        </>,
      );

      await waitFor(() => {
        expect(screen.getByText("Toast 1")).toBeInTheDocument();
        expect(screen.getByText("Toast 2")).toBeInTheDocument();
      });

      vi.advanceTimersByTime(3000);
      expect(onClose1).toHaveBeenCalledTimes(1);
      expect(onClose2).not.toHaveBeenCalled();

      vi.advanceTimersByTime(2000);
      expect(onClose2).toHaveBeenCalledTimes(1);
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props combined", async () => {
      const action = {
        label: "Undo",
        onClick: vi.fn(),
      };

      const { container } = render(
        <Toast
          isOpen={true}
          onClose={vi.fn()}
          message="Complete toast"
          variant="success"
          position="top-right"
          duration={3000}
          action={action}
          className="custom-complete"
        />,
      );

      await waitFor(() => {
        const toast = container.querySelector(`.${styles["variant-success"]}`);
        expect(toast).toBeInTheDocument();
        expect(toast).toHaveClass(styles["position-top-right"]);
        expect(toast).toHaveClass("custom-complete");
        expect(screen.getByText("Complete toast")).toBeInTheDocument();
        expect(screen.getByText("Undo")).toBeInTheDocument();
      });
    });
  });
});
