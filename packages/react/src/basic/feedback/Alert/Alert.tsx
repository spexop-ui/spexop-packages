/**
 * Alert - Accessible alert component
 *
 * An alert component for displaying important messages,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with semantic colors
 * - Principle 3: Typography before decoration - bold title, clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Semantic variants (info, success, warning, error)
 * - Optional dismissible functionality
 * - Icons support (default or custom)
 * - Screen reader accessible with ARIA
 * - High contrast colors
 * - Keyboard accessible dismiss button
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success">
 *   Your changes have been saved.
 * </Alert>
 * ```
 */

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "@spexop/icons";
import { cn } from "../../../utils/index.js";
import styles from "./Alert.module.css";
import type { AlertProps } from "./Alert.types.js";

const defaultIcons = {
  info: <Info size={20} strokeWidth={2} />,
  success: <CheckCircle size={20} strokeWidth={2} />,
  warning: <AlertTriangle size={20} strokeWidth={2} />,
  error: <AlertCircle size={20} strokeWidth={2} />,
};

export function Alert({
  children,
  title,
  variant = "info",
  dismissible = false,
  onDismiss,
  icon,
  showIcon = true,
  className,
  role = "alert",
}: AlertProps) {
  const displayIcon = icon || (showIcon ? defaultIcons[variant] : null);

  const alertClassName = cn(
    styles.alert,
    styles[`variant-${variant}`],
    className,
  );

  return (
    <div
      className={alertClassName}
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
    >
      {displayIcon && <div className={styles.icon}>{displayIcon}</div>}

      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className={styles["dismiss-button"]}
          aria-label="Dismiss alert"
          tabIndex={0}
        >
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
