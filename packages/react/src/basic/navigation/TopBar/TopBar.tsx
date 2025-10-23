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
import { Stack } from "../../primitives/Stack/index.js";
import styles from "./TopBar.module.css";
import type { TopBarProps } from "./TopBar.types.js";

export function TopBar({
  logoText = "Spexop",
  onLogoClick,
  onSearchClick,
  onThemeToggle,
  onGitHubClick,
  onSettingsClick,
  onMobileMenuClick,
  currentTheme = "auto",
  showMobileMenu = true,
  gitHubUrl = "https://github.com/spexop-ui",
  className = "",
}: TopBarProps) {
  // Select the appropriate theme icon
  const ThemeIcon =
    currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Monitor;

  return (
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
          {/* Left Section: Mobile Menu + Logo */}
          <Stack
            direction="horizontal"
            align="center"
            gap={4}
            className={styles.leftSection}
          >
            {/* Mobile Menu Button (< 768px only) */}
            {showMobileMenu && onMobileMenuClick && (
              <button
                type="button"
                className={`${styles.button} ${styles.mobileMenuButton}`}
                onClick={onMobileMenuClick}
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
                tabIndex={0}
                aria-expanded="false"
                aria-controls="mobile-navigation"
              >
                <Menu size={20} strokeWidth={2} color="currentColor" />
              </button>
            )}

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
              aria-label={`${logoText} - Home`}
              tabIndex={0}
            >
              <div className={styles.logoIcon}>S</div>
              <span className={styles.logoText}>{logoText}</span>
            </a>
          </Stack>

          {/* Right Section: Action Buttons */}
          <Stack
            direction="horizontal"
            align="center"
            gap={3}
            className={styles.rightSection}
          >
            {/* Search Button */}
            {onSearchClick && (
              <button
                type="button"
                className={styles.button}
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

            {/* GitHub Link */}
            {onGitHubClick ? (
              <button
                type="button"
                className={styles.button}
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
                className={styles.button}
                aria-label="GitHub repository"
                title="GitHub repository"
                tabIndex={0}
              >
                <Github size={20} strokeWidth={2} color="currentColor" />
              </a>
            )}

            {/* Settings Button */}
            {onSettingsClick && (
              <button
                type="button"
                className={styles.button}
                onClick={onSettingsClick}
                aria-label="Open settings"
                title="Open settings"
                tabIndex={0}
              >
                <Settings size={20} strokeWidth={2} color="currentColor" />
              </button>
            )}
          </Stack>
        </Stack>
      </header>
    </>
  );
}
