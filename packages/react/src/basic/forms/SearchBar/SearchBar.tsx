/**
 * SearchBar - Reusable search input component
 *
 * A search bar with platform-specific keyboard shortcuts and icon.
 * Used in AppBar and potentially other search contexts.
 *
 * @example
 * ```tsx
 * import { SearchBar } from '@spexop/react';
 *
 * <SearchBar
 *   placeholder="Search"
 *   onSearch={() => openCommandPalette()}
 *   variant="compact"
 * />
 * ```
 */

import { Search } from "@spexop/icons";
import { useEffect, useState } from "react";
import { KeyboardShortcut } from "../../indicators/KeyboardShortcut/index.js";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Search callback - called on form submit */
  onSearch?: (query: string) => void;
  /** Click callback - for opening command palette */
  onClick?: () => void;
  /** Change callback - for real-time search */
  onChange?: (query: string) => void;
  /** Current search value (controlled) */
  value?: string;
  /** Visual variant */
  variant?: "compact" | "full";
  /** Show keyboard shortcut */
  showShortcut?: boolean;
  /** Custom keyboard shortcut (auto-detects if not provided) */
  shortcut?: string;
  /** Make input read-only (for command palette trigger) */
  readOnly?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Detect the user's operating system for keyboard shortcut display
 */
function getPlatform(): "mac" | "windows" | "linux" {
  if (typeof window === "undefined") return "windows"; // SSR fallback

  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("mac")) return "mac";
  if (userAgent.includes("linux")) return "linux";
  return "windows";
}

/**
 * Get the appropriate keyboard shortcut text based on platform
 */
function getKeyboardShortcut(platform: "mac" | "windows" | "linux"): string {
  switch (platform) {
    case "mac":
      return "⌘K";
    case "windows":
      return "Ctrl+K";
    case "linux":
      return "Ctrl+K";
    default:
      return "Ctrl+K";
  }
}

/**
 * SearchBar Component
 * Search input with platform-specific keyboard shortcuts
 */
export function SearchBar({
  placeholder = "Search",
  onSearch,
  onClick,
  onChange,
  value,
  variant = "compact",
  showShortcut = true,
  shortcut,
  readOnly = false,
  className = "",
}: SearchBarProps) {
  const [platform, setPlatform] = useState<"mac" | "windows" | "linux">(
    "windows",
  );
  const [internalValue, setInternalValue] = useState("");

  // Detect platform on mount
  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const keyboardShortcut = shortcut || getKeyboardShortcut(platform);
  const currentValue = value !== undefined ? value : internalValue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(currentValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleInputClick = () => {
    if (readOnly) {
      onClick?.();
    }
  };

  return (
    <form
      className={`${styles.searchBar} ${styles[variant]} ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <button type="submit" className={styles.searchIcon} aria-label="Search">
        <Search strokeWidth={1} size={20} color="currentColor" />
      </button>
      <input
        type="search"
        className={styles.searchInput}
        placeholder={placeholder}
        aria-label={placeholder}
        value={currentValue}
        onChange={handleChange}
        onClick={handleInputClick}
        readOnly={readOnly}
      />
      {showShortcut && (
        <KeyboardShortcut size="sm">{keyboardShortcut}</KeyboardShortcut>
      )}
    </form>
  );
}
