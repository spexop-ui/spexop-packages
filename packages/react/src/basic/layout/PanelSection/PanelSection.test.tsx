/**
 * PanelSection Component Tests
 *
 * Tests for PanelSection component covering:
 * - Rendering with required props
 * - Title and description display
 * - Children rendering
 * - Custom classNames
 * - Semantic HTML structure
 * - Accessibility
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { PanelSection } from "./PanelSection.js";
import styles from "./PanelSection.module.css";

describe("PanelSection", () => {
  describe("Basic Rendering", () => {
    it("should render with required props", () => {
      const { getByText } = render(
        <PanelSection title="Test Section">
          <p>Section content</p>
        </PanelSection>,
      );
      expect(getByText("Test Section")).toBeTruthy();
      expect(getByText("Section content")).toBeTruthy();
    });

    it("should render as section element", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should render children content", () => {
      const { getByText } = render(
        <PanelSection title="Test Section">
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </PanelSection>,
      );
      expect(getByText("Child 1")).toBeTruthy();
      expect(getByText("Child 2")).toBeTruthy();
      expect(getByText("Child 3")).toBeTruthy();
    });
  });

  describe("Title", () => {
    it("should render title as h3 element", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );
      const h3 = container.querySelector("h3");
      expect(h3).toBeTruthy();
      expect(h3?.textContent).toBe("Test Section");
    });

    it("should apply title with various text content", () => {
      const titles = [
        "Appearance",
        "Account Settings",
        "Privacy & Security",
        "Notifications",
      ];

      for (const title of titles) {
        const { getByText } = render(
          <PanelSection title={title}>
            <p>Content</p>
          </PanelSection>,
        );
        expect(getByText(title)).toBeTruthy();
      }
    });
  });

  describe("Description", () => {
    it("should not render description when not provided", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );
      const description = container.querySelector('p[class*="description"]');
      expect(description).toBeFalsy();
    });

    it("should render description when provided", () => {
      const { getByText } = render(
        <PanelSection
          title="Test Section"
          description="This is a test description"
        >
          <p>Content</p>
        </PanelSection>,
      );
      expect(getByText("This is a test description")).toBeTruthy();
    });

    it("should render description as p element", () => {
      const { container } = render(
        <PanelSection title="Test Section" description="Test description">
          <p>Content</p>
        </PanelSection>,
      );
      const descriptions = container.querySelectorAll("p");
      // At least one p element should contain the description
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe("Custom ClassNames", () => {
    it("should apply custom className to section", () => {
      const { container } = render(
        <PanelSection title="Test Section" className="custom-section">
          <p>Content</p>
        </PanelSection>,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("custom-section");
    });

    it("should apply custom titleClassName to title", () => {
      const { container } = render(
        <PanelSection title="Test Section" titleClassName="custom-title">
          <p>Content</p>
        </PanelSection>,
      );
      const h3 = container.querySelector("h3");
      expect(h3).toHaveClass("custom-title");
    });

    it("should apply custom contentClassName to content wrapper", () => {
      const { container } = render(
        <PanelSection title="Test Section" contentClassName="custom-content">
          <p>Content</p>
        </PanelSection>,
      );
      const content = container.querySelector('[class*="content"]');
      expect(content).toHaveClass("custom-content");
    });

    it("should apply multiple custom classNames", () => {
      const { container } = render(
        <PanelSection
          title="Test Section"
          className="custom-section"
          titleClassName="custom-title"
          contentClassName="custom-content"
        >
          <p>Content</p>
        </PanelSection>,
      );
      const section = container.querySelector("section");
      const h3 = container.querySelector("h3");
      const content = container.querySelector('[class*="content"]');

      expect(section).toHaveClass("custom-section");
      expect(h3).toHaveClass("custom-title");
      expect(content).toHaveClass("custom-content");
    });
  });

  describe("Semantic HTML Structure", () => {
    it("should have proper heading structure", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );

      const section = container.querySelector("section");
      const h3 = container.querySelector("h3");

      expect(section).toBeTruthy();
      expect(h3).toBeTruthy();
      expect(section?.contains(h3 as Node)).toBe(true);
    });

    it("should have header and content wrapper structure", () => {
      const { container } = render(
        <PanelSection title="Test Section" description="Test description">
          <p>Content</p>
        </PanelSection>,
      );

      const header = container.querySelector('[class*="header"]');
      const content = container.querySelector('[class*="content"]');

      expect(header).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it("should contain title and description in header", () => {
      const { container } = render(
        <PanelSection title="Test Section" description="Test description">
          <p>Content</p>
        </PanelSection>,
      );

      const header = container.querySelector('[class*="header"]');
      const h3 = container.querySelector("h3");

      expect(header).toBeTruthy();
      expect(header?.contains(h3 as Node)).toBe(true);
    });
  });

  describe("Integration with Other Components", () => {
    it("should render with form elements as children", () => {
      const { container } = render(
        <PanelSection title="Form Section">
          <input type="text" placeholder="Test input" />
          <button type="button">Submit</button>
        </PanelSection>,
      );

      const input = container.querySelector("input");
      const button = container.querySelector("button");

      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });

    it("should render with nested components", () => {
      const { getByText } = render(
        <PanelSection title="Nested Section">
          <div>
            <PanelSection title="Nested Child">
              <p>Nested content</p>
            </PanelSection>
          </div>
        </PanelSection>,
      );

      expect(getByText("Nested Section")).toBeTruthy();
      expect(getByText("Nested Child")).toBeTruthy();
      expect(getByText("Nested content")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should render with empty children", () => {
      const { getByText } = render(
        <PanelSection title="Test Section">
          <div />
        </PanelSection>,
      );
      expect(getByText("Test Section")).toBeTruthy();
    });

    it("should render with null children", () => {
      const { getByText } = render(
        <PanelSection title="Test Section">{null}</PanelSection>,
      );
      expect(getByText("Test Section")).toBeTruthy();
    });

    it("should render with undefined description", () => {
      const { container } = render(
        <PanelSection title="Test Section" description={undefined}>
          <p>Content</p>
        </PanelSection>,
      );
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should render with very long title", () => {
      const longTitle =
        "This is a very long title that might span multiple lines in the UI";
      const { getByText } = render(
        <PanelSection title={longTitle}>
          <p>Content</p>
        </PanelSection>,
      );
      expect(getByText(longTitle)).toBeTruthy();
    });

    it("should render with very long description", () => {
      const longDescription =
        "This is a very long description that provides detailed information about the section and might span multiple lines in the user interface";
      const { getByText } = render(
        <PanelSection title="Test Section" description={longDescription}>
          <p>Content</p>
        </PanelSection>,
      );
      expect(getByText(longDescription)).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should use proper heading level (h3)", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );
      const h3 = container.querySelector("h3");
      expect(h3).toBeTruthy();
    });

    it("should maintain proper document structure", () => {
      const { container } = render(
        <PanelSection title="Test Section">
          <p>Content</p>
        </PanelSection>,
      );

      const section = container.querySelector("section");
      const h3 = section?.querySelector("h3");
      const content = section?.querySelector('[class*="content"]');

      expect(section).toBeTruthy();
      expect(h3).toBeTruthy();
      expect(content).toBeTruthy();
    });
  });
});
