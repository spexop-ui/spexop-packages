/**
 * Image Component Tests
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Image } from "./Image.js";

describe("Image", () => {
  it("renders with alt text", () => {
    render(<Image src="/test.jpg" alt="Test image" />);
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
  });

  it("applies lazy loading by default", () => {
    render(<Image src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("disables lazy loading with priority", () => {
    render(<Image src="/test.jpg" alt="Test image" priority />);
    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("loading", "eager");
  });

  it("renders with width and height", () => {
    render(<Image src="/test.jpg" alt="Test image" width={800} height={600} />);
    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("width", "800");
    expect(img).toHaveAttribute("height", "600");
  });

  it("renders blur placeholder", () => {
    render(
      <Image
        src="/test.jpg"
        alt="Test image"
        placeholder="blur"
        blurDataURL="/blur.jpg"
      />,
    );
    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("src");
  });

  it("renders shimmer skeleton", () => {
    const { container } = render(
      <Image src="/test.jpg" alt="Test image" placeholder="shimmer" />,
    );
    expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });

  it("calls onLoad when image loads", async () => {
    const onLoad = vi.fn();
    render(<Image src="/test.jpg" alt="Test image" priority onLoad={onLoad} />);

    await waitFor(
      () => {
        expect(onLoad).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });

  it("renders with responsive sources", () => {
    render(
      <Image
        src="/test.jpg"
        alt="Test image"
        sources={[
          { src: "/test-480.jpg", width: 480 },
          { src: "/test-800.jpg", width: 800 },
          { src: "/test-1200.jpg", width: 1200 },
        ]}
        sizes="(max-width: 768px) 100vw, 50vw"
      />,
    );

    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("sizes", "(max-width: 768px) 100vw, 50vw");
  });

  it("applies object-fit styles", () => {
    const { container } = render(
      <Image src="/test.jpg" alt="Test image" objectFit="contain" />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveClass("imageContain");
  });

  it("applies aspect ratio", () => {
    const { container } = render(
      <Image src="/test.jpg" alt="Test image" aspectRatio="16/9" />,
    );
    const aspectRatioContainer = container.querySelector(
      '[class*="aspectRatio"]',
    );
    expect(aspectRatioContainer).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Image src="/test.jpg" alt="Test image" className="custom-class" />);
    const img = screen.getByAltText("Test image");
    expect(img).toHaveClass("custom-class");
  });

  it("renders fallback on error", async () => {
    const { container } = render(
      <Image
        src="/invalid.jpg"
        alt="Test image"
        fallbackSrc="/fallback.jpg"
        priority
      />,
    );

    // Simulate error
    const img = screen.getByAltText("Test image");
    img.dispatchEvent(new Event("error"));

    await waitFor(() => {
      expect(img).toHaveAttribute("src", "/fallback.jpg");
    });
  });

  it("shows error message when no fallback", async () => {
    const onError = vi.fn();
    render(
      <Image src="/invalid.jpg" alt="Test image" priority onError={onError} />,
    );

    const img = screen.getByAltText("Test image");
    img.dispatchEvent(new Event("error"));

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it("generates picture element with formats", () => {
    const { container } = render(
      <Image
        src="/test.jpg"
        alt="Test image"
        formats={["webp", "avif"]}
        sources={[
          { src: "/test-480.jpg", width: 480 },
          { src: "/test-800.jpg", width: 800 },
        ]}
      />,
    );

    const picture = container.querySelector("picture");
    expect(picture).toBeInTheDocument();

    const sources = container.querySelectorAll("source");
    expect(sources.length).toBeGreaterThan(0);
  });

  it("applies object-position", () => {
    render(
      <Image src="/test.jpg" alt="Test image" objectPosition="top center" />,
    );
    const img = screen.getByAltText("Test image");
    expect(img).toHaveStyle({ objectPosition: "top center" });
  });
});
