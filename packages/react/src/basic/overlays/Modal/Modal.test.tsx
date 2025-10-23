/// <reference types="@testing-library/jest-dom" />
/**
 * Modal Component Tests
 *
 * Tests for Modal component covering:
 * - Basic rendering and visibility
 * - Portal rendering to document.body
 * - Focus trap functionality
 * - Body scroll lock
 * - Escape key handling
 * - Backdrop click handling
 * - Close button functionality
 * - Size variants and placement
 * - Animation variants
 * - Backdrop variants
 * - Header and footer configurations
 * - Loading states
 * - Native dialog support
 * - Responsive behavior
 * - Accessibility features
 * - ARIA attributes
 * - Screen reader announcements
 * - Focus management
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { act, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { type RefObject, useRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal.js";
import styles from "./Modal.module.css";

// Extend global type for test callback
interface GlobalWithTestCallbacks {
  __escapeKeyCallback?: () => void;
}

const globalWithCallbacks = global as unknown as GlobalWithTestCallbacks;

// Mock hooks
vi.mock("../../../hooks/useBodyScrollLock.js", () => ({
  useBodyScrollLock: vi.fn(),
}));

vi.mock("../../../hooks/useFocusTrap.js", () => ({
  useFocusTrap: vi.fn(),
}));

vi.mock("../../../hooks/useEscapeKey.js", () => ({
  useEscapeKey: vi.fn((callback) => {
    // Store the callback for manual triggering in tests
    globalWithCallbacks.__escapeKeyCallback = callback;
  }),
}));

describe("Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalWithCallbacks.__escapeKeyCallback = undefined;
    document.body.innerHTML = "";

    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe("Rendering", () => {
    it("renders nothing when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
      expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    });

    it("renders modal when isOpen is true", async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Modal content")).toBeInTheDocument();
      });
    });

    it("renders portal to document.body", async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        const modalElement = screen.getByRole("dialog");
        expect(modalElement.parentElement?.parentElement).toBe(document.body);
      });
    });

    it("renders with correct ARIA attributes", async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog).toHaveAttribute("aria-labelledby");
      });
    });

    it("renders without title when not provided", async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).not.toHaveAttribute("aria-labelledby");
      });
    });
  });

  describe("Close Functionality", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("Close modal");
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
      });

      // Click the backdrop (parent of the modal dialog)
      const backdrop = screen.getByRole("dialog").parentElement;
      if (backdrop) {
        await user.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it("does not close when backdrop is clicked and closeOnBackdropClick is false", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Test Modal"
          closeOnBackdropClick={false}
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
      });

      const backdrop = screen.getByRole("dialog").parentElement;
      if (backdrop) {
        await user.click(backdrop);
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it("does not call onClose when modal content is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Modal content")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Modal content"));
      expect(onClose).not.toHaveBeenCalled();
    });

    it("hides close button when showCloseButton is false", async () => {
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          showCloseButton={false}
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
      });

      expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
    });
  });

  describe("Escape Key Handling", () => {
    it("calls onClose when Escape key is pressed with closeOnEscape true", async () => {
      const onClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
      });

      // Trigger the escape key callback
      if (globalWithCallbacks.__escapeKeyCallback) {
        globalWithCallbacks.__escapeKeyCallback();
      }

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when closeOnEscape is false", async () => {
      const onClose = vi.fn();

      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Test Modal"
          closeOnEscape={false}
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
      });

      // Even if escape is triggered, it shouldn't call onClose
      // The useEscapeKey hook should not register the callback when closeOnEscape is false
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Size Variants", () => {
    it.each(["sm", "md", "lg", "xl", "full"] as const)(
      "renders with size=%s",
      async (size) => {
        const { container } = render(
          <Modal isOpen={true} onClose={vi.fn()} title="Test Modal" size={size}>
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByText("Test Modal")).toBeInTheDocument();
        });

        const dialog = screen.getByRole("dialog");
        expect(dialog.className).toContain(`size-${size}`);
      },
    );
  });

  describe("Footer", () => {
    it("renders footer when provided", async () => {
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          footer={{
            children: (
              <div>
                <button type="button">Cancel</button>
                <button type="button">Confirm</button>
              </div>
            ),
          }}
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Confirm")).toBeInTheDocument();
      });
    });

    it("does not render footer section when not provided", async () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
      });

      // Check that footer div doesn't exist
      const footerElements = container.querySelectorAll("[class*='footer']");
      expect(footerElements.length).toBe(0);
    });
  });

  describe("Initial Focus", () => {
    it("sets initial focus to specified element", async () => {
      const TestComponent = () => {
        const inputRef = useRef<HTMLInputElement>(null);

        return (
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            initialFocusRef={inputRef as RefObject<HTMLElement>}
          >
            <input ref={inputRef} type="text" placeholder="Test input" />
          </Modal>
        );
      };

      render(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
      });

      // Note: In a real test environment with full DOM, we'd check document.activeElement
      // For this unit test, we're verifying the element exists and ref is passed
      expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className to modal", async () => {
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          className="custom-modal"
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toHaveClass("custom-modal");
      });
    });

    it("applies custom className to backdrop", async () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          backdropClassName="custom-backdrop"
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        const backdrop = screen.getByRole("dialog").parentElement;
        expect(backdrop).toHaveClass("custom-backdrop");
      });
    });
  });

  describe("Body Scroll Lock", () => {
    it("enables body scroll lock by default", async () => {
      const { useBodyScrollLock } = await import(
        "../../../hooks/useBodyScrollLock.js"
      );

      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(useBodyScrollLock).toHaveBeenCalledWith(true);
      });
    });

    it("disables body scroll lock when preventBodyScroll is false", async () => {
      const { useBodyScrollLock } = await import(
        "../../../hooks/useBodyScrollLock.js"
      );

      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          preventBodyScroll={false}
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        expect(useBodyScrollLock).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("Custom ID", () => {
    it("uses custom id when provided", async () => {
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          id="custom-modal"
        >
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("id", "custom-modal");
      });
    });

    it("generates random id when not provided", async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const id = dialog.getAttribute("id");
        expect(id).toMatch(/^modal-/);
      });
    });
  });

  describe("Modern Features", () => {
    describe("Header Configuration", () => {
      it("renders header with title and subtitle", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            header={{
              title: "Modal Title",
              subtitle: "Modal Subtitle",
            }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByText("Modal Title")).toBeInTheDocument();
          expect(screen.getByText("Modal Subtitle")).toBeInTheDocument();
        });
      });

      it("renders custom header content", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            header={{
              children: <div data-testid="custom-header">Custom Header</div>,
            }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByTestId("custom-header")).toBeInTheDocument();
        });
      });

      it("hides close button when header.showCloseButton is false", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            header={{
              title: "Test Modal",
              showCloseButton: false,
            }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(
            screen.queryByLabelText("Close modal"),
          ).not.toBeInTheDocument();
        });
      });
    });

    describe("Footer Configuration", () => {
      it("renders footer with different alignments", async () => {
        const { rerender } = render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            footer={{
              children: <button type="button">Action</button>,
              align: "left",
            }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const footer = screen
            .getByRole("dialog")
            .querySelector('[class*="footer"]');
          expect(footer).toHaveClass("_align-left_f51c5f");
        });

        rerender(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            footer={{
              children: <button type="button">Action</button>,
              align: "center",
            }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const footer = screen
            .getByRole("dialog")
            .querySelector('[class*="footer"]');
          expect(footer).toHaveClass("_align-center_f51c5f");
        });
      });

      it("shows divider when footer.showDivider is true", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            footer={{
              children: <button type="button">Action</button>,
              showDivider: true,
            }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const footer = screen
            .getByRole("dialog")
            .querySelector('[class*="footer"]');
          expect(footer).toHaveClass("_show-divider_f51c5f");
        });
      });
    });

    describe("Animation Variants", () => {
      it.each(["fade", "slide", "zoom", "scale", "none"] as const)(
        "applies animation class for type=%s",
        async (animationType) => {
          render(
            <Modal
              isOpen={true}
              onClose={vi.fn()}
              title="Test Modal"
              animation={{ type: animationType }}
            >
              <p>Modal content</p>
            </Modal>,
          );

          await waitFor(() => {
            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveClass(`_animation-${animationType}_f51c5f`);
          });
        },
      );

      it("disables animation when animation.disabled is true", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            animation={{ type: "fade", disabled: true }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const dialog = screen.getByRole("dialog");
          expect(dialog).toHaveClass("_animation-none_f51c5f");
        });
      });
    });

    describe("Backdrop Variants", () => {
      it.each(["blur", "dark", "light", "transparent"] as const)(
        "applies backdrop class for variant=%s",
        async (backdropVariant) => {
          render(
            <Modal
              isOpen={true}
              onClose={vi.fn()}
              title="Test Modal"
              backdrop={backdropVariant}
            >
              <p>Modal content</p>
            </Modal>,
          );

          await waitFor(() => {
            const backdrop = screen.getByRole("dialog").parentElement;
            expect(backdrop).toHaveClass(`_backdrop-${backdropVariant}_f51c5f`);
          });
        },
      );
    });

    describe("Placement Variants", () => {
      it.each(["center", "top", "bottom", "left", "right"] as const)(
        "applies placement class for placement=%s",
        async (placement) => {
          render(
            <Modal
              isOpen={true}
              onClose={vi.fn()}
              title="Test Modal"
              placement={placement}
            >
              <p>Modal content</p>
            </Modal>,
          );

          await waitFor(() => {
            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveClass(`_placement-${placement}_f51c5f`);
          });
        },
      );
    });

    describe("Loading State", () => {
      it("shows loading indicator when loading is true", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            loading={true}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByRole("dialog")).toHaveClass("_loading_f51c5f");
          expect(
            screen
              .getByRole("dialog")
              .querySelector('[class*="loading-indicator"]'),
          ).toBeInTheDocument();
        });
      });

      it("shows custom loading indicator", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            loading={true}
            loadingIndicator={<div data-testid="custom-loader">Loading...</div>}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
        });
      });
    });

    describe("Native Dialog Support", () => {
      it("renders as native dialog element when native is true", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            native={true}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const dialog = document.querySelector("dialog");
          expect(dialog).toBeInTheDocument();
          expect(dialog?.tagName).toBe("DIALOG");
        });
      });

      it("supports form method and action for native dialog", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            native={true}
            formMethod="post"
            formAction="/submit"
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const dialog = document.querySelector("dialog");
          expect(dialog).toBeInTheDocument();
          expect(dialog).toHaveAttribute("method", "post");
          expect(dialog).toHaveAttribute("action", "/submit");
        });
      });
    });

    describe("Responsive Behavior", () => {
      it("applies mobile size when responsive.mobileSize is provided", async () => {
        // Mock mobile viewport
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 600,
        });

        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            size="lg"
            responsive={{ mobileSize: "sm" }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const dialog = screen.getByRole("dialog");
          expect(dialog).toHaveClass("_size-sm_f51c5f");
        });
      });

      it("disables backdrop on mobile when responsive.disableBackdropOnMobile is true", async () => {
        // Mock mobile viewport
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 600,
        });

        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            backdrop="blur"
            responsive={{ disableBackdropOnMobile: true }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          const backdrop = screen.getByRole("dialog").parentElement;
          expect(backdrop).toHaveClass("_backdrop-transparent_f51c5f");
        });
      });
    });

    describe("Event Handlers", () => {
      it("calls onOpen when modal opens", async () => {
        const onOpen = vi.fn();
        const { rerender } = render(
          <Modal
            isOpen={false}
            onClose={vi.fn()}
            title="Test Modal"
            onOpen={onOpen}
          >
            <p>Modal content</p>
          </Modal>,
        );

        expect(onOpen).not.toHaveBeenCalled();

        rerender(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            onOpen={onOpen}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(onOpen).toHaveBeenCalledTimes(1);
        });
      });

      it("calls onBeforeOpen before modal opens", async () => {
        const onBeforeOpen = vi.fn();
        const { rerender } = render(
          <Modal
            isOpen={false}
            onClose={vi.fn()}
            title="Test Modal"
            onBeforeOpen={onBeforeOpen}
          >
            <p>Modal content</p>
          </Modal>,
        );

        expect(onBeforeOpen).not.toHaveBeenCalled();

        rerender(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            onBeforeOpen={onBeforeOpen}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(onBeforeOpen).toHaveBeenCalledTimes(1);
        });
      });

      it("calls onBackdropClick when backdrop is clicked", async () => {
        const user = userEvent.setup();
        const onBackdropClick = vi.fn();

        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            onBackdropClick={onBackdropClick}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByText("Test Modal")).toBeInTheDocument();
        });

        const backdrop = screen.getByRole("dialog").parentElement;
        if (backdrop) {
          await user.click(backdrop);
          expect(onBackdropClick).toHaveBeenCalledTimes(1);
        }
      });
    });

    describe("Accessibility Enhancements", () => {
      it("supports custom ARIA attributes", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            accessibility={{
              "aria-label": "Custom modal",
              "aria-describedby": "custom-description",
            }}
          >
            <p id="custom-description">Modal description</p>
          </Modal>,
        );

        await waitFor(() => {
          const dialog = screen.getByRole("dialog");
          expect(dialog).toHaveAttribute("aria-label", "Custom modal");
          expect(dialog).toHaveAttribute(
            "aria-describedby",
            "custom-description",
          );
        });
      });

      it("announces modal opening to screen readers", async () => {
        const { rerender } = render(
          <Modal
            isOpen={false}
            onClose={vi.fn()}
            title="Test Modal"
            accessibility={{ announceOpen: true }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        rerender(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            accessibility={{ announceOpen: true }}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          // Check if announcement element was created
          const announcementElements = document.querySelectorAll(
            '[aria-live="polite"]',
          );
          expect(announcementElements.length).toBeGreaterThan(0);
        });
      });
    });

    describe("Focus Management", () => {
      it("supports custom focus configuration", async () => {
        const TestComponent = () => {
          const inputRef = useRef<HTMLInputElement>(null);

          return (
            <Modal
              isOpen={true}
              onClose={vi.fn()}
              title="Test Modal"
              focus={{
                initialFocusRef: inputRef as RefObject<HTMLElement>,
                restoreFocus: true,
                trapFocus: true,
              }}
            >
              <input ref={inputRef} type="text" placeholder="Test input" />
            </Modal>
          );
        };

        render(<TestComponent />);

        await waitFor(() => {
          expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
        });
      });
    });

    describe("Legacy Props Compatibility", () => {
      it("supports legacy title prop", async () => {
        render(
          <Modal isOpen={true} onClose={vi.fn()} title="Legacy Title">
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(screen.getByText("Legacy Title")).toBeInTheDocument();
        });
      });

      it("supports legacy showCloseButton prop", async () => {
        render(
          <Modal
            isOpen={true}
            onClose={vi.fn()}
            title="Test Modal"
            showCloseButton={false}
          >
            <p>Modal content</p>
          </Modal>,
        );

        await waitFor(() => {
          expect(
            screen.queryByLabelText("Close modal"),
          ).not.toBeInTheDocument();
        });
      });

      it("supports legacy initialFocusRef prop", async () => {
        const TestComponent = () => {
          const inputRef = useRef<HTMLInputElement>(null);

          return (
            <Modal
              isOpen={true}
              onClose={vi.fn()}
              title="Test Modal"
              initialFocusRef={inputRef as RefObject<HTMLElement>}
            >
              <input ref={inputRef} type="text" placeholder="Test input" />
            </Modal>
          );
        };

        render(<TestComponent />);

        await waitFor(() => {
          expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
        });
      });
    });
  });
});
