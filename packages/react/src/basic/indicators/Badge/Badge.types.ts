import type React from "react";

/**
 * Badge density variants for different contexts
 */
export type BadgeDensity = "compact" | "normal" | "spacious";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to display inside the badge
   */
  children?: React.ReactNode;
  /**
   * The visual variant of the badge
   * @default "default"
   */
  variant?: "default" | "success" | "warning" | "error" | "info" | "subtle";
  /**
   * The size of the badge
   * @default "sm"
   */
  size?: "xs" | "sm" | "md";
  /**
   * Density variant for different contexts
   * @default "normal"
   */
  density?: BadgeDensity;
  /**
   * Whether the badge should have a pill shape
   * @default true
   */
  pill?: boolean;
}
