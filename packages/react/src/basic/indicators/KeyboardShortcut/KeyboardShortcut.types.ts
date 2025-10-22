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
