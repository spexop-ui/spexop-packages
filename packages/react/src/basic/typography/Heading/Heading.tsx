/**
 * Heading Component
 * Semantic heading with typography hierarchy and alignment
 *
 * Follows "The Spexop Way":
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 6: Standards before frameworks
 * - Principle 7: Accessibility before aesthetics
 *
 * @component Heading
 * @packageName @spexop/react
 * @description Semantic heading component with typography hierarchy
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 *
 * @example
 * ```tsx
 * <Heading level={1} weight="bold" align="center">
 *   Page Title
 * </Heading>
 * ```
 */

import { cn } from "../../../utils/index.js";
import styles from "./Heading.module.css";
import type { HeadingProps } from "./Heading.types.js";

export function Heading({
  children,
  level = 2,
  weight = "bold",
  align = "left",
  size,
  variant = "default",
  as,
  noMargin = false,
  truncate = false,
  clamp,
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-live": ariaLive,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  ...props
}: HeadingProps) {
  // Create the heading element based on level or as prop
  const Tag = as || (`h${level}` as keyof JSX.IntrinsicElements);

  const headingClassName = cn(
    styles.heading,
    styles[`level-${level}`],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    styles[`variant-${variant}`],
    size && styles[`size-${size}`],
    truncate && styles.truncate,
    clamp != null && styles[`clamp-${clamp}`],
    noMargin && styles["no-margin"],
    disabled && styles.disabled,
    className,
  );

  // Handle polymorphic rendering with proper typing
  if (as) {
    return (
      <Tag
        id={id}
        className={headingClassName}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-live={ariaLive}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        tabIndex={-1}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </Tag>
    );
  }

  // Standard heading element
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag
      id={id}
      className={headingClassName}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-live={ariaLive}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      tabIndex={-1}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </HeadingTag>
  );
}
