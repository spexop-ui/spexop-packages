/**
 * ModalProvider Types
 * Types for centralized modal management system
 */

import type { ReactNode } from "react";

/**
 * Modal size variants
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Individual modal configuration
 */
export interface Modal {
  /** Unique identifier */
  id: string;
  /** Modal title */
  title?: string;
  /** Modal content */
  content: ReactNode;
  /** Size variant */
  size?: ModalSize;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on ESC key */
  closeOnEsc?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Footer content */
  footer?: ReactNode;
  /** Callback when modal closes */
  onClose?: () => void;
  /** Callback when modal opens */
  onOpen?: () => void;
  /** Custom className for modal */
  className?: string;
  /** Z-index for stacking */
  zIndex?: number;
}

/**
 * Modal options for programmatic API
 */
export interface ModalOptions {
  /** Modal title */
  title?: string;
  /** Size variant */
  size?: ModalSize;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on ESC key */
  closeOnEsc?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Footer content */
  footer?: ReactNode;
  /** Callback when modal closes */
  onClose?: () => void;
  /** Callback when modal opens */
  onOpen?: () => void;
  /** Custom className */
  className?: string;
}

/**
 * Modal context value
 */
export interface ModalContextValue {
  /** Array of active modals */
  modals: Modal[];
  /** Open a new modal */
  openModal: (content: ReactNode, options?: ModalOptions) => string;
  /** Close a modal by ID */
  closeModal: (id: string) => void;
  /** Close all modals */
  closeAllModals: () => void;
  /** Get current active modal */
  activeModal: Modal | undefined;
}

/**
 * ModalProvider props
 */
export interface ModalProviderProps {
  /** Child components */
  children?: ReactNode;
  /** Maximum number of modals in stack (default: 3) */
  maxModals?: number;
  /** Enable/disable animations (respects prefers-reduced-motion) */
  enableAnimations?: boolean;
  /** Enable scroll lock when modal is open */
  enableScrollLock?: boolean;
}
