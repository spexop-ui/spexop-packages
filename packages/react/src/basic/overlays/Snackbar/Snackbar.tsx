import { X } from "@spexop/icons";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils/index.js";
import styles from "./Snackbar.module.css";
import type { SnackbarProps } from "./Snackbar.types.js";

/**
 * Snackbar - Accessible snackbar notification component
 *
 * A snackbar component for brief messages following "The Spexop Way":
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
 * - Portal rendering for proper z-index
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const [isVisible, setIsVisible] = useState(false);
 *
 * <Snackbar
 *   message="Changes saved successfully"
 *   variant="success"
 *   isVisible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   action={{
 *     label: "Undo",
 *     onClick: () => handleUndo()
 *   }}
 * />
 * ```
 */
export function Snackbar({
  message,
  variant = "info",
  action,
  isVisible = true,
  autoHideDuration = 4000,
  position = "bottom-center",
  onClose,
  className,
  "aria-label": ariaLabel,
  showCloseButton = true,
  animation = "slide",
  portal = true,
}: SnackbarProps) {
  const id = useId();

  // Auto-hide functionality
  useEffect(() => {
    if (autoHideDuration > 0 && isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, isVisible, onClose]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        onClose?.();
        break;
      case "Enter":
      case " ":
        if (action) {
          event.preventDefault();
          action.onClick();
        }
        break;
    }
  };

  const snackbarClassName = cn(
    styles.snackbar,
    styles[`variant-${variant}`],
    styles[`position-${position}`],
    styles[`animation-${animation}`],
    isVisible && styles.visible,
    className,
  );

  if (!isVisible) {
    return null;
  }

  const content = (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
      className={snackbarClassName}
      data-position={position}
      data-visible={isVisible}
      data-variant={variant}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.content}>
        <div className={styles.message} id={`${id}-message`}>
          {message}
        </div>

        {action && (
          <button
            type="button"
            className={styles.action}
            onClick={action.onClick}
            aria-describedby={`${id}-message`}
            tabIndex={0}
          >
            {action.label}
          </button>
        )}
      </div>

      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close notification"
          tabIndex={0}
        >
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );

  return portal ? createPortal(content, document.body) : content;
}
