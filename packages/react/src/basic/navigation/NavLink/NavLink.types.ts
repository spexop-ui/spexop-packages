/**
 * NavLink Component Types
 * Simple navigation link for sidebar navigation
 *
 * @component NavLink
 * @packageName @spexop/react
 * @description Simple navigation link for sidebar navigation
 * @author @spexop-ui | github.com/spexop-ui |  @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import type { MouseEvent, ReactNode } from "react";

export interface NavLinkProps {
  /**
   * Link destination URL
   */
  href: string;

  /**
   * Link content (text or elements)
   */
  children?: ReactNode;

  /**
   * Whether this link is currently active
   * @default false
   */
  active?: boolean;

  /**
   * Whether this link is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler for custom navigation logic
   */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Additional CSS class
   */
  className?: string;
}
