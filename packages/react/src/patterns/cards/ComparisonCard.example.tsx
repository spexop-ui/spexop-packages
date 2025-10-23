/**
 * ComparisonCard Pattern - Feature comparison display
 *
 * Replaces the specialized ComparisonCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a comparison display.
 */

import { Check, X } from "@spexop/icons";
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
import styles from "./ComparisonCard.example.module.css";

export interface ComparisonFeature {
  /** Feature name */
  name: string;
  /** Feature value for each plan */
  values: (string | boolean | number)[];
}

export interface ComparisonCardProps {
  /** Plan name */
  name: string;
  /** Plan price */
  price: string;
  /** Plan description */
  description?: string;
  /** Plan features */
  features: ComparisonFeature[];
  /** Plan badge */
  badge?: string;
  /** Plan badge variant */
  badgeVariant?:
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "subtle";
  /** Plan index (0-based) */
  planIndex: number;
  /** Select plan handler */
  onSelect?: () => void;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function ComparisonCard({
  name,
  price,
  description,
  features,
  badge,
  badgeVariant = "default",
  planIndex,
  onSelect,
  variant = "basic",
  density = "normal",
  className,
}: ComparisonCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      {badge && (
        <div className={styles.badgeContainer}>
          <Badge variant={badgeVariant} size="sm">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.price}>{price}</div>
        {description && <p className={styles.description}>{description}</p>}
      </CardHeader>

      <CardBody>
        <div className={styles.features}>
          {features.map((feature, index) => {
            const value = feature.values[planIndex];
            const isBoolean = typeof value === "boolean";
            const isString = typeof value === "string";
            const isNumber = typeof value === "number";

            return (
              <div key={feature.name} className={styles.feature}>
                <div className={styles.featureName}>{feature.name}</div>
                <div className={styles.featureValue}>
                  {isBoolean ? (
                    <Icon
                      name={value ? "Check" : "X"}
                      size="sm"
                      className={`${styles.icon} ${
                        value ? styles.check : styles.cross
                      }`}
                    />
                  ) : isString || isNumber ? (
                    <span className={styles.textValue}>{value}</span>
                  ) : (
                    <span className={styles.textValue}>-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>

      <CardFooter>
        <Button
          variant="primary"
          size="md"
          onClick={onSelect}
          className={styles.selectButton}
          disabled={!onSelect}
          fullWidth
        >
          Select Plan
        </Button>
      </CardFooter>
    </Card>
  );
}

// Usage example
export function ComparisonCardExample() {
  const features: ComparisonFeature[] = [
    {
      name: "Storage",
      values: ["5GB", "50GB", "Unlimited"],
    },
    {
      name: "Users",
      values: [1, 5, "Unlimited"],
    },
    {
      name: "Support",
      values: ["Email", "Priority", "24/7"],
    },
    {
      name: "API Access",
      values: [false, true, true],
    },
  ];

  return (
    <div className={styles.grid}>
      <ComparisonCard
        name="Basic"
        price="$9/month"
        description="Perfect for individuals"
        features={features}
        planIndex={0}
        onSelect={() => console.log("Selected Basic")}
        variant="outlined"
      />

      <ComparisonCard
        name="Pro"
        price="$29/month"
        description="Perfect for teams"
        features={features}
        badge="Most Popular"
        badgeVariant="default"
        planIndex={1}
        onSelect={() => console.log("Selected Pro")}
        variant="elevated"
      />

      <ComparisonCard
        name="Enterprise"
        price="$99/month"
        description="Perfect for organizations"
        features={features}
        planIndex={2}
        onSelect={() => console.log("Selected Enterprise")}
        variant="outlined"
      />
    </div>
  );
}
