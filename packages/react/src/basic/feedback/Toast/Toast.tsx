/**
 * Toast - Accessible toast notification component
 *
 * A toast notification component for brief messages,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear messaging
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Semantic variants (info, success, warning, error)
 * - Auto-dismiss with configurable duration
 * - Manual dismiss button
 * - Optional action button
 * - Multiple position options
 * - Screen reader accessible
 * - Smooth animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Toast
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   message="Changes saved successfully"
 *   variant="success"
 * />
 * ```
 */

import { X } from "@spexop/icons";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils/index.js";
import styles from "./Toast.module.css";
import type { ToastProps } from "./Toast.types.js";

export function Toast({
  message,
  variant = "info",
  duration = 5000,
  isOpen,
  onClose,
  action,
  position = "bottom-center",
  className,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || duration === 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const toastClassName = cn(
    styles.toast,
    styles[`variant-${variant}`],
    styles[`position-${position}`],
    isOpen && styles.open,
    className,
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      className={toastClassName}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles.content}>
        <div className={styles.message}>{message}</div>

        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={styles["action-button"]}
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className={styles["close-button"]}
        aria-label="Close notification"
        tabIndex={0}
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>,
    document.body,
  );
}
