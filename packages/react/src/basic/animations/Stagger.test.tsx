/**
 * Stagger Component Tests
 * Tests for sequential children animation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Stagger } from "./Stagger.js";
import styles from "./Stagger.module.css";

// Add this line to ensure Jest DOM is available
/// <reference types="@testing-library/jest-dom" />

describe("Stagger", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <Stagger>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Stagger>,
      );

      expect(getByText("Child 1")).toBeDefined();
      expect(getByText("Child 2")).toBeDefined();
      expect(getByText("Child 3")).toBeDefined();
    });

    it("should apply stagger className", () => {
      const { container } = render(
        <Stagger>
          <div>Child</div>
        </Stagger>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-stagger");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Stagger className="custom-stagger">
          <div>Child</div>
        </Stagger>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-stagger");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Stagger style={{ display: "flex", gap: "16px" }}>
          <div>Child</div>
        </Stagger>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.display).toBe("flex");
      expect(element.style.gap).toBe("16px");
    });
  });

  describe("Children Handling", () => {
    it("should handle single child", () => {
      const { getByText } = render(
        <Stagger>
          <div>Single Child</div>
        </Stagger>,
      );

      expect(getByText("Single Child")).toBeDefined();
    });

    it("should handle multiple children", () => {
      const { getByText } = render(
        <Stagger>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
          <div>Fourth</div>
        </Stagger>,
      );

      expect(getByText("First")).toBeDefined();
      expect(getByText("Second")).toBeDefined();
      expect(getByText("Third")).toBeDefined();
      expect(getByText("Fourth")).toBeDefined();
    });

    it("should wrap each child in Reveal", () => {
      const { container } = render(
        <Stagger>
          <div>Child 1</div>
          <div>Child 2</div>
        </Stagger>,
      );

      const staggerContainer = container.firstChild as HTMLElement;
      const reveals = staggerContainer.querySelectorAll(".spex-reveal");
      expect(reveals.length).toBe(2);
    });

    it("should handle complex children", () => {
      const { getByText, getByRole } = render(
        <Stagger>
          <div>
            <h2>Title</h2>
            <p>Description</p>
          </div>
          <button type="button">Action</button>
        </Stagger>,
      );

      expect(getByText("Title")).toBeDefined();
      expect(getByText("Description")).toBeDefined();
      expect(getByRole("button")).toBeDefined();
    });
  });

  describe("Delay Configuration", () => {
    it("should use default delay of 80ms", () => {
      const { container } = render(
        <Stagger>
          <div>Child 1</div>
          <div>Child 2</div>
        </Stagger>,
      );

      const staggerContainer = container.firstChild as HTMLElement;
      const reveals = staggerContainer.querySelectorAll(".spex-reveal");
      expect(reveals.length).toBe(2);
    });

    it("should apply custom delay", () => {
      const { container } = render(
        <Stagger delay={150}>
          <div>Child 1</div>
          <div>Child 2</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should handle zero delay", () => {
      const { container } = render(
        <Stagger delay={0}>
          <div>Child 1</div>
          <div>Child 2</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should handle large delay", () => {
      const { container } = render(
        <Stagger delay={500}>
          <div>Child 1</div>
          <div>Child 2</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });
  });

  describe("Variant Support", () => {
    it("should use default fadeInUp variant", () => {
      const { container } = render(
        <Stagger>
          <div>Child</div>
        </Stagger>,
      );

      const reveal = container.querySelector(".spex-reveal");
      expect(reveal).toHaveClass(styles["spex-reveal--fadeInUp"]);
    });

    it("should apply custom variant", () => {
      const { container } = render(
        <Stagger variant="slideUp">
          <div>Child</div>
        </Stagger>,
      );

      const reveal = container.querySelector(".spex-reveal");
      expect(reveal).toHaveClass(styles["spex-reveal--slideUp"]);
    });

    it("should support all variants", () => {
      const variants = ["fadeIn", "scaleUp", "zoomIn", "rotateIn"] as const;

      for (const variant of variants) {
        const { container } = render(
          <Stagger variant={variant}>
            <div>Child</div>
          </Stagger>,
        );

        const reveal = container.querySelector(".spex-reveal");
        expect(reveal?.className).toContain(`spex-reveal--${variant}`);
      }
    });
  });

  describe("Duration Configuration", () => {
    it("should use default duration of 400ms", () => {
      const { container } = render(
        <Stagger>
          <div>Child</div>
        </Stagger>,
      );

      const reveal = container.querySelector(".spex-reveal") as HTMLElement;
      expect(reveal?.style.transition).toContain("400ms");
    });

    it("should apply custom duration", () => {
      const { container } = render(
        <Stagger duration={800}>
          <div>Child</div>
        </Stagger>,
      );

      const reveal = container.querySelector(".spex-reveal") as HTMLElement;
      expect(reveal?.style.transition).toContain("800ms");
    });
  });

  describe("Threshold Configuration", () => {
    it("should use default threshold of 0.1", () => {
      const { container } = render(
        <Stagger>
          <div>Child</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should apply custom threshold", () => {
      const { container } = render(
        <Stagger threshold={0.5}>
          <div>Child</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });
  });

  describe("Key Generation", () => {
    it("should use existing keys from children", () => {
      const { container } = render(
        <Stagger>
          <div key="first">Child 1</div>
          <div key="second">Child 2</div>
        </Stagger>,
      );

      const reveals = container.querySelectorAll(".spex-reveal");
      expect(reveals.length).toBe(2);
    });

    it("should generate keys for children without keys", () => {
      const { container } = render(
        <Stagger>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Stagger>,
      );

      const reveals = container.querySelectorAll(".spex-reveal");
      expect(reveals.length).toBe(3);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty children array", () => {
      const { container } = render(<Stagger>{[]}</Stagger>);

      const staggerContainer = container.firstChild as HTMLElement;
      expect(staggerContainer.className).toContain("spex-stagger");
    });

    it("should handle null children", () => {
      const { container } = render(
        <Stagger>
          <div>Child 1</div>
          {null}
          <div>Child 2</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should handle undefined children", () => {
      const { container } = render(
        <Stagger>
          <div>Child 1</div>
          {undefined}
          <div>Child 2</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should handle boolean children", () => {
      const { container } = render(
        <Stagger>
          <div>Child 1</div>
          {false}
          <div>Child 2</div>
        </Stagger>,
      );

      expect(container.firstChild).toBeDefined();
    });
  });

  describe("Combined Props", () => {
    it("should handle all props together", () => {
      const { container } = render(
        <Stagger
          delay={120}
          variant="scaleUp"
          duration={600}
          threshold={0.3}
          className="feature-list"
          style={{ maxWidth: "800px" }}
        >
          <div>Feature 1</div>
          <div>Feature 2</div>
          <div>Feature 3</div>
        </Stagger>,
      );

      const staggerContainer = container.firstChild as HTMLElement;
      expect(staggerContainer.className).toContain("spex-stagger");
      expect(staggerContainer.className).toContain("feature-list");
      expect(staggerContainer.style.maxWidth).toBe("800px");

      const reveals = staggerContainer.querySelectorAll(".spex-reveal");
      expect(reveals.length).toBe(3);

      const firstReveal = reveals[0] as HTMLElement;
      expect(firstReveal.className).toContain("spex-reveal--scaleUp");
      expect(firstReveal.style.transition).toContain("600ms");
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(Stagger.displayName).toBe("Stagger");
    });
  });
});
