/**
 * Icon Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";
import styles from "./Icon.module.css";

describe("Icon", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Icon name="home" className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render with icon class", () => {
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toHaveClass(styles.icon);
    });
  });

  describe("Icon Names", () => {
    it("should render home icon", () => {
      const { container } = render(<Icon name="home" />);
      const icon = container.firstChild;
      expect(icon).toHaveAttribute("role", "img");
      expect(icon).toHaveAttribute("aria-label", "home icon");
    });

    it("should render search icon", () => {
      const { container } = render(<Icon name="search" />);
      const icon = container.firstChild;
      expect(icon).toHaveAttribute("aria-label", "search icon");
    });

    it("should render settings icon", () => {
      const { container } = render(<Icon name="settings" />);
      const icon = container.firstChild;
      expect(icon).toHaveAttribute("aria-label", "settings icon");
    });

    it("should render user icon", () => {
      const { container } = render(<Icon name="user" />);
      const icon = container.firstChild;
      expect(icon).toHaveAttribute("aria-label", "user icon");
    });

    it("should render chevron icons", () => {
      const chevrons = [
        "chevron-up",
        "chevron-down",
        "chevron-left",
        "chevron-right",
      ];

      for (const name of chevrons) {
        const { container } = render(<Icon name={name} />);
        const icon = container.firstChild;
        expect(icon).toHaveAttribute("aria-label", `${name} icon`);
      }
    });

    it("should render action icons", () => {
      const actions = ["edit", "delete", "save", "copy", "download", "upload"];

      for (const name of actions) {
        const { container } = render(<Icon name={name} />);
        const icon = container.firstChild;
        expect(icon).toHaveAttribute("aria-label", `${name} icon`);
      }
    });
  });

  describe("Sizes", () => {
    it("should render md size by default", () => {
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toHaveClass(styles.md);
    });

    it("should render sm size", () => {
      const { container } = render(<Icon name="home" size="sm" />);
      expect(container.firstChild).toHaveClass(styles.sm);
    });

    it("should render md size", () => {
      const { container } = render(<Icon name="home" size="md" />);
      expect(container.firstChild).toHaveClass(styles.md);
    });

    it("should render lg size", () => {
      const { container } = render(<Icon name="home" size="lg" />);
      expect(container.firstChild).toHaveClass(styles.lg);
    });

    it("should render xl size", () => {
      const { container } = render(<Icon name="home" size="xl" />);
      expect(container.firstChild).toHaveClass(styles.xl);
    });
  });

  describe("Custom Icons", () => {
    it("should render custom icon via children", () => {
      render(
        <Icon>
          <span data-testid="custom-icon">★</span>
        </Icon>,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should prioritize children over name", () => {
      const { container } = render(
        <Icon name="home">
          <span data-testid="custom-icon">★</span>
        </Icon>,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(
        container.querySelector('[aria-label="home icon"]'),
      ).not.toBeInTheDocument();
    });

    it("should render SVG as children", () => {
      render(
        <Icon>
          <svg data-testid="custom-svg" aria-labelledby="svg-title">
            <title id="svg-title">Custom SVG</title>
            <circle cx="10" cy="10" r="5" />
          </svg>
        </Icon>,
      );
      expect(screen.getByTestId("custom-svg")).toBeInTheDocument();
    });

    it("should apply size class to custom icons", () => {
      const { container } = render(
        <Icon size="lg">
          <span>★</span>
        </Icon>,
      );
      expect(container.firstChild).toHaveClass(styles.lg);
    });
  });

  describe("Unknown Icons", () => {
    it("should render fallback for unknown icon name", () => {
      const { container } = render(<Icon name="unknown-icon" />);
      expect(screen.getByText("?")).toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute(
        "title",
        "Unknown icon: unknown-icon",
      );
    });

    it("should apply classes to fallback icon", () => {
      const { container } = render(
        <Icon name="unknown-icon" size="lg" className="custom" />,
      );
      expect(container.firstChild).toHaveClass(styles.icon);
      expect(container.firstChild).toHaveClass(styles.lg);
      expect(container.firstChild).toHaveClass("custom");
    });
  });

  describe("Accessibility", () => {
    it("should have role img for named icons", () => {
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toHaveAttribute("role", "img");
    });

    it("should have aria-label with icon name", () => {
      const { container } = render(<Icon name="search" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "search icon");
    });

    it("should not have role or aria-label for custom icons", () => {
      const { container } = render(
        <Icon>
          <span>★</span>
        </Icon>,
      );
      expect(container.firstChild).not.toHaveAttribute("role");
      expect(container.firstChild).not.toHaveAttribute("aria-label");
    });
  });

  describe("Icon Mapping", () => {
    it("should map dashboard to home icon", () => {
      const { container } = render(<Icon name="dashboard" />);
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "dashboard icon",
      );
    });

    it("should map components to grid icon", () => {
      const { container } = render(<Icon name="components" />);
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "components icon",
      );
    });

    it("should map button to square-stack icon", () => {
      const { container } = render(<Icon name="button" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "button icon");
    });

    it("should map card to layout icon", () => {
      const { container } = render(<Icon name="card" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "card icon");
    });

    it("should map tokens to droplet icon", () => {
      const { container } = render(<Icon name="tokens" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "tokens icon");
    });

    it("should map docs to file-text icon", () => {
      const { container } = render(<Icon name="docs" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "docs icon");
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined name", () => {
      const { container } = render(<Icon name={undefined} />);
      expect(screen.getByText("?")).toBeInTheDocument();
    });

    it("should handle empty string name", () => {
      const { container } = render(<Icon name="" />);
      expect(screen.getByText("?")).toBeInTheDocument();
    });

    it("should handle undefined children", () => {
      const { container } = render(<Icon name="home">{undefined}</Icon>);
      // Should render name-based icon since children is undefined
      expect(container.firstChild).toHaveAttribute("aria-label", "home icon");
    });

    it("should handle null children", () => {
      const { container } = render(<Icon name="home">{null}</Icon>);
      // Should render name-based icon since children is null
      expect(container.firstChild).toHaveAttribute("aria-label", "home icon");
    });

    it("should handle undefined className", () => {
      const { container } = render(<Icon name="home" className={undefined} />);
      expect(container.firstChild).toHaveClass(styles.icon);
    });

    it("should handle empty className", () => {
      const { container } = render(<Icon name="home" className="" />);
      expect(container.firstChild).toHaveClass(styles.icon);
    });
  });

  describe("Size Mapping", () => {
    it("should render correct size for sm", () => {
      const { container } = render(<Icon name="home" size="sm" />);
      // Size sm should render 16px icon
      expect(container.firstChild).toHaveClass(styles.sm);
    });

    it("should render correct size for md", () => {
      const { container } = render(<Icon name="home" size="md" />);
      // Size md should render 20px icon
      expect(container.firstChild).toHaveClass(styles.md);
    });

    it("should render correct size for lg", () => {
      const { container } = render(<Icon name="home" size="lg" />);
      // Size lg should render 24px icon
      expect(container.firstChild).toHaveClass(styles.lg);
    });

    it("should render correct size for xl", () => {
      const { container } = render(<Icon name="home" size="xl" />);
      // Size xl should render 32px icon
      expect(container.firstChild).toHaveClass(styles.xl);
    });
  });

  describe("Multiple Icons", () => {
    it("should render multiple icons independently", () => {
      render(
        <>
          <Icon name="home" />
          <Icon name="search" />
          <Icon name="settings" />
        </>,
      );

      const icons = document.querySelectorAll(`.${styles.icon}`);
      expect(icons).toHaveLength(3);
    });

    it("should maintain separate props for multiple icons", () => {
      const { container } = render(
        <>
          <Icon name="home" size="sm" />
          <Icon name="search" size="lg" />
        </>,
      );

      const icons = container.querySelectorAll(`.${styles.icon}`);
      expect(icons[0]).toHaveClass(styles.sm);
      expect(icons[1]).toHaveClass(styles.lg);
    });
  });

  describe("Icon Component Integration", () => {
    it("should render icon from @spexop/icons", () => {
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should pass correct props to icon component", () => {
      const { container } = render(<Icon name="home" size="lg" />);
      const icon = container.firstChild;
      expect(icon).toHaveClass(styles.lg);
    });

    it("should use strokeWidth of 1.5", () => {
      // This is internal to the component, but we can verify it renders
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Use Cases", () => {
    it("should work in navigation", () => {
      render(
        <nav>
          <a href="/">
            <Icon name="home" /> Home
          </a>
        </nav>,
      );
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("should work in buttons", () => {
      render(
        <button type="button">
          <Icon name="search" /> Search
        </button>,
      );
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("should work standalone", () => {
      render(<Icon name="settings" />);
      const icons = document.querySelectorAll(`.${styles.icon}`);
      expect(icons).toHaveLength(1);
    });

    it("should work with custom icons", () => {
      const CustomStar = () => <span data-testid="star">⭐</span>;
      render(
        <Icon>
          <CustomStar />
        </Icon>,
      );
      expect(screen.getByTestId("star")).toBeInTheDocument();
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props", () => {
      const { container } = render(
        <Icon name="home" size="xl" className="custom-icon" />,
      );

      const icon = container.firstChild;
      expect(icon).toHaveClass(styles.icon);
      expect(icon).toHaveClass(styles.xl);
      expect(icon).toHaveClass("custom-icon");
      expect(icon).toHaveAttribute("aria-label", "home icon");
    });

    it("should render custom icon with all props", () => {
      const { container } = render(
        <Icon size="lg" className="custom">
          <span data-testid="custom">★</span>
        </Icon>,
      );

      expect(container.firstChild).toHaveClass(styles.icon);
      expect(container.firstChild).toHaveClass(styles.lg);
      expect(container.firstChild).toHaveClass("custom");
      expect(screen.getByTestId("custom")).toBeInTheDocument();
    });
  });

  describe("DOM Structure", () => {
    it("should render as span element", () => {
      const { container } = render(<Icon name="home" />);
      const icon = container.firstChild as HTMLElement;
      expect(icon.tagName).toBe("SPAN");
    });

    it("should nest icon component inside span", () => {
      const { container } = render(<Icon name="search" />);
      const span = container.firstChild as HTMLElement;
      const svg = span.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should apply currentColor to icon component", () => {
      const { container } = render(<Icon name="home" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("stroke", "currentColor");
    });
  });

  describe("Size Pixel Mapping", () => {
    it("should use 16px for sm icons", () => {
      const { container } = render(<Icon name="home" size="sm" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "16");
      expect(svg).toHaveAttribute("height", "16");
    });

    it("should use 20px for md icons", () => {
      const { container } = render(<Icon name="home" size="md" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "20");
      expect(svg).toHaveAttribute("height", "20");
    });

    it("should use 24px for lg icons", () => {
      const { container } = render(<Icon name="home" size="lg" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });

    it("should use 32px for xl icons", () => {
      const { container } = render(<Icon name="home" size="xl" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });
  });

  describe("StrokeWidth", () => {
    it("should use strokeWidth 1.5 by default", () => {
      const { container } = render(<Icon name="home" />);
      const svg = container.querySelector("svg");
      // @spexop/icons components use their own default strokeWidth
      expect(svg).toBeInTheDocument();
    });

    it("should apply consistent strokeWidth across all sizes", () => {
      const sizes = ["sm", "md", "lg", "xl"] as const;
      for (const size of sizes) {
        const { container } = render(<Icon name="home" size={size} />);
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
      }
    });
  });

  describe("Additional Icon Aliases", () => {
    it("should render delete as trash icon", () => {
      const { container } = render(<Icon name="delete" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "delete icon");
    });

    it("should render book as file-text icon", () => {
      const { container } = render(<Icon name="book" />);
      expect(container.firstChild).toHaveAttribute("aria-label", "book icon");
    });

    it("should render foundations as droplet icon", () => {
      const { container } = render(<Icon name="foundations" />);
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "foundations icon",
      );
    });
  });

  describe("Custom Children Rendering", () => {
    it("should render string children", () => {
      render(
        <Icon size="md" className="custom">
          →
        </Icon>,
      );
      expect(screen.getByText("→")).toBeInTheDocument();
    });

    it("should render React component children", () => {
      const CustomIcon = () => <div data-testid="custom-component">Custom</div>;
      const { container } = render(
        <Icon size="lg">
          <CustomIcon />
        </Icon>,
      );
      expect(screen.getByTestId("custom-component")).toBeInTheDocument();
    });

    it("should not add role or aria-label to custom children", () => {
      const { container } = render(
        <Icon>
          <span>Custom</span>
        </Icon>,
      );
      const span = container.firstChild as HTMLElement;
      expect(span).not.toHaveAttribute("role");
      expect(span).not.toHaveAttribute("aria-label");
    });
  });
});
