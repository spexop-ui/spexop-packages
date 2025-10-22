/**
 * SubmenuPanel Types
 *
 * Type definitions for the SubmenuPanel component.
 * Provides floating submenu navigation with full accessibility support.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type React from "react";

/**
 * Icon component type from @spexop/icons
 *
 * All icons from @spexop/icons follow this signature
 */
type IconComponent = React.ComponentType<{
  /** Icon size in pixels */
  size?: number;
  /** Stroke width for icon lines */
  strokeWidth?: number;
  /** Icon color (supports currentColor) */
  color?: string;
}>;

/**
 * Individual submenu item configuration
 *
 * @example
 * ```tsx
 * import { FileText } from '@spexop/icons';
 *
 * const item: SubmenuItem = {
 *   label: 'Documentation',
 *   href: '/docs',
 *   icon: FileText
 * };
 * ```
 */
export interface SubmenuItem {
  /**
   * Display label for the menu item
   */
  label: string;

  /**
   * Navigation link URL
   * Can be absolute or relative path
   */
  href: string;

  /**
   * Optional icon component from @spexop/icons
   * Displayed to the left of the label
   */
  icon?: IconComponent;
}

/**
 * Props for the SubmenuPanel component
 *
 * @example
 * ```tsx
 * import { SubmenuPanel } from '@spexop/react';
 * import { FileText, Image } from '@spexop/icons';
 *
 * <SubmenuPanel
 *   title="Resources"
 *   items={[
 *     { label: 'Docs', href: '/docs', icon: FileText },
 *     { label: 'Gallery', href: '/gallery', icon: Image }
 *   ]}
 *   top={120}
 *   onClose={() => setSubmenuOpen(false)}
 * />
 * ```
 */
export interface SubmenuPanelProps {
  /**
   * Title displayed at the top of the submenu panel
   * Used for ARIA labeling and visual identification
   */
  title: string;

  /**
   * Array of menu items to display
   * Each item must have a label and href, with optional icon
   */
  items: SubmenuItem[];

  /**
   * Vertical position from the top of the viewport in pixels
   * Used to align the panel with the parent menu item
   *
   * @default undefined (uses default top position)
   */
  top?: number;

  /**
   * Triggers the closing animation
   * When true, panel slides out with animation before unmounting
   *
   * @default false
   */
  isClosing?: boolean;

  /**
   * Callback fired when the panel should close
   * Triggered by Escape key or mobile close button
   */
  onClose?: () => void;

  /**
   * Callback fired when any submenu item is clicked
   * Useful for tracking or additional side effects
   */
  onItemClick?: () => void;

  /**
   * Additional CSS class name for custom styling
   * Applied to the root panel element
   */
  className?: string;
}
