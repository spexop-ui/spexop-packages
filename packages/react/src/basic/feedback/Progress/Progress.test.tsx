/**
 * Progress Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";
import styles from "./Progress.module.css";

describe("Progress", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
      expect(progressbar).toHaveClass(styles.progress);
      expect(progressbar).toHaveClass(styles["size-md"]);
      expect(progressbar).toHaveClass(styles["color-primary"]);
    });

    it("should render with correct value", () => {
      render(<Progress value={75} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    });

    it("should apply custom className", () => {
      render(<Progress value={50} className="custom-progress" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("custom-progress");
    });

    it("should render with correct max value", () => {
      render(<Progress value={50} max={200} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemax", "200");
      expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    });
  });

  describe("Size Variants", () => {
    it("should render small size", () => {
      render(<Progress value={50} size="sm" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["size-sm"]);
    });

    it("should render medium size", () => {
      render(<Progress value={50} size="md" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["size-md"]);
    });

    it("should render large size", () => {
      render(<Progress value={50} size="lg" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["size-lg"]);
    });
  });

  describe("Color Variants", () => {
    it("should render primary color", () => {
      render(<Progress value={50} color="primary" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-primary"]);
    });

    it("should render secondary color", () => {
      render(<Progress value={50} color="secondary" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-secondary"]);
    });

    it("should render success color", () => {
      render(<Progress value={100} color="success" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-success"]);
    });

    it("should render warning color", () => {
      render(<Progress value={60} color="warning" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-warning"]);
    });

    it("should render error color", () => {
      render(<Progress value={30} color="error" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-error"]);
    });
  });

  describe("Visual Variants", () => {
    it("should render default variant", () => {
      render(<Progress value={50} variant="default" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["variant-default"]);
    });

    it("should render striped variant", () => {
      render(<Progress value={50} variant="striped" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["variant-striped"]);
    });

    it("should render animated variant", () => {
      render(<Progress value={50} variant="animated" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["variant-animated"]);
    });
  });

  describe("Labels", () => {
    it("should not show label by default", () => {
      render(<Progress value={50} />);
      expect(screen.queryByText("50%")).not.toBeInTheDocument();
    });

    it("should show percentage label when showLabel is true", () => {
      render(<Progress value={75} showLabel />);
      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("should show custom label", () => {
      render(<Progress value={50} label="Uploading: 50%" />);
      expect(screen.getByText("Uploading: 50%")).toBeInTheDocument();
    });

    it("should prioritize custom label over showLabel", () => {
      render(<Progress value={50} showLabel label="Custom: 50%" />);
      expect(screen.getByText("Custom: 50%")).toBeInTheDocument();
      expect(screen.queryByText("50%")).not.toBeInTheDocument();
    });

    it("should round percentage for display", () => {
      render(<Progress value={33.333} showLabel />);
      expect(screen.getByText("33%")).toBeInTheDocument();
    });
  });

  describe("Percentage Calculations", () => {
    it("should calculate 0% correctly", () => {
      render(<Progress value={0} showLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "0");
    });

    it("should calculate 50% correctly", () => {
      render(<Progress value={50} showLabel />);
      expect(screen.getByText("50%")).toBeInTheDocument();
    });

    it("should calculate 100% correctly", () => {
      render(<Progress value={100} showLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should cap at 100% when value exceeds max", () => {
      render(<Progress value={150} max={100} showLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should handle custom max value", () => {
      render(<Progress value={50} max={200} showLabel />);
      expect(screen.getByText("25%")).toBeInTheDocument();
    });

    it("should handle negative values as 0%", () => {
      render(<Progress value={-10} showLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();
    });
  });

  describe("Indeterminate Mode", () => {
    it("should render indeterminate progress", () => {
      render(<Progress value={0} indeterminate />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles.indeterminate);
    });

    it("should have aria-busy when indeterminate", () => {
      render(<Progress value={0} indeterminate />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-busy");
    });

    it("should not have aria-valuenow when indeterminate", () => {
      render(<Progress value={50} indeterminate />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).not.toHaveAttribute("aria-valuenow");
    });

    it("should show 0% label when indeterminate with showLabel", () => {
      render(<Progress value={50} indeterminate showLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("should show custom label when indeterminate", () => {
      render(<Progress value={50} indeterminate label="Loading..." />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes", () => {
    it("should have role='progressbar'", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });

    it("should have aria-valuemin='0'", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    });

    it("should have aria-valuemax with correct value", () => {
      render(<Progress value={50} max={100} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    });

    it("should have aria-valuenow with current value", () => {
      render(<Progress value={75} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    });

    it("should have aria-label when label is provided", () => {
      render(<Progress value={50} label="Upload progress" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-label", "Upload progress");
    });

    it("should not have aria-label when no label is provided", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).not.toHaveAttribute("aria-label");
    });
  });

  describe("Dynamic Progress", () => {
    it("should update progress value", () => {
      const { rerender } = render(<Progress value={25} showLabel />);
      expect(screen.getByText("25%")).toBeInTheDocument();

      rerender(<Progress value={50} showLabel />);
      expect(screen.getByText("50%")).toBeInTheDocument();

      rerender(<Progress value={75} showLabel />);
      expect(screen.getByText("75%")).toBeInTheDocument();

      rerender(<Progress value={100} showLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should update aria-valuenow when value changes", () => {
      const { rerender } = render(<Progress value={25} />);
      let progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "25");

      rerender(<Progress value={75} />);
      progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    });

    it("should update color based on progress", () => {
      const { rerender } = render(<Progress value={30} color="error" />);
      let progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-error"]);

      rerender(<Progress value={60} color="warning" />);
      progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-warning"]);

      rerender(<Progress value={100} color="success" />);
      progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["color-success"]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle value of 0", () => {
      render(<Progress value={0} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "0");
    });

    it("should handle fractional values", () => {
      render(<Progress value={33.333} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "33.333");
    });

    it("should handle very small values", () => {
      render(<Progress value={0.1} showLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("should handle undefined className", () => {
      render(<Progress value={50} className={undefined} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles.progress);
    });

    it("should handle empty className", () => {
      render(<Progress value={50} className="" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles.progress);
    });
  });

  describe("Multiple Progress Bars", () => {
    it("should render multiple progress bars independently", () => {
      render(
        <>
          <Progress value={25} label="Task 1" />
          <Progress value={50} label="Task 2" />
          <Progress value={75} label="Task 3" />
        </>,
      );

      const progressbars = screen.getAllByRole("progressbar");
      expect(progressbars).toHaveLength(3);
      expect(progressbars[0]).toHaveAttribute("aria-valuenow", "25");
      expect(progressbars[1]).toHaveAttribute("aria-valuenow", "50");
      expect(progressbars[2]).toHaveAttribute("aria-valuenow", "75");
    });

    it("should maintain separate styles for multiple progress bars", () => {
      render(
        <>
          <Progress value={30} color="error" size="sm" />
          <Progress value={60} color="warning" size="md" />
          <Progress value={90} color="success" size="lg" />
        </>,
      );

      const progressbars = screen.getAllByRole("progressbar");
      expect(progressbars[0]).toHaveClass("color-error", "size-sm");
      expect(progressbars[1]).toHaveClass("color-warning", "size-md");
      expect(progressbars[2]).toHaveClass("color-success", "size-lg");
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props combined", () => {
      render(
        <Progress
          value={75}
          max={100}
          size="lg"
          color="success"
          variant="striped"
          showLabel
          className="custom-class"
        />,
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles["size-lg"]);
      expect(progressbar).toHaveClass(styles["color-success"]);
      expect(progressbar).toHaveClass(styles["variant-striped"]);
      expect(progressbar).toHaveClass("custom-class");
      expect(progressbar).toHaveAttribute("aria-valuenow", "75");
      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("should render indeterminate with custom styling", () => {
      render(
        <Progress
          value={0}
          indeterminate
          size="lg"
          color="primary"
          variant="animated"
          label="Processing..."
          className="custom-indeterminate"
        />,
      );

      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass(styles.indeterminate);
      expect(progressbar).toHaveClass(styles["size-lg"]);
      expect(progressbar).toHaveClass(styles["color-primary"]);
      expect(progressbar).toHaveClass(styles["variant-animated"]);
      expect(progressbar).toHaveClass("custom-indeterminate");
      expect(screen.getByText("Processing...")).toBeInTheDocument();
    });
  });
});
