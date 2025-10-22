/**
 * Skeleton Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Skeleton />);
      const skeleton = screen.getByRole("status");
      expect(skeleton).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<Skeleton className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have skeleton class", () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass("skeleton");
    });

    it("should render loading text for screen readers", () => {
      render(<Skeleton />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should render text variant by default", () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass("variant-text");
    });

    it("should render text variant", () => {
      const { container } = render(<Skeleton variant="text" />);
      expect(container.firstChild).toHaveClass("variant-text");
    });

    it("should render circular variant", () => {
      const { container } = render(<Skeleton variant="circular" />);
      expect(container.firstChild).toHaveClass("variant-circular");
    });

    it("should render rectangular variant", () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      expect(container.firstChild).toHaveClass("variant-rectangular");
    });
  });

  describe("Dimensions", () => {
    it("should apply width as number", () => {
      const { container } = render(<Skeleton width={200} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("200px");
    });

    it("should apply width as string", () => {
      const { container } = render(<Skeleton width="100%" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("100%");
    });

    it("should apply height as number", () => {
      const { container } = render(<Skeleton height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("100px");
    });

    it("should apply height as string", () => {
      const { container } = render(<Skeleton height="50vh" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("50vh");
    });

    it("should apply both width and height", () => {
      const { container } = render(<Skeleton width={200} height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("200px");
      expect(skeleton.style.height).toBe("100px");
    });

    it("should handle width in rem", () => {
      const { container } = render(<Skeleton width="10rem" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("10rem");
    });

    it("should handle height in em", () => {
      const { container } = render(<Skeleton height="5em" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("5em");
    });
  });

  describe("Animation", () => {
    it("should animate by default", () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass("animate");
    });

    it("should animate when animate is true", () => {
      const { container } = render(<Skeleton animate={true} />);
      expect(container.firstChild).toHaveClass("animate");
    });

    it("should not animate when animate is false", () => {
      const { container } = render(<Skeleton animate={false} />);
      expect(container.firstChild).not.toHaveClass("animate");
    });
  });

  describe("Accessibility", () => {
    it("should have status role", () => {
      render(<Skeleton />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should have aria-label", () => {
      render(<Skeleton />);
      const skeleton = screen.getByRole("status");
      expect(skeleton).toHaveAttribute("aria-label", "Loading content");
    });

    it("should have aria-live polite", () => {
      render(<Skeleton />);
      const skeleton = screen.getByRole("status");
      expect(skeleton).toHaveAttribute("aria-live", "polite");
    });

    it("should have aria-busy true", () => {
      render(<Skeleton />);
      const skeleton = screen.getByRole("status");
      expect(skeleton).toHaveAttribute("aria-busy", "true");
    });

    it("should have visually hidden loading text", () => {
      const { container } = render(<Skeleton />);
      const srText = container.querySelector(".sr-only");
      expect(srText).toBeInTheDocument();
      expect(srText?.textContent).toBe("Loading...");
    });
  });

  describe("Use Cases", () => {
    it("should work as text placeholder", () => {
      render(<Skeleton variant="text" width="80%" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should work as avatar placeholder", () => {
      render(<Skeleton variant="circular" width={40} height={40} />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should work as image placeholder", () => {
      render(<Skeleton variant="rectangular" width="100%" height={200} />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should work as card placeholder", () => {
      render(<Skeleton variant="rectangular" width="100%" height={300} />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("Common Patterns", () => {
    it("should render as profile avatar skeleton", () => {
      const { container } = render(
        <Skeleton variant="circular" width={64} height={64} />,
      );
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass("variant-circular");
      expect(skeleton.style.width).toBe("64px");
      expect(skeleton.style.height).toBe("64px");
    });

    it("should render as text line skeleton", () => {
      const { container } = render(<Skeleton variant="text" width="100%" />);
      expect(container.firstChild).toHaveClass("variant-text");
    });

    it("should render as card skeleton", () => {
      const { container } = render(
        <Skeleton variant="rectangular" width="100%" height={200} />,
      );
      expect(container.firstChild).toHaveClass("variant-rectangular");
    });
  });

  describe("Multiple Skeletons", () => {
    it("should render multiple text skeletons", () => {
      render(
        <>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
        </>,
      );

      const skeletons = screen.getAllByRole("status");
      expect(skeletons).toHaveLength(3);
    });

    it("should maintain separate props for multiple skeletons", () => {
      const { container } = render(
        <>
          <Skeleton width={100} height={100} animate={true} />
          <Skeleton width={200} height={50} animate={false} />
        </>,
      );

      const skeletons = container.querySelectorAll(".skeleton");
      expect(skeletons[0]).toHaveClass("animate");
      expect(skeletons[1]).not.toHaveClass("animate");
    });
  });

  describe("Complex Layouts", () => {
    it("should render profile skeleton layout", () => {
      render(
        <div>
          <Skeleton variant="circular" width={64} height={64} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>,
      );

      const skeletons = screen.getAllByRole("status");
      expect(skeletons).toHaveLength(3);
    });

    it("should render card skeleton layout", () => {
      render(
        <div>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="70%" />
        </div>,
      );

      const skeletons = screen.getAllByRole("status");
      expect(skeletons).toHaveLength(3);
    });

    it("should render list skeleton layout", () => {
      render(
        <div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <Skeleton variant="text" width="100%" />
            </div>
          ))}
        </div>,
      );

      const skeletons = screen.getAllByRole("status");
      expect(skeletons).toHaveLength(5);
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero width", () => {
      const { container } = render(<Skeleton width={0} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("0px");
    });

    it("should handle zero height", () => {
      const { container } = render(<Skeleton height={0} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("0px");
    });

    it("should handle undefined width", () => {
      const { container } = render(<Skeleton width={undefined} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("");
    });

    it("should handle undefined height", () => {
      const { container } = render(<Skeleton height={undefined} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("");
    });

    it("should handle undefined className", () => {
      const { container } = render(<Skeleton className={undefined} />);
      expect(container.firstChild).toHaveClass("skeleton");
    });

    it("should handle very large dimensions", () => {
      const { container } = render(<Skeleton width={10000} height={10000} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("10000px");
      expect(skeleton.style.height).toBe("10000px");
    });

    it("should handle negative dimensions gracefully", () => {
      const { container } = render(<Skeleton width={-100} height={-50} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("-100px");
      expect(skeleton.style.height).toBe("-50px");
    });
  });

  describe("Combination of Props", () => {
    it("should render with all custom props", () => {
      const { container } = render(
        <Skeleton
          variant="rectangular"
          width={300}
          height={200}
          animate={false}
          className="custom"
        />,
      );

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass("skeleton", "variant-rectangular", "custom");
      expect(skeleton).not.toHaveClass("animate");
      expect(skeleton.style.width).toBe("300px");
      expect(skeleton.style.height).toBe("200px");
    });

    it("should render circular skeleton with custom size", () => {
      const { container } = render(
        <Skeleton variant="circular" width={80} height={80} />,
      );

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass("variant-circular");
      expect(skeleton.style.width).toBe("80px");
      expect(skeleton.style.height).toBe("80px");
    });

    it("should render text skeleton with percentage width", () => {
      const { container } = render(
        <Skeleton variant="text" width="75%" animate={false} />,
      );

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass("variant-text");
      expect(skeleton).not.toHaveClass("animate");
      expect(skeleton.style.width).toBe("75%");
    });
  });

  describe("Responsive Dimensions", () => {
    it("should handle viewport width", () => {
      const { container } = render(<Skeleton width="100vw" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("100vw");
    });

    it("should handle viewport height", () => {
      const { container } = render(<Skeleton height="100vh" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("100vh");
    });

    it("should handle calc values", () => {
      const { container } = render(<Skeleton width="calc(100% - 20px)" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("calc(100% - 20px)");
    });

    it("should handle min/max values", () => {
      const { container } = render(<Skeleton width="min(100%, 500px)" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("min(100%, 500px)");
    });
  });

  describe("Reduced Motion Support", () => {
    it("should respect reduced motion CSS class", () => {
      const { container } = render(<Skeleton animate={false} />);
      expect(container.firstChild).not.toHaveClass("animate");
    });
  });
});
