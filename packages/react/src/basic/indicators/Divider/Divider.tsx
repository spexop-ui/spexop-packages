/**
 * Divider - Accessible divider component
 *
 * A divider component for visual separation of content,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - simple border-based divider
 * - Principle 3: Typography before decoration - clear labels
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - proper semantic role
 *
 * Features:
 * - Horizontal or vertical orientation
 * - Optional label
 * - Visual variants (solid, dashed, dotted)
 * - Thickness variants
 * - Label alignment
 * - Semantic HTML with proper ARIA role
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider label="OR" />
 * <Divider orientation="vertical" />
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Divider.module.css";
import type { DividerProps } from "./Divider.types.js";

export function Divider({
  orientation = "horizontal",
  label,
  labelAlign = "center",
  variant = "solid",
  thickness = "normal",
  className,
  role = "separator",
}: DividerProps) {
  const dividerClassName = cn(
    styles.divider,
    styles[`orientation-${orientation}`],
    styles[`variant-${variant}`],
    styles[`thickness-${thickness}`],
    !!label && styles["with-label"],
    !!label && styles[`label-${labelAlign}`],
    className,
  );

  if (label) {
    return (
      <div
        className={dividerClassName}
        role={role}
        aria-orientation={orientation}
      >
        <span className={styles.line} />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} />
      </div>
    );
  }

  return (
    <hr
      className={dividerClassName}
      role={role}
      aria-orientation={orientation}
    />
  );
}
