/**
 * ProductCard Component
 * Specialized card for e-commerce products
 *
 * @deprecated This component will be removed in v0.4.0.
 * Use Card composition patterns instead. See: src/patterns/cards/ProductCard.example.tsx
 *
 * @module @spexop/react/cards
 */

import { Eye, ShoppingCart, Star } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Button } from "../../buttons/Button/Button.js";
import { Card } from "../Card/Card.js";
import styles from "./ProductCard.module.css";
import type { ProductCardProps } from "./ProductCard.types.js";

/**
 * ProductCard - Displays product information for e-commerce
 *
 * Perfect for product grids, shop pages, and marketplace listings.
 * Includes image, pricing, ratings, and quick actions.
 *
 * @example
 * ```tsx
 * import { ProductCard } from '@spexop/react';
 *
 * <ProductCard
 *   name="Premium Headphones"
 *   price={299}
 *   image="/products/headphones.jpg"
 *   rating={4.5}
 *   reviews={127}
 *   badge="20% Off"
 *   onAddToCart={() => addToCart(productId)}
 *   onViewDetails={() => router.push('/products/123')}
 *   inStock={true}
 * />
 * ```
 */
export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      name,
      price,
      image,
      rating,
      reviews,
      badge,
      onAddToCart,
      onViewDetails,
      inStock = true,
      currency = "$",
      variant = "basic",
      className,
      ...props
    },
    ref,
  ) => {
    // Runtime deprecation warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "@spexop/react: ProductCard is deprecated and will be removed in v0.4.0. " +
          "Use Card composition instead. See: src/patterns/cards/ProductCard.example.tsx",
      );
    }

    // Round rating to nearest 0.5 for star display
    const roundedRating = rating ? Math.round(rating * 2) / 2 : 0;
    const fullStars = Math.floor(roundedRating);

    // Generate star positions array with unique IDs
    const starPositions = [1, 2, 3, 4, 5];

    return (
      <Card
        ref={ref}
        variant={variant}
        density="normal"
        fullHeight
        className={cn(styles.productCard, className)}
        onClick={onViewDetails}
        {...props}
      >
        {badge && <div className={styles.badge}>{badge}</div>}

        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} loading="lazy" />
          {!inStock && <div className={styles.outOfStock}>Out of Stock</div>}
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>
            {currency}
            {price.toFixed(2)}
          </p>
        </div>

        {rating !== undefined && (
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {starPositions.map((position) => (
                <Star
                  key={`star-${position}`}
                  className={cn(
                    styles.star,
                    position > fullStars && styles.empty,
                  )}
                  size={16}
                  fill={position <= fullStars ? "currentColor" : "none"}
                />
              ))}
            </div>
            {reviews !== undefined && (
              <span className={styles.reviewCount}>({reviews})</span>
            )}
          </div>
        )}

        {onAddToCart && (
          <div className={styles.actions}>
            <Button
              variant="primary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onAddToCart();
              }}
              disabled={!inStock}
              fullWidth
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
            {onViewDetails && (
              <Button
                variant="ghost"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
              >
                <Eye size={18} />
              </Button>
            )}
          </div>
        )}
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";
