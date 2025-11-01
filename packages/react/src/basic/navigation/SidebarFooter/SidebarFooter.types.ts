/**
 * SidebarFooter Component Types
 * Simple wrapper component for sidebar footer content
 *
 * @component SidebarFooter
 * @packageName @spexop/react
 * @description Simple wrapper for sidebar footer content
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import type { ReactNode } from "react";
import type { SpacingScale } from "../../primitives/types.js";

export interface SidebarFooterUser {
  /** User name */
  name: string;
  /** User email or role */
  subtitle?: string;
  /** User avatar URL */
  avatar?: string;
  /** Avatar alt text */
  avatarAlt?: string;
}

export interface SidebarFooterAction {
  /** Action label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Icon name (from @spexop/icons) */
  icon?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface SidebarFooterProps {
  /**
   * Footer content (for custom layouts, takes precedence over structured props)
   */
  children?: ReactNode;

  /**
   * User information (only used if children is not provided)
   */
  user?: SidebarFooterUser;

  /**
   * Action buttons (only used if children is not provided)
   */
  actions?: SidebarFooterAction[];

  /**
   * Density/spacing control for padding (compact, normal, spacious)
   * @default "normal"
   */
  density?: "compact" | "normal" | "spacious";

  /**
   * Gap between structured content sections (only applies when using user/actions props)
   * @default 3
   */
  gap?: SpacingScale;

  /**
   * ARIA label for the footer element
   */
  "aria-label"?: string;

  /**
   * Additional CSS class
   */
  className?: string;
}
