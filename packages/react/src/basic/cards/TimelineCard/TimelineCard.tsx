/**
 * TimelineCard Component
 * Specialized card for events and timeline entries
 *
 * @module @spexop/react/cards
 */

import { Calendar, Clock, MapPin } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Card } from "../Card/Card.js";
import styles from "./TimelineCard.module.css";
import type { TimelineCardProps } from "./TimelineCard.types.js";

/**
 * TimelineCard - Displays timeline events and milestones
 *
 * Perfect for roadmaps, event listings, and project timelines.
 * Includes colored left border to indicate status.
 *
 * @example
 * ```tsx
 * import { TimelineCard } from '@spexop/react';
 * import { Rocket } from '@spexop/icons';
 *
 * <TimelineCard
 *   title="Product Launch"
 *   description="Official release of version 2.0 with new features"
 *   date="2025-11-01"
 *   time="10:00 AM PST"
 *   location="Virtual Event"
 *   status="upcoming"
 *   icon={<Rocket />}
 * />
 * ```
 */
export const TimelineCard = forwardRef<HTMLDivElement, TimelineCardProps>(
  (
    {
      title,
      description,
      date,
      time,
      location,
      status = "upcoming",
      icon,
      variant = "basic",
      className,
      ...props
    },
    ref,
  ) => {
    // Runtime deprecation warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "@spexop/react: TimelineCard is deprecated and will be removed in v0.4.0. " +
          "Use Card composition instead. See: src/patterns/cards/TimelineCard.example.tsx",
      );
    }

    // Format date if it's a Date object
    const formatDate = (d: string | Date): string => {
      if (typeof d === "string") return d;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        density="normal"
        className={cn(styles.timelineCard, styles[status], className)}
        {...props}
      >
        <div className={styles.header}>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Calendar size={16} />
            <span>{formatDate(date)}</span>
          </div>
          {time && (
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className={styles.metaItem}>
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          )}
          <div className={cn(styles.statusBadge, styles[status])}>{status}</div>
        </div>
      </Card>
    );
  },
);

TimelineCard.displayName = "TimelineCard";
