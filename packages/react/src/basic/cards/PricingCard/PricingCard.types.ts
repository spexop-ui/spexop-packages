/**
 * PricingCard Component Types
 *
 * @module @spexop/react/cards
 */

import type { ReactNode } from "react";

export interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Plan price (number) */
  price: number;
  /** Billing period */
  period?: string;
  /** Currency symbol */
  currency?: string;
  /** Plan features (array of strings) */
  features: string[];
  /** Whether this is the highlighted plan */
  highlighted?: boolean;
  /** Badge text for highlighted plan */
  badge?: string;
  /** CTA button label */
  ctaLabel?: string;
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
  /** Additional CSS class */
  className?: string;
  /** Click handler for CTA */
  onCtaClick?: () => void;
  /** Children elements */
  children?: ReactNode;
}
