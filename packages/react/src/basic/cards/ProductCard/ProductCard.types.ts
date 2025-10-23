/**
 * ProductCard Component Types
 *
 * @module @spexop/react/cards
 */

import type { ReactNode } from "react";

export interface ProductCardProps {
  /** Product name/title */
  name: string;
  /** Product price (number) */
  price: number;
  /** Product image URL */
  image?: string;
  /** Product rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviews?: number;
  /** Product badge text */
  badge?: string;
  /** Whether product is in stock */
  inStock?: boolean;
  /** Currency symbol */
  currency?: string;
  /** Card variant */
  variant?:
    | "basic"
    | "highlighted"
    | "outlined"
    | "interactive"
    | "ghost"
    | "elevated"
    | "default"
    | "outline";
  /** Click handler for add to cart */
  onAddToCart?: () => void;
  /** Click handler for view details */
  onViewDetails?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Children elements */
  children?: ReactNode;
}
