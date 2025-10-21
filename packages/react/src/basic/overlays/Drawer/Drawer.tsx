import React, { useEffect, useId, useRef } from "react";
import styles from "./Drawer.module.css";

export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;

  /**
   * Callback when drawer should close
   */
  onClose: () => void;

  /**
   * Drawer content
   */
  children?: React.ReactNode;

  /**
   * Drawer position
   * @default "right"
   */
  position?: "left" | "right" | "top" | "bottom";

  /**
   * Drawer width (for left/right) or height (for top/bottom)
   * @default "400px"
   */
  size?: string;

  /**
   * Whether to show backdrop
   * @default true
   */
  showBackdrop?: boolean;

  /**
   * Whether clicking backdrop closes drawer
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing Escape closes drawer
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to lock body scroll when open
   * @default true
   */
  lockScroll?: boolean;

  /**
   * Whether to trap focus within drawer
   * @default true
   */
  trapFocus?: boolean;

  /**
   * Custom className for drawer
   */
  className?: string;

  /**
   * Custom className for backdrop
   */
  backdropClassName?: string;

  /**
   * ARIA label for drawer
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby for drawer
   */
  "aria-labelledby"?: string;
}

/**
 * Drawer - Generic slide-in panel component
 *
 * A fully accessible, customizable drawer/panel that slides in from any direction.
 *
 * Features:
 * - Slides from any direction (left, right, top, bottom)
 * - Customizable size
 * - Optional backdrop with blur
 * - Focus trap (WCAG 2.2 AA compliant)
 * - ESC key to close
 * - Click outside to close
 * - Body scroll lock
 * - Smooth animations
 * - Focus restoration
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   position="right"
 *   size="400px"
 * >
 *   <h2>Drawer Content</h2>
 *   <p>Your content here...</p>
 * </Drawer>
 * ```
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      children,
      position = "right",
      size = "400px",
      showBackdrop = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      lockScroll = true,
      trapFocus = true,
      className,
      backdropClassName,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
    },
    ref,
  ) => {
    const drawerId = useId();
    const drawerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Lock body scroll when open
    useEffect(() => {
      if (!lockScroll) return;

      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen, lockScroll]);

    // Handle ESC key
    useEffect(() => {
      if (!closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store current focus
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Focus drawer after animation
        setTimeout(() => {
          const drawer = drawerRef.current;
          if (drawer) {
            const firstFocusable = drawer.querySelector<HTMLElement>(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );
            firstFocusable?.focus();
          }
        }, 100);
      } else {
        // Restore focus when closing
        setTimeout(() => {
          previousFocusRef.current?.focus();
        }, 100);
      }
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
      if (!isOpen || !trapFocus) return;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        const drawer = drawerRef.current;
        if (!drawer) return;

        const focusableElements = drawer.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: if at first element, wrap to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: if at last element, wrap to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => document.removeEventListener("keydown", handleTab);
    }, [isOpen, trapFocus]);

    // Handle backdrop click
    const handleBackdropClick = () => {
      if (closeOnBackdropClick) {
        onClose();
      }
    };

    // Don't render if not open (for performance)
    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        {showBackdrop && (
          <button
            type="button"
            className={`${styles.backdrop} ${styles.open} ${backdropClassName || ""}`}
            onClick={handleBackdropClick}
            aria-label="Close drawer"
            tabIndex={-1}
          />
        )}

        {/* Drawer */}
        <div
          ref={(node) => {
            // Combine refs
            drawerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          id={drawerId}
          className={`${styles.drawer} ${styles[position]} ${styles.open} ${className || ""}`}
          style={{
            [position === "left" || position === "right" ? "width" : "height"]:
              size,
          }}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        >
          {children}
        </div>
      </>
    );
  },
);

Drawer.displayName = "Drawer";
