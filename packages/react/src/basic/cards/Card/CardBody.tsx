import { cn } from "../../../utils/cn.js";
import styles from "./Card.module.css";
import type { CardBodyProps } from "./Card.types.js";

/**
 * CardBody - Enhanced main content area with flex: 1 for layout flexibility
 *
 * Features:
 * - Better accessibility with ARIA attributes
 * - Improved typography and spacing
 * - Support for complex content structures
 *
 * @example
 * ```tsx
 * <CardBody>
 *   <p>Main content goes here.</p>
 * </CardBody>
 * ```
 *
 * @example
 * ```tsx
 * <CardBody aria-describedby="card-description">
 *   <div>Complex content structure</div>
 * </CardBody>
 * ```
 */
export function CardBody({
  children,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  price,
  currency = "$",
  period,
  rating,
  reviews,
  inStock,
  date,
  time,
  location,
  status,
  image,
  imageAlt,
}: CardBodyProps) {
  // Format price for pricing cards
  const formatPrice = (price: number, currency: string, period?: string) => {
    if (price === 0) return "Free";
    const formattedPrice = `${currency}${price}`;
    return period ? `${formattedPrice}/${period}` : formattedPrice;
  };

  // Format date for timeline cards
  const formatDate = (date: string | Date) => {
    if (typeof date === "string") return date;
    return date.toLocaleDateString();
  };

  // Format rating for product cards
  const formatRating = (rating: number, reviews?: number) => {
    const stars =
      "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
    return reviews ? `${stars} (${reviews})` : stars;
  };

  return (
    <div
      className={cn(styles.card__body, className)}
      role="main"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {/* Product image */}
      {image && (
        <div className={styles.card__body__image}>
          <img src={image} alt={imageAlt || "Product image"} />
        </div>
      )}

      {/* Price display for pricing cards */}
      {price !== undefined && (
        <div className={styles.card__body__price}>
          <span className={styles.card__body__price__value}>
            {formatPrice(price, currency, period)}
          </span>
        </div>
      )}

      {/* Rating display for product cards */}
      {rating !== undefined && (
        <div className={styles.card__body__rating}>
          <span className={styles.card__body__rating__stars}>
            {formatRating(rating, reviews)}
          </span>
        </div>
      )}

      {/* Stock status for product cards */}
      {inStock !== undefined && (
        <div className={styles.card__body__stock}>
          <span
            className={cn(
              styles.card__body__stock__status,
              inStock
                ? styles["card__body__stock__status--in-stock"]
                : styles["card__body__stock__status--out-of-stock"],
            )}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      )}

      {/* Event details for timeline cards */}
      {(date || time || location) && (
        <div className={styles.card__body__event}>
          {date && (
            <div className={styles.card__body__event__date}>
              📅 {formatDate(date)}
            </div>
          )}
          {time && (
            <div className={styles.card__body__event__time}>🕐 {time}</div>
          )}
          {location && (
            <div className={styles.card__body__event__location}>
              📍 {location}
            </div>
          )}
          {status && (
            <div
              className={cn(
                styles.card__body__event__status,
                styles[`card__body__event__status--${status}`],
              )}
            >
              {status === "upcoming" && "⏳ Upcoming"}
              {status === "ongoing" && "🟢 Ongoing"}
              {status === "completed" && "✅ Completed"}
            </div>
          )}
        </div>
      )}

      {/* Custom children content */}
      {children}
    </div>
  );
}

CardBody.displayName = "CardBody";
