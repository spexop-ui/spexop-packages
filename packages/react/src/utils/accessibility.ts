/**
 * Accessibility Utility
 * Accessibility preferences management without providers
 *
 * Features:
 * - Reduced motion detection
 * - High contrast mode detection
 * - Font size preference detection
 * - Keyboard-only navigation mode
 * - Focus visible preference
 * - Link underline preference
 * - SSR-safe implementation
 * - Automatic media query detection
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Accessibility preferences state
 */
export interface AccessibilityState {
  /** User prefers reduced motion */
  prefersReducedMotion: boolean;
  /** User prefers high contrast */
  prefersHighContrast: boolean;
  /** User has increased font size preference */
  increasedFontSize: boolean;
  /** Keyboard-only navigation mode */
  keyboardOnlyMode: boolean;
  /** Focus visible preference */
  showFocusIndicators: boolean;
  /** User prefers link underlines */
  preferLinkUnderlines: boolean;
}

/**
 * Accessibility utility configuration
 */
export interface AccessibilityUtilConfig {
  /** Initial keyboard-only mode state */
  initialKeyboardOnlyMode?: boolean;
  /** Initial focus indicators state */
  initialShowFocusIndicators?: boolean;
  /** Initial link underlines preference */
  initialPreferLinkUnderlines?: boolean;
}

/**
 * Accessibility utility return value
 */
export interface AccessibilityUtilReturn extends AccessibilityState {
  /** Enable keyboard-only mode manually */
  setKeyboardOnlyMode: (enabled: boolean) => void;
  /** Toggle focus indicators */
  setShowFocusIndicators: (enabled: boolean) => void;
  /** Toggle link underlines */
  setPreferLinkUnderlines: (enabled: boolean) => void;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Detect if user prefers reduced motion
 */
function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Detect if user prefers high contrast
 */
function detectHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-contrast: more)").matches ||
    window.matchMedia("(prefers-contrast: high)").matches
  );
}

/**
 * Detect if user has increased font size
 */
function detectIncreasedFontSize(): boolean {
  if (typeof window === "undefined") return false;
  const fontSize = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("font-size");
  const baseFontSize = Number.parseFloat(fontSize);
  return baseFontSize > 16; // Assume base is 16px
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useAccessibilityUtil Hook
 * Provider-free accessibility preferences utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { prefersReducedMotion, prefersHighContrast } = useAccessibilityUtil();
 *
 *   return (
 *     <motion.div
 *       animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useAccessibilityUtil(
  config?: AccessibilityUtilConfig,
): AccessibilityUtilReturn {
  // Media query based preferences
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(detectReducedMotion);
  const [prefersHighContrast, setPrefersHighContrast] =
    useState(detectHighContrast);
  const [increasedFontSize, setIncreasedFontSize] = useState(
    detectIncreasedFontSize,
  );

  // User-controlled preferences
  const [keyboardOnlyMode, setKeyboardOnlyModeState] = useState(
    config?.initialKeyboardOnlyMode ?? false,
  );
  const [showFocusIndicators, setShowFocusIndicatorsState] = useState(
    config?.initialShowFocusIndicators ?? true,
  );
  const [preferLinkUnderlines, setPreferLinkUnderlinesState] = useState(
    config?.initialPreferLinkUnderlines ?? false,
  );

  // Listen for reduced motion changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      // Update CSS variable
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

  // Listen for high contrast changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-contrast: more)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browser support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Detect keyboard-only navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isKeyboardNavigation = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        isKeyboardNavigation = true;
        document.body.classList.add("keyboard-navigation");
      }
    };

    const handleMouseDown = () => {
      isKeyboardNavigation = false;
      document.body.classList.remove("keyboard-navigation");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Apply focus indicators preference
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (showFocusIndicators) {
      document.documentElement.classList.add("show-focus-indicators");
    } else {
      document.documentElement.classList.remove("show-focus-indicators");
    }
  }, [showFocusIndicators]);

  // Apply link underlines preference
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (preferLinkUnderlines) {
      document.documentElement.classList.add("prefer-link-underlines");
    } else {
      document.documentElement.classList.remove("prefer-link-underlines");
    }
  }, [preferLinkUnderlines]);

  // Memoized setters
  const setKeyboardOnlyMode = useCallback((enabled: boolean) => {
    setKeyboardOnlyModeState(enabled);
  }, []);

  const setShowFocusIndicators = useCallback((enabled: boolean) => {
    setShowFocusIndicatorsState(enabled);
  }, []);

  const setPreferLinkUnderlines = useCallback((enabled: boolean) => {
    setPreferLinkUnderlinesState(enabled);
  }, []);

  return {
    prefersReducedMotion,
    prefersHighContrast,
    increasedFontSize,
    keyboardOnlyMode,
    showFocusIndicators,
    preferLinkUnderlines,
    setKeyboardOnlyMode,
    setShowFocusIndicators,
    setPreferLinkUnderlines,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useAccessibilityUtil;
