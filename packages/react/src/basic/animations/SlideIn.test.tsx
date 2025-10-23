import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SlideIn } from "./SlideIn.js";

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

describe("SlideIn", () => {
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
      <SlideIn disabled>
        <div>Test content</div>
      </SlideIn>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const slideElement = screen.getByText("Test content").parentElement;
    expect(slideElement).not.toHaveStyle("opacity: 0");
    expect(slideElement).not.toHaveStyle("transform: translateY(20px)");
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
      <SlideIn>
        <div>Test content</div>
      </SlideIn>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    const slideElement = screen.getByText("Test content").parentElement;
    expect(slideElement?.style.transition).toBe(""); // No transition applied
  });

  it("applies correct CSS classes and styles", () => {
    const { container } = render(
      <SlideIn className="custom-class">
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement).toHaveClass(
      "spex-reveal",
      "spex-reveal--slideUp",
      "custom-class",
    );
  });

  it("renders with correct initial styles for up direction", () => {
    const { container } = render(
      <SlideIn direction="up">
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement).toHaveClass("spex-reveal", "spex-reveal--slideUp");
    expect(slideElement.style.opacity).toBe("0");
    expect(slideElement.style.transform).toBe("translateY(20px)");
  });

  it("renders with correct initial styles for down direction", () => {
    const { container } = render(
      <SlideIn direction="down">
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement).toHaveClass("spex-reveal", "spex-reveal--slideDown");
    expect(slideElement.style.opacity).toBe("0");
    expect(slideElement.style.transform).toBe("translateY(-20px)");
  });

  it("renders with correct initial styles for left direction", () => {
    const { container } = render(
      <SlideIn direction="left">
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement).toHaveClass("spex-reveal", "spex-reveal--slideLeft");
    expect(slideElement.style.opacity).toBe("0");
    expect(slideElement.style.transform).toBe("translateX(20px)");
  });

  it("renders with correct initial styles for right direction", () => {
    const { container } = render(
      <SlideIn direction="right">
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement).toHaveClass("spex-reveal", "spex-reveal--slideRight");
    expect(slideElement.style.opacity).toBe("0");
    expect(slideElement.style.transform).toBe("translateX(-20px)");
  });

  it("applies custom distance", () => {
    const { container } = render(
      <SlideIn direction="up" distance={50}>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transform).toBe("translateY(50px)");
  });

  it("applies custom distance for different directions", () => {
    const { container: container1 } = render(
      <SlideIn direction="down" distance={30}>
        <div>Down slide</div>
      </SlideIn>,
    );

    const { container: container2 } = render(
      <SlideIn direction="left" distance={40}>
        <div>Left slide</div>
      </SlideIn>,
    );

    const { container: container3 } = render(
      <SlideIn direction="right" distance={60}>
        <div>Right slide</div>
      </SlideIn>,
    );

    const slideElement1 = container1.firstChild as HTMLElement;
    const slideElement2 = container2.firstChild as HTMLElement;
    const slideElement3 = container3.firstChild as HTMLElement;

    expect(slideElement1.style.transform).toBe("translateY(-30px)");
    expect(slideElement2.style.transform).toBe("translateX(40px)");
    expect(slideElement3.style.transform).toBe("translateX(-60px)");
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
      <SlideIn duration={800} timing="ease-in-out">
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transition).toContain("800ms");
    expect(slideElement.style.transition).toContain("ease-in-out");

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  it("applies hardware acceleration styles when enabled", () => {
    const { container } = render(
      <SlideIn hardwareAcceleration>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.backfaceVisibility).toBe("hidden");
    expect(slideElement.style.transformStyle).toBe("preserve-3d");
    expect(slideElement.style.perspective).toBe("1000px");
  });

  it("does not apply hardware acceleration when disabled", () => {
    const { container } = render(
      <SlideIn hardwareAcceleration={false}>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.backfaceVisibility).toBe("");
    expect(slideElement.style.transformStyle).toBe("");
    expect(slideElement.style.perspective).toBe("");
  });

  it("applies correct accessibility attributes", () => {
    const { container } = render(
      <SlideIn>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.getAttribute("aria-hidden")).toBe("true");
    expect(slideElement.getAttribute("role")).toBe("presentation");
  });

  it("uses custom rootMargin in intersection observer", () => {
    render(
      <SlideIn rootMargin="100px">
        <div>Test content</div>
      </SlideIn>,
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
      <SlideIn respectReducedMotion>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transition).toBe("");
  });

  it("handles disabled state correctly", () => {
    const { container } = render(
      <SlideIn disabled>
        <div>Test content</div>
      </SlideIn>,
    );

    // When disabled, should render children without wrapper
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(container.firstChild?.textContent).toBe("Test content");
  });

  it("applies willChange property correctly", () => {
    const { container } = render(
      <SlideIn>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.willChange).toBe("transform, opacity");
  });

  it("handles custom style merging", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <SlideIn style={customStyle}>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.backgroundColor).toBe("red");
    expect(slideElement.style.padding).toBe("10px");
    expect(slideElement.style.transform).toBe("translateY(20px)");
  });

  it("handles different distance values", () => {
    const { container: container1 } = render(
      <SlideIn direction="up" distance={10}>
        <div>Small distance</div>
      </SlideIn>,
    );

    const { container: container2 } = render(
      <SlideIn direction="up" distance={100}>
        <div>Large distance</div>
      </SlideIn>,
    );

    const slideElement1 = container1.firstChild as HTMLElement;
    const slideElement2 = container2.firstChild as HTMLElement;

    expect(slideElement1.style.transform).toBe("translateY(10px)");
    expect(slideElement2.style.transform).toBe("translateY(100px)");
  });

  it("handles zero distance", () => {
    const { container } = render(
      <SlideIn direction="up" distance={0}>
        <div>No slide</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transform).toBe("translateY(0px)");
  });

  it("handles negative distance", () => {
    const { container } = render(
      <SlideIn direction="up" distance={-20}>
        <div>Negative slide</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transform).toBe("translateY(-20px)");
  });

  it("handles extreme distance values", () => {
    const { container } = render(
      <SlideIn direction="up" distance={500}>
        <div>Extreme distance</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transform).toBe("translateY(500px)");
  });

  it("defaults to up direction when invalid direction provided", () => {
    const { container } = render(
      <SlideIn direction={"invalid" as "up"}>
        <div>Test content</div>
      </SlideIn>,
    );

    const slideElement = container.firstChild as HTMLElement;
    expect(slideElement.style.transform).toBe("translateY(20px)");
  });
});
