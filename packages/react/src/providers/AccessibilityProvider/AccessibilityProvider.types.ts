/**
 * AccessibilityProvider Types
 * Types for centralized accessibility preferences
 */

import type { ReactNode } from "react";

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
 * Accessibility context value
 */
export interface AccessibilityContextValue extends AccessibilityState {
  /** Enable keyboard-only mode manually */
  setKeyboardOnlyMode: (enabled: boolean) => void;
  /** Toggle focus indicators */
  setShowFocusIndicators: (enabled: boolean) => void;
  /** Toggle link underlines */
  setPreferLinkUnderlines: (enabled: boolean) => void;
}

/**
 * AccessibilityProvider props
 */
export interface AccessibilityProviderProps {
  /** Child components */
  children?: ReactNode;
  /** Initial keyboard-only mode state */
  initialKeyboardOnlyMode?: boolean;
  /** Initial focus indicators state */
  initialShowFocusIndicators?: boolean;
  /** Initial link underlines preference */
  initialPreferLinkUnderlines?: boolean;
}
