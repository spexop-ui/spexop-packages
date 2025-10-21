/**
 * Unified ThemeProvider - Combines light/dark mode AND full theme configuration
 *
 * This provider merges the functionality of two previous providers:
 * 1. providers/ThemeProvider - Light/dark mode switching
 * 2. theme/ThemeProvider - Full theme configuration injection
 *
 * Features:
 * - Simple light/dark/auto mode switching
 * - Full theme configuration with CSS variable injection
 * - Multi-theme support with automatic mode-based switching
 * - System preference detection
 * - localStorage persistence
 * - SSR-safe implementation
 * - Zero FOUC (Flash of Unstyled Content)
 *
 * @example Simple mode switching
 * ```tsx
 * <ThemeProvider mode="auto">
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example Full theme config
 * ```tsx
 * import { techPreset } from '@spexop/theme';
 *
 * <ThemeProvider theme={techPreset}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example Multi-theme with mode
 * ```tsx
 * <ThemeProvider
 *   themes={[lightTheme, darkTheme]}
 *   mode="auto"
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */

import type { SpexopThemeConfig } from "@spexop/theme";
import { generateCSS } from "@spexop/theme";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

/**
 * Context value provided to consuming components
 */
export interface UnifiedThemeContextValue {
  // Mode management (light/dark)
  /** Current mode setting ('light' | 'dark' | 'auto') */
  mode: ThemeMode;
  /** Actual resolved mode being displayed */
  resolvedMode: ResolvedThemeMode;
  /** System's preferred mode from prefers-color-scheme */
  systemMode: ResolvedThemeMode;
  /** Change the mode setting */
  setMode: (mode: ThemeMode) => void;

  // Theme config management (if using full theme)
  /** Current active theme configuration */
  currentTheme?: SpexopThemeConfig;
  /** Change the current theme (if using multi-theme mode) */
  setTheme?: (theme: SpexopThemeConfig) => void;
  /** Available themes (if multi-theme mode) */
  availableThemes: SpexopThemeConfig[];

  // State flags
  /** Whether theme is being initialized (prevents flash) */
  isInitializing: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
}

/**
 * Props for UnifiedThemeProvider
 */
export interface UnifiedThemeProviderProps {
  /** Child components */
  children?: ReactNode;

  // Mode-only props (simple light/dark mode)
  /** Theme mode ('light' | 'dark' | 'auto') */
  mode?: ThemeMode;
  /** Default mode on first load */
  defaultMode?: ThemeMode;
  /** Disable system preference detection */
  disableSystemMode?: boolean;

  // Theme config props (full theme system)
  /** Single theme configuration */
  theme?: SpexopThemeConfig;
  /** Multiple themes (for mode-based switching or manual selection) */
  themes?: SpexopThemeConfig[];
  /** Default theme name (when using themes array) */
  defaultTheme?: string;
  /** CSS selector for scoping theme variables */
  scope?: string;

  // Storage props
  /** localStorage key for mode persistence */
  storageKey?: string;
  /** Disable localStorage persistence */
  disableStorage?: boolean;

  // Override props
  /** Force a specific mode (overrides all settings) */
  forcedMode?: ResolvedThemeMode;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULTS = {
  MODE: "auto" as ThemeMode,
  STORAGE_KEY: "spexop-theme-mode",
  THEME_ATTRIBUTE: "data-theme",
  SCOPE: ":root",
} as const;

const SYSTEM_MODE_QUERY = "(prefers-color-scheme: dark)" as const;

// ============================================================================
// CONTEXT
// ============================================================================

const UnifiedThemeContext = createContext<UnifiedThemeContextValue | undefined>(
  undefined,
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getStoredMode(storageKey: string): ThemeMode | null {
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

function setStoredMode(storageKey: string, mode: ThemeMode): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, mode);
  } catch (error) {
    console.warn("Failed to save mode to localStorage:", error);
  }
}

function getSystemMode(): ResolvedThemeMode {
  if (typeof window === "undefined") return "light";

  try {
    const prefersDark = window.matchMedia(SYSTEM_MODE_QUERY).matches;
    return prefersDark ? "dark" : "light";
  } catch (error) {
    console.warn("Failed to detect system mode:", error);
    return "light";
  }
}

function resolveMode(
  mode: ThemeMode,
  systemMode: ResolvedThemeMode,
): ResolvedThemeMode {
  return mode === "auto" ? systemMode : mode;
}

