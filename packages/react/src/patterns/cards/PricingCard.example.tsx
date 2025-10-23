/**
 * PricingCard Pattern - Pricing plan comparison
 *
 * Replaces the specialized PricingCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a pricing plan display.
 *
 * @example
 * ```tsx
 * <PricingCard
 *   name="Pro Plan"
 *   price={29}
 *   period="month"
 *   description="Perfect for growing businesses"
 *   features={["Feature 1", "Feature 2", "Feature 3"]}
 *   isPopular={true}
 *   ctaText="Get Started"
 *   onSelect={() => console.log('Selected Pro Plan')}
 * />
 * ```
 */

import { Check, Star } from "@spexop/icons";
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
import styles from "./PricingCard.example.module.css";

export interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Plan price */
  price: number;
  /** Billing period */
  period: "month" | "year" | "one-time";
  /** Plan description */
  description: string;
  /** List of features */
  features: string[];
  /** Whether this is the popular/recommended plan */
  isPopular?: boolean;
  /** Call-to-action button text */
  ctaText: string;
  /** Select plan handler */
  onSelect?: () => void;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  isPopular = false,
  ctaText,
  onSelect,
  variant = "basic",
  density = "normal",
  className,
}: PricingCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `$${price}`;
  };

  const formatPeriod = (period: string) => {
    switch (period) {
      case "month":
        return "/month";
      case "year":
        return "/year";
      case "one-time":
        return " one-time";
      default:
        return "";
    }
  };

  return (
    <Card
      variant={isPopular ? "elevated" : variant}
      density={density}
      className={`${className} ${isPopular ? styles.popular : ""}`}
    >
      {isPopular && (
        <div className={styles.popularBadge}>
          <Badge variant="success" size="sm">
            <Icon name="Star" size="sm" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <span className={styles.period}>{formatPeriod(period)}</span>
        </div>
        <p className={styles.description}>{description}</p>
      </CardHeader>

      <CardBody>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <Icon name="Check" size="sm" className={styles.checkIcon} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>

      <CardFooter>
        <Button
          variant={isPopular ? "primary" : "outline"}
          size="md"
          onClick={onSelect}
          className={styles.ctaButton}
          disabled={!onSelect}
          fullWidth
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Usage example
export function PricingCardExample() {
  return (
    <div className={styles.grid}>
      <PricingCard
        name="Starter"
        price={0}
        period="month"
        description="Perfect for individuals getting started"
        features={[
          "Up to 5 projects",
          "Basic support",
          "1GB storage",
          "Email notifications",
        ]}
        ctaText="Get Started"
        onSelect={() => console.log("Selected Starter")}
        variant="outlined"
      />

      <PricingCard
        name="Pro"
        price={29}
        period="month"
        description="Perfect for growing businesses"
        features={[
          "Unlimited projects",
          "Priority support",
          "10GB storage",
          "Advanced analytics",
          "Team collaboration",
          "API access",
        ]}
        isPopular={true}
        ctaText="Start Free Trial"
        onSelect={() => console.log("Selected Pro")}
      />

      <PricingCard
        name="Enterprise"
        price={99}
        period="month"
        description="For large organizations"
        features={[
          "Everything in Pro",
          "Custom integrations",
          "Dedicated support",
          "Unlimited storage",
          "Advanced security",
          "Custom branding",
        ]}
        ctaText="Contact Sales"
        onSelect={() => console.log("Selected Enterprise")}
        variant="outlined"
      />
    </div>
  );
}
