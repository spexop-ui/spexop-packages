/**
 * ProductCard Pattern - E-commerce product display
 *
 * Replaces the specialized ProductCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a product display.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   name="Wireless Headphones"
 *   price={99.99}
 *   originalPrice={129.99}
 *   imageUrl="/images/headphones.jpg"
 *   rating={4.5}
 *   reviewCount={128}
 *   badge="Sale"
 *   onAddToCart={() => console.log('Added to cart')}
 *   onQuickView={() => console.log('Quick view')}
 * />
 * ```
 */

import { Eye, ShoppingCart, Star } from "@spexop/icons";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
} from "@spexop/react";
import React from "react";
import styles from "./ProductCard.example.module.css";

export interface ProductCardProps {
  /** Product name */
  name: string;
  /** Current price */
  price: number;
  /** Original price (for showing discount) */
  originalPrice?: number;
  /** Product image URL */
  imageUrl: string;
  /** Product rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge text (e.g., "Sale", "New", "Limited") */
  badge?: string;
  /** Badge variant */
  badgeVariant?:
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "subtle";
  /** Add to cart handler */
  onAddToCart?: () => void;
  /** Quick view handler */
  onQuickView?: () => void;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  imageUrl,
  rating,
  reviewCount,
  badge,
  badgeVariant = "default",
  onAddToCart,
  onQuickView,
  variant = "interactive",
  density = "normal",
  className,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
          {badge && (
            <div className={styles.badgeContainer}>
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            </div>
          )}
          {hasDiscount && (
            <div className={styles.discountBadge}>
              <Badge variant="error" size="sm">
                -{discount}%
              </Badge>
            </div>
          )}
          {onQuickView && (
            <Button
              variant="ghost"
              size="sm"
              className={styles.quickViewButton}
              onClick={onQuickView}
              aria-label={`Quick view ${name}`}
            >
              <Icon name="Eye" size="sm" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardBody>
        <h3 className={styles.name}>{name}</h3>

        {rating !== undefined && (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size="sm"
                  className={`${styles.star} ${
                    star <= Math.floor(rating) ? styles.filled : styles.empty
                  }`}
                />
              ))}
            </div>
            <span className={styles.ratingText}>
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        )}

        <div className={styles.priceContainer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>
              ${originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </CardBody>

      <CardFooter>
        <Button
          variant="primary"
          size="sm"
          onClick={onAddToCart}
          className={styles.addToCartButton}
          disabled={!onAddToCart}
        >
          <Icon name="ShoppingCart" size="sm" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

// Usage example
export function ProductCardExample() {
  return (
    <div className={styles.grid}>
      <ProductCard
        name="Wireless Headphones"
        price={99.99}
        originalPrice={129.99}
        imageUrl="/images/headphones.jpg"
        rating={4.5}
        reviewCount={128}
        badge="Sale"
        badgeVariant="error"
        onAddToCart={() => console.log("Added to cart")}
        onQuickView={() => console.log("Quick view")}
        variant="interactive"
      />

      <ProductCard
        name="Smart Watch"
        price={199.99}
        imageUrl="/images/smartwatch.jpg"
        rating={4.8}
        reviewCount={256}
        badge="New"
        badgeVariant="success"
        onAddToCart={() => console.log("Added to cart")}
        variant="basic"
        density="compact"
      />
    </div>
  );
}
