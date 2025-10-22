import type { ComponentType, MouseEvent } from "react";

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
  /** Type attribute */
  type?: "button" | "submit" | "reset";
  /** Custom stroke width for icon */
  strokeWidth?: number;
}
