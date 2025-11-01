/**
 * Theme Mode Utilities
 *
 * Utility functions for managing theme mode (light/dark/auto) without providers.
 * These functions handle localStorage, system preference detection, and DOM manipulation.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Available theme modes
 */
export type ThemeMode = "light" | "dark" | "auto";

/**
 * Resolved theme mode (after system preference resolution)
 */
export type ResolvedThemeMode = "light" | "dark";

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULTS = {
  MODE: "auto" as ThemeMode,
  STORAGE_KEY: "spexop-theme-mode",
  THEME_ATTRIBUTE: "data-theme",
} as const;

const SYSTEM_MODE_QUERY = "(prefers-color-scheme: dark)" as const;

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

/**
 * Get stored theme mode from localStorage
 *
 * @param storageKey - localStorage key to read from
 * @returns Stored theme mode or null if not found/invalid
 *
 * @example
 * ```ts
 * const mode = getStoredMode("my-theme-mode");
 * // Returns "light" | "dark" | "auto" | null
 * ```
 */
export function getStoredMode(
  storageKey: string = DEFAULTS.STORAGE_KEY,
): ThemeMode | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(storageKey);
    if (
      stored &&
      (stored === "light" || stored === "dark" || stored === "auto")
    ) {
      return stored as ThemeMode;
    }
    return null;
  } catch (error) {
    console.warn("Failed to read mode from localStorage:", error);
    return null;
  }
}

/**
 * Save theme mode to localStorage
 *
 * @param mode - Theme mode to save
 * @param storageKey - localStorage key to save to
 *
 * @example
 * ```ts
 * setStoredMode("dark", "my-theme-mode");
 * ```
 */
export function setStoredMode(
  mode: ThemeMode,
  storageKey: string = DEFAULTS.STORAGE_KEY,
): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, mode);
  } catch (error) {
    console.warn("Failed to save mode to localStorage:", error);
  }
}

// ============================================================================
// SYSTEM PREFERENCE UTILITIES
// ============================================================================

/**
 * Get system's preferred theme mode from prefers-color-scheme
 *
 * @returns System's preferred mode ("light" or "dark")
 *
 * @example
 * ```ts
 * const systemMode = getSystemMode();
 * // Returns "light" | "dark"
 * ```
 */
export function getSystemMode(): ResolvedThemeMode {
  if (typeof window === "undefined") return "light";

  try {
    const prefersDark = window.matchMedia(SYSTEM_MODE_QUERY).matches;
    return prefersDark ? "dark" : "light";
  } catch (error) {
    console.warn("Failed to detect system mode:", error);
    return "light";
  }
}

/**
 * Resolve theme mode (convert "auto" to actual system mode)
 *
 * @param mode - Theme mode setting ("light" | "dark" | "auto")
 * @param systemMode - Current system preference
 * @returns Resolved mode ("light" or "dark")
 *
 * @example
 * ```ts
 * const resolved = resolveMode("auto", "dark");
 * // Returns "dark"
 *
 * const resolved = resolveMode("light", "dark");
 * // Returns "light"
 * ```
 */
export function resolveMode(
  mode: ThemeMode,
  systemMode: ResolvedThemeMode,
): ResolvedThemeMode {
  return mode === "auto" ? systemMode : mode;
}

// ============================================================================
// DOM MANIPULATION UTILITIES
// ============================================================================

/**
 * Apply theme mode to document element
 *
 * Sets the `data-theme` attribute on `document.documentElement`
 * to enable CSS-based theme switching.
 *
 * @param resolvedMode - Resolved theme mode ("light" or "dark")
 * @param attribute - Attribute name to set (default: "data-theme")
 *
 * @example
 * ```ts
 * applyModeToDocument("dark");
 * // Sets document.documentElement.setAttribute("data-theme", "dark")
 * ```
 */
export function applyModeToDocument(
  resolvedMode: ResolvedThemeMode,
  attribute: string = DEFAULTS.THEME_ATTRIBUTE,
): void {
  if (typeof document === "undefined") return;

  try {
    document.documentElement.setAttribute(attribute, resolvedMode);
  } catch (error) {
    console.warn("Failed to apply mode to document:", error);
  }
}

// ============================================================================
// INITIALIZATION UTILITIES
// ============================================================================

