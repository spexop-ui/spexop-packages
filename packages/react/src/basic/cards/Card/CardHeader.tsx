import { cn } from "../../../utils/cn.js";
import styles from "./Card.module.css";
import type { CardHeaderProps } from "./Card.types.js";

/**
 * CardHeader - Enhanced title area with optional subtitle and badge
 *
 * Features:
 * - Semantic heading levels (h1-h6)
 * - Better accessibility with ARIA attributes
 * - Flexible badge positioning
 * - Modern spacing and typography
 *
 * @example
 * ```tsx
 * <CardHeader title="Card Title" subtitle="Subtitle text" />
 * ```
 *
 * @example
 * ```tsx
 * <CardHeader
 *   title="Featured"
 *   badge={<Badge>New</Badge>}
 *   headingLevel={2}
 * />
 * ```
 */
export function CardHeader({
  title,
  subtitle,
  badge,
  number,
  meta,
  noBorder = false,
  children,
  className,
  headingLevel = 3,
  "aria-label": ariaLabel,
}: CardHeaderProps) {
  // Custom children mode
  if (children && !title) {
    return (
      <div
        className={cn(
          styles.card__header,
          noBorder && styles["card__header--no-border"],
          className,
        )}
        role="banner"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    );
  }

  // Structured mode with semantic heading
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <div
      className={cn(
        styles.card__header,
        noBorder && styles["card__header--no-border"],
        className,
      )}
      role="banner"
      aria-label={ariaLabel}
    >
      <div className={styles.card__header__content}>
        {/* Number badge (for service cards) */}
        {number && <div className={styles.card__header__number}>{number}</div>}

        {/* Regular badge */}
        {badge && (
          <div
            className={styles.card__header__badge}
            role="img"
            aria-label="Status badge"
          >
            {badge}
          </div>
        )}

        <div className={styles.card__header__text}>
          {title && (
            <HeadingTag
              className={styles.card__title}
              id={
                title
                  ? `card-title-${title.toLowerCase().replace(/\s+/g, "-")}`
                  : undefined
              }
            >
              {title}
            </HeadingTag>
          )}
          {subtitle && (
            <p
              className={styles.card__subtitle}
              aria-describedby={
                title
                  ? `card-title-${title.toLowerCase().replace(/\s+/g, "-")}`
                  : undefined
              }
            >
              {subtitle}
            </p>
          )}

          {/* Meta tag (for service cards) */}
          {meta && <span className={styles.card__header__meta}>{meta}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}

CardHeader.displayName = "CardHeader";
