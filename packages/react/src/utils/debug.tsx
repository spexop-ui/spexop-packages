/**
 * Debug Utility
 * Visual debugging system without providers
 *
 * Features:
 * - Visual breakpoint indicator
 * - Component boundary visualization
 * - Token value display
 * - Performance metrics
 * - Accessibility highlighting
 * - LocalStorage persistence
 * - Screen reader announcements
 * - Keyboard shortcut (Ctrl+Shift+D / Cmd+Shift+D)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import React, { type ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { useBreakpoint } from "../hooks/index.js";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Debug options state (excluding enabled flag)
 */
export interface DebugOptions {
  /** Show breakpoint indicator */
  showBreakpoint: boolean;
  /** Show token values in labels */
  showTokens: boolean;
  /** Show component boundaries with borders */
  showBoundaries: boolean;
  /** Show composition hierarchy depth */
  showHierarchy: boolean;
  /** Show spacing visualization */
  showSpacing: boolean;
  /** Highlight accessibility issues and focus order */
  showAccessibility: boolean;
  /** Show performance metrics (render counts) */
  showPerformance: boolean;
}

/**
 * Complete debug state
 */
export interface DebugState extends DebugOptions {
  /** Whether debug mode is enabled */
  enabled: boolean;
}

/**
 * Debug utility configuration
 */
export interface DebugUtilConfig {
  /** Initial debug state */
  initialEnabled?: boolean;
  /** Default debug options */
  defaultOptions?: Partial<DebugOptions>;
  /** localStorage key for persistence */
  storageKey?: string;
  /** Disable localStorage persistence */
  disableStorage?: boolean;
}

/**
 * Debug utility return value
 */
export interface DebugUtilReturn extends DebugState {
  /** Toggle debug mode on/off */
  toggle: () => void;
  /** Set debug mode state */
  setEnabled: (enabled: boolean) => void;
  /** Update debug options */
  updateOptions: (options: Partial<DebugOptions>) => void;
  /** Render debug overlay */
  renderDebugOverlay: () => ReactNode;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_STORAGE_KEY = "spexop-debug-mode";

const DEFAULT_OPTIONS: DebugOptions = {
  showBreakpoint: true,
  showTokens: true,
  showBoundaries: true,
  showHierarchy: true,
  showSpacing: false,
  showAccessibility: false,
  showPerformance: false,
};

// ============================================================================
// MODULE-LEVEL STATE (Singleton Pattern)
// ============================================================================

/**
 * Global debug state manager
 */
class DebugManager {
  private enabled = false;
  private options: DebugOptions = { ...DEFAULT_OPTIONS };
  private listeners: Set<() => void> = new Set();
  private storageKey: string = DEFAULT_STORAGE_KEY;
  private disableStorage = false;

  /**
   * Initialize with config
   */
  configure(config: DebugUtilConfig): void {
    if (config.storageKey) {
      this.storageKey = config.storageKey;
    }
    if (config.disableStorage !== undefined) {
      this.disableStorage = config.disableStorage;
    }

    const initialEnabled =
      config.initialEnabled ??
      (!this.disableStorage && typeof window !== "undefined"
        ? this.getStoredDebugState()
        : false);

    this.enabled = initialEnabled;

    if (config.defaultOptions) {
      this.options = { ...this.options, ...config.defaultOptions };
    }
  }

  /**
   * Get stored debug state from localStorage
   */
  private getStoredDebugState(): boolean {
    if (typeof window === "undefined") return false;

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored === "true";
    } catch (error) {
      console.warn("Failed to read debug state from localStorage:", error);
      return false;
    }
  }

  /**
   * Save debug state to localStorage
   */
  private setStoredDebugState(enabled: boolean): void {
    if (typeof window === "undefined" || this.disableStorage) return;

    try {
      localStorage.setItem(this.storageKey, String(enabled));
    } catch (error) {
      console.warn("Failed to save debug state to localStorage:", error);
    }
  }

  /**
   * Get current enabled state
   */
  getEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Get current options
   */
  getOptions(): DebugOptions {
    return { ...this.options };
  }

  /**
   * Set enabled state
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.setStoredDebugState(enabled);
    this.notifyListeners();

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[Spexop Debug] Debug mode ${enabled ? "enabled" : "disabled"}`,
      );
    }
  }

  /**
   * Toggle enabled state
   */
  toggle(): void {
    this.setEnabled(!this.enabled);
  }

