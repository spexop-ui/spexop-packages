import { Check, ChevronDown } from "@spexop/icons";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select density variants for different contexts
 */
export type SelectDensity = "compact" | "normal" | "spacious";

export interface SelectProps {
  /**
   * Current selected value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Available options
   */
  options: SelectOption[];

  /**
   * Whether the select is disabled
   */
  disabled?: boolean;

  /**
   * Whether the select is required
   */
  required?: boolean;

  /**
   * Placeholder text when no value selected
   */
  placeholder?: string;

  /**
   * Density variant for different contexts
   * - compact: Dashboard context (tighter spacing)
   * - normal: Default (balanced spacing)
   * - spacious: Blog/Content context (generous spacing)
   * @default "normal"
   */
  density?: SelectDensity;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the select element
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
 * Select - Custom dropdown select component
 *
 * Modern select with:
 * - Custom styling (no native select appearance)
 * - Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
 * - Click outside to close
 * - Smooth animations
 * - Full accessibility (ARIA, focus management)
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * <Select
 *   value={theme}
 *   onChange={setTheme}
 *   options={[
 *     { value: 'light', label: 'Light' },
 *     { value: 'dark', label: 'Dark' },
 *     { value: 'auto', label: 'Auto' },
 *   ]}
 *   aria-label="Theme selection"
 * />
 * ```
 */
export function Select({
  value,
  onChange,
  options,
  disabled = false,
  required = false,
  placeholder = "Select...",
  density = "normal",
  className,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const id = providedId || autoId;

  // Find selected option
  const selectedOption = options.find((opt) => opt.value === value);
  const selectedLabel = selectedOption?.label || placeholder;

  // Filter enabled options for keyboard navigation
  const enabledOptions = options.filter((opt) => !opt.disabled);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            enabledOptions.findIndex((opt) => opt.value === value),
          );
        } else if (focusedIndex >= 0) {
          onChange(enabledOptions[focusedIndex].value);
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            enabledOptions.findIndex((opt) => opt.value === value),
          );
        } else {
          setFocusedIndex((prev) =>
            prev < enabledOptions.length - 1 ? prev + 1 : prev,
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(
            enabledOptions.findIndex((opt) => opt.value === value),
          );
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;

      case "Home":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(0);
        }
        break;

      case "End":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(enabledOptions.length - 1);
        }
        break;

      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  };

  // Toggle dropdown
  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      setIsOpen(true);
      setFocusedIndex(enabledOptions.findIndex((opt) => opt.value === value));
    } else {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  // Select option
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

  return (
    <div
      ref={selectRef}
      className={`${styles.select} ${styles[`density${density.charAt(0).toUpperCase()}${density.slice(1)}`] || ""} ${isOpen ? styles.open : ""} ${
        disabled ? styles.disabled : ""
      } ${className || ""}`}
      data-disabled={disabled || undefined}
    >
      <button
        type="button"
        id={id}
        className={styles.trigger}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        <span className={styles.value}>{selectedLabel}</span>
        <ChevronDown
          className={styles.chevron}
          size={16}
          strokeWidth={2}
          color="currentColor"
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          role="listbox"
          aria-labelledby={id}
          tabIndex={-1}
        >
          {options.map((option) => {
            const enabledIndex = enabledOptions.findIndex(
              (opt) => opt.value === option.value,
            );
            const isFocused = enabledIndex === focusedIndex;
            const isSelected = option.value === value;

            return (
              <div
                key={option.value}
                className={`${styles.option} ${isSelected ? styles.selected : ""} ${
                  isFocused ? styles.focused : ""
                } ${option.disabled ? styles.optionDisabled : ""}`}
                role="option"
                tabIndex={option.disabled ? -1 : 0}
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    !option.disabled && handleSelect(option.value);
                  }
                }}
                onMouseEnter={() =>
                  !option.disabled && setFocusedIndex(enabledIndex)
                }
              >
                {option.label}
                {isSelected && (
                  <Check
                    className={styles.checkmark}
                    size={16}
                    strokeWidth={2}
                    color="currentColor"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
