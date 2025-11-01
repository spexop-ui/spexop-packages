/**
 * Sidebar Component
 * Main sidebar navigation with responsive behavior
 *
 * Desktop (≥ 768px):
 * - Side-by-side layout
 * - 320px static width
 * - No portal, no overlay
 * - Always visible
 *
 * Mobile (< 768px):
 * - Fixed overlay with portal
 * - Full width, top: 64px
 * - Body scroll lock when open
 * - Focus trap when open
 * - Escape key to close
 * - Backdrop with click-to-close
 *
 * @component Sidebar
 * @packageName @spexop/react
 * @description Main sidebar with desktop side-by-side and mobile overlay
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import { X } from "@spexop/icons";
import type { ReactElement } from "react";
import { Children, useRef } from "react";
import { createPortal } from "react-dom";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
  useMediaQuery,
} from "../../../hooks/index.js";
import { isBrowser } from "../../../utils/index.js";
import { Stack } from "../../primitives/Stack/index.js";
import styles from "./Sidebar.module.css";
import type { SidebarProps } from "./Sidebar.types.js";

export function Sidebar({
  children,
  isOpen = true,
  onClose,
  showHeader = true,
  headerTitle = "Navigation",
  className = "",
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null as unknown as HTMLElement);
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Mobile-only hooks
  const shouldLockScroll = isMobile && isOpen;
  const shouldTrapFocus = isMobile && isOpen;

  useBodyScrollLock(shouldLockScroll);
  useFocusTrap(sidebarRef, shouldTrapFocus);
  useEscapeKey(() => {
    if (isMobile && isOpen && onClose) {
      onClose();
    }
  }, isMobile && isOpen);

  const handleBackdropClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Separate footer from navigation items
  const childrenArray = Children.toArray(children);
  const footerChild = childrenArray.find((child) =>
    (child as ReactElement).type?.toString().includes("SidebarFooter"),
  );
  const navChildren = childrenArray.filter((child) => child !== footerChild);

  // Sidebar content
  const sidebarContent = (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${className}`}
      aria-label="Main navigation"
      aria-hidden={isMobile && !isOpen}
    >
      {/* Header (mobile only, optional) */}
      {isMobile && showHeader && (
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          gap={4}
          className={styles.sidebarHeader}
        >
          <h2 className={styles.sidebarTitle}>{headerTitle}</h2>
          <button
            type="button"
            onClick={handleCloseClick}
            className={styles.closeButton}
            aria-label="Close navigation"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </Stack>
      )}

      {/* Navigation Content */}
      <nav className={styles.sidebarNav}>{navChildren}</nav>

      {/* Footer (if provided) */}
      {footerChild}
    </aside>
  );

  // Render with portal to ensure fixed positioning works correctly
  // (prevents issues when parent elements have transform/opacity/etc)
  if (isBrowser()) {
    // Mobile: Include backdrop
    if (isMobile) {
      return createPortal(
        <>
          {/* Backdrop */}
          {isOpen && (
            <div
              className={styles.backdrop}
              onClick={handleBackdropClick}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  handleBackdropClick();
                }
              }}
              aria-hidden="true"
            />
          )}

          {/* Sidebar Overlay */}
          {sidebarContent}
        </>,
        document.body,
      );
    }

    // Desktop: No backdrop, but still use portal
    return createPortal(sidebarContent, document.body);
  }

  // Fallback for SSR
  return sidebarContent;
}
