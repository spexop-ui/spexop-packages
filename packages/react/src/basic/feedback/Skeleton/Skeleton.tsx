/**
 * Skeleton - Accessible skeleton loader component
 *
 * A skeleton loader component for content placeholders,
 * following "The Spexop Way":
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - proper ARIA
 *
 * Features:
 * - Multiple shape variants
 * - Customizable width and height
 * - Smooth pulse animation
 * - Reduced motion support
 * - Screen reader accessible
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./Skeleton.types.js";

export function Skeleton({
  width,
  height,
  variant = "text",
  animate = true,
  className,
}: SkeletonProps) {
  const skeletonClassName = cn(
    styles.skeleton,
    styles[`variant-${variant}`],
    animate && styles.animate,
    className,
  );

  const style: React.CSSProperties = {};

  if (width !== undefined) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }

  if (height !== undefined) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  return (
    <div
      className={skeletonClassName}
      style={style}
      role="status"
      aria-label="Loading content"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles["sr-only"]}>Loading...</span>
    </div>
  );
}
