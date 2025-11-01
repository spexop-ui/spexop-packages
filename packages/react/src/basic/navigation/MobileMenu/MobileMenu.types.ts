/**
 * MobileMenu Component Types
 *
 * @packageName @spexop/react
 * @description Mobile menu overlay for marketing pages and websites
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-29
 */

import type { ReactNode } from "react";

export interface MobileMenuProps {
  /**
   * Whether the mobile menu is open
   */
  isOpen: boolean;

  /**
   * Callback when menu should close
   */
  onClose: () => void;

  /**
   * Menu content (links, sections, etc.)
   */
  children: ReactNode;

  /**
   * Menu title/header text (used if logo not provided)
   * @default "Menu"
   */
  title?: string;

  /**
   * Logo image source or React element
   */
  logo?: string | ReactNode;

  /**
   * Alt text for logo image (if logo is a string)
   */
  logoAlt?: string;

  /**
   * Whether to show the header with logo/title and close button
   * @default true
   */
  showHeader?: boolean;

  /**
   * Position where menu slides in from
   * @default "top"
   */
  position?: "left" | "right" | "top";

  /**
   * Additional CSS class
   */
  className?: string;
}