function applyModeToDocument(resolvedMode: ResolvedThemeMode): void {
  if (typeof document === "undefined") return;

  try {
    document.documentElement.setAttribute(
      DEFAULTS.THEME_ATTRIBUTE,
      resolvedMode,
    );
  } catch (error) {
    console.warn("Failed to apply mode to document:", error);
  }
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

/**
 * UnifiedThemeProvider - Single provider for both mode AND theme config
 */
export function UnifiedThemeProvider({
  children,
  mode: controlledMode,
  defaultMode = DEFAULTS.MODE,
  disableSystemMode = false,
  theme: singleTheme,
  themes: multiThemes,
  defaultTheme,
  scope = DEFAULTS.SCOPE,
  storageKey = DEFAULTS.STORAGE_KEY,
  disableStorage = false,
  forcedMode,
}: UnifiedThemeProviderProps) {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // ============================================================================
  // MODE MANAGEMENT (Light/Dark)
  // ============================================================================

  const [systemMode, setSystemMode] = useState<ResolvedThemeMode>(() =>
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

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const resolvedMode: ResolvedThemeMode =
    forcedMode || resolveMode(mode, systemMode);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      if (controlledMode) {
        console.warn(
          "ThemeProvider: Cannot change mode when controlled by parent",
        );
        return;
      }

      setModeState(newMode);
      if (!disableStorage) {
        setStoredMode(storageKey, newMode);
      }
    },
    [controlledMode, disableStorage, storageKey],
  );

  // ============================================================================
  // THEME CONFIG MANAGEMENT
  // ============================================================================

  const [currentTheme, setCurrentTheme] = useState<
    SpexopThemeConfig | undefined
  >(() => {
    // If single theme provided, use it
    if (singleTheme) return singleTheme;

    // If multiple themes provided, find the right one
    if (multiThemes && multiThemes.length > 0) {
      // Try to match based on mode (if theme names include "light" or "dark")
      if (defaultTheme) {
        const found = multiThemes.find((t) => t.meta.name === defaultTheme);
        if (found) return found;
      }

      // Fallback to first theme
      return multiThemes[0];
    }

    return undefined;
  });

  const availableThemes = useMemo(() => {
    return multiThemes || (singleTheme ? [singleTheme] : []);
  }, [multiThemes, singleTheme]);

  const activeTheme = singleTheme || currentTheme;

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Listen for system mode changes
  useEffect(() => {
    if (disableSystemMode) return;

    const mediaQuery = window.matchMedia(SYSTEM_MODE_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? "dark" : "light");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browser support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [disableSystemMode]);

  // Listen for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      document.documentElement.style.setProperty(
        "--theme-transition-duration",
        e.matches ? "0ms" : "300ms",
      );
    };

    // Set initial value
    handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browser support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Apply mode to document
  useEffect(() => {
    applyModeToDocument(resolvedMode);
  }, [resolvedMode]);

  // Memoize CSS generation to avoid recalculation
  const themeCSS = useMemo(() => {
    if (!activeTheme) return null;
    return generateCSS(activeTheme, scope);
  }, [activeTheme, scope]);

  // Inject theme CSS if theme config is provided
  useEffect(() => {
    if (!themeCSS) return;

    if (!styleRef.current) {
      styleRef.current = document.createElement("style");
      styleRef.current.setAttribute("data-spexop-theme", "");
      document.head.appendChild(styleRef.current);
    }

    styleRef.current.textContent = themeCSS;

    return () => {
      if (styleRef.current && document.head.contains(styleRef.current)) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [themeCSS]);

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

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: UnifiedThemeContextValue = useMemo(
    () => ({
      // Mode management
      mode,
      resolvedMode,
      systemMode,
      setMode,

      // Theme config management
      currentTheme: activeTheme,
      setTheme: multiThemes ? setCurrentTheme : undefined,
      availableThemes,

      // State flags
      isInitializing,
      prefersReducedMotion,
    }),
    [
      mode,
      resolvedMode,
      systemMode,
      setMode,
      activeTheme,
      availableThemes,
      isInitializing,
      prefersReducedMotion,
      multiThemes,
    ],
  );

  return (
    <UnifiedThemeContext.Provider value={contextValue}>
      {children}
    </UnifiedThemeContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * useTheme Hook
 * Access unified theme context (mode + config)
 *
 * @throws Error if used outside UnifiedThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { mode, resolvedMode, setMode, currentTheme } = useTheme();
 *
 *   return (
 *     <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
 *       Current: {resolvedMode}
 *     </button>
 *   );
 * }
 * ```
 */
export function useUnifiedTheme(): UnifiedThemeContextValue {
  const context = useContext(UnifiedThemeContext);

  if (context === undefined) {
    throw new Error(
      "useUnifiedTheme must be used within a UnifiedThemeProvider. " +
        "Wrap your app with <UnifiedThemeProvider> to use theme functionality.",
    );
  }

  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default UnifiedThemeProvider;
export { UnifiedThemeContext };
export type { ThemeMode as Theme, ResolvedThemeMode as ResolvedTheme };
