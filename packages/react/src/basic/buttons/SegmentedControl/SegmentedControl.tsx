/**
 * SegmentedControl - Enhanced visual button group for selecting options
 *
 * A modern segmented control for selecting between multiple mutually exclusive options.
 * Following "The Spexop Way" with refined minimalism, borders before shadows,
 * and typography-driven hierarchy. Enhanced with modern UI/UX patterns.
 *
 * Design Principles:
 * - Primitives before patterns: Simple button group composition
 * - Borders before shadows: Clean 2-3px borders with subtle elevation
 * - Typography before decoration: Font weight (600/700) for selected state
 * - Tokens before magic numbers: All values from theme system
 * - Accessibility before aesthetics: Full ARIA support and keyboard navigation
 * - Composition before complexity: Built from simple, reusable parts
 * - Standards before frameworks: Web platform fundamentals
 *
 * Modern UI/UX Enhancements:
 * - Smooth micro-interactions with spring animations
 * - Enhanced visual hierarchy with better contrast
 * - Improved focus states and accessibility
 * - Modern border-radius and spacing
 * - Better mobile touch targets
 * - Subtle elevation and depth
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
 * // View mode toggle with enhanced interactions
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

import { useCallback, useEffect, useId, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced keyboard navigation with better UX
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
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
          if (enabledOptions.length > 0) {
            onChange(enabledOptions[0].value);
          }
          break;

        case "End":
          event.preventDefault();
          if (enabledOptions.length > 0) {
            onChange(enabledOptions[enabledOptions.length - 1].value);
          }
          break;

        case "Enter":
        case " ":
          event.preventDefault();
          // Selection is already handled by onClick
          break;
      }
    },
    [options, value, onChange],
  );

  // Enhanced click handler with better feedback
  const handleOptionClick = useCallback(
    (optionValue: string, isDisabled: boolean) => {
      if (!isDisabled && optionValue !== value) {
        onChange(optionValue);
      }
    },
    [value, onChange],
  );

  // Focus management for better accessibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.getAttribute("role") === "radio") {
        // Ensure the focused option is announced
        target.setAttribute("aria-live", "polite");
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.getAttribute("role") === "radio") {
        target.removeAttribute("aria-live");
      }
    };

    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`${styles.control} ${disabled ? styles.disabled : ""} ${className || ""}`}
      data-disabled={disabled || undefined}
      data-testid="segmented-control"
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
            aria-disabled={isDisabled}
            disabled={isDisabled}
            className={`${styles.option} ${isSelected ? styles.selected : ""} ${
              isDisabled ? styles.optionDisabled : ""
            }`}
            onClick={() => handleOptionClick(option.value, !!isDisabled)}
            onKeyDown={handleKeyDown}
            tabIndex={isSelected ? 0 : -1}
            data-testid={`segmented-control-option-${option.value}`}
            aria-describedby={
              option.disabled ? `${_id}-${option.value}-disabled` : undefined
            }
          >
            {option.icon && (
              <span className={styles.icon} aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span className={styles.label}>{option.label}</span>
            {option.disabled && (
              <span id={`${_id}-${option.value}-disabled`} className="sr-only">
                This option is currently unavailable
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
