/**
 * ContextNav Component Tests
 *
 * Tests for ContextNav component covering:
 * - Rendering with required props
 * - Number and title display
 * - Navigation links rendering
 * - Scope variants (page, section)
 * - Sticky behavior detection
 * - Mobile toggle functionality
 * - Scroll spy active link highlighting
 * - Stack below functionality
 * - Overflow behavior options
 * - Accessibility (ARIA attributes)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ContextNav } from "./ContextNav.js";
import type { ContextNavLink } from "./ContextNav.tsx";

describe("ContextNav", () => {
  const mockNavLinks: ContextNavLink[] = [
    { label: "Features", href: "#features" },
    { label: "Examples", href: "#examples" },
    { label: "API", href: "#api" },
  ];

  describe("Basic Rendering", () => {
    it("should render with required title prop", () => {
      const { getByText } = render(<ContextNav title="Test Section" />);
      expect(getByText("Test Section")).toBeTruthy();
    });

    it("should render with number badge", () => {
      const { getByText } = render(
        <ContextNav number="01" title="Test Section" />,
      );
      expect(getByText("01")).toBeTruthy();
      expect(getByText("Test Section")).toBeTruthy();
    });

    it("should render as div element", () => {
      const { container } = render(<ContextNav title="Test Section" />);
      const div = container.firstChild as HTMLElement;
      expect(div.tagName).toBe("DIV");
    });

    it("should apply custom id", () => {
      const { container } = render(
        <ContextNav id="test-nav" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.id).toBe("test-nav");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <ContextNav className="custom-nav" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.className).toContain("custom-nav");
    });
  });

  describe("Navigation Links", () => {
    it("should render without navigation links", () => {
      const { getByText, container } = render(
        <ContextNav title="Test Section" />,
      );
      expect(getByText("Test Section")).toBeTruthy();
      const navItems = container.querySelector('[class*="navItems"]');
      expect(navItems).toBeFalsy();
    });

    it("should render navigation links when provided", () => {
      const { getByText } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      expect(getByText("Features")).toBeTruthy();
      expect(getByText("Examples")).toBeTruthy();
      expect(getByText("API")).toBeTruthy();
    });

    it("should render links as anchor elements with href", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      const links = container.querySelectorAll("a");
      expect(links.length).toBe(3);
      expect(links[0].getAttribute("href")).toBe("#features");
      expect(links[1].getAttribute("href")).toBe("#examples");
      expect(links[2].getAttribute("href")).toBe("#api");
    });

    it("should apply hasNav class when navigation links provided", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.className).toContain("hasNav");
    });
  });

  describe("Scope Variants", () => {
    it("should apply section scope by default", () => {
      const { container } = render(<ContextNav title="Test Section" />);
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-scope")).toBe("section");
    });

    it("should apply page scope", () => {
      const { container } = render(
        <ContextNav scope="page" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-scope")).toBe("page");
    });

    it("should apply section scope explicitly", () => {
      const { container } = render(
        <ContextNav scope="section" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-scope")).toBe("section");
    });
  });

  describe("Variants", () => {
    it("should apply light variant by default", () => {
      const { container } = render(<ContextNav title="Test Section" />);
      const div = container.firstChild as HTMLElement;
      expect(div.className).not.toContain("dark");
    });

    it("should apply dark variant", () => {
      const { container } = render(
        <ContextNav variant="dark" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.className).toContain("dark");
    });
  });

  describe("Top Offset", () => {
    it("should apply default topOffset of 80px", () => {
      const { container } = render(<ContextNav title="Test Section" />);
      const div = container.firstChild as HTMLElement;
      expect(div.style.top).toBe("80px");
    });

    it("should apply custom topOffset", () => {
      const { container } = render(
        <ContextNav topOffset={120} title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.style.top).toBe("120px");
    });

    it("should calculate offset with stackBelow='page'", () => {
      const { container } = render(
        <ContextNav topOffset={80} stackBelow="page" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      // 80 (base) + 60 (page nav height) = 140px
      expect(div.style.top).toBe("140px");
    });

    it("should calculate offset with stackBelow='section'", () => {
      const { container } = render(
        <ContextNav topOffset={80} stackBelow="section" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      // 80 (base) + 60 (section nav height) = 140px
      expect(div.style.top).toBe("140px");
    });

    it("should calculate offset with stackBelow as number", () => {
      const { container } = render(
        <ContextNav topOffset={80} stackBelow={100} title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      // 80 (base) + 100 (custom) = 180px
      expect(div.style.top).toBe("180px");
    });
  });

  describe("Overflow Behavior", () => {
    it("should apply extend overflow behavior by default", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-overflow-behavior")).toBe("extend");
    });

    it("should apply wrap overflow behavior", () => {
      const { container } = render(
        <ContextNav
          title="Test Section"
          navLinks={mockNavLinks}
          overflowBehavior="wrap"
        />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-overflow-behavior")).toBe("wrap");
      expect(div.className).toContain("wrap");
    });

    it("should apply scroll overflow behavior", () => {
      const { container } = render(
        <ContextNav
          title="Test Section"
          navLinks={mockNavLinks}
          overflowBehavior="scroll"
        />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-overflow-behavior")).toBe("scroll");
      expect(div.className).toContain("scroll");
    });

    it("should apply maxWidth with wrap behavior", () => {
      const { container } = render(
        <ContextNav
          title="Test Section"
          navLinks={mockNavLinks}
          overflowBehavior="wrap"
          maxWidth="600px"
        />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.style.maxWidth).toBe("600px");
    });

    it("should apply numeric maxWidth", () => {
      const { container } = render(
        <ContextNav
          title="Test Section"
          navLinks={mockNavLinks}
          maxWidth={600}
        />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.style.maxWidth).toBe("600px");
    });
  });

  describe("Mobile Toggle Button", () => {
    it("should render mobile toggle button when navigation links exist", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      const toggleButton = container.querySelector("button[aria-expanded]");
      expect(toggleButton).toBeTruthy();
    });

    it("should have proper aria-label on toggle button", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      const toggleButton = container.querySelector("button");
      expect(toggleButton?.getAttribute("aria-label")).toBe("Open navigation");
    });

    it("should have aria-expanded attribute", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      const toggleButton = container.querySelector("button");
      expect(toggleButton?.getAttribute("aria-expanded")).toBe("false");
    });
  });

  describe("Data Attributes", () => {
    it("should apply data-scope attribute", () => {
      const { container } = render(
        <ContextNav scope="page" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-scope")).toBe("page");
    });

    it("should apply data-stack-below attribute", () => {
      const { container } = render(
        <ContextNav stackBelow="page" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-stack-below")).toBe("page");
    });

    it("should apply data-overflow-behavior attribute", () => {
      const { container } = render(
        <ContextNav overflowBehavior="wrap" title="Test Section" />,
      );
      const div = container.firstChild as HTMLElement;
      expect(div.getAttribute("data-overflow-behavior")).toBe("wrap");
    });
  });

  describe("Accessibility", () => {
    it("should render navigation links with proper structure", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      const links = container.querySelectorAll("a");
      expect(links.length).toBe(3);

      for (const link of links) {
        expect(link.tagName).toBe("A");
        expect(link.getAttribute("href")).toMatch(/^#/);
      }
    });

    it("should have proper button type for toggle", () => {
      const { container } = render(
        <ContextNav title="Test Section" navLinks={mockNavLinks} />,
      );

      const button = container.querySelector("button");
      expect(button?.getAttribute("type")).toBe("button");
    });
  });

  describe("Forward Ref", () => {
    it("should forward ref to container div", () => {
      const ref = vi.fn();
      render(<ContextNav ref={ref} title="Test Section" />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
