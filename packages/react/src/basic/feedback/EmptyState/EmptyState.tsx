/**
 * EmptyState - Accessible empty state component
 *
 * An empty state component for displaying helpful messages when there's no content,
 * following "The Spexop Way":
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - clear messaging
 *
 * Features:
 * - Clear title and description
 * - Icon or illustration support
 * - Action button support
 * - Size variants
 * - Centered layout
 * - Semantic HTML
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search"
 *   action={<button>Clear filters</button>}
 * />
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./EmptyState.module.css";
import type { EmptyStateProps } from "./EmptyState.types.js";

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = "md",
  className,
}: EmptyStateProps) {
  const emptyStateClassName = cn(
    styles["empty-state"],
    styles[`size-${size}`],
    className,
  );

  return (
    <div className={emptyStateClassName} role="status" aria-live="polite">
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
