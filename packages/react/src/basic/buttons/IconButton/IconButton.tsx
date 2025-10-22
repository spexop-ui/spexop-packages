/**
 * IconButton - Reusable icon-only button component
 *
 * A consistent, accessible button component for icon-only actions.
 * Used throughout Sidebar, AppBar, and other navigation components.
 *
 * @example
 * ```tsx
 * import { IconButton } from '@spexop/react';
 * import { Menu } from '@spexop/icons';
 *
 * <IconButton
 *   icon={Menu}
 *   label="Open menu"
 *   onClick={() => console.log('Clicked')}
 *   variant="ghost"
 * />
 * ```
 */

import type { ComponentType, MouseEvent } from "react";
import styles from "./IconButton.module.css";

/**
 * Icon component props interface
 * Defines the expected shape of icon components from @spexop/icons
 */
export interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * Icon component type
 * Note: Using ComponentType to handle React 18/19 compatibility
 * @spexop/icons uses React 18, this project uses React 19
 */
type IconComponent = ComponentType<IconProps>;

export interface IconButtonProps {
  /** Icon component from @spexop/icons or SVG string (legacy) */
  icon: IconComponent | string;
  /** Accessible label (for aria-label and title) */
  label: string;
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Visual variant */
  variant?: "ghost" | "solid" | "outline";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Icon size in pixels (for React component icons) */
  iconSize?: number;
  /** Icon stroke width (for React component icons) */
  strokeWidth?: number;
}

/**
 * IconButton Component
 * Accessible icon-only button with consistent styling
 */
export function IconButton({
  icon,
  label,
  onClick,
  variant = "ghost",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  iconSize = 20,
  strokeWidth = 1.5,
}: IconButtonProps) {
  // Determine icon size based on button size
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  const actualIconSize = iconSize || sizeMap[size];

  // Check if icon is a React component or SVG string
  // React components (including ForwardRef) are not strings
  const isReactComponent = typeof icon !== "string";

  const Icon = isReactComponent ? icon : null;

  return (
    <button
      type={type}
      className={`${styles.iconButton} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      {isReactComponent && Icon ? (
        // Render React component icon
        <Icon
          size={actualIconSize}
          strokeWidth={strokeWidth}
          color="currentColor"
        />
      ) : (
        // Legacy: Render SVG string
        // biome-ignore lint/security/noDangerouslySetInnerHtml: legacy support for string SVG icons
        <span dangerouslySetInnerHTML={{ __html: icon as string }} />
      )}
    </button>
  );
}
