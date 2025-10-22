/**
 * SegmentedControl - Visual button group for selecting options
 *
 * A modern segmented control for selecting between multiple mutually exclusive options.
 * Following "The Spexop Way" with refined minimalism, borders before shadows,
 * and typography-driven hierarchy.
 *
 * Design Principles:
 * - Primitives before patterns: Simple button group composition
 * - Borders before shadows: Clean borders, no heavy shadows
 * - Typography before decoration: Font weight (600) for selected state
 * - Tokens before magic numbers: All values from theme system
 * - Accessibility before aesthetics: Full ARIA support and keyboard navigation
 *
 * Features:
 * - Visual button group design with clear selection state
 * - Optional icons from @spexop/icons
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - WCAG AA+ accessible (ARIA, focus management)
 * - Roving tabindex pattern for efficient navigation
 * - Individual option disable support
 * - Mobile-responsive with touch-friendly targets
 * - Theme-aware styling using design tokens
 * - TypeScript support with full type safety
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * import { SegmentedControl } from '@spexop/react';
 * import { Sun, Moon, Monitor } from '@spexop/icons';
 *
 * function ThemeSelector() {
 *   const [theme, setTheme] = useState('light');
 *
 *   return (
 *     <SegmentedControl
 *       value={theme}
 *       onChange={setTheme}
 *       options={[
 *         { value: 'light', label: 'Light', icon: <Sun size={16} /> },
 *         { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
 *         { value: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
 *       ]}
 *       aria-label="Theme selection"
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // View mode toggle
 * import { List, Grid, Table } from '@spexop/icons';
 *
 * <SegmentedControl
 *   value={viewMode}
 *   onChange={setViewMode}
 *   options={[
 *     { value: 'list', label: 'List', icon: <List size={16} /> },
 *     { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
 *     { value: 'table', label: 'Table', icon: <Table size={16} /> },
 *   ]}
 *   aria-label="View mode"
 * />
 * ```
 */

import { useId } from "react";
import styles from "./SegmentedControl.module.css";
import type { SegmentedControlProps } from "./SegmentedControl.types.js";
export function SegmentedControl({
  value,
  onChange,
  options,
  disabled = false,
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SegmentedControlProps) {
  const autoId = useId();
  const _id = providedId || autoId;

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    _currentIndex: number,
  ) => {
    const enabledOptions = options.filter((opt) => !opt.disabled);
    const currentOptionIndex = enabledOptions.findIndex(
      (opt) => opt.value === value,
    );

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        if (currentOptionIndex > 0) {
          onChange(enabledOptions[currentOptionIndex - 1].value);
        }
        break;

      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        if (currentOptionIndex < enabledOptions.length - 1) {
          onChange(enabledOptions[currentOptionIndex + 1].value);
        }
        break;

      case "Home":
        event.preventDefault();
        onChange(enabledOptions[0].value);
        break;

      case "End":
        event.preventDefault();
        onChange(enabledOptions[enabledOptions.length - 1].value);
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`${styles.control} ${disabled ? styles.disabled : ""} ${className || ""}`}
      data-disabled={disabled || undefined}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            className={`${styles.option} ${isSelected ? styles.selected : ""} ${
              isDisabled ? styles.optionDisabled : ""
            }`}
            onClick={() => !isDisabled && onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={isSelected ? 0 : -1}
          >
            {option.icon && (
              <span className={styles.icon} aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
