/**
 * DashboardCard Component
 * Specialized card for dashboard widgets
 *
 * @module @spexop/react/cards
 */

import { AlertCircle } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Card } from "../Card/Card.js";
import styles from "./DashboardCard.module.css";
import type { DashboardCardProps } from "./DashboardCard.types.js";

/**
 * DashboardCard - Container for dashboard widgets and charts
 *
 * Perfect for admin dashboards, analytics displays, and data visualizations.
 * Includes header with actions, loading states, and error handling.
 *
 * @example
 * ```tsx
 * import { DashboardCard } from '@spexop/react';
 * import { MoreVertical } from '@spexop/icons';
 *
 * <DashboardCard
 *   title="Revenue Overview"
 *   subtitle="Last 30 days"
 *   actions={<IconButton icon={<MoreVertical />} />}
 *   loading={false}
 * >
 *   <LineChart data={revenueData} />
 * </DashboardCard>
 * ```
 */
export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  (
    {
      title,
      subtitle,
      actions,
      children,
      loading = false,
      error,
      variant = "basic",
      className,
      ...props
    },
    ref,
  ) => {
    // Runtime deprecation warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "@spexop/react: DashboardCard is deprecated and will be removed in v0.4.0. " +
          "Use Card composition instead. See: src/patterns/cards/DashboardCard.example.tsx",
      );
    }

    return (
      <Card
        ref={ref}
        variant={variant}
        density="normal"
        fullHeight
        className={cn(styles.dashboardCard, className)}
        {...props}
      >
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          ) : error ? (
            <div className={styles.error}>
              <AlertCircle className={styles.errorIcon} />
              <span>{error}</span>
            </div>
          ) : (
            children
          )}
        </div>
      </Card>
    );
  },
);

DashboardCard.displayName = "DashboardCard";
