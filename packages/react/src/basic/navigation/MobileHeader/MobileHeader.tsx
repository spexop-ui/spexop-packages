/**
 * MobileHeader Component
 *
 * Compact, mobile-optimized header component for responsive layouts.
 * Designed specifically for mobile screens (< 768px) with essential controls.
 *
 * Features:
 * - Compact mobile-first design
 * - Logo with optional text/icon
 * - Menu toggle button
 * - Optional action buttons (limited to 2-3 for mobile)
 * - Sticky positioning support
 * - WCAG AA+ accessible
 * - Keyboard navigable
 * - Touch-friendly targets (44px minimum)
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns
 * - Principle 2: Borders before shadows
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 5: Composition before complexity
 * - Principle 6: Standards before frameworks
 * - Principle 7: Accessibility before aesthetics
 *
 * @example
 * ```tsx
 * import { MobileHeader } from '@spexop/react';
 * import { Menu, Search, Sun } from '@spexop/icons';
 *
 * function App() {
 *   const [isMenuOpen, setIsMenuOpen] = useState(false);
 *
 *   return (
 *     <MobileHeader
 *       logoText="My App"
 *       onLogoClick={() => navigate('/')}
 *       onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
 *       isMenuOpen={isMenuOpen}
 *       actions={[
 *         {
 *           id: 'search',
 *           icon: Search,
 *           onClick: () => openSearch(),
 *           ariaLabel: 'Search'
 *         },
 *         {
 *           id: 'theme',
 *           icon: Sun,
 *           onClick: () => toggleTheme(),
 *           ariaLabel: 'Toggle theme'
 *         }
 *       ]}
 *     />
 *   );
 * }
 * ```
 *
 * @component MobileHeader
 * @packageName @spexop/react
 * @description Mobile-optimized header component
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-01-27
 */

import { Menu, X } from "@spexop/icons";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isBrowser } from "../../../utils/index.js";
import { Stack } from "../../primitives/Stack/index.js";
import { MobileMenu } from "../MobileMenu/index.js";
import styles from "./MobileHeader.module.css";
import type { MobileHeaderProps } from "./MobileHeader.types.js";

export function MobileHeader({
  logo,
  logoText,
  logoIcon,
  logoImage,
  onLogoClick,
  onMenuClick,
  isMenuOpen: controlledIsMenuOpen,
  menuContent,
  menuTitle = "Menu",
  menuLogo,
  menuPosition = "top",
  menuShowHeader = true,
  actions = [],
  sticky = true,
  className = "",
  ariaLabel = "Mobile navigation header",
}: MobileHeaderProps) {
  // Internal state management when menuContent is provided
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Determine if we're in automatic mode (menuContent provided and truthy)
  const hasMenuContent = menuContent !== undefined && menuContent !== null;

  // Use controlled state if provided, otherwise use internal state
  const isMenuOpen = hasMenuContent
    ? internalMenuOpen
    : (controlledIsMenuOpen ?? false);

  // Handle menu toggle
  const handleMenuClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (hasMenuContent) {
      // Uncontrolled mode - manage state internally
      setInternalMenuOpen((prev) => !prev);
    } else {
      // Controlled mode - call external handler
      if (!onMenuClick) {
        console.warn(
          "MobileHeader: onMenuClick is required when not using menuContent",
        );
        return;
      }
      onMenuClick();
    }
  };

  // Handle menu close
  const handleMenuClose = () => {
    if (hasMenuContent) {
      setInternalMenuOpen(false);
    } else {
      // In controlled mode, onMenuClick toggles, so we toggle here too
      onMenuClick?.();
    }
  };
  // Render logo content
  const renderLogoContent = () => {
    // Priority 1: Logo component
    if (logo) {
      return logo;
    }

    // Priority 2: Logo image
    if (logoImage) {
      return (
        <img
          src={logoImage}
          alt={logoText || "Logo"}
          className={styles.logoImage}
        />
      );
    }

    // Priority 3: Logo icon
    if (logoIcon) {
      return <div className={styles.logoIcon}>{logoIcon}</div>;
    }

    // Fallback: Logo text only
    return null;
  };

  const headerClasses = `${styles.mobileHeader} ${
    sticky ? styles.sticky : ""
  } ${className}`;

  const headerContent = (
    <>
      <header className={headerClasses} aria-label={ariaLabel}>
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          gap={4}
          className={styles.content}
        >
          {/* Left Section: Logo */}
          <a
            href="/"
            className={styles.logo}
            onClick={(e) => {
              if (onLogoClick) {
                e.preventDefault();
                onLogoClick();
              }
            }}
            aria-label={logoText ? `${logoText} - Home` : "Home"}
            tabIndex={0}
          >
            {renderLogoContent()}
            {logoText && <span className={styles.logoText}>{logoText}</span>}
          </a>

          {/* Right Section: Actions */}
          <Stack
            direction="horizontal"
            align="center"
            gap={2}
            className={styles.actions}
            style={{
              pointerEvents: "auto",
              position: "relative",
              zIndex: 10000,
            }}
          >
            {/* Action Buttons */}
            {actions.map((action) => {
              const Icon = action.icon;
              const actionClasses = `${styles.actionButton} ${
                action.active ? styles.actionButtonActive : ""
              }`;

              if (action.href) {
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={actionClasses}
                    aria-label={action.ariaLabel || action.title}
                    title={action.title}
                    tabIndex={0}
                  >
                    <Icon size={18} strokeWidth={2} color="currentColor" />
                  </a>
                );
              }

              return (
                <button
                  key={action.id}
                  type="button"
                  className={actionClasses}
                  onClick={action.onClick}
                  aria-label={action.ariaLabel || action.title}
                  title={action.title}
                  tabIndex={0}
                >
                  <Icon size={18} strokeWidth={2} color="currentColor" />
                </button>
              );
            })}

            {/* Menu Toggle Button */}
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              onClick={handleMenuClick}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              tabIndex={0}
            >
              {isMenuOpen ? (
                <X size={22} strokeWidth={2} color="currentColor" />
              ) : (
                <Menu size={22} strokeWidth={2} color="currentColor" />
              )}
            </button>
          </Stack>
        </Stack>
      </header>

      {/* Integrated MobileMenu - rendered automatically if menuContent provided */}
      {/* Menu slides down from header (positioned below header at 60px) */}
      {hasMenuContent && (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          title={menuTitle}
          logo={menuLogo}
          position="top"
          showHeader={menuShowHeader}
          className="belowHeader"
        >
          {menuContent}
        </MobileMenu>
      )}
    </>
  );

  // Render with portal when sticky to ensure fixed positioning works correctly
  // (prevents issues when parent elements have transform/opacity/etc)
  if (sticky && isBrowser()) {
    return createPortal(headerContent, document.body);
  }

  // Non-sticky or SSR fallback
  return headerContent;
}
