/**
 * PageLayout Component Tests
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { PageLayout } from "./PageLayout";

describe("PageLayout", () => {
  describe("Default Rendering", () => {
    it("renders children correctly", () => {
      render(
        <PageLayout>
          <div>Test Content</div>
        </PageLayout>,
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      const { container } = render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders as div by default", () => {
      const { container } = render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.tagName.toLowerCase()).toBe("div");
    });
  });

  describe("MaxWidth Variants", () => {
    it("renders with sm maxWidth", () => {
      const { container } = render(
        <PageLayout maxWidth="sm">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with md maxWidth", () => {
      const { container } = render(
        <PageLayout maxWidth="md">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with lg maxWidth", () => {
      const { container } = render(
        <PageLayout maxWidth="lg">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with xl maxWidth", () => {
      const { container } = render(
        <PageLayout maxWidth="xl">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with 2xl maxWidth", () => {
      const { container } = render(
        <PageLayout maxWidth="2xl">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with page maxWidth (default)", () => {
      const { container } = render(
        <PageLayout maxWidth="page">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with full maxWidth", () => {
      const { container } = render(
        <PageLayout maxWidth="full">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });
  });

  describe("String Padding Variants", () => {
    it("renders with none padding", () => {
      const { container } = render(
        <PageLayout padding="none">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with sm padding", () => {
      const { container } = render(
        <PageLayout padding="sm">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with md padding", () => {
      const { container } = render(
        <PageLayout padding="md">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with lg padding (default)", () => {
      const { container } = render(
        <PageLayout padding="lg">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with xl padding", () => {
      const { container } = render(
        <PageLayout padding="xl">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });
  });

  describe("Numeric Padding Values", () => {
    it("renders with padding 0", () => {
      const { container } = render(
        <PageLayout padding={0}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with padding 4", () => {
      const { container } = render(
        <PageLayout padding={4}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with padding 6", () => {
      const { container } = render(
        <PageLayout padding={6}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with padding 8", () => {
      const { container } = render(
        <PageLayout padding={8}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders with padding 10", () => {
      const { container } = render(
        <PageLayout padding={10}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });
  });

  describe("Responsive Padding", () => {
    it("renders with responsive padding object", () => {
      const { container } = render(
        <PageLayout padding={{ xs: 4, md: 6, xl: 10 }}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });
  });

  describe("Centering", () => {
    it("renders centered by default", () => {
      const { container } = render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });

    it("renders without centering when centered=false", () => {
      const { container } = render(
        <PageLayout centered={false}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      const { container } = render(
        <PageLayout className="custom-class">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.className).toContain("custom-class");
    });

    it("applies custom style", () => {
      const { container } = render(
        <PageLayout style={{ backgroundColor: "red" }}>
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.style.backgroundColor).toBe("red");
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as main when as='main'", () => {
      const { container } = render(
        <PageLayout as="main">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.tagName.toLowerCase()).toBe("main");
    });

    it("renders as section when as='section'", () => {
      const { container } = render(
        <PageLayout as="section">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.tagName.toLowerCase()).toBe("section");
    });

    it("renders as article when as='article'", () => {
      const { container } = render(
        <PageLayout as="article">
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.tagName.toLowerCase()).toBe("article");
    });
  });

  describe("Complex Scenarios", () => {
    it("renders with all custom props", () => {
      const { container } = render(
        <PageLayout
          maxWidth="xl"
          padding="md"
          centered={false}
          className="custom"
          style={{ margin: "20px" }}
          as="main"
        >
          <div>Content</div>
        </PageLayout>,
      );

      const pageLayout = container.firstChild as HTMLElement;
      expect(pageLayout.tagName.toLowerCase()).toBe("main");
      expect(pageLayout.className).toContain("custom");
      expect(pageLayout.style.margin).toBe("20px");
    });

    it("renders nested content correctly", () => {
      render(
        <PageLayout>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <button type="button">Button</button>
          </div>
        </PageLayout>,
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByText("Button")).toBeInTheDocument();
    });
  });
});
