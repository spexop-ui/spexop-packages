/// <reference types="@testing-library/jest-dom" />
/**
 * Tooltip Component Tests
 *
 * Tests for Tooltip component covering:
 * - Rendering and visibility on hover/focus
 * - Placement variants (top, right, bottom, left)
 * - Delay functionality
 * - Disabled state
 * - Arrow rendering
 * - ARIA attributes (aria-describedby)
 * - Keyboard accessibility (Escape key)
 * - Mouse and focus events
 * - Custom styling
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Tooltip } from "./Tooltip.js";
import styles from "./Tooltip.module.css";

describe("Tooltip", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
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
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={300}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Advance timers past the delay
      vi.advanceTimersByTime(300);

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });
    });

    it("hides tooltip on mouse leave", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      vi.advanceTimersByTime(0);

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

      vi.advanceTimersByTime(200);

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });
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

      vi.advanceTimersByTime(0);

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
    it.each(["top", "right", "bottom", "left"] as const)(
      "renders with placement=%s",
      async (placement) => {
        const user = userEvent.setup({ delay: null });

        const { container } = render(
          <Tooltip content="Tooltip text" placement={placement} delay={0}>
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        const button = screen.getByText("Hover me");
        await user.hover(button);

        vi.advanceTimersByTime(0);

        await waitFor(() => {
          const tooltip = screen.getByRole("tooltip");
          expect(tooltip.className).toContain(`placement-${placement}`);
        });
      },
    );

    it("defaults to top placement", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain("placement-top");
      });
    });
  });

  describe("Delay", () => {
    it("respects custom delay value", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={500}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Before delay
      vi.advanceTimersByTime(300);
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

      // After delay
      vi.advanceTimersByTime(200);

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });
    });

    it("uses default delay of 300ms", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text">
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      // Before default delay
      vi.advanceTimersByTime(200);
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

      // After default delay
      vi.advanceTimersByTime(100);

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });
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

      vi.advanceTimersByTime(0);

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

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).toContain("with-arrow");
      });
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

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip.className).not.toContain("with-arrow");
      });
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
      vi.advanceTimersByTime(0);

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

      vi.advanceTimersByTime(0);

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

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveAttribute("id", "custom-tooltip");
        expect(button).toHaveAttribute("aria-describedby", "custom-tooltip");
      });
    });
  });

  describe("Escape Key", () => {
    it("hides tooltip when Escape is pressed", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Tooltip content="Tooltip text" delay={0}>
          <button type="button">Hover me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover me");
      await user.hover(button);

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
      });

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

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveClass("custom-tooltip");
      });
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

      vi.advanceTimersByTime(0);

      await waitFor(() => {
        expect(screen.getByText("Bold text")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
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
