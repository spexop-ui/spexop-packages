/**
 * PricingCard Component
 * Specialized card for pricing plans and tiers
 *
 * @deprecated This component will be removed in v0.4.0.
 * Use Card composition patterns instead. See: src/patterns/cards/PricingCard.example.tsx
 *
 * @module @spexop/react/cards
 */

import { Check } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Button } from "../../buttons/Button/Button.js";
import { Card } from "../Card/Card.js";
import styles from "./PricingCard.module.css";
import type { PricingCardProps } from "./PricingCard.types.js";

/**
 * PricingCard - Displays pricing plans with features and CTA
 *
 * Perfect for pricing pages, plan comparisons, and subscription tiers.
 * Supports badges for featured plans and customizable CTA buttons.
 *
 * @example
 * ```tsx
 * import { PricingCard } from '@spexop/react';
 *
 * <PricingCard
 *   name="Professional"
 *   price={49}
 *   period="month"
 *   badge="Popular"
 *   features={[
 *     "Unlimited projects",
 *     "Advanced analytics",
 *     "Priority support"
 *   ]}
 *   onCtaClick={() => subscribe('pro')}
 *   highlighted
 * />
 * ```
 */
export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      name,
      price,
      period = "month",
      currency = "$",
      badge,
      features,
      ctaLabel = "Get Started",
      onCtaClick,
      highlighted = false,
      variant,
      className,
      ...props
    },
    ref,
  ) => {
    // Runtime deprecation warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "@spexop/react: PricingCard is deprecated and will be removed in v0.4.0. " +
          "Use Card composition instead. See: src/patterns/cards/PricingCard.example.tsx",
      );
    }

    // Auto-select variant based on highlighted prop if not specified
    const cardVariant = variant || (highlighted ? "highlighted" : "basic");

    return (
      <Card
        ref={ref}
        variant={cardVariant}
        density="spacious"
        fullHeight
        className={cn(
          styles.pricingCard,
          highlighted && styles.highlighted,
          className,
        )}
        {...props}
      >
        {badge && <div className={styles.badge}>{badge}</div>}

        <div className={styles.header}>
          <h3 className={styles.planName}>{name}</h3>
          <div className={styles.priceContainer}>
            <span className={styles.currency}>{currency}</span>
            <span className={styles.price}>{price}</span>
            {period && <span className={styles.period}>/{period}</span>}
          </div>
        </div>

        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <Check className={styles.checkmark} size={20} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {onCtaClick && (
          <div className={styles.ctaWrapper}>
            <Button
              variant={highlighted ? "primary" : "outline"}
              onClick={onCtaClick}
              fullWidth
            >
              {ctaLabel}
            </Button>
          </div>
        )}
      </Card>
    );
  },
);

PricingCard.displayName = "PricingCard";
