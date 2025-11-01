/**
 * Toast Utility
 * Global toast notification system without providers
 *
 * Features:
 * - Global toast queue with auto-stacking
 * - Position management (6 positions)
 * - Auto-dismiss with configurable duration
 * - Action buttons support
 * - Variant support (success, error, warning, info, default)
 * - Animation with prefers-reduced-motion support
 * - Max toast limit with oldest removal
 * - Programmatic API: toast.success(), toast.error(), etc.
 * - Screen reader announcements
 * - WCAG AAA compliant
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import React, { type ReactNode } from "react";

import { useCallback, useEffect, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Toast variant types
 */
export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

/**
 * Toast position types
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Individual toast configuration
 */
export interface Toast {
  /** Unique identifier */
  id: string;
  /** Toast message */
  message: string;
  /** Optional title */
  title?: string;
  /** Visual variant */
  variant?: ToastVariant;
  /** Auto-dismiss duration in milliseconds (0 = persistent) */
  duration?: number;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Optional close button */
  closable?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Timestamp */
  createdAt: number;
}

/**
 * Toast options for programmatic API
 */
export interface ToastOptions {
  /** Optional title */
  title?: string;
  /** Auto-dismiss duration in milliseconds */
  duration?: number;
  /** Visual variant */
  variant?: ToastVariant;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Show close button */
  closable?: boolean;
  /** Custom icon */
  icon?: ReactNode;
}

/**
 * Toast utility configuration
 */
export interface ToastUtilConfig {
  /** Maximum number of toasts to show (default: 5) */
  maxToasts?: number;
  /** Default toast position (default: "top-right") */
  position?: ToastPosition;
  /** Default auto-dismiss duration in milliseconds (default: 4000) */
  defaultDuration?: number;
  /** Enable/disable animations (respects prefers-reduced-motion) */
  enableAnimations?: boolean;
}

/**
 * Toast utility return value
 */
export interface ToastUtilReturn {
  /** Array of active toasts */
  toasts: Toast[];
  /** Add a new toast */
  addToast: (message: string, options?: ToastOptions) => string;
  /** Remove a toast by ID */
  removeToast: (id: string) => void;
  /** Remove all toasts */
  clearToasts: () => void;
  /** Programmatic API shortcuts */
  toast: {
    (message: string, options?: ToastOptions): string;
    success: (
      message: string,
      options?: Omit<ToastOptions, "variant">,
    ) => string;
    error: (message: string, options?: Omit<ToastOptions, "variant">) => string;
    warning: (
      message: string,
      options?: Omit<ToastOptions, "variant">,
    ) => string;
    info: (message: string, options?: Omit<ToastOptions, "variant">) => string;
  };
  /** Render toast container */
  renderToasts: () => ReactNode;
}

// ============================================================================
// MODULE-LEVEL STATE (Singleton Pattern)
// ============================================================================

const DEFAULTS = {
  MAX_TOASTS: 5,
  POSITION: "top-right" as ToastPosition,
  DURATION: 4000,
  ENABLE_ANIMATIONS: true,
} as const;

/**
 * Global toast state manager
 */
class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<() => void> = new Set();
  private config: Required<ToastUtilConfig> = {
    maxToasts: DEFAULTS.MAX_TOASTS,
    position: DEFAULTS.POSITION,
    defaultDuration: DEFAULTS.DURATION,
    enableAnimations: DEFAULTS.ENABLE_ANIMATIONS,
  };

  /**
   * Configure toast manager
   */
  configure(config: ToastUtilConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): Required<ToastUtilConfig> {
    return { ...this.config };
  }

  /**
   * Get all toasts
   */
  getToasts(): Toast[] {
    return [...this.toasts];
  }

  /**
   * Add a toast
   */
  addToast(message: string, options?: ToastOptions): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newToast: Toast = {
      id,
      message,
      title: options?.title,
      variant: options?.variant || "default",
      duration: options?.duration ?? this.config.defaultDuration,
      action: options?.action,
      closable: options?.closable ?? true,
      icon: options?.icon,
      createdAt: Date.now(),
    };

    // Remove oldest toast if at max capacity
    if (this.toasts.length >= this.config.maxToasts) {
      this.toasts.shift();
    }

    this.toasts.push(newToast);
    this.notifyListeners();

    return id;
  }

  /**
   * Remove a toast by ID
   */
  removeToast(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notifyListeners();
  }

  /**
   * Clear all toasts
   */
  clearToasts(): void {
    this.toasts = [];
    this.notifyListeners();
  }

  /**
   * Subscribe to toast changes
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
const toastManager = new ToastManager();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique toast ID
 */
