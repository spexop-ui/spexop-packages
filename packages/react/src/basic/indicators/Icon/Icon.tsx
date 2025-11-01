import type { ReactNode } from "react";
import styles from "./Icon.module.css";
import { ICON_MAP } from "./iconMaps.js";

export interface IconProps {
  /**
   * Icon name from @spexop/icons or custom ReactNode
   */
  name?: string;
  /**
   * Custom ReactNode icon (takes precedence over name)
   */
  children?: ReactNode;
  /**
   * Size of the icon
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Wrapper shape
   * @default "none"
   */
  wrapper?: "none" | "circle" | "square" | "rounded";
  /**
   * Visual variant for emphasis
   * @default "default"
   */
  variant?: "default" | "filled" | "outlined" | "soft" | "ghost";
  /**
   * Color variant
   * @default "default"
   */
  color?: "default" | "primary" | "success" | "error" | "warning" | "info";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Icon component that supports @spexop/icons by name or custom icons
 *
 * Features:
 * - Support for @spexop/icons icon names
 * - Custom icon support via children
 * - Multiple sizes using design tokens
 * - Wrapper shapes (circle, square, rounded)
 * - Visual variants (filled, outlined, soft, ghost)
 * - Color variants (primary, success, error, warning, info)
 * - Theme-aware styling
 */
export function Icon({
  name,
  children,
  size = "md",
  wrapper = "none",
  variant = "default",
  color = "default",
  className,
}: IconProps) {
  const iconClasses = [
    styles.icon,
    styles[size],
    wrapper !== "none" && styles[`wrapper-${wrapper}`],
    variant !== "default" && styles[`variant-${variant}`],
    color !== "default" && styles[`color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Size mapping for icon components
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  // If children are provided, render them directly
  if (children) {
    return <span className={iconClasses}>{children}</span>;
  }

  // If name is provided, look it up in the icon map
  if (name) {
    const IconComponent = ICON_MAP[name];

    if (IconComponent) {
      return (
        <span className={iconClasses} role="img" aria-label={`${name} icon`}>
          <IconComponent
            size={sizeMap[size]}
            strokeWidth={1.5}
            color="currentColor"
          />
        </span>
      );
    }

    // Debug: Log missing icons in development
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Icon] Icon "${name}" not found in ICON_MAP. Available keys:`,
        Object.keys(ICON_MAP).slice(0, 20).join(", "),
        "...",
      );
    }
  }

  // Fallback for unknown icon names
  return (
    <span className={iconClasses} title={`Unknown icon: ${name || "none"}`}>
      ?
    </span>
  );
}
