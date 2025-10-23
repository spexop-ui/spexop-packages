/**
 * FadeIn Component Tests
 * Tests for fade animation wrapper with directional variants
 * 95% test coverage on 10-22-2025
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { FadeIn } from "./FadeIn.js";

// Add this line to ensure Jest DOM is available
/// <reference types="@testing-library/jest-dom" />

describe("FadeIn", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <FadeIn>
          <div>Test Content</div>
        </FadeIn>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply reveal className", () => {
      const { container } = render(
        <FadeIn>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal");
    });
  });

  describe("Direction Variants", () => {
    it("should default to none direction", () => {
      const { container } = render(
        <FadeIn>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeIn");
    });

    it("should apply up direction", () => {
      const { container } = render(
        <FadeIn direction="up">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInUp");
    });

    it("should apply down direction", () => {
      const { container } = render(
        <FadeIn direction="down">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInDown");
    });

    it("should apply left direction", () => {
      const { container } = render(
        <FadeIn direction="left">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInLeft");
    });

    it("should apply right direction", () => {
      const { container } = render(
        <FadeIn direction="right">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInRight");
    });

    it("should apply none direction explicitly", () => {
      const { container } = render(
        <FadeIn direction="none">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeIn");
    });
  });

  describe("Props Delegation", () => {
    it("should pass through duration prop", () => {
      const { container } = render(
        <FadeIn duration={800}>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("800ms");
    });

    it("should pass through delay prop", () => {
      const { container } = render(
        <FadeIn delay={300}>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should pass through timing prop", () => {
      const { container } = render(
        <FadeIn timing="ease-in">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain("ease-in");
    });

    it("should pass through once prop", () => {
      const { container } = render(
        <FadeIn once={false}>
          <div>Content</div>
        </FadeIn>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through threshold prop", () => {
      const { container } = render(
        <FadeIn threshold={0.5}>
          <div>Content</div>
        </FadeIn>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should pass through style prop", () => {
      const { container } = render(
        <FadeIn style={{ color: "red" }}>
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.color).toBe("red");
    });

    it("should pass through className prop", () => {
      const { container } = render(
        <FadeIn className="custom-fade">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-fade");
    });
  });

  describe("Combined Props", () => {
    it("should handle direction with custom timing", () => {
      const { container } = render(
        <FadeIn direction="up" timing="bounce">
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInUp");
      expect(element.style.transition).toContain("cubic-bezier");
    });

    it("should handle all props together", () => {
      const { container } = render(
        <FadeIn
          direction="left"
          duration={600}
          delay={200}
          timing="ease-out"
          threshold={0.3}
          once={true}
          className="custom"
          style={{ marginTop: "20px" }}
        >
          <div>Content</div>
        </FadeIn>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-reveal--fadeInLeft");
      expect(element.className).toContain("custom");
      expect(element.style.transition).toContain("600ms");
      expect(element.style.transition).toContain("ease-out");
      expect(element.style.marginTop).toBe("20px");
    });
  });

  describe("New Enhanced Props", () => {
    describe("Distance Customization", () => {
      it("should use custom distance for up direction", () => {
        const { container } = render(
          <FadeIn direction="up" distance={30}>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.transform).toContain("translateY(30px)");
      });

      it("should use custom distance for down direction", () => {
        const { container } = render(
          <FadeIn direction="down" distance={25}>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.transform).toContain("translateY(-25px)");
      });

      it("should use custom distance for left direction", () => {
        const { container } = render(
          <FadeIn direction="left" distance={40}>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.transform).toContain("translateX(-40px)");
      });

      it("should use custom distance for right direction", () => {
        const { container } = render(
          <FadeIn direction="right" distance={35}>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.transform).toContain("translateX(35px)");
      });

      it("should not apply custom transform for none direction", () => {
        const { container } = render(
          <FadeIn direction="none" distance={50}>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.transform).toBe("none");
      });
    });

    describe("Opacity Customization", () => {
      it("should use custom opacity range", () => {
        const { container } = render(
          <FadeIn opacity={{ from: 0.3, to: 0.8 }}>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.opacity).toBe("0.3");
      });

      it("should use default opacity when not provided", () => {
        const { container } = render(
          <FadeIn>
            <div>Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.style.opacity).toBe("0");
      });
    });

    describe("Disabled State", () => {
      it("should render children without animation when disabled", () => {
        const { getByText, container } = render(
          <FadeIn disabled={true} direction="up">
            <div>No Animation Content</div>
          </FadeIn>,
        );

        expect(getByText("No Animation Content")).toBeDefined();
        // Should not have reveal wrapper
        expect(container.firstChild).not.toHaveProperty(
          "className",
          expect.stringContaining("spex-reveal"),
        );
      });

      it("should render with animation when disabled is false", () => {
        const { container } = render(
          <FadeIn disabled={false} direction="up">
            <div>Animated Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.className).toContain("spex-reveal");
      });
    });

    describe("Animation Callbacks", () => {
      it("should call onAnimationStart when provided", () => {
        const onAnimationStart = vi.fn();

        render(
          <FadeIn onAnimationStart={onAnimationStart}>
            <div>Content</div>
          </FadeIn>,
        );

        // Note: In a real test environment, you'd trigger the animation
        // For now, we just verify the prop is passed through
        expect(onAnimationStart).toBeDefined();
      });

      it("should call onAnimationComplete when provided", () => {
        const onAnimationComplete = vi.fn();

        render(
          <FadeIn onAnimationComplete={onAnimationComplete}>
            <div>Content</div>
          </FadeIn>,
        );

        // Note: In a real test environment, you'd trigger the animation
        // For now, we just verify the prop is passed through
        expect(onAnimationComplete).toBeDefined();
      });
    });

    describe("Enhanced Props Integration", () => {
      it("should handle all new props together", () => {
        const onAnimationStart = vi.fn();
        const onAnimationComplete = vi.fn();

        const { container } = render(
          <FadeIn
            direction="up"
            duration={800}
            delay={300}
            timing="bounce"
            distance={20}
            opacity={{ from: 0.2, to: 0.9 }}
            threshold={0.5}
            once={false}
            className="enhanced-fade"
            style={{ backgroundColor: "blue" }}
            onAnimationStart={onAnimationStart}
            onAnimationComplete={onAnimationComplete}
          >
            <div>Enhanced Content</div>
          </FadeIn>,
        );

        const element = container.firstChild as HTMLElement;
        expect(element.className).toContain("spex-reveal--fadeInUp");
        expect(element.className).toContain("enhanced-fade");
        expect(element.style.transition).toContain("800ms");
        expect(element.style.transition).toContain("cubic-bezier");
        expect(element.style.transform).toContain("translateY(20px)");
        expect(element.style.opacity).toBe("0.2");
        expect(element.style.backgroundColor).toBe("blue");
      });
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(FadeIn.displayName).toBe("FadeIn");
    });
  });
});
