import type { ReactNode } from "react";

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
