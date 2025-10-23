import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RotateIn } from "./RotateIn.js";

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

describe("RotateIn", () => {
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
      <RotateIn disabled>
        <div>Test content</div>
      </RotateIn>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const rotateElement = screen.getByText("Test content").parentElement;
    expect(rotateElement).not.toHaveStyle("opacity: 0");
    expect(rotateElement).not.toHaveStyle(
      "transform: rotate(-3deg) scale(0.97)",
    );
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
      <RotateIn>
        <div>Test content</div>
      </RotateIn>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const rotateElement = screen.getByText("Test content").parentElement;
    expect(rotateElement?.style.transition).toBe(""); // No transition applied
  });

  it("applies correct CSS classes and styles", () => {
    const { container } = render(
      <RotateIn className="custom-class">
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement).toHaveClass(
      "spex-reveal",
      "spex-reveal--rotateIn",
      "custom-class",
    );
  });

  it("renders with correct initial styles", () => {
    const { container } = render(
      <RotateIn>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement).toHaveClass("spex-reveal", "spex-reveal--rotateIn");
    expect(rotateElement.style.opacity).toBe("0");
    expect(rotateElement.style.transform).toBe("rotate(-3deg) scale(0.97)");
  });

  it("applies custom angle and scale", () => {
    const { container } = render(
      <RotateIn angle={-5} scale={0.95}>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.transform).toBe("rotate(-5deg) scale(0.95)");
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
      <RotateIn duration={800} timing="ease-in-out">
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.transition).toContain("800ms");
    expect(rotateElement.style.transition).toContain("ease-in-out");

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  it("applies hardware acceleration styles when enabled", () => {
    const { container } = render(
      <RotateIn hardwareAcceleration>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.backfaceVisibility).toBe("hidden");
    expect(rotateElement.style.transformStyle).toBe("preserve-3d");
    expect(rotateElement.style.perspective).toBe("1000px");
  });

  it("does not apply hardware acceleration when disabled", () => {
    const { container } = render(
      <RotateIn hardwareAcceleration={false}>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.backfaceVisibility).toBe("");
    expect(rotateElement.style.transformStyle).toBe("");
    expect(rotateElement.style.perspective).toBe("");
  });

  it("applies correct accessibility attributes", () => {
    const { container } = render(
      <RotateIn>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.getAttribute("aria-hidden")).toBe("true");
    expect(rotateElement.getAttribute("role")).toBe("presentation");
  });

  it("uses custom rootMargin in intersection observer", () => {
    render(
      <RotateIn rootMargin="100px">
        <div>Test content</div>
      </RotateIn>,
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
      <RotateIn respectReducedMotion>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.transition).toBe("");
  });

  it("handles disabled state correctly", () => {
    const { container } = render(
      <RotateIn disabled>
        <div>Test content</div>
      </RotateIn>,
    );

    // When disabled, should render children without wrapper
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(container.firstChild?.textContent).toBe("Test content");
  });

  it("applies willChange property correctly", () => {
    const { container } = render(
      <RotateIn>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.willChange).toBe("transform, opacity");
  });

  it("handles custom style merging", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <RotateIn style={customStyle}>
        <div>Test content</div>
      </RotateIn>,
    );

    const rotateElement = container.firstChild as HTMLElement;
    expect(rotateElement.style.backgroundColor).toBe("red");
    expect(rotateElement.style.padding).toBe("10px");
    expect(rotateElement.style.transform).toBe("rotate(-3deg) scale(0.97)");
  });

  it("handles different angle values", () => {
    const { container: container1 } = render(
      <RotateIn angle={10}>
        <div>Positive angle</div>
      </RotateIn>,
    );

    const { container: container2 } = render(
      <RotateIn angle={-10}>
        <div>Negative angle</div>
      </RotateIn>,
    );

    const rotateElement1 = container1.firstChild as HTMLElement;
    const rotateElement2 = container2.firstChild as HTMLElement;

    expect(rotateElement1.style.transform).toBe("rotate(10deg) scale(0.97)");
    expect(rotateElement2.style.transform).toBe("rotate(-10deg) scale(0.97)");
  });

  it("handles different scale values", () => {
    const { container: container1 } = render(
      <RotateIn scale={0.9}>
        <div>Small scale</div>
      </RotateIn>,
    );

    const { container: container2 } = render(
      <RotateIn scale={1.1}>
        <div>Large scale</div>
      </RotateIn>,
    );

    const rotateElement1 = container1.firstChild as HTMLElement;
    const rotateElement2 = container2.firstChild as HTMLElement;

    expect(rotateElement1.style.transform).toBe("rotate(-3deg) scale(0.9)");
    expect(rotateElement2.style.transform).toBe("rotate(-3deg) scale(1.1)");
  });
});
