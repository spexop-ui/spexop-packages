/**
 * Modal Utility
 * Global modal/dialog management system without providers
 *
 * Features:
 * - Modal stack management with z-index
 * - Focus trap with return focus
 * - Scroll lock on body
 * - Backdrop click handling
 * - ESC key handling
 * - ARIA attributes for accessibility
 * - Nested modal support
 * - Animation with prefers-reduced-motion support
 * - Size variants (sm, md, lg, xl, full)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type React from "react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

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
 * Modal utility configuration
 */
export interface ModalUtilConfig {
  /** Maximum number of modals in stack (default: 3) */
  maxModals?: number;
  /** Enable/disable animations (respects prefers-reduced-motion) */
  enableAnimations?: boolean;
  /** Enable scroll lock when modal is open */
  enableScrollLock?: boolean;
}

/**
 * Modal utility return value
 */
export interface ModalUtilReturn {
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
  /** Render modal stack */
  renderModals: () => ReactNode;
}

// ============================================================================
// MODULE-LEVEL STATE (Singleton Pattern)
// ============================================================================

const DEFAULTS = {
  MAX_MODALS: 3,
  ENABLE_ANIMATIONS: true,
  ENABLE_SCROLL_LOCK: true,
  BASE_Z_INDEX: 10000,
} as const;

/**
 * Global modal state manager
 */
class ModalManager {
  private modals: Modal[] = [];
  private listeners: Set<() => void> = new Set();
  private config: Required<ModalUtilConfig> = {
    maxModals: DEFAULTS.MAX_MODALS,
    enableAnimations: DEFAULTS.ENABLE_ANIMATIONS,
    enableScrollLock: DEFAULTS.ENABLE_SCROLL_LOCK,
  };

  /**
   * Configure modal manager
   */
  configure(config: ModalUtilConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): Required<ModalUtilConfig> {
    return { ...this.config };
  }

  /**
   * Get all modals
   */
  getModals(): Modal[] {
    return [...this.modals];
  }

  /**
   * Get active (top) modal
   */
  getActiveModal(): Modal | undefined {
    return this.modals[this.modals.length - 1];
  }

  /**
   * Open a modal
   */
  openModal(content: ReactNode, options?: ModalOptions): string {
    const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (this.modals.length >= this.config.maxModals) {
      console.warn(
        `ModalManager: Maximum modal limit (${this.config.maxModals}) reached`,
      );
      return id;
    }

    const newModal: Modal = {
      id,
      content,
      title: options?.title,
      size: options?.size || "md",
      closeOnBackdrop: options?.closeOnBackdrop ?? true,
      closeOnEsc: options?.closeOnEsc ?? true,
      showClose: options?.showClose ?? true,
      footer: options?.footer,
      onClose: options?.onClose,
      onOpen: options?.onOpen,
      className: options?.className,
      zIndex: DEFAULTS.BASE_Z_INDEX + this.modals.length * 10,
    };

    this.modals.push(newModal);
    this.notifyListeners();
    options?.onOpen?.();

    return id;
  }

  /**
   * Close a modal by ID
   */
  closeModal(id: string): void {
    const modal = this.modals.find((m) => m.id === id);
    if (modal) {
      modal.onClose?.();
    }
    this.modals = this.modals.filter((modal) => modal.id !== id);
    this.notifyListeners();
  }

  /**
   * Close all modals
   */
  closeAllModals(): void {
    for (const modal of this.modals) {
      modal.onClose?.();
    }
    this.modals = [];
    this.notifyListeners();
  }

