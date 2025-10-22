/**
 * KeyboardShortcut - Keyboard shortcut display component
 *
 * Displays keyboard shortcuts with platform-specific formatting.
 * Auto-detects platform (Mac/Windows/Linux) and shows appropriate keys.
 *
 * @example
 * ```tsx
 * import { KeyboardShortcut } from '@spexop/react';
 *
 * <KeyboardShortcut keys={["cmd", "k"]} />
 * // or
 * <KeyboardShortcut shortcut="search" />
 * ```
 */

import { useEffect, useState } from "react";
import styles from "./KeyboardShortcut.module.css";

export interface KeyboardShortcutProps {
  /** Array of keys (e.g., ["cmd", "k"] or ["ctrl", "shift", "p"]) */
  keys?: string[];
  /** Predefined shortcut name (auto-detects platform) */
  shortcut?: "search" | "command-palette" | "settings";
  /** Raw text to display (e.g., "⌘K" or "Ctrl+K") - bypasses formatting */
  children?: string;
  /** Size variant */
  size?: "sm" | "md";
  /** Additional CSS class */
  className?: string;
}

/**
 * Detect the user's operating system
 */
function getPlatform(): "mac" | "windows" | "linux" {
  if (typeof window === "undefined") return "windows";

  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("mac")) return "mac";
  if (userAgent.includes("linux")) return "linux";
  return "windows";
}

/**
 * Get platform-specific keys for predefined shortcuts
 */
function getShortcutKeys(
  shortcut: string,
  platform: "mac" | "windows" | "linux",
): string[] {
  const shortcuts: Record<string, Record<string, string[]>> = {
    search: {
      mac: ["⌘", "K"],
      windows: ["Ctrl", "K"],
      linux: ["Ctrl", "K"],
    },
    "command-palette": {
      mac: ["⌘", "K"],
      windows: ["Ctrl", "K"],
      linux: ["Ctrl", "K"],
    },
    settings: {
      mac: ["⌘", ","],
      windows: ["Ctrl", ","],
      linux: ["Ctrl", ","],
    },
  };

  return shortcuts[shortcut]?.[platform] || [];
}

/**
 * Format key for display (converts cmd to ⌘ on Mac, etc.)
 */
function formatKey(key: string, platform: "mac" | "windows" | "linux"): string {
  const keyMap: Record<string, Record<string, string>> = {
    cmd: { mac: "⌘", windows: "Ctrl", linux: "Ctrl" },
    ctrl: { mac: "⌃", windows: "Ctrl", linux: "Ctrl" },
    alt: { mac: "⌥", windows: "Alt", linux: "Alt" },
    shift: { mac: "⇧", windows: "Shift", linux: "Shift" },
    enter: { mac: "↵", windows: "Enter", linux: "Enter" },
    backspace: { mac: "⌫", windows: "Backspace", linux: "Backspace" },
    delete: { mac: "⌦", windows: "Delete", linux: "Delete" },
    escape: { mac: "⎋", windows: "Esc", linux: "Esc" },
    tab: { mac: "⇥", windows: "Tab", linux: "Tab" },
  };

  const lowerKey = key.toLowerCase();
  return keyMap[lowerKey]?.[platform] || key;
}

/**
 * KeyboardShortcut Component
 * Displays keyboard shortcuts with platform-specific formatting
 */
export function KeyboardShortcut({
  keys,
  shortcut,
  children,
  size = "md",
  className = "",
}: KeyboardShortcutProps) {
  const [platform, setPlatform] = useState<"mac" | "windows" | "linux">(
    "windows",
  );

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  // If children is provided, use it as-is (raw text)
  if (children) {
    return (
      <kbd
        className={`${styles.keyboardShortcut} ${styles[size]} ${className}`}
      >
        {children}
      </kbd>
    );
  }

  // Determine which keys to display
  const displayKeys = shortcut
    ? getShortcutKeys(shortcut, platform)
    : keys?.map((key) => formatKey(key, platform)) || [];

  if (displayKeys.length === 0) return null;

  return (
    <kbd className={`${styles.keyboardShortcut} ${styles[size]} ${className}`}>
      {displayKeys.map((key, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: key order is stable and keys may repeat
        <span key={`${key}-${index}`}>
          {key}
          {index < displayKeys.length - 1 && (
            <span className={styles.separator}>+</span>
          )}
        </span>
      ))}
    </kbd>
  );
}
