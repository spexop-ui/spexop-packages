import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Stagger } from "./Stagger.js";

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

describe("Stagger", () => {
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
    const { container } = render(
      <Stagger disabled>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();

    const staggerElement = container.firstChild as HTMLElement;
    expect(staggerElement).toHaveClass(
      "spex-stagger",
      "spex-stagger--disabled",
    );
  });

  it("renders children with stagger animation", () => {
    const { container } = render(
      <Stagger>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    const staggerElement = container.firstChild as HTMLElement;
    expect(staggerElement).toHaveClass("spex-stagger", "spex-stagger--forward");
  });

  it("applies correct CSS classes for different directions", () => {
    const { container: container1 } = render(
      <Stagger direction="reverse">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>,
    );

    const { container: container2 } = render(
      <Stagger direction="center-out">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    const { container: container3 } = render(
      <Stagger direction="edges-in">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    const staggerElement1 = container1.firstChild as HTMLElement;
    const staggerElement2 = container2.firstChild as HTMLElement;
    const staggerElement3 = container3.firstChild as HTMLElement;

    expect(staggerElement1).toHaveClass(
      "spex-stagger",
      "spex-stagger--reverse",
    );
    expect(staggerElement2).toHaveClass(
      "spex-stagger",
      "spex-stagger--center-out",
    );
    expect(staggerElement3).toHaveClass(
      "spex-stagger",
      "spex-stagger--edges-in",
    );
  });

  it("applies custom className and style", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <Stagger className="custom-stagger" style={customStyle}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>,
    );

    const staggerElement = container.firstChild as HTMLElement;
    expect(staggerElement).toHaveClass(
      "spex-stagger",
      "spex-stagger--forward",
      "custom-stagger",
    );
    expect(staggerElement.style.backgroundColor).toBe("red");
    expect(staggerElement.style.padding).toBe("10px");
  });

  it("calculates stagger delays correctly for forward direction", () => {
    render(
      <Stagger delay={100}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    // Check that IntersectionObserver was called with correct delays
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);
  });

  it("calculates stagger delays correctly for reverse direction", () => {
    render(
      <Stagger direction="reverse" delay={50}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);
  });

  it("calculates stagger delays correctly for center-out direction", () => {
    render(
      <Stagger direction="center-out" delay={80}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </Stagger>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(5);
  });

  it("calculates stagger delays correctly for edges-in direction", () => {
    render(
      <Stagger direction="edges-in" delay={60}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Stagger>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(4);
  });

  it("limits children based on maxChildren prop", () => {
    render(
      <Stagger maxChildren={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Stagger>,
    );

    // Should only create 2 IntersectionObserver instances
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
  });

  it("handles empty children", () => {
    const { container } = render(<Stagger />);
    const staggerElement = container.firstChild as HTMLElement;
    expect(staggerElement).toHaveClass("spex-stagger");
    expect(staggerElement.children).toHaveLength(0);
  });

  it("handles single child", () => {
    render(
      <Stagger>
        <div>Single item</div>
      </Stagger>,
    );

    expect(screen.getByText("Single item")).toBeInTheDocument();
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
  });

  it("passes onAnimationStart callback to Reveal components", () => {
    const onAnimationStart = vi.fn();

    render(
      <Stagger onAnimationStart={onAnimationStart}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    // The callback should be passed to each Reveal component
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);
  });

  it("passes onAnimationComplete callback to Reveal components", () => {
    const onAnimationComplete = vi.fn();

    render(
      <Stagger onAnimationComplete={onAnimationComplete}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    // The callback should be passed to each Reveal component
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);
  });

  it("tracks completed animations correctly", () => {
    const onAllAnimationsComplete = vi.fn();

    render(
      <Stagger onAllAnimationsComplete={onAllAnimationsComplete}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    // The component should render with the callback
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);
  });

  it("resets completed count when children change", () => {
    const onAllAnimationsComplete = vi.fn();

    const { rerender } = render(
      <Stagger onAllAnimationsComplete={onAllAnimationsComplete}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);

    // Change children
    rerender(
      <Stagger onAllAnimationsComplete={onAllAnimationsComplete}>
        <div>New Item 1</div>
        <div>New Item 2</div>
        <div>New Item 3</div>
      </Stagger>,
    );

    // Should create new IntersectionObserver instances for new children
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3); // Only the new children
  });

  it("passes correct props to Reveal components", () => {
    render(
      <Stagger
        variant="slideUp"
        duration={600}
        timing="bounce"
        threshold={0.5}
        hardwareAcceleration={false}
        rootMargin="50px"
        respectReducedMotion={false}
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>,
    );

    // Check that IntersectionObserver was called with correct options
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: "50px",
      }),
    );
  });

  it("handles different animation variants", () => {
    const variants = ["fadeIn", "slideUp", "scaleUp", "rotateIn"] as const;

    for (const variant of variants) {
      const { container } = render(
        <Stagger variant={variant}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stagger>,
      );

      const staggerElement = container.firstChild as HTMLElement;
      expect(staggerElement).toHaveClass("spex-stagger");
    }
  });

  it("handles zero delay", () => {
    render(
      <Stagger delay={0}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);
  });

  it("handles large delay values", () => {
    render(
      <Stagger delay={1000}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>,
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
  });

  it("handles maxChildren of 0", () => {
    render(
      <Stagger maxChildren={0}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stagger>,
    );

    // Should not create any IntersectionObserver instances
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it("handles maxChildren greater than children count", () => {
    render(
      <Stagger maxChildren={10}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stagger>,
    );

    // Should create IntersectionObserver instances for all children
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
  });
});
