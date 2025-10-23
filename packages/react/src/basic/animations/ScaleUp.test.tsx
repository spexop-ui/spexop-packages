import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScaleUp } from "./ScaleUp.js";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

// Store callbacks for testing
let storedCallback: ((entries: IntersectionObserverEntry[]) => void) | null =
  null;

mockIntersectionObserver.mockImplementation((callback, options) => {
  // Store the callback for testing
  storedCallback = callback;

  return {
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
  };
});

window.IntersectionObserver = mockIntersectionObserver;

// Mock matchMedia
const mockMatchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

describe("ScaleUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockMatchMedia.mockImplementation((query) => ({
      matches: false, // Default to no reduced motion
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children without animation when disabled", () => {
    render(
      <ScaleUp disabled>
        <div>Test content</div>
      </ScaleUp>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const scaleElement = screen.getByText("Test content").parentElement;
    expect(scaleElement).not.toHaveStyle("opacity: 0");
    expect(scaleElement).not.toHaveStyle("transform: scale(0.92)");
  });

  it("renders children without animation when prefers reduced motion", () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: true, // Simulate prefers-reduced-motion
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ScaleUp>
        <div>Test content</div>
      </ScaleUp>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const scaleElement = screen.getByText("Test content").parentElement;
    expect(scaleElement?.style.transition).toBe(""); // No transition applied
  });

  it("applies correct CSS classes and styles", () => {
    const { container } = render(
      <ScaleUp className="custom-class">
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement).toHaveClass(
      "spex-reveal",
      "spex-reveal--scaleUp",
      "custom-class",
    );
  });

  it("renders with correct initial styles", () => {
    const { container } = render(
      <ScaleUp>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement).toHaveClass("spex-reveal", "spex-reveal--scaleUp");
    expect(scaleElement.style.opacity).toBe("0");
    expect(scaleElement.style.transform).toBe("scale(0.92)");
  });

  it("applies custom fromScale and toScale", () => {
    const { container } = render(
      <ScaleUp fromScale={0.8} toScale={1.1}>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.transform).toBe("scale(0.8)");
  });

  it("applies custom duration and timing", () => {
    // Mock matchMedia to return false for reduced motion
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <ScaleUp duration={800} timing="ease-in-out">
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.transition).toContain("800ms");
    expect(scaleElement.style.transition).toContain("ease-in-out");

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  it("applies hardware acceleration styles when enabled", () => {
    const { container } = render(
      <ScaleUp hardwareAcceleration>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.backfaceVisibility).toBe("hidden");
    expect(scaleElement.style.transformStyle).toBe("preserve-3d");
    expect(scaleElement.style.perspective).toBe("1000px");
  });

  it("does not apply hardware acceleration when disabled", () => {
    const { container } = render(
      <ScaleUp hardwareAcceleration={false}>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.backfaceVisibility).toBe("");
    expect(scaleElement.style.transformStyle).toBe("");
    expect(scaleElement.style.perspective).toBe("");
  });

  it("applies correct accessibility attributes", () => {
    const { container } = render(
      <ScaleUp>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.getAttribute("aria-hidden")).toBe("true");
    expect(scaleElement.getAttribute("role")).toBe("presentation");
  });

  it("uses custom rootMargin in intersection observer", () => {
    render(
      <ScaleUp rootMargin="100px">
        <div>Test content</div>
      </ScaleUp>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: "100px",
      }),
    );
  });

  it("respects reduced motion preference", () => {
    // Mock reduced motion preference
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <ScaleUp respectReducedMotion>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.transition).toBe("");
  });

  it("handles disabled state correctly", () => {
    const { container } = render(
      <ScaleUp disabled>
        <div>Test content</div>
      </ScaleUp>,
    );

    // When disabled, should render children without wrapper
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(container.firstChild?.textContent).toBe("Test content");
  });

  it("applies willChange property correctly", () => {
    const { container } = render(
      <ScaleUp>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.willChange).toBe("transform, opacity");
  });

  it("handles custom style merging", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <ScaleUp style={customStyle}>
        <div>Test content</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.backgroundColor).toBe("red");
    expect(scaleElement.style.padding).toBe("10px");
    expect(scaleElement.style.transform).toBe("scale(0.92)");
  });

  it("handles different fromScale values", () => {
    const { container: container1 } = render(
      <ScaleUp fromScale={0.5}>
        <div>Small scale</div>
      </ScaleUp>,
    );

    const { container: container2 } = render(
      <ScaleUp fromScale={0.99}>
        <div>Large scale</div>
      </ScaleUp>,
    );

    const scaleElement1 = container1.firstChild as HTMLElement;
    const scaleElement2 = container2.firstChild as HTMLElement;

    expect(scaleElement1.style.transform).toBe("scale(0.5)");
    expect(scaleElement2.style.transform).toBe("scale(0.99)");
  });

  it("handles different toScale values", () => {
    const { container: container1 } = render(
      <ScaleUp toScale={0.8}>
        <div>Scale down</div>
      </ScaleUp>,
    );

    const { container: container2 } = render(
      <ScaleUp toScale={1.2}>
        <div>Scale up</div>
      </ScaleUp>,
    );

    // Both should start with the same fromScale
    const scaleElement1 = container1.firstChild as HTMLElement;
    const scaleElement2 = container2.firstChild as HTMLElement;

    expect(scaleElement1.style.transform).toBe("scale(0.92)");
    expect(scaleElement2.style.transform).toBe("scale(0.92)");
  });

  it("handles extreme scale values", () => {
    const { container: container1 } = render(
      <ScaleUp fromScale={0.1}>
        <div>Very small</div>
      </ScaleUp>,
    );

    const { container: container2 } = render(
      <ScaleUp fromScale={0.99}>
        <div>Almost normal</div>
      </ScaleUp>,
    );

    const scaleElement1 = container1.firstChild as HTMLElement;
    const scaleElement2 = container2.firstChild as HTMLElement;

    expect(scaleElement1.style.transform).toBe("scale(0.1)");
    expect(scaleElement2.style.transform).toBe("scale(0.99)");
  });

  it("handles zero scale value", () => {
    const { container } = render(
      <ScaleUp fromScale={0}>
        <div>Invisible start</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.transform).toBe("scale(0)");
  });

  it("handles scale up beyond normal size", () => {
    const { container } = render(
      <ScaleUp fromScale={1.5} toScale={2}>
        <div>Oversized</div>
      </ScaleUp>,
    );

    const scaleElement = container.firstChild as HTMLElement;
    expect(scaleElement.style.transform).toBe("scale(1.5)");
  });
});
