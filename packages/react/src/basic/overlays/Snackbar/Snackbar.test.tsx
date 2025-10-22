/// <reference types="@testing-library/jest-dom" />
/**
 * Snackbar Component Tests
 *
 * Tests for Snackbar component covering:
 * - Rendering and visibility
 * - Message display
 * - Action button functionality
 * - Auto-hide functionality
 * - Position variants (top, bottom)
 * - ARIA attributes for accessibility
 * - Custom styling
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
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
          actionLabel="Undo"
          onAction={vi.fn()}
          isVisible={true}
        />,
      );

      expect(screen.getByText("Undo")).toBeInTheDocument();
    });

    it("does not render action button when actionLabel is not provided", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("calls onAction when action button is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      const onAction = vi.fn();

      render(
        <Snackbar
          message="Test message"
          actionLabel="Undo"
          onAction={onAction}
          isVisible={true}
        />,
      );

      const actionButton = screen.getByText("Undo");
      await user.click(actionButton);

      expect(onAction).toHaveBeenCalledTimes(1);
    });
  });

  describe("Auto-hide", () => {
    it("calls onAction after autoHideDuration", () => {
      const onAction = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onAction={onAction}
          autoHideDuration={4000}
          isVisible={true}
        />,
      );

      expect(onAction).not.toHaveBeenCalled();

      vi.advanceTimersByTime(4000);

      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it("uses default autoHideDuration of 4000ms", () => {
      const onAction = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onAction={onAction}
          isVisible={true}
        />,
      );

      vi.advanceTimersByTime(3900);
      expect(onAction).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it("does not auto-hide when autoHideDuration is 0", () => {
      const onAction = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onAction={onAction}
          autoHideDuration={0}
          isVisible={true}
        />,
      );

      vi.advanceTimersByTime(10000);

      expect(onAction).not.toHaveBeenCalled();
    });

    it("does not auto-hide when isVisible is false", () => {
      const onAction = vi.fn();

      render(
        <Snackbar
          message="Test message"
          onAction={onAction}
          autoHideDuration={1000}
          isVisible={false}
        />,
      );

      vi.advanceTimersByTime(1000);

      expect(onAction).not.toHaveBeenCalled();
    });

    it("clears timer on unmount", () => {
      const onAction = vi.fn();

      const { unmount } = render(
        <Snackbar
          message="Test message"
          onAction={onAction}
          autoHideDuration={4000}
          isVisible={true}
        />,
      );

      vi.advanceTimersByTime(2000);
      unmount();
      vi.advanceTimersByTime(2000);

      expect(onAction).not.toHaveBeenCalled();
    });
  });

  describe("Position", () => {
    it.each(["bottom", "top"] as const)(
      "renders with position=%s",
      (position) => {
        const { container } = render(
          <Snackbar
            message="Test message"
            position={position}
            isVisible={true}
          />,
        );

        const snackbar = screen.getByRole("alert");
        expect(snackbar).toHaveAttribute("data-position", position);
      },
    );

    it("defaults to bottom position", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-position", "bottom");
    });
  });

  describe("ARIA Attributes", () => {
    it("has correct role and aria-live", () => {
      render(<Snackbar message="Test message" isVisible={true} />);

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("aria-live", "polite");
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
          actionLabel="Undo"
          onAction={vi.fn()}
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
        <Snackbar message="Test message" position="top" isVisible={true} />,
      );

      const snackbar = screen.getByRole("alert");
      expect(snackbar).toHaveAttribute("data-position", "top");
    });
  });

  describe("Complex Messages", () => {
    it("renders long messages correctly", () => {
      const longMessage =
        "This is a very long message that should still be displayed correctly in the snackbar component without any issues";

      render(<Snackbar message={longMessage} isVisible={true} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
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
  });
});