/**
 * Initialize theme mode from storage or default
 *
 * @param defaultMode - Default mode if no stored preference
 * @param storageKey - localStorage key to check
 * @param disableStorage - Skip localStorage check
 * @returns Initial theme mode
 *
 * @example
 * ```ts
 * const mode = initializeMode("auto", "my-theme-mode");
 * // Returns stored mode or "auto"
 * ```
 */
export function initializeMode(
  defaultMode: ThemeMode = DEFAULTS.MODE,
  storageKey: string = DEFAULTS.STORAGE_KEY,
  disableStorage = false,
): ThemeMode {
  if (disableStorage || typeof window === "undefined") {
    return defaultMode;
  }

  const stored = getStoredMode(storageKey);
  return stored ?? defaultMode;
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * Theme utility configuration
 */
export interface ThemeUtilConfig {
  /** Initial theme mode */
  mode?: ThemeMode;
  /** Default mode on first load */
  defaultMode?: ThemeMode;
  /** Disable system preference detection */
  disableSystemMode?: boolean;
  /** localStorage key for mode persistence */
  storageKey?: string;
  /** Disable localStorage persistence */
  disableStorage?: boolean;
  /** Force a specific mode (overrides all settings) */
  forcedMode?: ResolvedThemeMode;
}

/**
 * Theme utility return value
 */
export interface ThemeUtilReturn {
  /** Current mode setting ('light' | 'dark' | 'auto') */
  mode: ThemeMode;
  /** Actual resolved mode being displayed */
  resolvedMode: ResolvedThemeMode;
  /** System's preferred mode from prefers-color-scheme */
  systemMode: ResolvedThemeMode;
  /** Change the mode setting */
  setMode: (mode: ThemeMode) => void;
  /** Whether theme is being initialized (prevents flash) */
  isInitializing: boolean;
}

/**
 * useThemeUtil Hook
 * Provider-free theme mode management utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { mode, setMode, resolvedMode } = useThemeUtil({
 *     defaultMode: "auto",
 *     storageKey: "my-theme-mode",
 *   });
 *
 *   return (
 *     <button onClick={() => setMode(resolvedMode === "light" ? "dark" : "light")}>
 *       Toggle Theme
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeUtil(config?: ThemeUtilConfig): ThemeUtilReturn {
  const {
    mode: controlledMode,
    defaultMode = DEFAULTS.MODE,
    disableSystemMode = false,
    storageKey = DEFAULTS.STORAGE_KEY,
    disableStorage = false,
    forcedMode,
  } = config || {};

  // State
  const [systemMode, setSystemModeState] = useState<ResolvedThemeMode>(() =>
    disableSystemMode ? "light" : getSystemMode(),
  );

  const [mode, setModeState] = useState<ThemeMode>(() => {
    // If mode is controlled, use it
    if (controlledMode) return controlledMode;

    // Check localStorage
    if (!disableStorage && typeof window !== "undefined") {
      const stored = getStoredMode(storageKey);
      if (stored) return stored;
    }

    return defaultMode;
  });

  const [isInitializing, setIsInitializing] = useState(true);

  // Resolved mode
  const resolvedMode: ResolvedThemeMode =
    forcedMode || resolveMode(mode, systemMode);

  // Set mode
  const setMode = useCallback(
    (newMode: ThemeMode) => {
      if (controlledMode) {
        console.warn("ThemeUtil: Cannot change mode when controlled by parent");
        return;
      }

      setModeState(newMode);
      if (!disableStorage) {
        setStoredMode(newMode, storageKey);
      }
    },
    [controlledMode, disableStorage, storageKey],
  );

  // Listen for system mode changes
  useEffect(() => {
    if (disableSystemMode) return;

    const mediaQuery = window.matchMedia(SYSTEM_MODE_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemModeState(e.matches ? "dark" : "light");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browser support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [disableSystemMode]);

  // Apply mode to document
  useEffect(() => {
    applyModeToDocument(resolvedMode);
  }, [resolvedMode]);

  // Mark initialization complete
  useEffect(() => {
    setIsInitializing(false);
  }, []);

  // Update controlled mode
  useEffect(() => {
    if (controlledMode) {
      setModeState(controlledMode);
    }
  }, [controlledMode]);

  return {
    mode,
    resolvedMode,
    systemMode,
    setMode,
    isInitializing,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export { DEFAULTS, SYSTEM_MODE_QUERY };
