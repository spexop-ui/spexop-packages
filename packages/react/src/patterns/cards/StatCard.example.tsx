/**
 * StatCard Pattern - Statistics display
 *
 * Replaces the specialized StatCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a statistics display.
 */

import { Card, CardBody, CardHeader, Icon } from "@spexop/react";
import type React from "react";
import styles from "./StatCard.example.module.css";

export interface StatCardProps {
  /** Statistic value */
  value: string | number;
  /** Statistic label */
  label: string;
  /** Statistic icon */
  icon?: React.ReactNode;
  /** Change percentage */
  change?: number;
  /** Change period */
  changePeriod?: string;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  change,
  changePeriod = "vs last month",
  variant = "basic",
  density = "normal",
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        <div className={styles.statHeader}>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
          <div className={styles.value}>{value}</div>
        </div>
        <div className={styles.label}>{label}</div>
        {change !== undefined && (
          <div
            className={`${styles.change} ${
              isPositive ? styles.positive : isNegative ? styles.negative : ""
            }`}
          >
            {isPositive ? "+" : ""}
            {change}% {changePeriod}
          </div>
        )}
      </CardHeader>
    </Card>
  );
}

// Usage example
export function StatCardExample() {
  return (
    <div className={styles.grid}>
      <StatCard
        value="2,847"
        label="Total Users"
        icon={<Icon name="Users" size="lg" />}
        change={12.5}
        variant="elevated"
      />
    </div>
  );
}
