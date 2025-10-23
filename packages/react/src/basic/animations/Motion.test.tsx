/**
 * Motion Component Tests
 * Tests for spring-based physics animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Motion } from "./Motion.js";

// Add this line to ensure Jest DOM is available
/// <reference types="@testing-library/jest-dom" />

describe("Motion", () => {
  describe("Rendering", () => {
    it("should render children", () => {
      const { getByText } = render(
        <Motion isActive={true}>
          <div>Test Content</div>
        </Motion>,
      );

      expect(getByText("Test Content")).toBeDefined();
    });

    it("should apply motion className", () => {
      const { container } = render(
        <Motion isActive={false}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-motion");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Motion isActive={true} className="custom-motion">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-motion");
    });

    it("should apply custom styles", () => {
      const { container } = render(
        <Motion isActive={true} style={{ color: "blue" }}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.color).toBe("blue");
    });
  });

  describe("Active State", () => {
    it("should handle isActive=true", () => {
      const { container } = render(
        <Motion isActive={true}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });

    it("should handle isActive=false", () => {
      const { container } = render(
        <Motion isActive={false}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
      expect(element.style.opacity).toBe("0");
    });

    it("should update when isActive changes", () => {
      const { container, rerender } = render(
        <Motion isActive={false}>
          <div>Content</div>
        </Motion>,
      );

      let element = container.firstChild as HTMLElement;
      expect(element.style.opacity).toBe("0");

      rerender(
        <Motion isActive={true}>
          <div>Content</div>
        </Motion>,
      );

      element = container.firstChild as HTMLElement;
      expect(element).toBeDefined();
    });
  });

  describe("Animation Types", () => {
    it("should default to fade type", () => {
      const { container } = render(
        <Motion isActive={true}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe("none");
    });

    it("should apply fade type explicitly", () => {
      const { container } = render(
        <Motion isActive={true} type="fade">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe("none");
    });

    it("should apply scale type", () => {
      const { container } = render(
        <Motion isActive={false} type="scale">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toContain("scale");
    });

    it("should apply slideDown type", () => {
      const { container } = render(
        <Motion isActive={false} type="slideDown">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toContain("translateY");
    });

    it("should apply slideUp type", () => {
      const { container } = render(
        <Motion isActive={false} type="slideUp">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toContain("translateY");
    });

    it("should apply slideLeft type", () => {
      const { container } = render(
        <Motion isActive={false} type="slideLeft">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toContain("translateX");
    });

    it("should apply slideRight type", () => {
      const { container } = render(
        <Motion isActive={false} type="slideRight">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toContain("translateX");
    });
  });

  describe("Spring Presets", () => {
    it("should use default spring", () => {
      const { container } = render(
        <Motion isActive={true}>
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should accept gentle spring preset", () => {
      const { container } = render(
        <Motion isActive={true} spring="gentle">
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should accept wobbly spring preset", () => {
      const { container } = render(
        <Motion isActive={true} spring="wobbly">
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should accept stiff spring preset", () => {
      const { container } = render(
        <Motion isActive={true} spring="stiff">
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should accept slow spring preset", () => {
      const { container } = render(
        <Motion isActive={true} spring="slow">
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should accept molasses spring preset", () => {
      const { container } = render(
        <Motion isActive={true} spring="molasses">
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });

    it("should accept custom spring config", () => {
      const { container } = render(
        <Motion
          isActive={true}
          spring={{
            stiffness: 200,
            damping: 20,
            mass: 1,
            velocity: 0,
          }}
        >
          <div>Content</div>
        </Motion>,
      );

      expect(container.firstChild).toBeDefined();
    });
  });

  describe("Transform Calculations", () => {
    it("should calculate scale transform correctly", () => {
      const { container } = render(
        <Motion isActive={false} type="scale">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      const transform = element.style.transform;
      expect(transform).toContain("scale");
      expect(transform).toContain("0.8");
    });

    it("should calculate slideDown transform correctly", () => {
      const { container } = render(
        <Motion isActive={false} type="slideDown">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      const transform = element.style.transform;
      expect(transform).toContain("translateY");
      expect(transform).toContain("-20px");
    });

    it("should calculate slideUp transform correctly", () => {
      const { container } = render(
        <Motion isActive={false} type="slideUp">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      const transform = element.style.transform;
      expect(transform).toContain("translateY");
      expect(transform).toContain("20px");
    });

    it("should calculate slideLeft transform correctly", () => {
      const { container } = render(
        <Motion isActive={false} type="slideLeft">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      const transform = element.style.transform;
      expect(transform).toContain("translateX");
      expect(transform).toContain("20px");
    });

    it("should calculate slideRight transform correctly", () => {
      const { container } = render(
        <Motion isActive={false} type="slideRight">
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      const transform = element.style.transform;
      expect(transform).toContain("translateX");
      expect(transform).toContain("-20px");
    });
  });

  describe("Opacity Handling", () => {
    it("should set opacity to 0 when inactive", () => {
      const { container } = render(
        <Motion isActive={false}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.opacity).toBe("0");
    });

    it("should set opacity to 1 when active", () => {
      const { container } = render(
        <Motion isActive={true}>
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.style.opacity).toBe("1");
    });
  });

  describe("Combined Props", () => {
    it("should handle all props together", () => {
      const { container } = render(
        <Motion
          isActive={true}
          type="slideDown"
          spring="wobbly"
          className="dropdown-content"
          style={{ width: "200px" }}
        >
          <div>Content</div>
        </Motion>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("spex-motion");
      expect(element.className).toContain("dropdown-content");
      expect(element.style.width).toBe("200px");
      expect(element.style.opacity).toBe("1");
    });
  });

  describe("Children Handling", () => {
    it("should handle multiple children", () => {
      const { getByText } = render(
        <Motion isActive={true}>
          <div>First</div>
          <div>Second</div>
        </Motion>,
      );

      expect(getByText("First")).toBeDefined();
      expect(getByText("Second")).toBeDefined();
    });

    it("should handle complex children", () => {
      const { getByText, getByRole } = render(
        <Motion isActive={true}>
          <div>
            <h2>Title</h2>
            <p>Description</p>
            <button type="button">Action</button>
          </div>
        </Motion>,
      );

      expect(getByText("Title")).toBeDefined();
      expect(getByText("Description")).toBeDefined();
      expect(getByRole("button")).toBeDefined();
    });
  });

  describe("Display Name", () => {
    it("should have displayName set", () => {
      expect(Motion.displayName).toBe("Motion");
    });
  });
});
