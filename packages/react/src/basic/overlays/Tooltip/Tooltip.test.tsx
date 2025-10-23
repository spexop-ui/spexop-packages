/// <reference types="@testing-library/jest-dom" />
/**
 * Tooltip Component Tests
 *
 * Tests for modern Tooltip component covering:
 * - Rendering and visibility on hover/focus
 * - Placement variants (top, right, bottom, left) with start/end variants
 * - Size variants (sm, md, lg, auto)
 * - Animation types (fade, scale, slide, zoom, none)
 * - Smart positioning with collision detection
 * - Responsive behavior and mobile optimizations
 * - Portal rendering
 * - Delay functionality with mobile delays
 * - Disabled state
 * - Arrow rendering
 * - ARIA attributes and accessibility features
 * - Keyboard accessibility (Escape key)
 * - Mouse and focus events
 * - Custom styling and theming
 * - Event handlers
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { act, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Tooltip } from "./Tooltip.js";

// Extend global type for test callback
interface GlobalWithTestCallbacks {
  __escapeKeyCallback?: () => void;
}

const globalWithCallbacks = global as unknown as GlobalWithTestCallbacks;

// Mock useEscapeKey hook
vi.mock("../../../hooks/useEscapeKey.js", () => ({
  useEscapeKey: vi.fn((callback) => {
    globalWithCallbacks.__escapeKeyCallback = callback;
  }),
}));

describe("Tooltip", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalWithCallbacks.__escapeKeyCallback = undefined;
  });

  describe("Rendering", () => {
    it("renders trigger element", () => {
      render(
        <Tooltip content="Tooltip text">
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("does not show tooltip by default", () => {
      render(
        <Tooltip content="Tooltip text">
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("shows tooltip on mouse enter after delay", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="Tooltip text" delay={300}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for the delay to complete
      await new Promise((resolve) => setTimeout(resolve, 350));

      const tooltip = screen.queryByText("Tooltip text");
      expect(tooltip).toBeInTheDocument();
    });

    it("hides tooltip on mouse leave", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear
      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
      });
    });
  });

  describe("Focus Events", () => {
    it("shows tooltip on focus after delay", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={200}>
          <button type="button">Focus me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Focus me");
      await user.tab();

      // Wait for the delay to complete
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    it("hides tooltip on blur", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Focus me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Focus me");
      await user.tab();

      // Wait for tooltip to appear
      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });

      button.blur();

      await waitFor(() => {
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
      });
    });
  });

  describe("Placement", () => {
    it.each([
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
    ] as const)("renders with placement=%s", async (placement) => {
      const user = userEvent.setup({ delay: null });

      const { container } = render(
        <Tooltip
          content="Tooltip text"
          placement={placement}
          delay={0}
          positioning={{ smart: false }}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain(`placement-${placement}`);
      });
    });

    it("defaults to top placement", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content="Tooltip text"
          delay={0}
          positioning={{ smart: false }}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain("placement-top");
      });
    });
  });

  describe("Size Variants", () => {
    it.each(["sm", "md", "lg", "auto"] as const)(
      "renders with size=%s",
      async (size) => {
        const user = userEvent.setup({ delay: null });

        render(
          <Tooltip content="Tooltip text" size={size} delay={0}>
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        const button = screen.getByText("Hover me");
        await user.hover(button);

        // Wait for tooltip to appear

        await waitFor(() => {
          const tooltip = screen.getByRole("tooltip");
          expect(tooltip.className).toContain(`size-${size}`);
        });
      },
    );

    it("defaults to md size", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain("size-md");
      });
    });
  });

  describe("Animations", () => {
    it.each(["fade", "scale", "slide", "zoom", "none"] as const)(
      "renders with animation=%s",
      async (animationType) => {
        const user = userEvent.setup({ delay: null });

        render(
          <Tooltip
            content="Tooltip text"
            animation={{ type: animationType, duration: 200 }}
            delay={0}
          >
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        const button = screen.getByText("Hover me");
        await user.hover(button);

        // Wait for tooltip to appear

        await waitFor(() => {
          const tooltip = screen.getByRole("tooltip");
          expect(tooltip.className).toContain(`animation-${animationType}`);
        });
      },
    );

    it("defaults to scale animation", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip.className).toContain("animation-scale");
    });
  });

  describe("Delay", () => {
    it("respects custom delay value", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip
          content="Tooltip text"
          delay={500}
          positioning={{ smart: false }}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const element = screen.getByText("Hover me");

      // Check tooltip is not visible before hover
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

      await user.hover(element);

      // Wait for tooltip to appear after delay
      await waitFor(
        () => {
          expect(screen.getByText("Tooltip text")).toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });

    it("uses default delay of 300ms", async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="Tooltip text" positioning={{ smart: false }}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const element = screen.getByText("Hover me");

      // Check tooltip is not visible before hover
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

      await user.hover(element);

      // Wait for tooltip to appear after default delay
      await waitFor(
        () => {
          expect(screen.getByText("Tooltip text")).toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });
  });

  describe("Disabled State", () => {
    it("does not show tooltip when disabled", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" disabled={true} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });
  });

  describe("Arrow", () => {
    it("shows arrow by default", async () => {
      const user = userEvent.setup({ delay: null });

      const { container } = render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip.className).toContain("with-arrow");
    });

    it("hides arrow when showArrow is false", async () => {
      const user = userEvent.setup({ delay: null });

      const { container } = render(
        <Tooltip content="Tooltip text" showArrow={false} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip.className).not.toContain("with-arrow");
    });
  });

  describe("ARIA Attributes", () => {
    it("adds aria-describedby to trigger when tooltip is visible", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");

      // Before hover
      expect(button).not.toHaveAttribute("aria-describedby");

      await user.hover(button);
      // Wait for tooltip to appear

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-describedby");
      });
    });

    it("sets correct role on tooltip", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("uses custom id when provided", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" id="custom-tooltip" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveAttribute("id", "custom-tooltip");
      expect(button).toHaveAttribute("aria-describedby", "custom-tooltip");
    });
  });

  describe("Escape Key", () => {
    it("hides tooltip when Escape is pressed", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content="Tooltip text"
          delay={0}
          positioning={{ smart: false }}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const element = screen.getByText("Hover me");
      await user.hover(element);

      // Wait for tooltip to appear
      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });

      // Focus the element to ensure keyboard events work
      element.focus();
      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
      });
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className to tooltip", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" className="custom-tooltip" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveClass("custom-tooltip");
    });

    it("applies triggerClassName to trigger element", () => {
      render(
        <Tooltip content="Tooltip text" triggerClassName="custom-trigger">
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      expect(button).toHaveClass("custom-trigger");
    });
  });

  describe("Complex Content", () => {
    it("renders complex tooltip content", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content={
            <div>
              <strong>Bold text</strong>
              <p>Description</p>
            </div>
          }
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByText("Bold text")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
      });
    });
  });

  describe("Smart Positioning", () => {
    it("enables smart positioning by default", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content="Tooltip text"
          positioning={{ smart: true, offset: 12 }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      // Wait for smart positioning to calculate
      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.style.top).toBeTruthy();
        expect(tooltip.style.left).toBeTruthy();
      });
    });

    it("disables smart positioning when set to false", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content="Tooltip text"
          positioning={{ smart: false }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      // Wait for positioning to be cleared
      await new Promise((resolve) => setTimeout(resolve, 10));

      const tooltip = screen.getByRole("tooltip");
      // Check that top and left styles are empty or not present
      const styles = tooltip.style;
      expect(styles.top).toBe("");
      expect(styles.left).toBe("");
    });
  });

  describe("Responsive Behavior", () => {
    it("uses mobile placement when provided", async () => {
      const user = userEvent.setup({ delay: null });

      // Mock mobile viewport
      Object.defineProperty(window, "innerWidth", {
        value: 600,
        writable: true,
      });

      render(
        <Tooltip
          content="Tooltip text"
          placement="top"
          responsive={{ mobilePlacement: "bottom" }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain("placement-bottom");
      });
    });

    it("uses mobile size when provided", async () => {
      const user = userEvent.setup({ delay: null });

      // Mock mobile viewport
      Object.defineProperty(window, "innerWidth", {
        value: 600,
        writable: true,
      });

      render(
        <Tooltip
          content="Tooltip text"
          size="md"
          responsive={{ mobileSize: "lg" }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain("size-lg");
      });
    });

    it("disables tooltip on mobile when configured", async () => {
      const user = userEvent.setup({ delay: null });

      // Mock mobile viewport
      Object.defineProperty(window, "innerWidth", {
        value: 600,
        writable: true,
      });

      render(
        <Tooltip
          content="Tooltip text"
          responsive={{ disableOnMobile: true }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });
  });

  describe("Portal Rendering", () => {
    it("renders in portal when enabled", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" portal={true} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
        // Portal renders in document.body by default
        expect(tooltip.parentElement).toBe(document.body);
      });
    });

    it("renders without portal by default", async () => {
      const user = userEvent.setup({ delay: null });

      const { container } = render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
        // Without portal, tooltip should be in the same container
        expect(container.contains(tooltip)).toBe(true);
      });
    });
  });

  describe("Event Handlers", () => {
    it("calls onOpen when tooltip opens", async () => {
      const user = userEvent.setup({ delay: null });
      const onOpen = vi.fn();

      render(
        <Tooltip content="Tooltip text" onOpen={onOpen} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(onOpen).toHaveBeenCalledTimes(1);
      });
    });

    it("calls onClose when tooltip closes", async () => {
      const user = userEvent.setup({ delay: null });
      const onClose = vi.fn();

      render(
        <Tooltip content="Tooltip text" onClose={onClose} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it("calls onBeforeOpen before opening", async () => {
      const user = userEvent.setup({ delay: null });
      const onBeforeOpen = vi.fn();

      render(
        <Tooltip content="Tooltip text" onBeforeOpen={onBeforeOpen} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      expect(onBeforeOpen).toHaveBeenCalledTimes(1);
    });

    it("calls onBeforeClose before closing", async () => {
      const user = userEvent.setup({ delay: null });
      const onBeforeClose = vi.fn();

      render(
        <Tooltip content="Tooltip text" onBeforeClose={onBeforeClose} delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });

      await user.unhover(button);

      expect(onBeforeClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility Features", () => {
    it("applies custom aria-label", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content="Tooltip text"
          accessibility={{ ariaLabel: "Custom tooltip label" }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveAttribute("aria-label", "Custom tooltip label");
      });
    });

    it("applies custom aria-describedby", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip
          content="Tooltip text"
          accessibility={{ ariaDescribedBy: "custom-description" }}
          delay={0}
        >
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Wait for tooltip to appear

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveAttribute(
          "aria-describedby",
          "custom-description",
        );
      });
    });
  });

  describe("Event Handler Preservation", () => {
    it("preserves existing onClick handler", async () => {
      const user = userEvent.setup({ delay: null });
      const onClick = vi.fn();

      render(
        <Tooltip content="Tooltip text">
          <button type="button" onClick={onClick}>
            Click me
          </button>
        </Tooltip>,
      );

      const button = screen.getByText("Click me");
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("preserves existing onMouseEnter handler", async () => {
      const user = userEvent.setup({ delay: null });
      const onMouseEnter = vi.fn();

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button" onMouseEnter={onMouseEnter}>
            Hover me
          </button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      expect(onMouseEnter).toHaveBeenCalled();
    });
  });
});
