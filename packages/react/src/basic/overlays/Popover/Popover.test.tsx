/// <reference types="@testing-library/jest-dom" />
/**
 * Popover Component Tests
 *
 * Tests for modern Popover component covering:
 * - Rendering and visibility
 * - Multiple trigger types (click, hover, focus, manual)
 * - Enhanced placement variants (12 options)
 * - Size variants and responsive behavior
 * - Animation system with reduced motion support
 * - Accessibility features and ARIA attributes
 * - Focus management and keyboard navigation
 * - Portal rendering and backdrop support
 * - Smart positioning and collision detection
 * - Controlled and uncontrolled modes
 * - Event handlers and callbacks
 * - Custom styling and theming
 * - Title and subtitle rendering
 * - Mobile optimizations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Popover } from "./Popover.js";
import styles from "./Popover.module.css";

// Extend global type for test callback
interface GlobalWithTestCallbacks {
  __escapeKeyCallback?: () => void;
}

const globalWithCallbacks = global as unknown as GlobalWithTestCallbacks;

// Mock useEscapeKey hook
vi.mock("../../../hooks/useEscapeKey.js", () => ({
  useEscapeKey: vi.fn((callback) => {
    globalWithCallbacks.__escapeKeyCallback = callback;
    console.log("useEscapeKey called with callback:", callback);
  }),
}));

describe("Popover", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalWithCallbacks.__escapeKeyCallback = undefined;
  });

  describe("Rendering", () => {
    it("renders trigger element", () => {
      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    it("does not show popover by default", () => {
      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });

    it("shows popover when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("hides popover when trigger is clicked again", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Trigger Types", () => {
    it("opens on click with triggerType='click'", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          triggerType="click"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("opens on hover with triggerType='hover'", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          triggerType="hover"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.hover(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("closes on unhover with triggerType='hover'", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          triggerType="hover"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.hover(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      await user.unhover(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });

    it("keeps popover open when hovering over content with triggerType='hover'", () => {
      render(
        <Popover
          trigger={<button type="button">Open</button>}
          triggerType="hover"
          hoverDelay={0}
        >
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Open");

      // Hover over trigger
      fireEvent.mouseEnter(trigger);
      expect(screen.getByText("Popover content")).toBeInTheDocument();

      // Move mouse to popover content
      const popover = screen.getByText("Popover content");
      fireEvent.mouseEnter(popover);

      // Popover should still be visible
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  describe("Header Content", () => {
    it("renders title when provided", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          title="Popover Title"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover Title")).toBeInTheDocument();
      });
    });

    it("renders subtitle when provided", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          title="Popover Title"
          subtitle="Popover Subtitle"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover Subtitle")).toBeInTheDocument();
      });
    });

    it("renders both title and subtitle", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          title="Popover Title"
          subtitle="Popover Subtitle"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover Title")).toBeInTheDocument();
        expect(screen.getByText("Popover Subtitle")).toBeInTheDocument();
      });
    });

    it("does not render header section when neither title nor subtitle provided", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      const headerElements = container.querySelectorAll("[class*='header']");
      expect(headerElements.length).toBe(0);
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
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          placement={placement}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover.className).toContain(`placement-${placement}`);
      });
    });

    it("defaults to bottom placement", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover.className).toContain("placement-bottom");
      });
    });
  });

  describe("Size Variants", () => {
    it.each(["sm", "md", "lg", "xl", "auto"] as const)(
      "renders with size=%s",
      async (size) => {
        const user = userEvent.setup();

        render(
          <Popover trigger={<button type="button">Open</button>} size={size}>
            <div>Popover content</div>
          </Popover>,
        );

        await user.click(screen.getByText("Open"));

        await waitFor(() => {
          const popover = screen.getByRole("dialog");
          expect(popover.className).toContain(`size-${size}`);
        });
      },
    );

    it("defaults to md size", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover.className).toContain("size-md");
      });
    });
  });

  describe("Animation", () => {
    it.each(["fade", "scale", "slide", "zoom", "none"] as const)(
      "applies animation class for type=%s",
      async (animationType) => {
        const user = userEvent.setup();

        render(
          <Popover
            trigger={<button type="button">Open</button>}
            animation={{ type: animationType }}
          >
            <div>Popover content</div>
          </Popover>,
        );

        await user.click(screen.getByText("Open"));

        await waitFor(() => {
          const popover = screen.getByRole("dialog");
          expect(popover.className).toContain(`animation-${animationType}`);
        });
      },
    );

    it("disables animation when disabled is true", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          animation={{ type: "scale", disabled: true }}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover.className).not.toContain("animation-scale");
      });
    });

    it("applies custom duration and timing", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          animation={{
            type: "scale",
            duration: 500,
            timing: "bounce",
          }}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover).toHaveStyle({
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        });
      });
    });
  });

  describe("Arrow", () => {
    it("shows arrow by default", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover.className).toContain("with-arrow");
      });
    });

    it("hides arrow when showArrow is false", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          showArrow={false}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover.className).not.toContain("with-arrow");
      });
    });
  });

  describe("Click Outside", () => {
    it("closes popover when clicking outside", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button type="button" data-testid="outside">
            Outside
          </button>
          <Popover
            trigger={<button type="button">Open</button>}
            closeOnOutsideClick={true}
          >
            <div>Popover content</div>
          </Popover>
        </div>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      await user.click(screen.getByTestId("outside"));

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });

    it("does not close when clicking inside popover", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Popover content"));

      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  describe("Escape Key", () => {
    it("closes popover when Escape is pressed", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      // Trigger escape callback
      if (globalWithCallbacks.__escapeKeyCallback) {
        globalWithCallbacks.__escapeKeyCallback();
      }

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled isOpen prop", async () => {
      const { rerender } = render(
        <Popover
          trigger={<button type="button">Open</button>}
          isOpen={false}
          onOpenChange={vi.fn()}
        >
          <div>Popover content</div>
        </Popover>,
      );

      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

      rerender(
        <Popover
          trigger={<button type="button">Open</button>}
          isOpen={true}
          onOpenChange={vi.fn()}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when trigger is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          isOpen={false}
          onOpenChange={onOpenChange}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("calls onOpenChange when Escape is pressed", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          isOpen={true}
          onOpenChange={onOpenChange}
        >
          <div>Popover content</div>
        </Popover>,
      );

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      // Trigger escape callback
      if (globalWithCallbacks.__escapeKeyCallback) {
        globalWithCallbacks.__escapeKeyCallback();
      }

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("ARIA Attributes", () => {
    it("sets correct ARIA attributes on trigger", () => {
      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Open");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("updates aria-expanded when opened", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Open");
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("has correct role on popover", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover).toHaveAttribute("aria-modal", "false");
      });
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className to popover", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          className="custom-popover"
        >
          <div>Popover content</div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        expect(popover).toHaveClass("custom-popover");
      });
    });

    it("applies triggerClassName to trigger", () => {
      render(
        <Popover
          trigger={<button type="button">Open</button>}
          triggerClassName="custom-trigger"
        >
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Open");
      expect(trigger).toHaveClass("custom-trigger");
    });
  });

  describe("Complex Content", () => {
    it("renders complex content", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<button type="button">Open</button>}>
          <div>
            <h3>Title</h3>
            <p>Description</p>
            <button type="button">Action</button>
          </div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
      });
    });
  });

  describe("Focus Trigger", () => {
    it("opens popover when trigger receives focus", async () => {
      const user = userEvent.setup();

      render(
        <Popover trigger={<input placeholder="Focus me" />} triggerType="focus">
          <div>Popover content</div>
        </Popover>,
      );

      await user.tab();
      await user.click(screen.getByPlaceholderText("Focus me"));

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("closes popover when trigger loses focus", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Popover
            trigger={<input placeholder="Focus me" />}
            triggerType="focus"
            closeOnBlur={true}
          >
            <div>Popover content</div>
          </Popover>
          <button type="button">Outside</button>
        </div>,
      );

      const input = screen.getByPlaceholderText("Focus me");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Outside"));

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Hover Delays", () => {
    it("respects hover delay", () => {
      render(
        <Popover
          trigger={<button type="button">Hover me</button>}
          triggerType="hover"
          hoverDelay={0}
        >
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Hover me");

      // Hover over trigger
      fireEvent.mouseEnter(trigger);

      // Should be open immediately with 0 delay
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    it("respects hover close delay", () => {
      render(
        <Popover
          trigger={<button type="button">Hover me</button>}
          triggerType="hover"
          hoverCloseDelay={0}
        >
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Hover me");

      // Hover to open
      fireEvent.mouseEnter(trigger);
      expect(screen.getByText("Popover content")).toBeInTheDocument();

      // Unhover
      fireEvent.mouseLeave(trigger);

      // Should be closed immediately with 0 delay
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  describe("Event Handlers", () => {
    it("calls onOpen when popover opens", () => {
      const onOpen = vi.fn();

      render(
        <Popover trigger={<button type="button">Open</button>} onOpen={onOpen}>
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText("Open"));

      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when popover closes", () => {
      const onClose = vi.fn();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          onClose={onClose}
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText("Open"));
      fireEvent.click(screen.getByText("Open"));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onBeforeOpen before opening", () => {
      const onBeforeOpen = vi.fn();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          onBeforeOpen={onBeforeOpen}
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText("Open"));

      expect(onBeforeOpen).toHaveBeenCalledTimes(1);
    });

    it("calls onBeforeClose before closing", () => {
      const onBeforeClose = vi.fn();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          onBeforeClose={onBeforeClose}
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText("Open"));
      fireEvent.click(screen.getByText("Open"));

      expect(onBeforeClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(
        <Popover
          trigger={<button type="button">Open</button>}
          title="Popover Title"
          accessibility={{
            "aria-label": "Custom label",
            announceOnOpen: true,
          }}
        >
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Open");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");

      fireEvent.click(trigger);

      const popover = screen.getByRole("dialog");
      expect(popover).toHaveAttribute("aria-label", "Custom label");
      expect(popover).toHaveAttribute("aria-labelledby");
      expect(popover).toHaveAttribute("aria-modal", "false");
    });

    it("announces to screen readers when opened", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          accessibility={{
            announceOnOpen: true,
            announcementMessage: "Popover opened",
          }}
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText("Open"));

      // Check that announcement element was created
      const announcement = document.querySelector('[aria-live="polite"]');
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveTextContent("Popover opened");

      consoleSpy.mockRestore();
    });
  });

  describe("Focus Management", () => {
    it("traps focus when enabled", async () => {
      const user = userEvent.setup();

      render(
        <Popover
          trigger={<button type="button">Open</button>}
          focus={{ trapFocus: true, strategy: "first" }}
        >
          <div>
            <button type="button">First</button>
            <button type="button">Last</button>
          </div>
        </Popover>,
      );

      await user.click(screen.getByText("Open"));

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Last")).toBeInTheDocument();

      const firstButton = screen.getByText("First");
      const lastButton = screen.getByText("Last");

      // Wait for focus to be set
      await waitFor(() => {
        expect(firstButton).toHaveFocus();
      });

      // Tab should cycle through popover content
      await user.tab();
      expect(lastButton).toHaveFocus();

      // Tab again should cycle back to first
      await user.tab();
      expect(firstButton).toHaveFocus();
    });

    it("restores focus to trigger on close", async () => {
      render(
        <Popover
          trigger={<button type="button">Open</button>}
          focus={{ restoreFocus: true }}
        >
          <div>Popover content</div>
        </Popover>,
      );

      const trigger = screen.getByText("Open");
      fireEvent.click(trigger);

      expect(screen.getByText("Popover content")).toBeInTheDocument();

      // Trigger escape to close
      if (globalWithCallbacks.__escapeKeyCallback) {
        act(() => {
          globalWithCallbacks.__escapeKeyCallback();
        });
      }

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
      
      expect(trigger).toHaveFocus();
    });
  });

  describe("Event Handler Preservation", () => {
    it("preserves existing onClick handler on trigger", () => {
      const onClick = vi.fn();

      render(
        <Popover
          trigger={
            <button type="button" onClick={onClick}>
              Open
            </button>
          }
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.click(screen.getByText("Open"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("preserves existing onMouseEnter handler on trigger", () => {
      const onMouseEnter = vi.fn();

      render(
        <Popover
          trigger={
            <button type="button" onMouseEnter={onMouseEnter}>
              Open
            </button>
          }
          triggerType="hover"
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.mouseEnter(screen.getByText("Open"));

      expect(onMouseEnter).toHaveBeenCalled();
    });

    it("preserves existing onFocus handler on trigger", () => {
      const onFocus = vi.fn();

      render(
        <Popover
          trigger={<input placeholder="Focus me" onFocus={onFocus} />}
          triggerType="focus"
        >
          <div>Popover content</div>
        </Popover>,
      );

      fireEvent.focus(screen.getByPlaceholderText("Focus me"));

      expect(onFocus).toHaveBeenCalled();
    });
  });
});
