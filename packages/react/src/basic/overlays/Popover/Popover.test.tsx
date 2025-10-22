/// <reference types="@testing-library/jest-dom" />
/**
 * Popover Component Tests
 *
 * Tests for Popover component covering:
 * - Rendering and visibility
 * - Click and hover triggers
 * - Placement variants
 * - Arrow rendering
 * - Click outside to close
 * - Escape key handling
 * - ARIA attributes
 * - Controlled and uncontrolled modes
 * - Custom styling
 * - Title rendering
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
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

    it("keeps popover open when hovering over content with triggerType='hover'", async () => {
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

      // Move mouse to popover content
      await user.hover(screen.getByText("Popover content"));

      // Popover should still be visible
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  describe("Title", () => {
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

    it("does not render title section when not provided", async () => {
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

      const titleElements = container.querySelectorAll("[class*='title']");
      expect(titleElements.length).toBe(0);
    });
  });

  describe("Placement", () => {
    it.each(["top", "right", "bottom", "left"] as const)(
      "renders with placement=%s",
      async (placement) => {
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
      },
    );

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
          <Popover trigger={<button type="button">Open</button>}>
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

  describe("Event Handler Preservation", () => {
    it("preserves existing onClick handler on trigger", async () => {
      const user = userEvent.setup();
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

      await user.click(screen.getByText("Open"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("preserves existing onMouseEnter handler on trigger", async () => {
      const user = userEvent.setup();
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

      await user.hover(screen.getByText("Open"));

      expect(onMouseEnter).toHaveBeenCalled();
    });
  });
});
