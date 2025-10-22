/**
 * StickySection Component Tests
 *
 * Tests for StickySection component covering:
 * - Rendering with children
 * - ContextNav integration
 * - StickySafe wrapper
 * - Props forwarding to Section
 * - Wrapper structure
 * - Custom classNames
 * - Accessibility
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { StickySection } from "./StickySection.js";
import styles from "./StickySection.module.css";

describe("StickySection", () => {
  describe("Basic Rendering", () => {
    it("should render with children", () => {
      const { getByText } = render(
        <StickySection>
          <p>Section content</p>
        </StickySection>,
      );
      expect(getByText("Section content")).toBeTruthy();
    });

    it("should render wrapper div", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("DIV");
    });

    it("should render Section inside wrapper", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      const section = wrapper.querySelector("section");
      expect(section).toBeTruthy();
    });
  });

  describe("StickySafe Wrapper", () => {
    it("should apply stickySafe class by default", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("stickySafe");
    });

    it("should not apply stickySafe class when stickySafe=false", () => {
      const { container } = render(
        <StickySection stickySafe={false}>
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).not.toContain("stickySafe");
    });

    it("should always apply stickySection class", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("stickySection");
    });
  });

  describe("ContextNav Integration", () => {
    it("should render without contextNav", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with contextNav prop", () => {
      const mockContextNav = <div data-testid="context-nav">Context Nav</div>;
      const { getByTestId } = render(
        <StickySection contextNav={mockContextNav}>
          <p>Content</p>
        </StickySection>,
      );
      expect(getByTestId("context-nav")).toBeTruthy();
    });

    it("should pass contextNav to Section component", () => {
      const mockContextNav = <div data-testid="context-nav">Context Nav</div>;
      const { container } = render(
        <StickySection contextNav={mockContextNav}>
          <p>Content</p>
        </StickySection>,
      );

      const section = container.querySelector("section");
      const contextNav = container.querySelector('[data-testid="context-nav"]');

      expect(section).toBeTruthy();
      expect(contextNav).toBeTruthy();
    });
  });

  describe("Props Forwarding", () => {
    it("should forward variant prop to Section", () => {
      const { container } = render(
        <StickySection variant="gradient">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["variant-gradient"]);
    });

    it("should forward padding prop to Section", () => {
      const { container } = render(
        <StickySection padding="spacious">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["padding-spacious"]);
    });

    it("should forward marginBottom prop to Section", () => {
      const { container } = render(
        <StickySection marginBottom="large">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["margin-large"]);
    });

    it("should forward label prop to Section", () => {
      const { getByText } = render(
        <StickySection label="FEATURES">
          <p>Content</p>
        </StickySection>,
      );
      expect(getByText("FEATURES")).toBeTruthy();
    });

    it("should forward title prop to Section", () => {
      const { getByText } = render(
        <StickySection title="Section Title">
          <p>Content</p>
        </StickySection>,
      );
      expect(getByText("Section Title")).toBeTruthy();
    });

    it("should forward description prop to Section", () => {
      const { getByText } = render(
        <StickySection description="Section description">
          <p>Content</p>
        </StickySection>,
      );
      expect(getByText("Section description")).toBeTruthy();
    });

    it("should forward accent prop to Section", () => {
      const { container } = render(
        <StickySection accent="left">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["accent-left"]);
    });

    it("should forward border prop to Section", () => {
      const { container } = render(
        <StickySection border={false}>
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles.noBorder);
    });

    it("should forward maxWidth prop to Section", () => {
      const { container } = render(
        <StickySection maxWidth="lg">
          <p>Content</p>
        </StickySection>,
      );
      // Section should render successfully with maxWidth
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should forward id prop to Section", () => {
      const { container } = render(
        <StickySection id="test-section">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section?.id).toBe("test-section");
    });
  });

  describe("Custom ClassNames", () => {
    it("should apply custom className to wrapper", () => {
      const { container } = render(
        <StickySection className="custom-sticky">
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("custom-sticky");
    });

    it("should apply custom className to both wrapper and Section", () => {
      const { container } = render(
        <StickySection className="custom-class">
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;
      const section = container.querySelector("section");

      expect(wrapper.className).toContain("custom-class");
      expect(section).toHaveClass("custom-class");
    });

    it("should combine multiple classNames", () => {
      const { container } = render(
        <StickySection className="custom-class" stickySafe={true}>
          <p>Content</p>
        </StickySection>,
      );
      const wrapper = container.firstChild as HTMLElement;

      expect(wrapper.className).toContain("stickySection");
      expect(wrapper.className).toContain("stickySafe");
      expect(wrapper.className).toContain("custom-class");
    });
  });

  describe("Margin Bottom Handling", () => {
    it("should apply normal margin bottom by default", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["margin-normal"]);
    });

    it("should allow custom margin bottom", () => {
      const { container } = render(
        <StickySection marginBottom="large">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["margin-large"]);
    });

    it("should allow no margin bottom", () => {
      const { container } = render(
        <StickySection marginBottom="none">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass(styles["margin-none"]);
    });
  });

  describe("Complete Integration", () => {
    it("should render complex section with all props", () => {
      const mockContextNav = <div data-testid="context-nav">Context Nav</div>;

      const { getByText, getByTestId } = render(
        <StickySection
          id="features"
          variant="neutral"
          padding="spacious"
          marginBottom="large"
          label="FEATURES"
          title="Key Features"
          description="Feature description"
          accent="left"
          border="top"
          contextNav={mockContextNav}
          stickySafe={true}
          className="custom-section"
        >
          <p>Section content</p>
        </StickySection>,
      );

      expect(getByText("FEATURES")).toBeTruthy();
      expect(getByText("Key Features")).toBeTruthy();
      expect(getByText("Feature description")).toBeTruthy();
      expect(getByText("Section content")).toBeTruthy();
      expect(getByTestId("context-nav")).toBeTruthy();
    });

    it("should maintain proper DOM structure", () => {
      const mockContextNav = <div data-testid="context-nav">Context Nav</div>;

      const { container } = render(
        <StickySection contextNav={mockContextNav} title="Test">
          <p>Content</p>
        </StickySection>,
      );

      // Structure: wrapper > section > (contextNav + Container > content)
      const wrapper = container.firstChild as HTMLElement;
      const section = wrapper.querySelector("section");
      const contextNav = container.querySelector('[data-testid="context-nav"]');

      expect(wrapper.tagName).toBe("DIV");
      expect(section).toBeTruthy();
      expect(contextNav).toBeTruthy();
      expect(section?.contains(contextNav as Node)).toBe(true);
    });
  });

  describe("Forward Ref", () => {
    it("should forward ref to Section element", () => {
      const ref = vi.fn();
      render(
        <StickySection ref={ref}>
          <p>Content</p>
        </StickySection>,
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should maintain semantic section element", () => {
      const { container } = render(
        <StickySection>
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should support anchor links", () => {
      const { container } = render(
        <StickySection id="test-section">
          <p>Content</p>
        </StickySection>,
      );
      const section = container.querySelector("section");
      expect(section?.id).toBe("test-section");
    });

    it("should maintain proper heading hierarchy", () => {
      const { container } = render(
        <StickySection title="Section Title">
          <p>Content</p>
        </StickySection>,
      );
      const h2 = container.querySelector("h2");
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe("Section Title");
    });
  });

  describe("Edge Cases", () => {
    it("should render with empty children", () => {
      const { container } = render(
        <StickySection>
          <div />
        </StickySection>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with null children", () => {
      const { container } = render(<StickySection>{null}</StickySection>);
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with undefined contextNav", () => {
      const { container } = render(
        <StickySection contextNav={undefined}>
          <p>Content</p>
        </StickySection>,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should handle stickySafe toggle", () => {
      const { container, rerender } = render(
        <StickySection stickySafe={true}>
          <p>Content</p>
        </StickySection>,
      );

      let wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("stickySafe");

      rerender(
        <StickySection stickySafe={false}>
          <p>Content</p>
        </StickySection>,
      );

      wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).not.toContain("stickySafe");
    });
  });
});
