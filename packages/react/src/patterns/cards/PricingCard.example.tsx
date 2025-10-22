/**
 * PricingCard Pattern Example
 *
 * Composition example showing how to build a pricing tier card
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

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onSelect: () => void;
  onLearnMore?: () => void;
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
  onLearnMore,
}: PricingCardProps) {
  return (
    <Card
      variant={isPopular ? "highlighted" : "basic"}
      density="spacious"
      className={`pricing-card ${isPopular ? "pricing-popular" : ""}`}
    >
      <CardHeader>
        {isPopular && (
          <Badge variant="success" className="pricing-badge">
            Most Popular
          </Badge>
        )}

        <h3 className="pricing-name">{name}</h3>

        <div className="pricing-price">
          <Text size="4xl" weight="bold" className="pricing-amount">
            ${price}
          </Text>
          <Text size="lg" color="secondary" className="pricing-period">
            /{period}
          </Text>
        </div>

        <Text color="secondary" className="pricing-description">
          {description}
        </Text>
      </CardHeader>

      <CardBody>
        <ul className="pricing-features">
          {features.map((feature) => (
            <li key={feature} className="pricing-feature">
              <Text size="sm">✓ {feature}</Text>
            </li>
          ))}
        </ul>
      </CardBody>

      <CardFooter align="center">
        <div className="pricing-actions">
          <Button
            variant={isPopular ? "primary" : "outline"}
            size="lg"
            onClick={onSelect}
            className="pricing-cta"
          >
            {ctaText}
          </Button>

          {onLearnMore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLearnMore}
              className="pricing-learn-more"
            >
              Learn More
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Usage Example
export function PricingCardExample() {
  return (
    <PricingCard
      name="Pro Plan"
      price={29}
      period="month"
      description="Perfect for growing businesses and teams"
      features={[
        "Up to 10 team members",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "API access",
        "Advanced security",
      ]}
      isPopular={true}
      ctaText="Start Free Trial"
      onSelect={() => console.log("Selected Pro Plan")}
      onLearnMore={() => console.log("Learn more about Pro Plan")}
    />
  );
}

// CSS for styling (add to your stylesheet)
/*
.pricing-card {
  position: relative;
  transition: all 0.2s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--theme-shadow-lg);
}

.pricing-popular {
  border-color: var(--theme-primary);
  box-shadow: 0 0 0 1px var(--theme-primary);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.pricing-name {
  font-size: var(--theme-font-size-xl);
  font-weight: var(--theme-font-weight-bold);
  text-align: center;
  margin: 0 0 var(--theme-spacing-4) 0;
}

.pricing-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--theme-spacing-1);
  margin-bottom: var(--theme-spacing-4);
}

.pricing-amount {
  color: var(--theme-primary);
}

.pricing-period {
  font-weight: var(--theme-font-weight-normal);
}

.pricing-description {
  text-align: center;
  margin-bottom: var(--theme-spacing-6);
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pricing-feature {
  padding: var(--theme-spacing-2) 0;
  border-bottom: 1px solid var(--theme-border);
}

.pricing-feature:last-child {
  border-bottom: none;
}

.pricing-actions {
  display: flex;
  flex-direction: column;
  gap: var(--theme-spacing-3);
  width: 100%;
}

.pricing-cta {
  width: 100%;
}

.pricing-learn-more {
  width: 100%;
}
*/
