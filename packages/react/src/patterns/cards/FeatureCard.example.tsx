/**
 * FeatureCard Pattern - Feature highlight display
 *
 * Replaces the specialized FeatureCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a feature highlight.
 */

import { Card, CardBody, CardHeader, Icon } from "@spexop/react";
import type React from "react";
import styles from "./FeatureCard.example.module.css";

export interface FeatureCardProps {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Feature icon */
  icon?: React.ReactNode;
  /** Feature image URL */
  imageUrl?: string;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  imageUrl,
  variant = "basic",
  density = "normal",
  className,
}: FeatureCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        {icon && <div className={styles.iconContainer}>{icon}</div>}
        {imageUrl && (
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt={title} className={styles.image} />
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
      </CardHeader>

      <CardBody>
        <p className={styles.description}>{description}</p>
      </CardBody>
    </Card>
  );
}

// Usage example
export function FeatureCardExample() {
  return (
    <div className={styles.grid}>
      <FeatureCard
        title="Fast Performance"
        description="Lightning-fast loading times and smooth interactions for the best user experience."
        icon={<Icon name="Zap" size="lg" />}
        variant="elevated"
      />
    </div>
  );
}
