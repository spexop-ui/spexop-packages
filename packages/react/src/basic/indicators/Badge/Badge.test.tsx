/**
 * Badge Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import styles from "./Badge.module.css";

describe("Badge", () => {
  describe("Rendering", () => {
    it("should render with text content", () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should render with default props", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild;
      expect(badge).toHaveClass(styles.badge);
      expect(badge).toHaveClass(styles["badge--default"]);
      expect(badge).toHaveClass(styles["badge--sm"]);
      expect(badge).toHaveClass(styles["density--normal"]);
      expect(badge).toHaveClass(styles.badgePill);
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Badge style={{ marginTop: "10px" }}>Badge</Badge>,
      );
      expect(container.firstChild).toHaveStyle({ marginTop: "10px" });
    });
  });

  describe("Variants", () => {
    it("should render default variant", () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--default"]);
    });

    it("should render success variant", () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--success"]);
    });

    it("should render warning variant", () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--warning"]);
    });

    it("should render error variant", () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--error"]);
    });

    it("should render info variant", () => {
      const { container } = render(<Badge variant="info">Info</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--info"]);
    });

    it("should render subtle variant", () => {
      const { container } = render(<Badge variant="subtle">Subtle</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--subtle"]);
    });
  });

  describe("Sizes", () => {
    it("should render xs size", () => {
      const { container } = render(<Badge size="xs">XS Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--xs"]);
    });

    it("should render sm size", () => {
      const { container } = render(<Badge size="sm">SM Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--sm"]);
    });

    it("should render md size", () => {
      const { container } = render(<Badge size="md">MD Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--md"]);
    });
  });

  describe("Density", () => {
    it("should render compact density", () => {
      const { container } = render(<Badge density="compact">Compact</Badge>);
      expect(container.firstChild).toHaveClass(styles["density--compact"]);
    });

    it("should render normal density", () => {
      const { container } = render(<Badge density="normal">Normal</Badge>);
      expect(container.firstChild).toHaveClass(styles["density--normal"]);
    });

    it("should render spacious density", () => {
      const { container } = render(<Badge density="spacious">Spacious</Badge>);
      expect(container.firstChild).toHaveClass(styles["density--spacious"]);
    });
  });

  describe("Shape", () => {
    it("should render as pill by default", () => {
      const { container } = render(<Badge>Pill Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles.badgePill);
    });

    it("should render as pill when pill is true", () => {
      const { container } = render(<Badge pill={true}>Pill Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles.badgePill);
    });

    it("should render as square when pill is false", () => {
      const { container } = render(<Badge pill={false}>Square Badge</Badge>);
      expect(container.firstChild).not.toHaveClass(styles.badgePill);
    });
  });

  describe("Content Types", () => {
    it("should render string content", () => {
      render(<Badge>Text</Badge>);
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("should render number content", () => {
      render(<Badge>{42}</Badge>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should render ReactNode content", () => {
      render(
        <Badge>
          <span>Complex</span> <strong>Content</strong>
        </Badge>,
      );
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should render icon content", () => {
      const icon = <span data-testid="icon">⭐</span>;
      render(<Badge>{icon}</Badge>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Combination of Props", () => {
    it("should render with all custom props", () => {
      const { container } = render(
        <Badge
          variant="success"
          size="md"
          density="spacious"
          pill={false}
          className="custom"
        >
          Complete
        </Badge>,
      );

      const badge = container.firstChild;
      expect(badge).toHaveClass(styles["badge--success"]);
      expect(badge).toHaveClass(styles["badge--md"]);
      expect(badge).toHaveClass(styles["density--spacious"]);
      expect(badge).not.toHaveClass(styles.badgePill);
      expect(badge).toHaveClass("custom");
    });

    it("should render compact info badge", () => {
      const { container } = render(
        <Badge variant="info" density="compact" size="xs">
          New
        </Badge>,
      );

      const badge = container.firstChild;
      expect(badge).toHaveClass(styles["badge--info"]);
      expect(badge).toHaveClass(styles["density--compact"]);
      expect(badge).toHaveClass(styles["badge--xs"]);
    });

    it("should render spacious error badge", () => {
      const { container } = render(
        <Badge variant="error" density="spacious" size="md">
          Critical
        </Badge>,
      );

      const badge = container.firstChild;
      expect(badge).toHaveClass(styles["badge--error"]);
      expect(badge).toHaveClass(styles["density--spacious"]);
      expect(badge).toHaveClass(styles["badge--md"]);
    });
  });

  describe("Status Use Cases", () => {
    it("should render as status indicator", () => {
      render(<Badge variant="success">Active</Badge>);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should render as count badge", () => {
      render(
        <Badge variant="info" size="xs">
          99+
        </Badge>,
      );
      expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("should render as label", () => {
      render(<Badge variant="default">Version 1.0</Badge>);
      expect(screen.getByText("Version 1.0")).toBeInTheDocument();
    });

    it("should render as tag", () => {
      render(
        <Badge variant="subtle" pill={false}>
          React
        </Badge>,
      );
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should render as span element", () => {
      const { container } = render(<Badge>Badge</Badge>);
      expect(container.firstChild?.nodeName).toBe("SPAN");
    });

    it("should pass through additional props", () => {
      const { container } = render(
        <Badge aria-label="Status badge" role="status">
          Active
        </Badge>,
      );
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Status badge",
      );
      expect(container.firstChild).toHaveAttribute("role", "status");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty content", () => {
      const { container } = render(<Badge>{""}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle zero as content", () => {
      render(<Badge>{0}</Badge>);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should handle very long text", () => {
      const longText =
        "This is a very long badge text that should still render correctly";
      render(<Badge>{longText}</Badge>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("should handle undefined className", () => {
      const { container } = render(<Badge className={undefined}>Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles.badge);
    });

    it("should handle empty className", () => {
      const { container } = render(<Badge className="">Badge</Badge>);
      expect(container.firstChild).toHaveClass(styles.badge);
    });
  });

  describe("Visual Hierarchy", () => {
    it("should apply correct classes for subtle variant", () => {
      const { container } = render(<Badge variant="subtle">Subtle</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--subtle"]);
    });

    it("should apply correct classes for high-priority error", () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--error"]);
    });

    it("should apply correct classes for medium-priority warning", () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      expect(container.firstChild).toHaveClass(styles["badge--warning"]);
    });
  });

  describe("Multiple Badges", () => {
    it("should render multiple badges independently", () => {
      render(
        <>
          <Badge variant="success">Active</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">New</Badge>
        </>,
      );

      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("should maintain separate styles for multiple badges", () => {
      const { container } = render(
        <>
          <Badge variant="success" size="xs">
            Active
          </Badge>
          <Badge variant="error" size="md">
            Error
          </Badge>
        </>,
      );

      const badges = container.querySelectorAll(`.${styles.badge}`);
      expect(badges[0]).toHaveClass(styles["badge--success"]);
      expect(badges[0]).toHaveClass(styles["badge--xs"]);
      expect(badges[1]).toHaveClass(styles["badge--error"]);
      expect(badges[1]).toHaveClass(styles["badge--md"]);
    });
  });

  describe("Variant and Density Combinations", () => {
    it("should render all variant and density combinations", () => {
      const variants = [
        "default",
        "success",
        "warning",
        "error",
        "info",
        "subtle",
      ] as const;
      const densities = ["compact", "normal", "spacious"] as const;

      for (const variant of variants) {
        for (const density of densities) {
          const { container } = render(
            <Badge variant={variant} density={density}>
              Test
            </Badge>,
          );
          const badge = container.firstChild as HTMLElement;
          expect(badge).toHaveClass(styles[`badge--${variant}`]);
          expect(badge).toHaveClass(styles[`density--${density}`]);
        }
      }
    });

    it("should render all sizes with pill shape", () => {
      const sizes = ["xs", "sm", "md"] as const;
      for (const size of sizes) {
        const { container } = render(
          <Badge size={size} pill={true}>
            Pill
          </Badge>,
        );
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(styles[`badge--${size}`]);
        expect(badge).toHaveClass(styles.badgePill);
      }
    });

    it("should render all sizes with square shape", () => {
      const sizes = ["xs", "sm", "md"] as const;
      for (const size of sizes) {
        const { container } = render(
          <Badge size={size} pill={false}>
            Square
          </Badge>,
        );
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(styles[`badge--${size}`]);
        expect(badge).not.toHaveClass(styles.badgePill);
      }
    });

    it("should combine error variant with compact density", () => {
      const { container } = render(
        <Badge variant="error" density="compact">
          Error
        </Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass(styles["badge--error"]);
      expect(badge).toHaveClass(styles["density--compact"]);
    });

    it("should combine info variant with spacious density", () => {
      const { container } = render(
        <Badge variant="info" density="spacious">
          Info
        </Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass(styles["badge--info"]);
      expect(badge).toHaveClass(styles["density--spacious"]);
    });
  });

  describe("Custom Styling", () => {
    it("should accept and apply inline styles", () => {
      const customStyle = { backgroundColor: "purple", color: "white" };
      const { container } = render(<Badge style={customStyle}>Styled</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.style.backgroundColor).toBe("purple");
      expect(badge.style.color).toBe("white");
    });

    it("should combine custom className with built-in classes", () => {
      const { container } = render(
        <Badge variant="success" className="custom-1 custom-2">
          Test
        </Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass(styles.badge);
      expect(badge).toHaveClass(styles["badge--success"]);
      expect(badge).toHaveClass("custom-1");
      expect(badge).toHaveClass("custom-2");
    });

    it("should preserve className order", () => {
      const { container } = render(
        <Badge className="first second third">Test</Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toContain("first");
      expect(badge.className).toContain("second");
      expect(badge.className).toContain("third");
    });
  });

  describe("Content Edge Cases", () => {
    it("should handle boolean false as content", () => {
      const { container } = render(<Badge>{false}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle null as content", () => {
      const { container } = render(<Badge>{null}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle undefined as content", () => {
      const { container } = render(<Badge>{undefined}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should handle large numbers", () => {
      render(<Badge>{9999}</Badge>);
      expect(screen.getByText("9999")).toBeInTheDocument();
    });

    it("should handle negative numbers", () => {
      render(<Badge>{-42}</Badge>);
      expect(screen.getByText("-42")).toBeInTheDocument();
    });

    it("should handle floating point numbers", () => {
      render(<Badge>{3.14}</Badge>);
      expect(screen.getByText("3.14")).toBeInTheDocument();
    });

    it("should handle whitespace-only content", () => {
      const { container } = render(<Badge> </Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("DOM Structure", () => {
    it("should render as span element", () => {
      const { container } = render(<Badge>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.tagName).toBe("SPAN");
    });

    it("should not have default tabIndex", () => {
      const { container } = render(<Badge>Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).not.toHaveAttribute("tabIndex");
    });

    it("should support data attributes", () => {
      const { container } = render(
        <Badge data-testid="test-badge" data-custom="value">
          Test
        </Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute("data-testid", "test-badge");
      expect(badge).toHaveAttribute("data-custom", "value");
    });

    it("should support aria attributes", () => {
      const { container } = render(
        <Badge aria-describedby="desc" aria-labelledby="label">
          Test
        </Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute("aria-describedby", "desc");
      expect(badge).toHaveAttribute("aria-labelledby", "label");
    });
  });

  describe("Complex Content", () => {
    it("should render JSX with multiple elements", () => {
      render(
        <Badge>
          <strong>Bold</strong> <em>Italic</em>
        </Badge>,
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("Italic")).toBeInTheDocument();
    });

    it("should render nested components", () => {
      const NestedComponent = () => <span data-testid="nested">Nested</span>;
      render(
        <Badge>
          <NestedComponent />
        </Badge>,
      );
      expect(screen.getByTestId("nested")).toBeInTheDocument();
    });

    it("should handle mixed content types", () => {
      render(
        <Badge>
          Count: {42} <span>Items</span>
        </Badge>,
      );
      expect(screen.getByText(/Count:/)).toBeInTheDocument();
      expect(screen.getByText("Items")).toBeInTheDocument();
    });
  });
});
