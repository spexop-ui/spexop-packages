/**
 * Checkbox Component - Refined Minimalism
 *
 * Border-based checkbox design with density variants.
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 1.0.0
 * @since 2025-10-15
 * @packageName @spexop/react
 * @description Border-based checkbox design with density variants.
 * @example
 * ```tsx
 * <Checkbox
 *   checked={accepted}
 *   onChange={setAccepted}
 *   label="I accept the terms"
 * />
 * ```
 */

import { Check } from "@spexop/icons";
import type React from "react";
import { useId } from "react";
import styles from "./Checkbox.module.css";

/**
 * Checkbox density variants for different contexts
 */
export type CheckboxDensity = "compact" | "normal" | "spacious";

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;

  /**
   * Change handler
   */
  onChange: (checked: boolean) => void;

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is required
   */
  required?: boolean;

  /**
   * Density variant for different contexts
   * - compact: Dashboard context (smaller checkbox)
   * - normal: Default (balanced sizing)
   * - spacious: Blog/Content context (larger checkbox)
   * @default "normal"
   */
  density?: CheckboxDensity;

  /**
   * Optional label
   */
  label?: string;

  /**
   * Optional description text
   */
  description?: string;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the checkbox element
   */
  id?: string;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby for accessibility
   */
  "aria-labelledby"?: string;
}

/**
 * Checkbox - Clean checkbox component
 *
 * Features:
 * - Border-based design (Refined Minimalism)
 * - Smooth animations
 * - Keyboard accessible (Space, Enter)
 * - Theme-aware styling
 * - Disabled state
 * - Optional label and description
 * - WCAG 2.2 AA compliant
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={accepted}
 *   onChange={setAccepted}
 *   label="I accept the terms"
 * />
 * ```
 */
export function Checkbox({
  checked,
  onChange,
  disabled = false,
  required = false,
  density = "normal",
  label,
  description,
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: CheckboxProps) {
  const autoId = useId();
  const id = providedId || autoId;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onChange(!checked);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(event.target.checked);
  };

  return (
    <div
      className={`${styles.checkboxContainer} ${styles[`density${density.charAt(0).toUpperCase()}${density.slice(1)}`] || ""} ${disabled ? styles.disabled : ""} ${className || ""}`}
    >
      <label htmlFor={id} className={styles.label}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={styles.input}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={description ? `${id}-desc` : undefined}
        />
        <span className={`${styles.checkbox} ${checked ? styles.checked : ""}`}>
          {checked && (
            <Check
              className={styles.checkmark}
              strokeWidth={2}
              size={16}
              color="currentColor"
            />
          )}
        </span>
        {(label || description) && (
          <span className={styles.content}>
            {label && (
              <span className={styles.labelText}>
                {label}
                {required && (
                  <span
                    className={styles.requiredIndicator}
                    aria-label="required"
                  >
                    *
                  </span>
                )}
              </span>
            )}
            {description && (
              <span id={`${id}-desc`} className={styles.description}>
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
}
