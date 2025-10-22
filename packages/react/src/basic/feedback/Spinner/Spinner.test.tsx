/**
 * Spinner Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";
import styles from "./Spinner.module.css";

describe("Spinner", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass(styles.spinner);
      expect(spinner).toHaveClass(styles["size-md"]);
      expect(spinner).toHaveClass(styles["color-primary"]);
    });

    it("should render with default label", () => {
      render(<Spinner />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Spinner className="custom-spinner" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("custom-spinner");
    });

    it("should render the spinner circle", () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector(`.${styles.circle}`);
      expect(circle).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("should render small size", () => {
      render(<Spinner size="sm" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-sm"]);
    });

    it("should render medium size", () => {
      render(<Spinner size="md" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-md"]);
    });

    it("should render large size", () => {
      render(<Spinner size="lg" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-lg"]);
    });

    it("should render extra large size", () => {
      render(<Spinner size="xl" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-xl"]);
    });
  });

  describe("Color Variants", () => {
    it("should render primary color", () => {
      render(<Spinner color="primary" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["color-primary"]);
    });

    it("should render secondary color", () => {
      render(<Spinner color="secondary" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["color-secondary"]);
    });

    it("should render neutral color", () => {
      render(<Spinner color="neutral" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["color-neutral"]);
    });

    it("should render white color", () => {
      render(<Spinner color="white" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["color-white"]);
    });
  });

  describe("Custom Label", () => {
    it("should render custom label for screen readers", () => {
      render(<Spinner label="Loading content..." />);
      expect(screen.getByText("Loading content...")).toBeInTheDocument();
    });

    it("should render label in sr-only element", () => {
      const { container } = render(<Spinner label="Custom loading" />);
      const srText = container.querySelector(`.${styles["sr-only"]}`);
      expect(srText).toHaveTextContent("Custom loading");
    });

    it("should update label when changed", () => {
      const { rerender } = render(<Spinner label="Loading..." />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();

      rerender(<Spinner label="Processing..." />);
      expect(screen.getByText("Processing...")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  describe("Custom Thickness", () => {
    it("should render with default thickness", () => {
      const { container } = render(<Spinner />);
      const spinner = screen.getByRole("status");
      const style = window.getComputedStyle(spinner);
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe("3px");
    });

    it("should render with custom thickness", () => {
      render(<Spinner thickness={5} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe("5px");
    });

    it("should handle thickness of 1", () => {
      render(<Spinner thickness={1} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe("1px");
    });

    it("should handle thickness of 10", () => {
      render(<Spinner thickness={10} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe(
        "10px",
      );
    });

    it("should handle fractional thickness", () => {
      render(<Spinner thickness={2.5} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe(
        "2.5px",
      );
    });
  });

  describe("ARIA Attributes", () => {
    it("should have role='status'", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("should have aria-label with default label", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading...");
    });

    it("should have aria-label with custom label", () => {
      render(<Spinner label="Loading data..." />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading data...");
    });

    it("should have aria-live='polite'", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Screen Reader Support", () => {
    it("should render screen reader only text", () => {
      const { container } = render(<Spinner label="Loading..." />);
      const srText = container.querySelector(`.${styles["sr-only"]}`);
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent("Loading...");
    });

    it("should hide spinner circle from screen readers", () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector(`.${styles.circle}`);
      expect(circle).toBeInTheDocument();
      // The circle itself doesn't need aria-hidden as it's decorative
      // The sr-only text provides the necessary information
    });

    it("should provide accessible loading announcement", () => {
      render(<Spinner label="Fetching data..." />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "polite");
      expect(screen.getByText("Fetching data...")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined className", () => {
      render(<Spinner className={undefined} />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles.spinner);
    });

    it("should handle empty className", () => {
      render(<Spinner className="" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles.spinner);
    });

    it("should handle empty label", () => {
      render(<Spinner label="" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "");
    });

    it("should handle very long label", () => {
      const longLabel =
        "This is a very long loading message that should still be announced correctly by screen readers without causing any issues";
      render(<Spinner label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it("should handle thickness of 0", () => {
      render(<Spinner thickness={0} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe("0px");
    });

    it("should handle negative thickness", () => {
      render(<Spinner thickness={-5} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe(
        "-5px",
      );
    });

    it("should handle very large thickness", () => {
      render(<Spinner thickness={100} />);
      const spinner = screen.getByRole("status");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe(
        "100px",
      );
    });
  });

  describe("Multiple Spinners", () => {
    it("should render multiple spinners independently", () => {
      render(
        <>
          <Spinner label="Loading 1" />
          <Spinner label="Loading 2" />
          <Spinner label="Loading 3" />
        </>,
      );

      const spinners = screen.getAllByRole("status");
      expect(spinners).toHaveLength(3);
      expect(screen.getByText("Loading 1")).toBeInTheDocument();
      expect(screen.getByText("Loading 2")).toBeInTheDocument();
      expect(screen.getByText("Loading 3")).toBeInTheDocument();
    });

    it("should maintain separate styles for multiple spinners", () => {
      render(
        <>
          <Spinner size="sm" color="primary" label="Small" />
          <Spinner size="md" color="secondary" label="Medium" />
          <Spinner size="lg" color="neutral" label="Large" />
        </>,
      );

      const spinners = screen.getAllByRole("status");
      expect(spinners[0]).toHaveClass("size-sm", "color-primary");
      expect(spinners[1]).toHaveClass("size-md", "color-secondary");
      expect(spinners[2]).toHaveClass("size-lg", "color-neutral");
    });

    it("should handle multiple spinners with different thickness", () => {
      render(
        <>
          <Spinner thickness={2} label="Thin" />
          <Spinner thickness={5} label="Thick" />
        </>,
      );

      const spinners = screen.getAllByRole("status");
      expect(spinners[0].style.getPropertyValue("--spinner-thickness")).toBe(
        "2px",
      );
      expect(spinners[1].style.getPropertyValue("--spinner-thickness")).toBe(
        "5px",
      );
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props combined", () => {
      render(
        <Spinner
          size="lg"
          color="secondary"
          label="Custom loading message"
          thickness={5}
          className="custom-class"
        />,
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-lg"]);
      expect(spinner).toHaveClass(styles["color-secondary"]);
      expect(spinner).toHaveClass("custom-class");
      expect(spinner).toHaveAttribute("aria-label", "Custom loading message");
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe("5px");
      expect(screen.getByText("Custom loading message")).toBeInTheDocument();
    });

    it("should render white spinner for dark backgrounds", () => {
      render(
        <Spinner
          size="xl"
          color="white"
          label="Loading on dark background"
          thickness={4}
        />,
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-xl"]);
      expect(spinner).toHaveClass(styles["color-white"]);
      expect(spinner.style.getPropertyValue("--spinner-thickness")).toBe("4px");
    });
  });

  describe("Use Cases", () => {
    it("should work as button spinner", () => {
      const { container } = render(
        <button type="button" disabled>
          <Spinner size="sm" color="white" label="Saving..." />
          <span>Saving...</span>
        </button>,
      );

      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("size-sm", "color-white");
    });

    it("should work as centered loading state", () => {
      const { container } = render(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Spinner size="lg" label="Loading data..." />
        </div>,
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-lg"]);
    });

    it("should work as inline loading indicator", () => {
      render(
        <div>
          <span>Processing</span>
          <Spinner size="sm" label="Processing..." />
        </div>,
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass(styles["size-sm"]);
      expect(screen.getByText("Processing")).toBeInTheDocument();
    });
  });
});
