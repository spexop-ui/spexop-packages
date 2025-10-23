import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock.js";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { useFocusTrap } from "../../../hooks/useFocusTrap.js";
import { cn } from "../../../utils/index.js";
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

  /**
   * ARIA describedby for drawer
   */
  "aria-describedby"?: string;

  /**
   * Whether to render drawer in a portal
   * @default true
   */
  portal?: boolean;

  /**
   * Portal container element
   * @default document.body
   */
  portalContainer?: HTMLElement;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;

  /**
   * Whether to prevent body scroll
   * @default true
   */
  preventBodyScroll?: boolean;

  /**
   * Custom ID for the drawer
   */
  id?: string;

  /**
   * Ref to element that should receive focus when drawer opens
   */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Whether to restore focus to trigger element on close
   * @default true
   */
  restoreFocus?: boolean;
}

/**
 * Drawer - Generic slide-in panel component
 *
 * A fully accessible, customizable drawer/panel that slides in from any direction.
 * Following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Slides from any direction (left, right, top, bottom)
 * - Customizable size with responsive behavior
 * - Optional backdrop with blur effect
 * - Focus trap (WCAG 2.2 AA compliant)
 * - ESC key to close
 * - Click outside to close
 * - Body scroll lock
 * - Smooth animations with modern easing
 * - Focus restoration
 * - Theme-aware styling
 * - Portal rendering for better z-index management
 * - Mobile-first responsive design
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
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
      "aria-describedby": ariaDescribedby,
      portal = true,
      portalContainer,
      animationDuration = 300,
      preventBodyScroll = true,
      id,
      initialFocusRef,
      restoreFocus = true,
    },
    ref,
  ) => {
    const drawerId = useId();
    const drawerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Use body scroll lock hook
    useBodyScrollLock(isOpen && preventBodyScroll);

    // Handle ESC key
    useEscapeKey(() => {
      if (isOpen && closeOnEscape) {
        onClose();
      }
    });

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store current focus
        previousFocusRef.current = document.activeElement as HTMLElement;

        // Focus drawer after animation
        setTimeout(() => {
          const drawer = drawerRef.current;
          if (drawer) {
            // Use initialFocusRef if provided, otherwise find first focusable element
            if (initialFocusRef?.current) {
              initialFocusRef.current.focus();
            } else {
              const firstFocusable = drawer.querySelector<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
              );
              firstFocusable?.focus();
            }
          }
        }, animationDuration / 3);
      } else if (restoreFocus) {
        // Restore focus when closing
        setTimeout(() => {
          previousFocusRef.current?.focus();
        }, animationDuration / 3);
      }
    }, [isOpen, initialFocusRef, restoreFocus, animationDuration]);

    // Focus trap
    useFocusTrap(
      drawerRef as React.RefObject<HTMLElement>,
      isOpen && trapFocus,
    );

    // Handle backdrop click
    const handleBackdropClick = () => {
      if (closeOnBackdropClick) {
        onClose();
      }
    };

    // Don't render if not open (for performance)
    if (!isOpen) return null;

    const drawerContent = (
      <>
        {/* Backdrop */}
        {showBackdrop && (
          <button
            type="button"
            className={cn(styles.backdrop, styles.open, backdropClassName)}
            onClick={handleBackdropClick}
            aria-label="Close drawer"
            tabIndex={-1}
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
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
          id={id || drawerId}
          className={cn(
            styles.drawer,
            styles[position],
            styles.open,
            className,
          )}
          style={
            {
              [position === "left" || position === "right"
                ? "width"
                : "height"]: size,
              "--animation-duration": `${animationDuration}ms`,
            } as React.CSSProperties
          }
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          tabIndex={-1}
        >
          {children}
        </div>
      </>
    );

    // Render in portal if enabled
    if (portal) {
      return createPortal(drawerContent, portalContainer || document.body);
    }

    return drawerContent;
  },
);

Drawer.displayName = "Drawer";
