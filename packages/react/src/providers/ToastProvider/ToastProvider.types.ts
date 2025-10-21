/**
 * ToastProvider Types
 * Types for toast notification system
 */

import type { ReactNode } from "react";

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
 * Toast context value
 */
export interface ToastContextValue {
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
}

/**
 * ToastProvider props
 */
export interface ToastProviderProps {
  /** Child components */
  children?: ReactNode;
  /** Maximum number of toasts to show (default: 5) */
  maxToasts?: number;
  /** Default toast position (default: "top-right") */
  position?: ToastPosition;
  /** Default auto-dismiss duration in milliseconds (default: 4000) */
  defaultDuration?: number;
  /** Enable/disable animations (respects prefers-reduced-motion) */
  enableAnimations?: boolean;
}
