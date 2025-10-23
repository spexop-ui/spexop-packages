import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ZoomIn } from "./ZoomIn.js";

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

describe("ZoomIn", () => {
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
      <ZoomIn disabled>
        <div>Test content</div>
      </ZoomIn>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const zoomElement = screen.getByText("Test content").parentElement;
    expect(zoomElement).not.toHaveStyle("opacity: 0");
    expect(zoomElement).not.toHaveStyle("transform: scale(0.95)");
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
      <ZoomIn>
        <div>Test content</div>
      </ZoomIn>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const zoomElement = screen.getByText("Test content").parentElement;
    expect(zoomElement?.style.transition).toBe(""); // No transition applied
  });

  it("applies correct CSS classes and styles", () => {
    const { container } = render(
      <ZoomIn className="custom-class">
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement).toHaveClass(
      "spex-reveal",
      "spex-reveal--zoomIn",
      "custom-class",
    );
  });

  it("renders with correct initial styles for zoom in", () => {
    const { container } = render(
      <ZoomIn type="in">
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement).toHaveClass("spex-reveal", "spex-reveal--zoomIn");
    expect(zoomElement.style.opacity).toBe("0");
    expect(zoomElement.style.transform).toBe("scale(0.95)");
  });

  it("renders with correct initial styles for zoom out", () => {
    const { container } = render(
      <ZoomIn type="out">
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement).toHaveClass("spex-reveal", "spex-reveal--zoomOut");
    expect(zoomElement.style.opacity).toBe("0");
    expect(zoomElement.style.transform).toBe("scale(1.05)");
  });

  it("applies custom fromScale and toScale", () => {
    const { container } = render(
      <ZoomIn type="in" fromScale={0.8} toScale={1.1}>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transform).toBe("scale(0.8)");
  });

  it("uses default fromScale based on type", () => {
    const { container: container1 } = render(
      <ZoomIn type="in">
        <div>Zoom in</div>
      </ZoomIn>,
    );

    const { container: container2 } = render(
      <ZoomIn type="out">
        <div>Zoom out</div>
      </ZoomIn>,
    );

    const zoomElement1 = container1.firstChild as HTMLElement;
    const zoomElement2 = container2.firstChild as HTMLElement;

    expect(zoomElement1.style.transform).toBe("scale(0.95)");
    expect(zoomElement2.style.transform).toBe("scale(1.05)");
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
      <ZoomIn duration={800} timing="ease-in-out">
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transition).toContain("800ms");
    expect(zoomElement.style.transition).toContain("ease-in-out");

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  it("applies hardware acceleration styles when enabled", () => {
    const { container } = render(
      <ZoomIn hardwareAcceleration>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.backfaceVisibility).toBe("hidden");
    expect(zoomElement.style.transformStyle).toBe("preserve-3d");
    expect(zoomElement.style.perspective).toBe("1000px");
  });

  it("does not apply hardware acceleration when disabled", () => {
    const { container } = render(
      <ZoomIn hardwareAcceleration={false}>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.backfaceVisibility).toBe("");
    expect(zoomElement.style.transformStyle).toBe("");
    expect(zoomElement.style.perspective).toBe("");
  });

  it("applies correct accessibility attributes", () => {
    const { container } = render(
      <ZoomIn>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.getAttribute("aria-hidden")).toBe("true");
    expect(zoomElement.getAttribute("role")).toBe("presentation");
  });

  it("uses custom rootMargin in intersection observer", () => {
    render(
      <ZoomIn rootMargin="100px">
        <div>Test content</div>
      </ZoomIn>,
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
      <ZoomIn respectReducedMotion>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transition).toBe("");
  });

  it("handles disabled state correctly", () => {
    const { container } = render(
      <ZoomIn disabled>
        <div>Test content</div>
      </ZoomIn>,
    );

    // When disabled, should render children without wrapper
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(container.firstChild?.textContent).toBe("Test content");
  });

  it("applies willChange property correctly", () => {
    const { container } = render(
      <ZoomIn>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.willChange).toBe("transform, opacity");
  });

  it("handles custom style merging", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <ZoomIn style={customStyle}>
        <div>Test content</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.backgroundColor).toBe("red");
    expect(zoomElement.style.padding).toBe("10px");
    expect(zoomElement.style.transform).toBe("scale(0.95)");
  });

  it("handles different fromScale values", () => {
    const { container: container1 } = render(
      <ZoomIn type="in" fromScale={0.5}>
        <div>Small scale</div>
      </ZoomIn>,
    );

    const { container: container2 } = render(
      <ZoomIn type="in" fromScale={0.99}>
        <div>Large scale</div>
      </ZoomIn>,
    );

    const zoomElement1 = container1.firstChild as HTMLElement;
    const zoomElement2 = container2.firstChild as HTMLElement;

    expect(zoomElement1.style.transform).toBe("scale(0.5)");
    expect(zoomElement2.style.transform).toBe("scale(0.99)");
  });

  it("handles different toScale values", () => {
    const { container: container1 } = render(
      <ZoomIn type="in" toScale={0.8}>
        <div>Scale down</div>
      </ZoomIn>,
    );

    const { container: container2 } = render(
      <ZoomIn type="in" toScale={1.2}>
        <div>Scale up</div>
      </ZoomIn>,
    );

    // Both should start with the same fromScale
    const zoomElement1 = container1.firstChild as HTMLElement;
    const zoomElement2 = container2.firstChild as HTMLElement;

    expect(zoomElement1.style.transform).toBe("scale(0.95)");
    expect(zoomElement2.style.transform).toBe("scale(0.95)");
  });

  it("handles extreme scale values", () => {
    const { container: container1 } = render(
      <ZoomIn type="in" fromScale={0.1}>
        <div>Very small</div>
      </ZoomIn>,
    );

    const { container: container2 } = render(
      <ZoomIn type="out" fromScale={1.9}>
        <div>Very large</div>
      </ZoomIn>,
    );

    const zoomElement1 = container1.firstChild as HTMLElement;
    const zoomElement2 = container2.firstChild as HTMLElement;

    expect(zoomElement1.style.transform).toBe("scale(0.1)");
    expect(zoomElement2.style.transform).toBe("scale(1.9)");
  });

  it("handles zero scale value", () => {
    const { container } = render(
      <ZoomIn type="in" fromScale={0}>
        <div>Invisible start</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transform).toBe("scale(0)");
  });

  it("handles zoom out with custom scale", () => {
    const { container } = render(
      <ZoomIn type="out" fromScale={1.5} toScale={0.8}>
        <div>Zoom out effect</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transform).toBe("scale(1.5)");
  });

  it("handles zoom in with custom scale", () => {
    const { container } = render(
      <ZoomIn type="in" fromScale={0.3} toScale={1.1}>
        <div>Zoom in effect</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transform).toBe("scale(0.3)");
  });

  it("handles negative scale values", () => {
    const { container } = render(
      <ZoomIn type="in" fromScale={-0.5}>
        <div>Negative scale</div>
      </ZoomIn>,
    );

    const zoomElement = container.firstChild as HTMLElement;
    expect(zoomElement.style.transform).toBe("scale(-0.5)");
  });
});
