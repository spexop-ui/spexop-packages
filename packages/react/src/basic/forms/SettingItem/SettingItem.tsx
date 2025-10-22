import type React from "react";
import { useId } from "react";
import styles from "./SettingItem.module.css";

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

/**
 * SettingItem - Wrapper component for individual settings
 *
 * Provides consistent layout and styling for settings with:
 * - Label and description
 * - Proper spacing and alignment
 * - Disabled state styling
 * - Accessible label-control association
 *
 * @example
 * ```tsx
 * <SettingItem
 *   label="Theme"
 *   description="Choose your preferred color theme"
 * >
 *   <Select value={theme} onChange={setTheme}>
 *     <option value="light">Light</option>
 *     <option value="dark">Dark</option>
 *   </Select>
 * </SettingItem>
 * ```
 */
export function SettingItem({
  label,
  description,
  children,
  disabled = false,
  className,
  id: providedId,
}: SettingItemProps) {
  const autoId = useId();
  const id = providedId || autoId;

  return (
    <div
      className={`${styles.settingItem} ${disabled ? styles.disabled : ""} ${className || ""}`}
      data-disabled={disabled || undefined}
    >
      <div className={styles.labelContainer}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.control}>{children}</div>
    </div>
  );
}
