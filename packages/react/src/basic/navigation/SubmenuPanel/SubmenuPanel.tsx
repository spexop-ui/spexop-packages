/**
 * SubmenuPanel - Floating submenu panel for Sidebar
 *
 * A floating panel that displays submenu items next to the sidebar.
 * Supports animations, keyboard navigation, and full accessibility.
 *
 * Following "The Spexop Way":
 * - Principle 2: Borders before shadows - Clean panel borders
 * - Principle 3: Typography before decoration - Clear item hierarchy
 * - Principle 4: Tokens before magic numbers - Theme tokens throughout
 * - Principle 7: Accessibility before aesthetics - Full keyboard support
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * import { SubmenuPanel } from '@spexop/react';
 * import { FileText, Image, Video } from '@spexop/icons';
 *
 * <SubmenuPanel
 *   title="Components"
 *   items={[
 *     { label: "Button", href: "/button", icon: FileText },
 *     { label: "Card", href: "/card", icon: Image },
 *     { label: "Modal", href: "/modal", icon: Video },
 *   ]}
 *   top={100}
 *   isClosing={false}
 *   onClose={() => setActiveSubmenu(null)}
 * />
 * ```
 */

import { X } from "@spexop/icons";
import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery.js";
import styles from "./SubmenuPanel.module.css";
import type { SubmenuPanelProps } from "./SubmenuPanel.types.js";

/**
 * SubmenuPanel Component
 * Floating submenu panel with animations and keyboard support
 */
export const SubmenuPanel = forwardRef<HTMLDivElement, SubmenuPanelProps>(
  function SubmenuPanel(
    {
      title,
      items,
      top,
      isClosing = false,
      onClose,
      onItemClick,
      className = "",
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    // Detect mobile screen size using useMediaQuery hook
    const isMobile = useMediaQuery("(max-width: 767px)");

    // Track focused item index for keyboard navigation
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    // Refs for link elements
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "Escape":
            event.preventDefault();
            onClose?.();
            break;

          case "ArrowDown":
            event.preventDefault();
            setFocusedIndex((prev) => {
              const nextIndex = prev < items.length - 1 ? prev + 1 : 0;
              linkRefs.current[nextIndex]?.focus();
              return nextIndex;
            });
            break;

          case "ArrowUp":
            event.preventDefault();
            setFocusedIndex((prev) => {
              const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
              linkRefs.current[nextIndex]?.focus();
              return nextIndex;
            });
            break;

          case "Home":
            event.preventDefault();
            setFocusedIndex(0);
            linkRefs.current[0]?.focus();
            break;

          case "End":
            event.preventDefault();
            setFocusedIndex(items.length - 1);
            linkRefs.current[items.length - 1]?.focus();
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [items.length, onClose]);

    // Handle link click
    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onItemClick?.();
      // Allow default navigation to occur
    };

    return (
      <div
        ref={ref}
        className={`${styles.submenuPanel} ${isClosing ? styles.submenuClosing : ""} ${className}`}
        style={{ top: top ? `${top}px` : undefined }}
        role="navigation"
        aria-label={`${title} submenu`}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            className={styles.mobileClose}
            onClick={onClose}
            aria-label={`Close ${title} submenu`}
            type="button"
          >
            <X size={24} strokeWidth={2} />
          </button>
        )}

        {/* Header */}
        <div className={styles.submenuHeader}>
          <span className={styles.submenuTitle} id={`submenu-title-${title}`}>
            {title}
          </span>
        </div>

        {/* Navigation */}
        <nav
          className={styles.submenuNav}
          aria-labelledby={`submenu-title-${title}`}
        >
          <ul className={styles.submenuList}>
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <li
                  key={`${item.href}-${index}`}
                  className={styles.submenuItem}
                >
                  <a
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    href={item.href}
                    className={styles.submenuLink}
                    onClick={handleLinkClick}
                    aria-label={item.label}
                  >
                    {Icon && (
                      <span className={styles.submenuIcon} aria-hidden="true">
                        <Icon size={20} strokeWidth={1} color="currentColor" />
                      </span>
                    )}
                    <span className={styles.submenuLabel}>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  },
);
