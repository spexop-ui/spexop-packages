/**
 * Sidebar Component Types
 * Main sidebar navigation wrapper with responsive behavior
 *
 * @component Sidebar
 * @packageName @spexop/react
 * @description Main sidebar with desktop side-by-side and mobile overlay
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import type { ReactNode } from "react";

export interface SidebarProps {
  /**
   * Sidebar content (NavSection, NavLink, SidebarFooter components)
   */
  children?: ReactNode;

  /**
   * Whether sidebar is open (controlled mode)
   * @default true on desktop, false on mobile
   */
  isOpen?: boolean;

  /**
   * Callback when sidebar is closed (mobile only)
   */
  onClose?: () => void;

  /**
   * Whether to show header with close button
   * @default true on mobile
   */
  showHeader?: boolean;

  /**
   * Header title text
   * @default "Navigation"
   */
  headerTitle?: string;

  /**
   * Additional CSS class
   */
  className?: string;
}
