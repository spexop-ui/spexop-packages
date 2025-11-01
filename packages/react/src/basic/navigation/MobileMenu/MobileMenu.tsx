/**
 * MobileMenu Component
 *
 * Slide-out mobile menu overlay for marketing pages and websites.
 * Features backdrop, animations, focus trap, and scroll lock.
 *
 * Features:
 * - Portal rendering to body
 * - Backdrop with click-to-close
 * - Slide-in animation (left/right)
 * - Focus trap when open
 * - Body scroll lock when open
 * - Escape key to close
 * - Header with close button
 * - WCAG AA+ accessible
 *
 * @component MobileMenu
 * @packageName @spexop/react
 * @description Mobile menu overlay for marketing pages
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-29
 */

import { X } from "@spexop/icons";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "../../../hooks/index.js";
import { isBrowser } from "../../../utils/index.js";
import { Stack } from "../../primitives/Stack/index.js";
import styles from "./MobileMenu.module.css";
import type { MobileMenuProps } from "./MobileMenu.types.js";

export function MobileMenu({
  isOpen,
  onClose,
  children,
  title = "Menu",
  logo,
  logoAlt = "Logo",
  showHeader = true,
  position = "top",
  className = "",
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when menu is open
  useBodyScrollLock(isOpen);

  // Trap focus within menu when open
  useFocusTrap(menuRef, isOpen);

  // Close on Escape key
  useEscapeKey(onClose, isOpen);

  // Focus menu when it opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isBrowser()) {
    return null;
  }

  // Render logo or title
  const renderHeaderContent = () => {
    if (logo) {
      if (typeof logo === "string") {
        return <img src={logo} alt={logoAlt} className={styles.logo} />;
      }
      return <div className={styles.logo}>{logo}</div>;
    }
    return <h2 className={styles.title}>{title}</h2>;
  };

  const menuContent = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${styles[position]} ${isOpen ? styles.open : ""} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        {/* Header */}
        {showHeader && (
          <Stack
            direction="horizontal"
            align="center"
            justify="space-between"
            gap={4}
            className={styles.header}
          >
            {renderHeaderContent()}
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2} color="currentColor" />
            </button>
          </Stack>
        )}

        {/* Menu Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );

  return createPortal(menuContent, document.body);
}

