/**
 * TopBar Component Types
 *
 * @packageName @spexop/react
 * @description TopBar Component Types
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import type { ComponentType } from "react";

export interface IconComponentProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export interface TopBarNavItem {
  /**
   * Unique identifier for the navigation item
   */
  id: string;

  /**
   * Link destination (path or URL)
   */
  href: string;

  /**
   * Link label text
   */
  label: string;

  /**
   * Icon component to display before the label
   * Compatible with @spexop/icons components
   */
  icon?: ComponentType<IconComponentProps>;

  /**
   * Whether this is an external link (opens in new tab)
   */
  external?: boolean;

  /**
   * Optional aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Whether this item is currently active
   */
  active?: boolean;
}

export interface TopBarProps {
  /**
   * Logo component (e.g., <Logo /> from @spexop/react)
   * Takes precedence over all other logo props
   */
  logo?: React.ReactNode;

  /**
   * Logo text to display (e.g., "Spexop Design System")
   * @default "Spexop"
   */
  logoText?: string;

  /**
   * Custom logo icon component (replaces the "S" icon)
   * Use React element from @spexop/icons or custom component
   */
  logoIcon?: React.ReactNode;

  /**
   * Custom logo image src (e.g., "/logo.svg")
   * Takes precedence over logoIcon and default icon
   */
  logoImage?: string;

  /**
   * Light theme logo image src (e.g., "/logo-light.svg")
   * Used when currentTheme is "light" or resolved to "light"
   */
  logoImageLight?: string;

  /**
   * Dark theme logo image src (e.g., "/logo-dark.svg")
   * Used when currentTheme is "dark" or resolved to "dark"
   */
  logoImageDark?: string;

  /**
   * Callback when logo is clicked (navigate to home)
   */
  onLogoClick?: () => void;

  /**
   * Callback when search button is clicked
   */
  onSearchClick?: () => void;

  /**
   * Callback when theme toggle button is clicked
   */
  onThemeToggle?: () => void;

  /**
   * Callback when GitHub button is clicked
   */
  onGitHubClick?: () => void;

  /**
   * Callback when settings button is clicked
   */
  onSettingsClick?: () => void;

  /**
   * Callback when mobile menu button is clicked (< 768px only)
   */
  onMobileMenuClick?: () => void;

  /**
   * Current theme to display appropriate icon
   * @default "auto"
   */
  currentTheme?: "light" | "dark" | "auto";

  /**
   * Resolved theme (light or dark, never auto)
   * Used to determine which logo to display when currentTheme is "auto"
   * If not provided, will attempt to detect from document or default to "light"
   */
  resolvedTheme?: "light" | "dark";

  /**
   * Whether to show mobile menu button (< 768px)
   * Set to false if you handle mobile menu differently
   * @default true
   */
  showMobileMenu?: boolean;

  /**
   * GitHub repository URL
   * @default "https://github.com/spexop-ui"
   */
  gitHubUrl?: string;

  /**
   * Navigation items to display between logo and action buttons
   * Rendered horizontally on desktop, hidden on mobile
   */
  navItems?: TopBarNavItem[];

  /**
   * Callback when a navigation item is clicked
   * If not provided, items will use default anchor behavior
   */
  onNavItemClick?: (
    item: TopBarNavItem,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;

  /**
   * Additional CSS class
   */
  className?: string;
}
