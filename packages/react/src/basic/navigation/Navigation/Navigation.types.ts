/**
 * Navigation Component Types
 * Generic, router-agnostic navigation bar
 */

import type { ComponentType, ReactNode } from "react";

/**
 * Icon component props interface
 * Compatible with @spexop/icons components
 */
export interface IconComponentProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export interface NavLink {
  /**
   * Unique identifier for the link
   */
  id: string;

  /**
   * Link destination (path or URL)
   */
  to: string;

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
}

export interface NavigationProps {
  /**
   * Logo configuration
   */
  logo: {
    /**
     * Logo text
     */
    text: string;

    /**
     * Optional logo icon component
     * Compatible with @spexop/icons components
     */
    icon?: ComponentType<IconComponentProps>;

    /**
     * Logo click destination (usually "/")
     */
    href: string;

    /**
     * Optional aria-label for logo link
     */
    ariaLabel?: string;
  };

  /**
   * Navigation links
   */
  links: NavLink[];

  /**
   * Current path for active link detection (e.g., "/about")
   */
  currentPath: string;

  /**
   * Navigation handler for internal links
   * @param path - The path to navigate to
   */
  onNavigate: (path: string) => void;

  /**
   * Optional: Show close sidebar button on mobile
   * @default false
   */
  showCloseSidebar?: boolean;

  /**
   * Optional: Close sidebar handler
   */
  onCloseSidebar?: () => void;

  /**
   * Optional: Custom className for the nav element
   */
  className?: string;

  /**
   * Optional: Additional content to render in the navigation (e.g., search, settings)
   */
  children?: ReactNode;

  /**
   * Optional: aria-label for the navigation
   * @default "Main navigation"
   */
  ariaLabel?: string;
}
