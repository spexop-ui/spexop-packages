/**
 * TopBar Component
 *
 * Fixed header navigation bar with logo, search, theme toggle, and external links.
 * Always visible at top of page, works on mobile and desktop.
 *
 * @example
 * ```tsx
 * import { TopBar } from '@spexop/react';
 *
 * function App() {
 *   return (
 *     <TopBar
 *       logoText="Spexop Design System"
 *       onLogoClick={() => navigate('/')}
 *       onSearchClick={() => openSearch()}
 *       onThemeToggle={() => toggleTheme()}
 *       onMobileMenuClick={() => toggleSidebar()}
 *       currentTheme="light"
 *     />
 *   );
 * }
 * ```
 *
 * Features:
 * - Fixed positioning (always visible at top)
 * - Logo with click handler
 * - Search button
 * - Theme toggle (light/dark/auto icons)
 * - GitHub link
 * - Mobile hamburger menu (< 768px)
 * - Responsive: Logo text hides on mobile
 * - WCAG AA+ accessible
 * - Keyboard navigable
 *
 * @packageName @spexop/react
 * @description TopBar Component
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import {
  Github,
  Menu,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
} from "@spexop/icons";
import { createPortal } from "react-dom";
import { Stack } from "../../primitives/Stack/index.js";
import { isBrowser } from "../../../utils/index.js";
import styles from "./TopBar.module.css";
import type { TopBarProps } from "./TopBar.types.js";

export function TopBar({
  logo,
  logoText = "Spexop",
  logoIcon,
  logoImage,
  logoImageLight,
  logoImageDark,
  onLogoClick,
  onSearchClick,
  onThemeToggle,
  onGitHubClick,
  onSettingsClick,
  onMobileMenuClick,
  currentTheme = "auto",
  resolvedTheme,
  showMobileMenu = true,
  gitHubUrl = "https://github.com/spexop-ui",
  navItems,
  onNavItemClick,
  className = "",
}: TopBarProps) {
  // Select the appropriate theme icon
  const ThemeIcon =
    currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Monitor;

  // Determine the actual theme (resolved theme for auto mode)
  const actualTheme =
    currentTheme === "auto"
      ? resolvedTheme ||
        (typeof document !== "undefined" &&
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light")
      : currentTheme;

  // Render logo content
  const renderLogoContent = () => {
    // Priority 1: Logo component
    if (logo) {
      return logo;
    }

    // Priority 2: Theme-aware logo images
    if (logoImageLight || logoImageDark) {
      const selectedLogoImage =
        actualTheme === "dark"
          ? logoImageDark || logoImageLight
          : logoImageLight || logoImageDark;
      if (selectedLogoImage) {
        return (
          <img
            src={selectedLogoImage}
            alt={logoText || "Logo"}
            className={styles.logoImage}
          />
        );
      }
    }

    // Priority 3: Logo image (fallback)
    if (logoImage) {
      return (
        <img
          src={logoImage}
          alt={logoText || "Logo"}
          className={styles.logoImage}
        />
      );
    }

    // Priority 4: Logo icon
    if (logoIcon) {
      return <div className={styles.logoIcon}>{logoIcon}</div>;
    }

    // Fallback: Default icon
    return <div className={styles.logoIcon}>S</div>;
  };

  const topBarContent = (
    <>
      {/* Skip Navigation Links */}
      <div className={styles.skipLinks}>
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>
        <a href="#navigation" className={styles.skipLink}>
          Skip to navigation
        </a>
      </div>

      <header className={`${styles.topBar} ${className}`}>
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          gap={0}
          className={styles.topBarContent}
        >
          {/* Left Section: Logo */}
          <Stack
            direction="horizontal"
            align="center"
            gap={4}
            className={styles.leftSection}
          >
            {/* Logo */}
            <a
              href="/"
              className={styles.logo}
              onClick={(e) => {
                if (onLogoClick) {
                  e.preventDefault();
                  onLogoClick();
                }
              }}
              aria-label={`${logoText || "Home"} - Home`}
              tabIndex={0}
            >
              {renderLogoContent()}
              {logoText && <span className={styles.logoText}>{logoText}</span>}
            </a>
          </Stack>

          {/* Middle Section: Navigation Items (desktop only) */}
          {navItems && navItems.length > 0 && (
            <nav className={styles.navSection} aria-label="Main navigation">
              <Stack
                direction="horizontal"
                align="center"
                gap={2}
                className={styles.navItems}
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`${styles.navItem} ${
                        item.active ? styles.navItemActive : ""
                      }`}
                      onClick={(e) => {
                        if (onNavItemClick) {
                          onNavItemClick(item, e);
                        }
                      }}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.ariaLabel || item.label}
                      aria-current={item.active ? "page" : undefined}
                      tabIndex={0}
                    >
                      {Icon && (
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className={styles.navItemIcon}
                        />
                      )}
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </Stack>
            </nav>
          )}

          {/* Right Section: Action Buttons */}
          <Stack
            direction="horizontal"
            align="center"
            gap={3}
            className={styles.rightSection}
          >
            {/* Search Button (desktop only) */}
            {onSearchClick && (
              <button
                type="button"
                className={`${styles.button} ${styles.desktopOnly}`}
                onClick={onSearchClick}
                aria-label="Search"
                title="Search (⌘K)"
                tabIndex={0}
              >
                <Search size={20} strokeWidth={2} color="currentColor" />
              </button>
            )}

            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                type="button"
                className={styles.button}
                onClick={onThemeToggle}
                aria-label={`Toggle theme (current: ${currentTheme})`}
                title={`Toggle theme (current: ${currentTheme})`}
                tabIndex={0}
              >
                <ThemeIcon size={20} strokeWidth={2} color="currentColor" />
              </button>
            )}

            {/* GitHub Link (desktop only) */}
            {onGitHubClick ? (
              <button
                type="button"
                className={`${styles.button} ${styles.desktopOnly}`}
                onClick={onGitHubClick}
                aria-label="GitHub repository"
                title="GitHub repository"
                tabIndex={0}
              >
                <Github size={20} strokeWidth={2} color="currentColor" />
              </button>
            ) : (
              <a
                href={gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.button} ${styles.desktopOnly}`}
                aria-label="GitHub repository"
                title="GitHub repository"
                tabIndex={0}
              >
                <Github size={20} strokeWidth={2} color="currentColor" />
              </a>
            )}

            {/* Settings Button (desktop only) */}
            {onSettingsClick && (
              <button
                type="button"
                className={`${styles.button} ${styles.desktopOnly}`}
                onClick={onSettingsClick}
                aria-label="Open settings"
                title="Open settings"
                tabIndex={0}
              >
                <Settings size={20} strokeWidth={2} color="currentColor" />
              </button>
            )}

            {/* Mobile Menu Button (mobile only) */}
            {showMobileMenu && onMobileMenuClick && (
              <button
                type="button"
                className={`${styles.button} ${styles.mobileOnly}`}
                onClick={onMobileMenuClick}
                aria-label="Toggle menu"
                title="Toggle menu"
                tabIndex={0}
                aria-expanded="false"
                aria-controls="mobile-navigation"
              >
                <Menu size={20} strokeWidth={2} color="currentColor" />
              </button>
            )}
          </Stack>
        </Stack>
      </header>
    </>
  );

  // Render with portal to ensure fixed positioning works correctly
  // (prevents issues when parent elements have transform/opacity/etc)
  if (isBrowser()) {
    return createPortal(topBarContent, document.body);
  }

  // Fallback for SSR
  return topBarContent;
}
