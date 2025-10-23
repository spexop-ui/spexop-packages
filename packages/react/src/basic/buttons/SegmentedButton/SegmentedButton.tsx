/**
 * SegmentedButton Component
 * Radio-style button group with exclusive selection
 *
 * @component SegmentedButton
 * @packageName @spexop/react
 * @description SegmentedButton component with keyboard navigation
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import { useCallback, useRef } from "react";
import styles from "./SegmentedButton.module.css";
import type { SegmentedButtonProps } from "./SegmentedButton.types.js";

/**
 * SegmentedButton component
 *
 * @example
 * ```tsx
 * const [view, setView] = useState('list');
 *
 * <SegmentedButton
 *   value={view}
 *   onChange={setView}
 *   options={[
 *     { value: 'list', label: 'List' },
 *     { value: 'grid', label: 'Grid' },
 *     { value: 'table', label: 'Table' }
 *   ]}
 *   aria-label="View mode"
 * />
 * ```
 */
export function SegmentedButton({
  value,
  onChange,
  options,
  size = "md",
  fullWidth = false,
  className = "",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SegmentedButtonProps) {
  const containerRef = useRef<HTMLFieldSetElement>(null);

  // Enhanced keyboard navigation with Home/End support
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFieldSetElement>) => {
      const { key } = event;

      // Handle arrow keys, Home, and End
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;

      event.preventDefault();

      const currentIndex = options.findIndex((opt) => opt.value === value);
      let nextIndex: number;

      if (key === "ArrowRight") {
        // Move to next option (wrap around)
        nextIndex = (currentIndex + 1) % options.length;
      } else if (key === "ArrowLeft") {
        // Move to previous option (wrap around)
        nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
      } else if (key === "Home") {
        // Move to first option
        nextIndex = 0;
      } else if (key === "End") {
        // Move to last option
        nextIndex = options.length - 1;
      } else {
        return;
      }

      // Skip disabled options
      while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
        if (key === "ArrowRight" || key === "Home") {
          nextIndex = (nextIndex + 1) % options.length;
        } else {
          nextIndex = nextIndex === 0 ? options.length - 1 : nextIndex - 1;
        }
      }

      if (!options[nextIndex]?.disabled) {
        onChange(options[nextIndex].value);
      }
    },
    [value, options, onChange],
  );

  // Compose className with size and fullWidth variants
  const containerClassName = [
    styles.segmentedButton,
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <fieldset
      ref={containerRef}
      className={containerClassName}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      onKeyDown={handleKeyDown}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: tabIndex required for keyboard navigation in radiogroup pattern
      tabIndex={0}
    >
      {options.map((option, index) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option["aria-label"] || option.label}
            aria-describedby={
              option.disabled ? `${option.value}-disabled` : undefined
            }
            disabled={option.disabled}
            className={`${styles.option} ${isActive ? styles.optionActive : ""} ${
              option.disabled ? styles.optionDisabled : ""
            }`}
            onClick={() => !option.disabled && onChange(option.value)}
            tabIndex={isActive ? 0 : -1}
            data-testid={`segmented-button-option-${option.value}`}
          >
            {option.icon && (
              <span className={styles.optionIcon} aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className={styles.optionLabel}>{option.label}</span>
            {option.disabled && (
              <span id={`${option.value}-disabled`} className="sr-only">
                This option is currently disabled
              </span>
            )}
          </button>
        );
      })}
    </fieldset>
  );
}
