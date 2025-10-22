/**
 * ToastProvider Tests
 * Comprehensive test suite for toast notification provider
 */

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "./ToastProvider.js";
import styles from "./ToastProvider.module.css";

// Test component that uses the toast hook
function TestComponent() {
  const { toasts, toast, removeToast, clearToasts } = useToast();

  return (
    <div>
      <div data-testid="toast-count">{toasts.length}</div>
      <button type="button" onClick={() => toast("Test message")}>
        Add Toast
      </button>
      <button type="button" onClick={() => toast.success("Success message")}>
        Add Success
      </button>
      <button type="button" onClick={() => toast.error("Error message")}>
        Add Error
      </button>
      <button type="button" onClick={() => toast.warning("Warning message")}>
        Add Warning
      </button>
      <button type="button" onClick={() => toast.info("Info message")}>
        Add Info
      </button>
      <button
        type="button"
        onClick={() =>
          toast("With action", {
            action: {
              label: "Undo",
              onClick: () => console.log("Action clicked"),
            },
          })
        }
      >
        Add With Action
      </button>
      <button
        type="button"
        onClick={() =>
          toast("Persistent", {
            duration: 0,
          })
        }
      >
        Add Persistent
      </button>
      <button type="button" onClick={() => clearToasts()}>
        Clear All
      </button>
      {toasts.length > 0 && (
        <button type="button" onClick={() => removeToast(toasts[0].id)}>
          Remove First
        </button>
      )}
    </div>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset any timers
    vi.clearAllTimers();
  });

  describe("Basic Functionality", () => {
    it("should render children", () => {
      render(
        <ToastProvider>
          <div data-testid="child">Test Child</div>
        </ToastProvider>,
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should start with no toasts", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
    });

    it("should add a toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("should remove a toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

      const removeButton = screen.getByText("Remove First");

      act(() => {
        fireEvent.click(removeButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
    });

    it("should clear all toasts", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        fireEvent.click(addButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("3");

      const clearButton = screen.getByText("Clear All");

      act(() => {
        fireEvent.click(clearButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
    });
  });

  describe("Toast Variants", () => {
    it("should add success toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Success");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText("Success message")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");
    });

    it("should add error toast with assertive aria-live", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Error");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveAttribute(
        "aria-live",
        "assertive",
      );
    });

    it("should add warning toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Warning");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });

    it("should add info toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Info");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText("Info message")).toBeInTheDocument();
    });
  });

  describe("Toast Actions", () => {
    it("should render action button", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add With Action");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText("With action")).toBeInTheDocument();
      expect(screen.getByText("Undo")).toBeInTheDocument();
    });

    it("should remove toast when action clicked", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add With Action");

      act(() => {
        fireEvent.click(addButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

      const actionButton = screen.getByText("Undo");

      act(() => {
        fireEvent.click(actionButton);
      });

      // Toast should be removed after action
      waitFor(() => {
        expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
      });
    });

    it("should render close button", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(button);
      });

      expect(
        screen.getByRole("button", { name: "Close notification" }),
      ).toBeInTheDocument();
    });

    it("should remove toast when close button clicked", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

      const closeButton = screen.getByRole("button", {
        name: "Close notification",
      });

      act(() => {
        fireEvent.click(closeButton);
      });

      // Wait for animation
      waitFor(() => {
        expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
      });
    });
  });

  describe("Auto-Dismiss", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should auto-dismiss after default duration", () => {
      render(
        <ToastProvider defaultDuration={1000}>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(1200);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
    });

    it("should not auto-dismiss persistent toasts", () => {
      render(
        <ToastProvider defaultDuration={1000}>
          <TestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Persistent");

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should still be there
      expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
    });
  });

  describe("Max Toasts Limit", () => {
    it("should respect maxToasts limit", () => {
      render(
        <ToastProvider maxToasts={3}>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      // Add 5 toasts
      act(() => {
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        fireEvent.click(addButton);
      });

      // Should only have 3
      expect(screen.getByTestId("toast-count")).toHaveTextContent("3");
    });

    it("should remove oldest toast when limit reached", () => {
      render(
        <ToastProvider maxToasts={2}>
          <TestComponent />
        </ToastProvider>,
      );

      const { toast } = useToast();

      act(() => {
        toast("First");
        toast("Second");
        toast("Third");
      });

      // Should only have Second and Third
      expect(screen.queryByText("First")).not.toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();
    });
  });

  describe("Position Variants", () => {
    it("should render in top-right by default", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      const container = screen.getByRole("region", { name: "Notifications" });
      expect(container).toHaveClass(styles["position-top-right"]);
    });

    it("should render in custom position", () => {
      render(
        <ToastProvider position="bottom-center">
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      const container = screen.getByRole("region", { name: "Notifications" });
      expect(container).toHaveClass(styles["position-bottom-center"]);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes on container", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      const container = screen.getByRole("region", { name: "Notifications" });
      expect(container).toHaveAttribute("aria-live", "polite");
    });

    it("should have proper ARIA attributes on toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live");
      expect(alert).toHaveAttribute("aria-atomic", "true");
    });

    it("should use assertive for error toasts", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Error");

      act(() => {
        fireEvent.click(addButton);
      });

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "assertive");
    });
  });

  describe("useToast Hook", () => {
    it("should throw error when used outside provider", () => {
      // Suppress console error for this test
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow("useToast must be used within a ToastProvider");

      consoleError.mockRestore();
    });

    it("should provide toast context when inside provider", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      expect(screen.getByTestId("toast-count")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should memoize context value", () => {
      const { rerender } = render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const count1 = screen.getByTestId("toast-count").textContent;

      // Rerender without state change
      rerender(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const count2 = screen.getByTestId("toast-count").textContent;

      expect(count1).toBe(count2);
    });
  });

  describe("Animations", () => {
    it("should respect enableAnimations prop", () => {
      render(
        <ToastProvider enableAnimations={false}>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      // Toast should appear without animation delay
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("should respect prefers-reduced-motion", () => {
      // Mock matchMedia for reduced motion
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      const addButton = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(addButton);
      });

      // Toast should appear
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });

  describe("Return Values", () => {
    it("should return toast ID from toast functions", () => {
      function IDTestComponent() {
        const { toast } = useToast();
        const [lastId, setLastId] = React.useState<string>("");

        return (
          <div>
            <div data-testid="last-id">{lastId}</div>
            <button
              type="button"
              onClick={() => {
                const id = toast("Test");
                setLastId(id);
              }}
            >
              Add Toast
            </button>
          </div>
        );
      }

      render(
        <ToastProvider>
          <IDTestComponent />
        </ToastProvider>,
      );

      const button = screen.getByText("Add Toast");

      act(() => {
        fireEvent.click(button);
      });

      const lastId = screen.getByTestId("last-id").textContent;
      expect(lastId).toBeTruthy();
      expect(lastId).toMatch(/^toast-/);
    });
  });
});
