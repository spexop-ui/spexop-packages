/**
 * ProductCard Pattern Example
 *
 * Composition example showing how to build an e-commerce product card
 * using Card primitives and other Spexop components.
 *
 * This is NOT an exported component - it's a pattern example
 * that demonstrates composition techniques.
 */

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@spexop/react";
import type { ReactNode } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category?: string;
  onAddToCart: () => void;
  onViewDetails: () => void;
  onToggleWishlist?: () => void;
  isInWishlist?: boolean;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  category,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  isInWishlist = false,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <Card variant="interactive" density="normal" className="product-card">
      <CardHeader>
        {discount > 0 && (
          <Badge variant="error" className="product-discount">
            -{discount}%
          </Badge>
        )}

        {onToggleWishlist && (
          <button
            type="button"
            className={`product-wishlist ${isInWishlist ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            ♥
          </button>
        )}

        <img src={image} alt={name} className="product-image" />
      </CardHeader>

      <CardBody>
        {category && (
          <Text size="sm" color="secondary" className="product-category">
            {category}
          </Text>
        )}

        <h3 className="product-name">{name}</h3>

        <div className="product-rating">
          <div className="stars" aria-label={`${rating} out of 5 stars`}>
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </div>
          <Text size="sm" color="secondary">
            {rating} ({reviewCount} reviews)
          </Text>
        </div>

        <div className="product-pricing">
          <Text size="lg" weight="bold" className="product-price">
            ${price.toFixed(2)}
          </Text>
          {originalPrice && (
            <Text size="sm" color="secondary" className="original-price">
              ${originalPrice.toFixed(2)}
            </Text>
          )}
        </div>
      </CardBody>

      <CardFooter align="between">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          View Details
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

// Usage Example
export function ProductCardExample() {
  return (
    <ProductCard
      name="Wireless Bluetooth Headphones"
      price={79.99}
      originalPrice={99.99}
      image="/products/headphones.jpg"
      rating={4.5}
      reviewCount={128}
      category="Electronics"
      onAddToCart={() => console.log("Added to cart")}
      onViewDetails={() => console.log("View details")}
      onToggleWishlist={() => console.log("Toggle wishlist")}
      isInWishlist={false}
    />
  );
}

// CSS for styling (add to your stylesheet)
/*
.product-card {
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--theme-shadow-lg);
}

.product-discount {
  position: absolute;
  top: var(--theme-spacing-2);
  left: var(--theme-spacing-2);
  z-index: 1;
}

.product-wishlist {
  position: absolute;
  top: var(--theme-spacing-2);
  right: var(--theme-spacing-2);
  z-index: 1;
  background: var(--theme-surface);
  border: 2px solid var(--theme-border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-wishlist:hover {
  border-color: var(--theme-primary);
}

.product-wishlist.active {
  color: var(--theme-destructive);
  border-color: var(--theme-destructive);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--theme-radius-sm);
}

.product-category {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--theme-spacing-2);
}

.product-name {
  font-size: var(--theme-font-size-lg);
  font-weight: var(--theme-font-weight-semibold);
  line-height: 1.3;
  margin: 0 0 var(--theme-spacing-3) 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: var(--theme-spacing-2);
  margin-bottom: var(--theme-spacing-3);
}

.stars {
  color: var(--theme-warning);
  font-size: var(--theme-font-size-sm);
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: var(--theme-spacing-2);
}

.product-price {
  color: var(--theme-primary);
}

.original-price {
  text-decoration: line-through;
}
*/