  /**
   * Subscribe to modal changes
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
const modalManager = new ModalManager();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique modal ID
 */
function generateModalId(): string {
  return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Lock body scroll
 */
function lockScroll(): void {
  if (typeof window === "undefined") return;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

/**
 * Unlock body scroll
 */
function unlockScroll(): void {
  if (typeof document === "undefined") return;
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useModalUtil Hook
 * Provider-free modal management utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { openModal, closeModal, renderModals } = useModalUtil({
 *     maxModals: 3,
 *     enableScrollLock: true,
 *   });
 *
 *   return (
 *     <>
 *       <button onClick={() => openModal(<Content />, { title: 'Hello' })}>
 *         Open Modal
 *       </button>
 *       {renderModals()}
 *     </>
 *   );
 * }
 * ```
 */
export function useModalUtil(config?: ModalUtilConfig): ModalUtilReturn {
  const [modals, setModals] = useState<Modal[]>(() => modalManager.getModals());

  // Configure on mount
  useEffect(() => {
    if (config) {
      modalManager.configure(config);
    }
  }, [config]);

  // Subscribe to modal changes
  useEffect(() => {
    const unsubscribe = modalManager.subscribe(() => {
      setModals(modalManager.getModals());
    });

    return unsubscribe;
  }, []);

  // Scroll lock management
  useEffect(() => {
    const currentConfig = modalManager.getConfig();
    if (currentConfig.enableScrollLock && modals.length > 0) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [modals.length]);

  // Render modal stack
  const renderModals = useCallback((): ReactNode => {
    if (modals.length === 0) return null;

    const currentConfig = modalManager.getConfig();
    const shouldAnimate =
      currentConfig.enableAnimations &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
      <>
        {modals.map((modal, index) => (
          <ModalItem
            key={modal.id}
            modal={modal}
            onClose={(id) => modalManager.closeModal(id)}
            enableAnimations={shouldAnimate}
            index={index}
          />
        ))}
      </>
    );
  }, [modals]);

  return {
    modals,
    openModal: (content: ReactNode, options?: ModalOptions) =>
      modalManager.openModal(content, options),
    closeModal: (id: string) => modalManager.closeModal(id),
    closeAllModals: () => modalManager.closeAllModals(),
    activeModal: modalManager.getActiveModal(),
    renderModals,
  };
}

// ============================================================================
// MODAL ITEM COMPONENT
// ============================================================================

interface ModalItemProps {
  modal: Modal;
  onClose: (id: string) => void;
  enableAnimations: boolean;
  index: number;
}

function ModalItem({
  modal,
  onClose,
  enableAnimations,
  index,
}: ModalItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store previous focus
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    modal.onOpen?.();

    return () => {
      // Restore focus on unmount
      previousFocusRef.current?.focus();
    };
  }, [modal]);

  // Focus trap
  useEffect(() => {
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // ESC key handler
  useEffect(() => {
    if (!modal.closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modal.closeOnEsc]);

  const handleClose = useCallback(() => {
    if (enableAnimations) {
      setIsExiting(true);
      setTimeout(() => {
        onClose(modal.id);
      }, 200);
    } else {
      onClose(modal.id);
    }
  }, [enableAnimations, onClose, modal.id]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && modal.closeOnBackdrop !== false) {
        handleClose();
      }
    },
    [modal.closeOnBackdrop, handleClose],
  );

  const zIndex = modal.zIndex || DEFAULTS.BASE_Z_INDEX + index * 10;

  return (
    <div
      className={`modal-backdrop ${isExiting ? "modal-exiting" : ""}`}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape" && modal.closeOnBackdrop !== false) {
          handleClose();
        }
      }}
      style={{ zIndex }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`modal modal-size-${modal.size || "md"} ${modal.className || ""} ${isExiting ? "modal-exiting" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modal.title ? `${modal.id}-title` : undefined}
      >
        {(modal.title || modal.showClose !== false) && (
          <div className="modal-header">
            {modal.title && (
              <h2 id={`${modal.id}-title`} className="modal-title">
                {modal.title}
              </h2>
            )}
            {modal.showClose !== false && (
              <button
                type="button"
                className="modal-close"
                onClick={handleClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="modal-content">{modal.content}</div>

        {modal.footer && <div className="modal-footer">{modal.footer}</div>}
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useModalUtil;
