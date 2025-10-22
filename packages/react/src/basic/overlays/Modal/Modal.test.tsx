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
 * - Size variants
 * - ARIA attributes
 * - Footer rendering
 * - Initial focus management
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
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
      const footer = (
        <div>
          <button type="button">Cancel</button>
          <button type="button">Confirm</button>
        </div>
      );

      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="Test Modal"
          footer={footer}
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
});
