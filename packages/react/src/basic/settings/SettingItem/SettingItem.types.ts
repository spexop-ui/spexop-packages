import type React from "react";

export interface SettingItemProps {
  /**
   * Label for the setting
   */
  label: string;

  /**
   * Optional description/help text
   */
  description?: string;

  /**
   * The control element (Select, Toggle, etc.)
   */
  children?: React.ReactNode;

  /**
   * Whether the setting is disabled
   */
  disabled?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the control element (auto-generated if not provided)
   */
  id?: string;
}
