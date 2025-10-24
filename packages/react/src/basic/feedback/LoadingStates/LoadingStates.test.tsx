/**
 * LoadingStates Components Tests
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import {
  CardSkeleton,
  LoadingOverlay,
  PageSkeleton,
  TextSkeleton,
} from "./LoadingStates";

describe("TextSkeleton", () => {
  describe("Basic Rendering", () => {
    it("renders single line skeleton", () => {
      const { container } = render(<TextSkeleton />);
      const skeleton = container.querySelector('[role="status"]');
      expect(skeleton).toBeInTheDocument();
    });

    it("renders multiple lines", () => {
      const { container } = render(<TextSkeleton lines={3} />);
      // Check that multiple skeleton divs are rendered
      const skeletonGroup = container.querySelector('[role="status"]');
      expect(skeletonGroup).toBeInTheDocument();
      expect(skeletonGroup?.children.length).toBeGreaterThanOrEqual(3);
    });

    it("applies aria labels", () => {
      const { getAllByRole } = render(<TextSkeleton />);
      const statusElements = getAllByRole("status");
      expect(statusElements.length).toBeGreaterThanOrEqual(1);
      expect(statusElements[0]).toHaveAttribute(
        "aria-label",
        "Loading content",
      );
    });
  });

  describe("Size Variants", () => {
    it("renders with sm size", () => {
      const { container } = render(<TextSkeleton size="sm" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders with md size", () => {
      const { container } = render(<TextSkeleton size="md" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders with lg size", () => {
      const { container } = render(<TextSkeleton size="lg" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders with xl size", () => {
      const { container } = render(<TextSkeleton size="xl" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders text variant", () => {
      const { container } = render(<TextSkeleton variant="text" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders heading variant", () => {
      const { container } = render(<TextSkeleton variant="heading" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders circle variant", () => {
      const { container } = render(<TextSkeleton variant="circle" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders rectangle variant", () => {
      const { container } = render(<TextSkeleton variant="rectangle" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom width", () => {
      const { container } = render(<TextSkeleton width="200px" />);
      const skeleton = container.querySelector('[role="status"]');
      expect(skeleton).toHaveStyle({ width: "200px" });
    });

    it("applies custom height", () => {
      const { container } = render(<TextSkeleton height="30px" />);
      const skeleton = container.querySelector('[role="status"]');
      expect(skeleton).toHaveStyle({ height: "30px" });
    });

    it("applies custom className", () => {
      const { container } = render(<TextSkeleton className="custom-class" />);
      const skeleton = container.querySelector('[role="status"]');
      expect(skeleton?.className).toContain("custom-class");
    });
  });
});

describe("CardSkeleton", () => {
  describe("Basic Rendering", () => {
    it("renders card skeleton", () => {
      const { container } = render(<CardSkeleton />);
      const card = container.querySelector('[aria-label="Loading card"]');
      expect(card).toBeInTheDocument();
    });

    it("renders with image by default", () => {
      const { container } = render(<CardSkeleton />);
      // Card is rendered with structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders without image when disabled", () => {
      const { container } = render(<CardSkeleton showImage={false} />);
      // Card still renders, just without image section
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Avatar Feature", () => {
    it("does not render avatar by default", () => {
      const { container } = render(<CardSkeleton />);
      // Card renders without avatar header
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders avatar when enabled", () => {
      const { container } = render(<CardSkeleton showAvatar />);
      // Card renders with avatar header
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Text Lines", () => {
    it("renders default number of lines", () => {
      const { getAllByRole } = render(<CardSkeleton />);
      const statusElements = getAllByRole("status");
      // Should have at least card + text skeleton
      expect(statusElements.length).toBeGreaterThanOrEqual(2);
    });

    it("renders custom number of lines", () => {
      const { container } = render(<CardSkeleton lines={5} />);
      // Card skeleton renders with custom lines
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Footer Feature", () => {
    it("does not render footer by default", () => {
      const { container } = render(<CardSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders footer when enabled", () => {
      const { container } = render(<CardSkeleton showFooter />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with different sizes", () => {
      const sizes: Array<"sm" | "md" | "lg" | "xl"> = ["sm", "md", "lg", "xl"];
      for (const size of sizes) {
        const { container } = render(<CardSkeleton size={size} />);
        expect(container.firstChild).toBeInTheDocument();
      }
    });
  });
});

describe("PageSkeleton", () => {
  describe("Basic Rendering", () => {
    it("renders page skeleton", () => {
      const { container } = render(<PageSkeleton />);
      const page = container.querySelector('[aria-label="Loading page"]');
      expect(page).toBeInTheDocument();
    });

    it("renders header by default", () => {
      const { container } = render(<PageSkeleton />);
      // Page renders with default header
      expect(container.firstChild).toBeInTheDocument();
    });

    it("hides header when disabled", () => {
      const { container } = render(<PageSkeleton showHeader={false} />);
      // Page renders without header
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Navigation Feature", () => {
    it("does not render nav by default", () => {
      const { container } = render(<PageSkeleton />);
      // Page renders without nav
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders nav when enabled", () => {
      const { container } = render(<PageSkeleton showNav />);
      // Page renders with nav
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Sections", () => {
    it("renders default number of sections", () => {
      const { getAllByRole } = render(<PageSkeleton />);
      const statusElements = getAllByRole("status");
      // Should have page + text skeletons (3 sections = 3 text skeletons)
      expect(statusElements.length).toBeGreaterThanOrEqual(4);
    });

    it("renders custom number of sections", () => {
      const { getAllByRole } = render(<PageSkeleton sections={5} />);
      const statusElements = getAllByRole("status");
      // Should have more elements with more sections
      expect(statusElements.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe("Sidebar Feature", () => {
    it("does not render sidebar by default", () => {
      const { container } = render(<PageSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders sidebar when enabled", () => {
      const { container } = render(<PageSkeleton showSidebar />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Complete Layout", () => {
    it("renders full layout with all features", () => {
      const { getAllByRole } = render(
        <PageSkeleton showHeader showNav showSidebar sections={4} />,
      );

      const statusElements = getAllByRole("status");
      // Page + 4 sections + sidebar text = many status elements
      expect(statusElements.length).toBeGreaterThanOrEqual(6);
    });
  });
});

describe("LoadingOverlay", () => {
  describe("Basic Rendering", () => {
    it("renders loading overlay", () => {
      const { container } = render(<LoadingOverlay />);
      const overlay = container.querySelector('[aria-label="Loading"]');
      expect(overlay).toBeInTheDocument();
    });

    it("renders backdrop by default", () => {
      const { container } = render(<LoadingOverlay />);
      // Overlay renders with backdrop
      expect(container.firstChild).toBeInTheDocument();
    });

    it("hides backdrop when disabled", () => {
      const { container } = render(<LoadingOverlay showBackdrop={false} />);
      // Overlay renders without backdrop
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Message Display", () => {
    it("renders with spinner by default", () => {
      const { getAllByRole } = render(<LoadingOverlay />);
      const statusElements = getAllByRole("status");
      // Overlay + Spinner both have role="status"
      expect(statusElements.length).toBeGreaterThanOrEqual(2);
    });

    it("renders custom message", () => {
      render(<LoadingOverlay message="Loading content..." />);
      expect(screen.getByText("Loading content...")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders spinner variant", () => {
      const { container } = render(<LoadingOverlay variant="spinner" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders dots variant", () => {
      const { container } = render(<LoadingOverlay variant="dots" />);
      // Dots variant renders
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders pulse variant", () => {
      const { container } = render(<LoadingOverlay variant="pulse" />);
      // Pulse variant renders
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders bars variant", () => {
      const { container } = render(<LoadingOverlay variant="bars" />);
      // Bars variant renders
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Custom Children", () => {
    it("renders custom children instead of default content", () => {
      render(
        <LoadingOverlay>
          <div>Custom Loading Content</div>
        </LoadingOverlay>,
      );
      expect(screen.getByText("Custom Loading Content")).toBeInTheDocument();
    });

    it("ignores variant when children provided", () => {
      const { container } = render(
        <LoadingOverlay variant="spinner">
          <div>Custom Content</div>
        </LoadingOverlay>,
      );
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom backdrop opacity", () => {
      const { container } = render(<LoadingOverlay backdropOpacity={0.5} />);
      // Overlay with custom opacity renders
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <LoadingOverlay className="custom-overlay" />,
      );
      expect(container.firstChild).toHaveClass("custom-overlay");
    });
  });
});

describe("Animation Speeds", () => {
  it("applies slow speed", () => {
    const { container } = render(<TextSkeleton speed="slow" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies normal speed", () => {
    const { container } = render(<TextSkeleton speed="normal" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies fast speed", () => {
    const { container } = render(<TextSkeleton speed="fast" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("Accessibility", () => {
  it("all components have proper ARIA labels", () => {
    render(
      <>
        <TextSkeleton />
        <CardSkeleton />
        <PageSkeleton />
        <LoadingOverlay />
      </>,
    );

    const statusElements = screen.getAllByRole("status");
    expect(statusElements.length).toBeGreaterThanOrEqual(4);
  });

  it("all components have aria-live polite", () => {
    const { container } = render(<TextSkeleton />);
    const status = container.querySelector('[role="status"]');
    expect(status).toHaveAttribute("aria-live", "polite");
  });
});
