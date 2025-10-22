/**
 * FeatureCard Pattern Example
 *
 * Composition example showing how to build a product feature card
 * using Card primitives and other Spexop components.
 *
 * This is NOT an exported component - it's a pattern example
 * that demonstrates composition techniques.
 */

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from "@spexop/react";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: "default" | "highlighted";
}

export function FeatureCard({
  icon,
  title,
  description,
  ctaText,
  onCtaClick,
  variant = "default",
}: FeatureCardProps) {
  return (
    <Card
      variant={variant === "highlighted" ? "highlighted" : "basic"}
      density="normal"
      className="feature-card"
    >
      <CardHeader>
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
      </CardHeader>

      <CardBody>
        <Text className="feature-description" color="secondary">
          {description}
        </Text>
      </CardBody>

      {ctaText && onCtaClick && (
        <CardFooter align="center">
          <Button
            variant="outline"
            size="sm"
            onClick={onCtaClick}
            className="feature-cta"
          >
            {ctaText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

// Usage Example
export function FeatureCardExample() {
  return (
    <FeatureCard
      icon={<div className="icon-placeholder">🚀</div>}
      title="Fast Performance"
      description="Built with modern web technologies for lightning-fast load times and smooth interactions."
      ctaText="Learn More"
      onCtaClick={() => console.log("Learn more about performance")}
    />
  );
}

// CSS for styling (add to your stylesheet)
/*
.feature-card {
  text-align: center;
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--theme-shadow-md);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--theme-spacing-4) auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--theme-surface-hover);
  border-radius: var(--theme-radius-lg);
  font-size: 24px;
}

.feature-title {
  font-size: var(--theme-font-size-lg);
  font-weight: var(--theme-font-weight-bold);
  margin: 0 0 var(--theme-spacing-3) 0;
}

.feature-description {
  line-height: 1.6;
  margin-bottom: var(--theme-spacing-4);
}

.feature-cta {
  width: 100%;
}
*/
