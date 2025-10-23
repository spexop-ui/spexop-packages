import { cn } from "../../../utils/cn.js";
import { Button } from "../../buttons/Button/Button.js";
import styles from "./Card.module.css";
import type { CardFooterProps } from "./Card.types.js";

/**
 * CardFooter - Enhanced actions area with alignment options
 *
 * Features:
 * - Better accessibility with ARIA attributes
 * - Improved button grouping
 * - Modern spacing and alignment
 *
 * @example
 * ```tsx
 * <CardFooter align="right">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </CardFooter>
 * ```
 *
 * @example
 * ```tsx
 * <CardFooter align="between" aria-label="Card actions">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </CardFooter>
 * ```
 */
export function CardFooter({
  children,
  align = "right",
  noBorder = false,
  className,
  "aria-label": ariaLabel,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  onSecondaryAction,
  primaryVariant = "primary",
  secondaryVariant = "ghost",
  primaryLoading = false,
  secondaryLoading = false,
  primaryDisabled = false,
  secondaryDisabled = false,
}: CardFooterProps) {
  return (
    <div
      className={cn(
        styles.card__footer,
        styles[`card__footer--${align}`],
        noBorder && styles["card__footer--no-border"],
        className,
      )}
      role="toolbar"
      aria-label={ariaLabel}
    >
      {/* Specialized actions */}
      {(primaryAction || secondaryAction) && (
        <div className={styles.card__footer__actions}>
          {secondaryAction && onSecondaryAction && (
            <Button
              variant={secondaryVariant}
              onClick={onSecondaryAction}
              loading={secondaryLoading}
              disabled={secondaryDisabled}
              className={styles.card__footer__action}
            >
              {secondaryAction}
            </Button>
          )}
          {primaryAction && onPrimaryAction && (
            <Button
              variant={primaryVariant}
              onClick={onPrimaryAction}
              loading={primaryLoading}
              disabled={primaryDisabled}
              className={styles.card__footer__action}
            >
              {primaryAction}
            </Button>
          )}
        </div>
      )}

      {/* Custom children content */}
      {children}
    </div>
  );
}

CardFooter.displayName = "CardFooter";
