import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal.js";

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

describe("Reveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children without animation when disabled", () => {
    render(
      <Reveal variant="fadeInUp" disabled>
        <div>Test content</div>
      </Reveal>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders children without animation when prefers reduced motion", () => {
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

    render(
      <Reveal variant="fadeInUp" respectReducedMotion>
        <div>Test content</div>
      </Reveal>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies correct CSS classes and styles", () => {
    const { container } = render(
      <Reveal variant="fadeInUp" className="custom-class">
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement).toHaveClass(
      "spex-reveal",
      "spex-reveal--fadeInUp",
      "custom-class",
    );
  });

  it("renders with correct initial styles", () => {
    const { container } = render(
      <Reveal variant="fadeInUp">
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement).toHaveClass("spex-reveal", "spex-reveal--fadeInUp");
    expect(revealElement.style.opacity).toBe("0");
    expect(revealElement.style.transform).toBe("translateY(12px)");
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
      <Reveal variant="fadeInUp" duration={800} timing="ease-in-out">
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement.style.transition).toContain("800ms");
    expect(revealElement.style.transition).toContain("ease-in-out");

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  it("applies hardware acceleration styles when enabled", () => {
    const { container } = render(
      <Reveal variant="fadeInUp" hardwareAcceleration>
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement.style.backfaceVisibility).toBe("hidden");
    expect(revealElement.style.transformStyle).toBe("preserve-3d");
    expect(revealElement.style.perspective).toBe("1000px");
  });

  it("does not apply hardware acceleration when disabled", () => {
    const { container } = render(
      <Reveal variant="fadeInUp" hardwareAcceleration={false}>
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement.style.backfaceVisibility).toBe("");
    expect(revealElement.style.transformStyle).toBe("");
    expect(revealElement.style.perspective).toBe("");
  });

  it("applies correct accessibility attributes", () => {
    const { container } = render(
      <Reveal variant="fadeInUp">
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement.getAttribute("aria-hidden")).toBe("true");
    expect(revealElement.getAttribute("role")).toBe("presentation");
  });

  it("uses custom rootMargin in intersection observer", () => {
    render(
      <Reveal variant="fadeInUp" rootMargin="100px">
        <div>Test content</div>
      </Reveal>,
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
      <Reveal variant="fadeInUp" respectReducedMotion>
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement.style.transition).toBe("");
  });

  it("handles disabled state correctly", () => {
    const { container } = render(
      <Reveal variant="fadeInUp" disabled>
        <div>Test content</div>
      </Reveal>,
    );

    // When disabled, should render children without wrapper
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(container.firstChild?.textContent).toBe("Test content");
  });

  it("applies willChange property correctly", () => {
    const { container } = render(
      <Reveal variant="fadeInUp">
        <div>Test content</div>
      </Reveal>,
    );

    const revealElement = container.firstChild as HTMLElement;
    expect(revealElement.style.willChange).toBe("transform, opacity");
  });
});
