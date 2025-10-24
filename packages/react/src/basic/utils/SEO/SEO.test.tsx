/**
 * SEO Component Tests
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SEO } from "./SEO.js";

describe("SEO", () => {
  it("sets document title", () => {
    render(<SEO title="Test Page" description="Test description" />);

    expect(document.title).toBe("Test Page");
  });

  it("creates description meta tag", () => {
    render(<SEO title="Test Page" description="Test description" />);

    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toBeInTheDocument();
    expect(meta?.getAttribute("content")).toBe("Test description");
  });

  it("creates OpenGraph tags", () => {
    render(
      <SEO
        title="Test Page"
        description="Test description"
        image="/test.jpg"
      />,
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    const ogImage = document.querySelector('meta[property="og:image"]');

    expect(ogTitle?.getAttribute("content")).toBe("Test Page");
    expect(ogDescription?.getAttribute("content")).toBe("Test description");
    expect(ogImage?.getAttribute("content")).toBe("/test.jpg");
  });

  it("creates Twitter card tags", () => {
    render(
      <SEO
        title="Test Page"
        description="Test description"
        twitterHandle="@test"
      />,
    );

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterSite = document.querySelector('meta[name="twitter:site"]');

    expect(twitterCard?.getAttribute("content")).toBe("summary_large_image");
    expect(twitterSite?.getAttribute("content")).toBe("@test");
  });

  it("creates canonical link", () => {
    render(
      <SEO
        title="Test Page"
        description="Test description"
        canonical="https://example.com/test"
      />,
    );

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe("https://example.com/test");
  });

  it("creates structured data script", () => {
    render(
      <SEO
        title="Test Page"
        description="Test description"
        structuredData={{
          "@type": "Product",
          name: "Test Product",
          price: "99",
        }}
      />,
    );

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it("supports keywords", () => {
    render(
      <SEO
        title="Test Page"
        description="Test description"
        keywords={["test", "page", "seo"]}
      />,
    );

    const meta = document.querySelector('meta[name="keywords"]');
    expect(meta?.getAttribute("content")).toBe("test, page, seo");
  });

  it("supports author", () => {
    render(
      <SEO
        title="Test Page"
        description="Test description"
        author="John Doe"
      />,
    );

    const meta = document.querySelector('meta[name="author"]');
    expect(meta?.getAttribute("content")).toBe("John Doe");
  });
});
