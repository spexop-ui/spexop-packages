/**
 * ErrorBoundary Component Tests
 * Tests for error catching, fallback UI, reset functionality, and accessibility
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary.js";

/**
 * Component that throws an error for testing
 */
function ComponentThatThrows({
  shouldThrow = false,
}: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error from ComponentThatThrows");
  }
  return <div>No error</div>;
}

describe("ErrorBoundary", () => {
  describe("Error Catching", () => {
    it("should catch errors from child components", () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should not show fallback UI when no error occurs", () => {
      render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={false} />
        </ErrorBoundary>,
      );

      expect(screen.getByText("No error")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("should call onError callback when error is caught", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        }),
      );

      consoleSpy.mockRestore();
    });

    it("should render children when no error", () => {
      const { getByText } = render(
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>,
      );

      expect(getByText("Child component")).toBeInTheDocument();
    });
  });

  describe("Fallback UI", () => {
    it("should render default fallback UI", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(
        screen.getByText("An unexpected error occurred. Please try again."),
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should display error name", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByText(/Error:/)).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should render reset button when enableReset is true", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary enableReset={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.getByRole("button", { name: /try again/i }),
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should not render reset button when enableReset is false", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary enableReset={false}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.queryByRole("button", { name: /try again/i }),
      ).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe("Custom Fallback", () => {
    it("should render static custom fallback", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const customFallback = (
        <div>
          <h1>Custom Error UI</h1>
          <p>Something went wrong</p>
        </div>
      );

      render(
        <ErrorBoundary fallback={customFallback}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByText("Custom Error UI")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should render function-based custom fallback with error details", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const fallbackFn = (error: Error) => (
        <div>
          <h1>Error: {error.name}</h1>
          <p>{error.message}</p>
        </div>
      );

      render(
        <ErrorBoundary fallback={fallbackFn}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByText("Error: Error")).toBeInTheDocument();
      expect(
        screen.getByText("Test error from ComponentThatThrows"),
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe("Reset Functionality", () => {
    it("should reset error state when reset button is clicked", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { rerender } = render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();

      const resetButton = screen.getByRole("button", { name: /try again/i });
      fireEvent.click(resetButton);

      // After reset, re-render with no error
      rerender(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={false} />
        </ErrorBoundary>,
      );

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.getByText("No error")).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should call onReset callback when reset button is clicked", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const onReset = vi.fn();

      render(
        <ErrorBoundary onReset={onReset}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const resetButton = screen.getByRole("button", { name: /try again/i });
      fireEvent.click(resetButton);

      expect(onReset).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });
  });

  describe("Details Toggle", () => {
    it("should show details toggle button when showDetails is true", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary showDetails={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.getByRole("button", { name: /show details/i }),
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should not show details toggle button when showDetails is false", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary showDetails={false}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.queryByRole("button", { name: /show details/i }),
      ).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should toggle error details when toggle button is clicked", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary showDetails={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const toggleButton = screen.getByRole("button", {
        name: /show details/i,
      });

      // Details should not be visible initially
      expect(screen.queryByText("Error Message")).not.toBeInTheDocument();

      // Click to show details
      fireEvent.click(toggleButton);

      expect(screen.getByText("Error Message")).toBeInTheDocument();
      expect(
        screen.getByText("Test error from ComponentThatThrows"),
      ).toBeInTheDocument();

      // Click to hide details
      fireEvent.click(toggleButton);

      expect(screen.queryByText("Error Message")).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should display stack trace in details", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary showDetails={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const toggleButton = screen.getByRole("button", {
        name: /show details/i,
      });
      fireEvent.click(toggleButton);

      expect(screen.getByText("Stack Trace")).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary variant="default">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const errorElement = container.querySelector('[role="alert"]');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement?.className).not.toContain("errorBoundary--minimal");
      expect(errorElement?.className).not.toContain("errorBoundary--inline");

      consoleSpy.mockRestore();
    });

    it("should render minimal variant", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary variant="minimal">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const errorElement = container.querySelector('[role="alert"]');
      expect(errorElement?.className).toContain("errorBoundary--minimal");

      consoleSpy.mockRestore();
    });

    it("should render inline variant", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary variant="inline">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const errorElement = container.querySelector('[role="alert"]');
      expect(errorElement?.className).toContain("errorBoundary--inline");

      consoleSpy.mockRestore();
    });

    it("should not show error name in minimal variant", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary variant="minimal">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should not show details toggle in minimal variant", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary variant="minimal" showDetails={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.queryByRole("button", { name: /show details/i }),
      ).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe("Accessibility", () => {
    it("should have role='alert' on error container", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should have aria-live='assertive'", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "assertive");

      consoleSpy.mockRestore();
    });

    it("should accept custom aria-label", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary aria-label="Custom error message">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-label", "Custom error message");

      consoleSpy.mockRestore();
    });

    it("should support keyboard navigation on reset button", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const onReset = vi.fn();

      render(
        <ErrorBoundary onReset={onReset}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const resetButton = screen.getByRole("button", { name: /try again/i });

      // Simulate Enter key
      fireEvent.keyDown(resetButton, { key: "Enter" });
      expect(onReset).toHaveBeenCalledTimes(1);

      // Simulate Space key
      fireEvent.keyDown(resetButton, { key: " " });
      expect(onReset).toHaveBeenCalledTimes(2);

      consoleSpy.mockRestore();
    });

    it("should support keyboard navigation on details toggle", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary showDetails={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const toggleButton = screen.getByRole("button", {
        name: /show details/i,
      });

      // Initially details are hidden
      expect(screen.queryByText("Error Message")).not.toBeInTheDocument();

      // Simulate Enter key
      fireEvent.keyDown(toggleButton, { key: "Enter" });
      expect(screen.getByText("Error Message")).toBeInTheDocument();

      // Simulate Space key to hide
      fireEvent.keyDown(toggleButton, { key: " " });
      expect(screen.queryByText("Error Message")).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should have aria-expanded on details toggle button", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary showDetails={true}>
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const toggleButton = screen.getByRole("button", {
        name: /show details/i,
      });

      // Initially collapsed
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");

      // Expand
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");

      consoleSpy.mockRestore();
    });
  });

  describe("Custom Props", () => {
    it("should use custom error title", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary errorTitle="Custom Error Title">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByText("Custom Error Title")).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should use custom error message", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary errorMessage="Custom error message">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByText("Custom error message")).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should use custom reset label", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary resetLabel="Reset Application">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.getByRole("button", { name: /reset application/i }),
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should use custom toggle details labels", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <ErrorBoundary
          showDetails={true}
          toggleDetailsLabel="View Technical Details"
          hideDetailsLabel="Hide Technical Details"
        >
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const toggleButton = screen.getByRole("button", {
        name: /view technical details/i,
      });
      expect(toggleButton).toBeInTheDocument();

      fireEvent.click(toggleButton);

      expect(
        screen.getByRole("button", { name: /hide technical details/i }),
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it("should apply custom className", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { container } = render(
        <ErrorBoundary className="custom-error-class">
          <ComponentThatThrows shouldThrow={true} />
        </ErrorBoundary>,
      );

      const errorElement = container.querySelector('[role="alert"]');
      expect(errorElement?.className).toContain("custom-error-class");

      consoleSpy.mockRestore();
    });
  });
});
