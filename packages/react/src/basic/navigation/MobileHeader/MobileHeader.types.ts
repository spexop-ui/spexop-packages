/**
 * MobileHeader Component Types
 *
 * @packageName @spexop/react
 * @description Mobile-optimized header component for responsive layouts
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-01-27
 */

import type { ComponentType } from "react";

export interface IconComponentProps {
  size?: number | string;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export interface MobileHeaderAction {
  /**
   * Unique identifier for the action
   */
  id: string;

  /**
   * Icon component to display
   * Compatible with @spexop/icons components
   */
  icon: ComponentType<any>;

  /**
   * Callback when action is clicked
   */
  onClick?: () => void;

  /**
   * Optional href for link actions
   */
  href?: string;

  /**
   * Whether this is an external link
   */
  external?: boolean;

  /**
   * Optional aria-label for accessibility
   */
  ariaLabel?: string;

  /**
   * Optional title/tooltip text
   */
  title?: string;

  /**
   * Whether this action is currently active
   */
  active?: boolean;
}

export interface MobileHeaderProps {
  /**
   * Logo component (e.g., <Logo /> from @spexop/react)
   * Takes precedence over all other logo props
   */
  logo?: React.ReactNode;

  /**
   * Logo text to display
   */
  logoText?: string;

  /**
   * Custom logo icon component
   * Use React element from @spexop/icons or custom component
   */
  logoIcon?: React.ReactNode;

  /**
   * Custom logo image src
   */
  logoImage?: string;

  /**
   * Callback when logo is clicked
   */
  onLogoClick?: () => void;

  /**
   * Callback when menu toggle button is clicked
   * Only required if using controlled mode (no menuContent provided)
   */
  onMenuClick?: () => void;

  /**
   * Whether the mobile menu is currently open
   * Only used if using controlled mode (no menuContent provided)
   */
  isMenuOpen?: boolean;

  /**
   * Menu content to display in MobileMenu
   * If provided, MobileHeader will automatically manage MobileMenu state
   */
  menuContent?: React.ReactNode;

  /**
   * Menu title (used when menuContent is provided)
   * @default "Menu"
   */
  menuTitle?: string;

  /**
   * Menu logo (used when menuContent is provided)
   */
  menuLogo?: string | React.ReactNode;

  /**
   * Menu position (used when menuContent is provided)
   * Note: MobileHeader uses "top" by default to slide menu down from header
   * @default "top"
   */
  menuPosition?: "left" | "right" | "top";

  /**
   * Whether to show menu header (used when menuContent is provided)
   * @default true
   */
  menuShowHeader?: boolean;

  /**
   * Action buttons to display on the right side
   * Limited to 2-3 actions for mobile layout
   */
  actions?: MobileHeaderAction[];

  /**
   * Whether the header should be sticky/fixed
   * @default true
   */
  sticky?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Optional aria-label for accessibility
   * @default "Mobile navigation header"
   */
  ariaLabel?: string;
}

