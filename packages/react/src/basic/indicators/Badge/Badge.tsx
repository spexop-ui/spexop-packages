import styles from "./Badge.module.css";
import type { BadgeProps } from "./Badge.types.js";

/**
 * Badge component for displaying small pieces of information like status, counts, or labels.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="md">Error</Badge>
 * <Badge pill={false}>Version 1.0</Badge>
 * ```
 */
export function Badge({
  children,
  variant = "default",
  size = "sm",
  density = "normal",
  pill = true,
  className = "",
  style,
  ...props
}: BadgeProps) {
  const badgeClasses = [
    styles.badge,
    styles[`badge--${variant}`],
    styles[`badge--${size}`],
    styles[`density--${density}`],
    pill ? styles.badgePill : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses} style={style} {...props}>
      {children}
    </span>
  );
}

export default Badge;
