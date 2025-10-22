/**
 * Divider Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
/// <reference path="../../../css-modules.d.ts" />

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";
import styles from "./Divider.module.css";

describe("Divider", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<Divider className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render as hr element without label", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild?.nodeName).toBe("HR");
    });

    it("should render as div element with label", () => {
      const { container } = render(<Divider label="OR" />);
      expect(container.firstChild?.nodeName).toBe("DIV");
    });
  });

  describe("Orientation", () => {
    it("should render horizontal by default", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass(
        styles["orientation-horizontal"],
      );
    });

    it("should render horizontal orientation", () => {
      const { container } = render(<Divider orientation="horizontal" />);
      expect(container.firstChild).toHaveClass(
        styles["orientation-horizontal"],
      );
    });

    it("should render vertical orientation", () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(container.firstChild).toHaveClass(styles["orientation-vertical"]);
    });

    it("should have correct aria-orientation", () => {
      const { container: horizontalContainer } = render(
        <Divider orientation="horizontal" />,
      );
      expect(horizontalContainer.firstChild).toHaveAttribute(
        "aria-orientation",
        "horizontal",
      );

      const { container: verticalContainer } = render(
        <Divider orientation="vertical" />,
      );
      expect(verticalContainer.firstChild).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
    });
  });

  describe("Variants", () => {
    it("should render solid variant by default", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass(styles["variant-solid"]);
    });

    it("should render solid variant", () => {
      const { container } = render(<Divider variant="solid" />);
      expect(container.firstChild).toHaveClass(styles["variant-solid"]);
    });

    it("should render dashed variant", () => {
      const { container } = render(<Divider variant="dashed" />);
      expect(container.firstChild).toHaveClass(styles["variant-dashed"]);
    });

    it("should render dotted variant", () => {
      const { container } = render(<Divider variant="dotted" />);
      expect(container.firstChild).toHaveClass(styles["variant-dotted"]);
    });
  });

  describe("Thickness", () => {
    it("should render normal thickness by default", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass(styles["thickness-normal"]);
    });

    it("should render thin thickness", () => {
      const { container } = render(<Divider thickness="thin" />);
      expect(container.firstChild).toHaveClass(styles["thickness-thin"]);
    });

    it("should render normal thickness", () => {
      const { container } = render(<Divider thickness="normal" />);
      expect(container.firstChild).toHaveClass(styles["thickness-normal"]);
    });

    it("should render thick thickness", () => {
      const { container } = render(<Divider thickness="thick" />);
      expect(container.firstChild).toHaveClass(styles["thickness-thick"]);
    });
  });

  describe("Label", () => {
    it("should render without label", () => {
      const { container } = render(<Divider />);
      expect(
        container.querySelector(`.${styles.label}`),
      ).not.toBeInTheDocument();
    });

    it("should render with text label", () => {
      render(<Divider label="OR" />);
      expect(screen.getByText("OR")).toBeInTheDocument();
    });

    it("should render with ReactNode label", () => {
      render(<Divider label={<span>Custom Label</span>} />);
      expect(screen.getByText("Custom Label")).toBeInTheDocument();
    });

    it("should apply with-label class when label exists", () => {
      const { container } = render(<Divider label="OR" />);
      expect(container.firstChild).toHaveClass(styles["with-label"]);
    });

    it("should render line elements with label", () => {
      const { container } = render(<Divider label="OR" />);
      const lines = container.querySelectorAll(`.${styles.line}`);
      expect(lines).toHaveLength(2);
    });
  });

  describe("Label Alignment", () => {
    it("should render center-aligned label by default", () => {
      const { container } = render(<Divider label="OR" />);
      expect(container.firstChild).toHaveClass(styles["label-center"]);
    });

    it("should render left-aligned label", () => {
      const { container } = render(<Divider label="OR" labelAlign="left" />);
      expect(container.firstChild).toHaveClass(styles["label-left"]);
    });

    it("should render center-aligned label", () => {
      const { container } = render(<Divider label="OR" labelAlign="center" />);
      expect(container.firstChild).toHaveClass(styles["label-center"]);
    });

    it("should render right-aligned label", () => {
      const { container } = render(<Divider label="OR" labelAlign="right" />);
      expect(container.firstChild).toHaveClass(styles["label-right"]);
    });
  });

  describe("Accessibility", () => {
    it("should have separator role by default", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveAttribute("role", "separator");
    });

    it("should allow custom role", () => {
      const { container } = render(<Divider role="presentation" />);
      expect(container.firstChild).toHaveAttribute("role", "presentation");
    });

    it("should have aria-orientation attribute", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveAttribute("aria-orientation");
    });

    it("should have proper aria-orientation for horizontal", () => {
      const { container } = render(<Divider orientation="horizontal" />);
      expect(container.firstChild).toHaveAttribute(
        "aria-orientation",
        "horizontal",
      );
    });

    it("should have proper aria-orientation for vertical", () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(container.firstChild).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
    });
  });

  describe("Combination of Props", () => {
    it("should render with all custom props", () => {
      const { container } = render(
        <Divider
          orientation="horizontal"
          variant="dashed"
          thickness="thick"
          label="Section Break"
          labelAlign="left"
          className="custom"
        />,
      );

      const divider = container.firstChild;
      expect(divider).toHaveClass(styles["orientation-horizontal"]);
      expect(divider).toHaveClass(styles["variant-dashed"]);
      expect(divider).toHaveClass(styles["thickness-thick"]);
      expect(divider).toHaveClass(styles["with-label"]);
      expect(divider).toHaveClass(styles["label-left"]);
      expect(divider).toHaveClass("custom");
    });

    it("should render vertical dashed divider", () => {
      const { container } = render(
        <Divider orientation="vertical" variant="dashed" />,
      );

      const divider = container.firstChild;
      expect(divider).toHaveClass(styles["orientation-vertical"]);
      expect(divider).toHaveClass(styles["variant-dashed"]);
    });

    it("should render thin dotted divider", () => {
      const { container } = render(
        <Divider variant="dotted" thickness="thin" />,
      );

      const divider = container.firstChild;
      expect(divider).toHaveClass(styles["variant-dotted"]);
      expect(divider).toHaveClass(styles["thickness-thin"]);
    });
  });

  describe("Use Cases", () => {
    it("should work as section separator", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should work as form separator with label", () => {
      render(<Divider label="Personal Information" />);
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
    });

    it("should work as OR separator in forms", () => {
      render(<Divider label="OR" />);
      expect(screen.getByText("OR")).toBeInTheDocument();
    });

    it("should work as vertical toolbar separator", () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(container.firstChild).toHaveClass(styles["orientation-vertical"]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty label", () => {
      const { container } = render(<Divider label="" />);
      // Empty label should not have with-label class (component correctly treats empty string as no label)
      expect(container.firstChild).not.toHaveClass(styles["with-label"]);
    });

    it("should handle undefined className", () => {
      const { container } = render(<Divider className={undefined} />);
      expect(container.firstChild).toHaveClass(styles.divider);
    });

    it("should handle complex label content", () => {
      render(
        <Divider
          label={
            <div>
              <strong>Section</strong> <span>Break</span>
            </div>
          }
        />,
      );
      expect(screen.getByText("Section")).toBeInTheDocument();
      expect(screen.getByText("Break")).toBeInTheDocument();
    });

    it("should handle numeric label", () => {
      render(<Divider label={123} />);
      expect(screen.getByText("123")).toBeInTheDocument();
    });
  });

  describe("Multiple Dividers", () => {
    it("should render multiple dividers independently", () => {
      const { container } = render(
        <>
          <Divider />
          <Divider label="OR" />
          <Divider orientation="vertical" />
        </>,
      );

      const dividers = container.querySelectorAll(`.${styles.divider}`);
      expect(dividers).toHaveLength(3);
    });

    it("should maintain separate styles for multiple dividers", () => {
      const { container } = render(
        <>
          <Divider variant="solid" thickness="thin" />
          <Divider variant="dashed" thickness="thick" />
        </>,
      );

      const dividers = container.querySelectorAll(`.${styles.divider}`);
      expect(dividers[0]).toHaveClass(
        styles["variant-solid"],
        styles["thickness-thin"],
      );
      expect(dividers[1]).toHaveClass(
        styles["variant-dashed"],
        styles["thickness-thick"],
      );
    });
  });

  describe("Structural Elements", () => {
    it("should have label element when label prop is provided", () => {
      const { container } = render(<Divider label="OR" />);
      const label = container.querySelector(`.${styles.label}`);
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe("OR");
    });

    it("should have line elements when label prop is provided", () => {
      const { container } = render(<Divider label="OR" />);
      const lines = container.querySelectorAll(`.${styles.line}`);
      expect(lines).toHaveLength(2);
    });

    it("should not have label or line elements without label", () => {
      const { container } = render(<Divider />);
      expect(
        container.querySelector(`.${styles.label}`),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector(`.${styles.line}`),
      ).not.toBeInTheDocument();
    });
  });

  describe("Visual Variants Combination", () => {
    it("should render horizontal solid thin divider", () => {
      const { container } = render(
        <Divider orientation="horizontal" variant="solid" thickness="thin" />,
      );

      expect(container.firstChild).toHaveClass(
        styles["orientation-horizontal"],
        styles["variant-solid"],
        styles["thickness-thin"],
      );
    });

    it("should render vertical dashed thick divider", () => {
      const { container } = render(
        <Divider orientation="vertical" variant="dashed" thickness="thick" />,
      );

      expect(container.firstChild).toHaveClass(
        styles["orientation-vertical"],
        styles["variant-dashed"],
        styles["thickness-thick"],
      );
    });

    it("should render horizontal dotted normal divider with label", () => {
      const { container } = render(
        <Divider
          orientation="horizontal"
          variant="dotted"
          thickness="normal"
          label="Section"
        />,
      );

      expect(container.firstChild).toHaveClass(
        styles["orientation-horizontal"],
        styles["variant-dotted"],
        styles["thickness-normal"],
        styles["with-label"],
      );
    });
  });

  describe("All Variant Combinations", () => {
    it("should render all variant and thickness combinations", () => {
      const variants = ["solid", "dashed", "dotted"] as const;
      const thicknesses = ["thin", "normal", "thick"] as const;

      for (const variant of variants) {
        for (const thickness of thicknesses) {
          const { container } = render(
            <Divider variant={variant} thickness={thickness} />,
          );
          const divider = container.firstChild as HTMLElement;
          expect(divider).toHaveClass(styles[`variant-${variant}`]);
          expect(divider).toHaveClass(styles[`thickness-${thickness}`]);
        }
      }
    });

    it("should render all label alignments", () => {
      const alignments = ["left", "center", "right"] as const;
      for (const align of alignments) {
        const { container } = render(
          <Divider label="Test" labelAlign={align} />,
        );
        expect(container.firstChild).toHaveClass(styles[`label-${align}`]);
      }
    });
  });

  describe("Label Content Types", () => {
    it("should render complex ReactNode label", () => {
      render(
        <Divider
          label={
            <div>
              <strong>Bold</strong> Label
            </div>
          }
        />,
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText(/Label/)).toBeInTheDocument();
    });

    it("should render label with icon", () => {
      const IconLabel = () => (
        <>
          <span data-testid="icon">★</span> Section
        </>
      );
      render(<Divider label={<IconLabel />} />);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText(/Section/)).toBeInTheDocument();
    });

    it("should handle number as label", () => {
      render(<Divider label={123} />);
      expect(screen.getByText("123")).toBeInTheDocument();
    });

    it("should handle very long label text", () => {
      const longLabel =
        "This is a very long label that should wrap or truncate";
      render(<Divider label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });
  });

  describe("DOM Structure", () => {
    it("should render as hr when no label", () => {
      const { container } = render(<Divider />);
      const divider = container.firstChild as HTMLElement;
      expect(divider.tagName).toBe("HR");
    });

    it("should render as div when label exists", () => {
      const { container } = render(<Divider label="Test" />);
      const divider = container.firstChild as HTMLElement;
      expect(divider.tagName).toBe("DIV");
    });

    it("should contain label and line elements", () => {
      const { container } = render(<Divider label="Middle" />);
      const label = container.querySelector(`.${styles.label}`);
      const lines = container.querySelectorAll(`.${styles.line}`);
      expect(label).toBeInTheDocument();
      expect(lines).toHaveLength(2);
    });

    it("should have proper CSS classes", () => {
      const { container } = render(<Divider className="test-class" />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass(styles.divider);
      expect(divider).toHaveClass("test-class");
    });
  });

  describe("Orientation and Aria", () => {
    it("should have horizontal aria-orientation by default", () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveAttribute(
        "aria-orientation",
        "horizontal",
      );
    });

    it("should have vertical aria-orientation when vertical", () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(container.firstChild).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
    });

    it("should maintain aria-orientation with custom role", () => {
      const { container } = render(
        <Divider role="presentation" orientation="vertical" />,
      );
      expect(container.firstChild).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
      expect(container.firstChild).toHaveAttribute("role", "presentation");
    });
  });

  describe("Label Alignment Edge Cases", () => {
    it("should center-align label by default", () => {
      const { container } = render(<Divider label="Center" />);
      expect(container.firstChild).toHaveClass(styles["label-center"]);
    });

    it("should apply label alignment without className conflict", () => {
      const { container } = render(
        <Divider label="Test" labelAlign="right" className="custom" />,
      );
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass(styles["label-right"]);
      expect(divider).toHaveClass("custom");
    });
  });
});