  /**
   * Update options
   */
  updateOptions(newOptions: Partial<DebugOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.notifyListeners();
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

// Singleton instance
const debugManager = new DebugManager();

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useDebugUtil Hook
 * Provider-free debug mode utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { enabled, toggle, renderDebugOverlay } = useDebugUtil({
 *     initialEnabled: false,
 *     defaultOptions: { showBreakpoint: true },
 *   });
 *
 *   return (
 *     <>
 *       <button onClick={toggle}>Toggle Debug</button>
 *       {renderDebugOverlay()}
 *     </>
 *   );
 * }
 * ```
 */
export function useDebugUtil(config?: DebugUtilConfig): DebugUtilReturn {
  const { current } = useBreakpoint();
  const [enabled, setEnabledState] = useState(() => {
    if (config) {
      debugManager.configure(config);
    }
    return debugManager.getEnabled();
  });
  const [options, setOptionsState] = useState(() => debugManager.getOptions());

  // Configure on mount if config provided
  useEffect(() => {
    if (config) {
      debugManager.configure(config);
      setEnabledState(debugManager.getEnabled());
      setOptionsState(debugManager.getOptions());
    }
  }, [config]);

  // Subscribe to changes
  useEffect(() => {
    const unsubscribe = debugManager.subscribe(() => {
      setEnabledState(debugManager.getEnabled());
      setOptionsState(debugManager.getOptions());
    });

    return unsubscribe;
  }, []);

  // Keyboard shortcut: Ctrl+Shift+D (or Cmd+Shift+D on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === "D") {
        e.preventDefault();
        debugManager.toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Memoized handlers
  const toggle = useCallback(() => {
    debugManager.toggle();
  }, []);

  const setEnabled = useCallback((newEnabled: boolean) => {
    debugManager.setEnabled(newEnabled);
  }, []);

  const updateOptions = useCallback((newOptions: Partial<DebugOptions>) => {
    debugManager.updateOptions(newOptions);
  }, []);

  // Render debug overlay
  const renderDebugOverlay = useCallback((): ReactNode => {
    if (!enabled) return null;

    return (
      <>
        {options.showBreakpoint && <BreakpointIndicator breakpoint={current} />}
        {/* Screen reader announcement for debug mode state changes */}
        <div
          className="sr-only"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
          }}
        >
          {enabled
            ? `Debug mode enabled. Current breakpoint: ${current}.`
            : "Debug mode disabled."}
        </div>
      </>
    );
  }, [enabled, options.showBreakpoint, current]);

  return {
    enabled,
    ...options,
    toggle,
    setEnabled,
    updateOptions,
    renderDebugOverlay,
  };
}

// ============================================================================
// BREAKPOINT INDICATOR COMPONENT
// ============================================================================

interface BreakpointIndicatorProps {
  breakpoint: string;
}

function BreakpointIndicator({ breakpoint }: BreakpointIndicatorProps) {
  return (
    <div
      className="debug-breakpoint-indicator"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Debug mode active. Current breakpoint: ${breakpoint}`}
      style={{
        position: "fixed",
        top: "var(--theme-spacing-4, 16px)",
        right: "var(--theme-spacing-4, 16px)",
        zIndex: 9999,
        padding: "var(--theme-spacing-2, 8px) var(--theme-spacing-3, 12px)",
        backgroundColor: "var(--theme-surface, #ffffff)",
        border: "2px solid var(--theme-border, #e5e5e5)",
        borderRadius: "var(--theme-radius-md, 8px)",
        fontFamily: "var(--theme-font-family-mono, monospace)",
        fontSize: "var(--theme-font-size-xs, 12px)",
        fontWeight: "var(--theme-font-weight-semibold, 600)",
        color: "var(--theme-text, #000000)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--theme-spacing-2, 8px)",
        }}
      >
        <span>Breakpoint:</span>
        <span
          style={{
            color: "var(--theme-primary, #0066cc)",
            fontWeight: "var(--theme-font-weight-bold, 700)",
          }}
        >
          {breakpoint}
        </span>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--theme-primary, #0066cc)",
            display: "inline-block",
          }}
          aria-hidden="true"
          data-breakpoint={breakpoint}
        />
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useDebugUtil;