function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get icon for toast variant
 */
function getVariantIcon(variant: Toast["variant"]): string {
  switch (variant) {
    case "success":
      return "✓";
    case "error":
      return "✕";
    case "warning":
      return "⚠";
    case "info":
      return "ℹ";
    default:
      return "";
  }
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useToastUtil Hook
 * Provider-free toast notification utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast, renderToasts } = useToastUtil({
 *     position: "top-right",
 *     maxToasts: 5,
 *   });
 *
 *   return (
 *     <>
 *       <button onClick={() => toast.success("Saved!")}>Save</button>
 *       {renderToasts()}
 *     </>
 *   );
 * }
 * ```
 */
export function useToastUtil(config?: ToastUtilConfig): ToastUtilReturn {
  const [toasts, setToasts] = useState<Toast[]>(() => toastManager.getToasts());

  // Configure on mount
  useEffect(() => {
    if (config) {
      toastManager.configure(config);
    }
  }, [config]);

  // Subscribe to toast changes
  useEffect(() => {
    const unsubscribe = toastManager.subscribe(() => {
      setToasts(toastManager.getToasts());
    });

    return unsubscribe;
  }, []);

  // Programmatic API with convenience methods
  const baseToast = (message: string, options?: ToastOptions): string => {
    return toastManager.addToast(message, options);
  };

  const toastApi = Object.assign(baseToast, {
    success: (
      message: string,
      options?: Omit<ToastOptions, "variant">,
    ): string => {
      return toastManager.addToast(message, { ...options, variant: "success" });
    },
    error: (message: string, options?: Omit<ToastOptions, "variant">): string => {
      return toastManager.addToast(message, { ...options, variant: "error" });
    },
    warning: (
      message: string,
      options?: Omit<ToastOptions, "variant">,
    ): string => {
      return toastManager.addToast(message, { ...options, variant: "warning" });
    },
    info: (message: string, options?: Omit<ToastOptions, "variant">): string => {
      return toastManager.addToast(message, { ...options, variant: "info" });
    },
  }) as ToastUtilReturn["toast"];

  // Render toast container
  const renderToasts = (): ReactNode => {
    if (toasts.length === 0) return null;

    const currentConfig = toastManager.getConfig();
    const shouldAnimate =
      currentConfig.enableAnimations &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
      <div
        className={`toast-container toast-position-${currentConfig.position}`}
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={(id) => toastManager.removeToast(id)}
            enableAnimations={shouldAnimate}
          />
        ))}
      </div>
    );
  };

  return {
    toasts,
    addToast: (message: string, options?: ToastOptions) =>
      toastManager.addToast(message, options),
    removeToast: (id: string) => toastManager.removeToast(id),
    clearToasts: () => toastManager.clearToasts(),
    toast: toastApi,
    renderToasts,
  };
}

// ============================================================================
// TOAST ITEM COMPONENT
// ============================================================================

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
  enableAnimations: boolean;
}

function ToastItem({ toast, onRemove, enableAnimations }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = useCallback(() => {
    if (enableAnimations) {
      setIsExiting(true);
      setTimeout(() => {
        onRemove(toast.id);
      }, 200); // Match CSS animation duration
    } else {
      onRemove(toast.id);
    }
  }, [enableAnimations, onRemove, toast.id]);

  // Auto-dismiss timer
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleRemove]);

  const variantIcon = toast.icon || getVariantIcon(toast.variant);

  return (
    <div
      className={`toast toast-variant-${toast.variant || "default"} ${isExiting ? "toast-exiting" : ""}`}
      role="alert"
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      data-toast-id={toast.id}
    >
      {variantIcon && (
        <div className="toast-icon" aria-hidden="true">
          {variantIcon}
        </div>
      )}

      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        <div className="toast-message">{toast.message}</div>
      </div>

      <div className="toast-actions">
        {toast.action && (
          <button
            type="button"
            className="toast-action"
            onClick={() => {
              toast.action?.onClick();
              handleRemove();
            }}
            aria-label={toast.action.label}
          >
            {toast.action.label}
          </button>
        )}

        {toast.closable !== false && (
          <button
            type="button"
            className="toast-close"
            onClick={handleRemove}
            aria-label="Close notification"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useToastUtil;

