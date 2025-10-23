/**
 * Modal - Accessible modal dialog component
 *
 * A modern modal dialog component with enhanced UX patterns,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Modern animation system with multiple variants
 * - Enhanced focus management and accessibility
 * - Responsive design with mobile optimizations
 * - Multiple backdrop and placement options
 * - Loading states and custom indicators
 * - Native dialog element support
 * - Advanced keyboard navigation
 * - Screen reader announcements
 * - Touch-friendly interactions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   header={{ title: "My Modal", subtitle: "Optional subtitle" }}
 *   animation={{ type: "slide", duration: 300 }}
 * >
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */

import { X } from "@spexop/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock.js";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { useFocusTrap } from "../../../hooks/useFocusTrap.js";
import { cn } from "../../../utils/index.js";
import styles from "./Modal.module.css";
import type {
  ModalAnimation,
  ModalBackdrop,
  ModalPlacement,
  ModalProps,
  ModalSize,
} from "./Modal.types.js";

export function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  placement = "center",
  backdrop = "blur",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  className,
  backdropClassName,
  id,
  animation = { type: "scale", duration: 200 },
  header,
  footer,
  accessibility,
  focus,
  responsive,
  portal = true,
  portalContainer,
  show = true,
  loading = false,
  loadingIndicator,
  draggable = false,
  resizable = false,
  style,
  backdropStyle,
  native = false,
  formMethod,
  formAction,
  returnValue,
  onOpen,
  onBeforeOpen,
  onBeforeClose,
  onBackdropClick,
  onEscapeKey,
  // Legacy props for backward compatibility
  title,
  showCloseButton = true,
  initialFocusRef,
}: ModalProps) {
  // Generate unique IDs
  const [modalId] = useState(
    () => id || `modal-${Math.random().toString(36).substr(2, 9)}`,
  );
  const [titleId] = useState(() => `${modalId}-title`);
  const [descriptionId] = useState(() => `${modalId}-description`);

  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get effective values with responsive overrides
  const effectiveSize =
    responsive?.mobileSize && window.innerWidth <= 768
      ? responsive.mobileSize
      : size;
  const effectivePlacement =
    responsive?.mobilePlacement && window.innerWidth <= 768
      ? responsive.mobilePlacement
      : placement;
  const effectiveBackdrop =
    responsive?.disableBackdropOnMobile && window.innerWidth <= 768
      ? "transparent"
      : backdrop;

  // Focus management
  const focusConfig = focus || {};
  const shouldTrapFocus = focusConfig.trapFocus !== false;
  const shouldRestoreFocus = focusConfig.restoreFocus !== false;
  const initialFocusElement =
    focusConfig.initialFocusRef?.current || initialFocusRef?.current;

  // Focus trap
  useFocusTrap(
    modalRef as React.RefObject<HTMLElement>,
    isOpen && shouldTrapFocus,
  );

  // Body scroll lock
  useBodyScrollLock(isOpen && preventBodyScroll);

  // Escape key handler
  useEscapeKey(() => {
    if (closeOnEscape && isOpen) {
      onEscapeKey?.(new KeyboardEvent("keydown", { key: "Escape" }));
      onClose?.();
    }
  }, isOpen);

  // Set initial focus
  useEffect(() => {
    if (isOpen && initialFocusElement) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => {
        initialFocusElement.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialFocusElement]);

  // Portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle modal open/close events
  useEffect(() => {
    if (isOpen) {
      onBeforeOpen?.();
      onOpen?.();

      // Store trigger element for focus restoration
      if (shouldRestoreFocus) {
        triggerRef.current = document.activeElement as HTMLElement;
      }
    } else {
      onBeforeClose?.();

      // Restore focus to trigger element
      if (shouldRestoreFocus && triggerRef.current) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen, onOpen, onBeforeOpen, onBeforeClose, shouldRestoreFocus]);

  // Handle native dialog
  useEffect(() => {
    if (native && dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
        if (returnValue) {
          dialogRef.current.returnValue = returnValue;
        }
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen, native, returnValue]);

  // Screen reader announcement
  useEffect(() => {
    if (isOpen && accessibility?.announceOpen) {
      const announcement =
        accessibility.announcementText ||
        `Modal opened: ${header?.title || title || "Dialog"}`;
      const announcementElement = document.createElement("div");
      announcementElement.setAttribute("aria-live", "polite");
      announcementElement.setAttribute("aria-atomic", "true");
      announcementElement.className = "sr-only";
      announcementElement.textContent = announcement;
      document.body.appendChild(announcementElement);

      setTimeout(() => {
        document.body.removeChild(announcementElement);
      }, 1000);
    }
  }, [
    isOpen,
    accessibility?.announceOpen,
    accessibility?.announcementText,
    header?.title,
    title,
  ]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onBackdropClick?.(event.nativeEvent);
        onClose?.();
      }
    },
    [closeOnBackdropClick, onBackdropClick, onClose],
  );

  const handleCloseClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleDialogClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Animation classes
  const animationType = animation?.disabled
    ? "none"
    : animation?.type || "scale";
  const animationDuration = animation?.duration || 200;

  const modalClassName = cn(
    styles.modal,
    styles[`size-${effectiveSize}`],
    styles[`placement-${effectivePlacement}`],
    styles[`animation-${animationType}`],
    {
      [styles.loading]: loading,
    },
    className,
  );

  const backdropClass = cn(
    styles.backdrop,
    isOpen && styles["backdrop-visible"],
    styles[`backdrop-${effectiveBackdrop}`],
    backdropClassName,
  );

  // Don't render if not mounted or not open
  if (!mounted || !isOpen || !show) {
    return null;
  }

  // Native dialog element
  if (native) {
    return createPortal(
      <dialog
        ref={dialogRef}
        id={modalId}
        className={modalClassName}
        style={style}
        onClose={handleDialogClose}
        aria-label={accessibility?.["aria-label"]}
        aria-labelledby={
          accessibility?.["aria-labelledby"] ||
          (header?.title || title ? titleId : undefined)
        }
        aria-describedby={accessibility?.["aria-describedby"] || descriptionId}
        role={accessibility?.role || "dialog"}
        aria-modal="true"
        {...(formMethod && { method: formMethod })}
        {...(formAction && { action: formAction })}
      >
        {header && (
          <div className={styles.header}>
            <div className={styles["header-content"]}>
              {header.title && (
                <h2 id={titleId} className={styles.title}>
                  {header.title}
                </h2>
              )}
              {header.subtitle && (
                <p id={descriptionId} className={styles.subtitle}>
                  {header.subtitle}
                </p>
              )}
              {header.children}
            </div>
            {header.showCloseButton !== false && (
              <button
                type="button"
                onClick={handleCloseClick}
                className={styles["close-button"]}
                aria-label="Close modal"
              >
                {header.closeButton || <X size={24} strokeWidth={2} />}
              </button>
            )}
          </div>
        )}

        <div className={styles.body}>
          {loading && (
            <div className={styles["loading-indicator"]}>
              {loadingIndicator || (
                <div className={styles.spinner} aria-label="Loading">
                  <div className={styles["spinner-dot"]} />
                  <div className={styles["spinner-dot"]} />
                  <div className={styles["spinner-dot"]} />
                </div>
              )}
            </div>
          )}
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              styles.footer,
              styles[`align-${footer.align || "right"}`],
              footer.showDivider ? styles["show-divider"] : undefined,
            )}
          >
            {footer.children}
          </div>
        )}
      </dialog>,
      portalContainer || document.body,
    );
  }

  // Standard modal
  return createPortal(
    // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is intentionally mouse-only, keyboard users use Escape key to close
    <div
      className={backdropClass}
      onClick={handleBackdropClick}
      style={backdropStyle}
    >
      <div
        ref={modalRef}
        id={modalId}
        role={accessibility?.role || "dialog"}
        aria-modal="true"
        aria-label={accessibility?.["aria-label"]}
        aria-labelledby={
          accessibility?.["aria-labelledby"] ||
          (header?.title || title ? titleId : undefined)
        }
        aria-describedby={accessibility?.["aria-describedby"] || descriptionId}
        className={modalClassName}
        style={
          {
            ...style,
            "--animation-duration": `${animationDuration}ms`,
          } as React.CSSProperties
        }
        tabIndex={-1}
      >
        {(header || title || showCloseButton) && (
          <div className={styles.header}>
            <div className={styles["header-content"]}>
              {(header?.title || title) && (
                <h2 id={titleId} className={styles.title}>
                  {header?.title || title}
                </h2>
              )}
              {header?.subtitle && (
                <p id={descriptionId} className={styles.subtitle}>
                  {header.subtitle}
                </p>
              )}
              {header?.children}
            </div>
            {header?.showCloseButton !== false && showCloseButton && (
              <button
                type="button"
                onClick={handleCloseClick}
                className={styles["close-button"]}
                aria-label="Close modal"
                tabIndex={0}
              >
                {header?.closeButton || <X size={24} strokeWidth={2} />}
              </button>
            )}
          </div>
        )}

        <div className={styles.body}>
          {loading && (
            <div className={styles["loading-indicator"]}>
              {loadingIndicator || (
                <div className={styles.spinner} aria-label="Loading">
                  <div className={styles["spinner-dot"]} />
                  <div className={styles["spinner-dot"]} />
                  <div className={styles["spinner-dot"]} />
                </div>
              )}
            </div>
          )}
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              styles.footer,
              styles[`align-${footer.align || "right"}`],
              footer.showDivider ? styles["show-divider"] : undefined,
            )}
          >
            {footer.children}
          </div>
        )}
      </div>
    </div>,
    portalContainer || document.body,
  );
}
