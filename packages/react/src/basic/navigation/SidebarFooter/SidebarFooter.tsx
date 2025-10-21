/**
 * SidebarFooter Component
 * Simple wrapper component for sidebar footer content
 *
 * Use for:
 * - Version selectors
 * - Footer links
 * - Additional sidebar information
 * - Any content that should appear at the bottom of a sidebar
 *
 * @component SidebarFooter
 * @packageName @spexop/react
 * @description Simple wrapper for sidebar footer content
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import type { ReactNode } from "react";
import styles from "./SidebarFooter.module.css";

export interface SidebarFooterProps {
  /**
   * Footer content (version selector, links, etc.)
   */
  children?: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

export function SidebarFooter({
  children,
  className = "",
}: SidebarFooterProps) {
  return (
    <footer className={`${styles.sidebarFooter} ${className}`}>
      {children}
    </footer>
  );
}
