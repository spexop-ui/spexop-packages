/**
 * EventCard Pattern - Event listing display
 *
 * Replaces the specialized EventCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create an event display.
 */

import { Calendar, Clock, MapPin } from "@spexop/icons";
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
import styles from "./EventCard.example.module.css";

export interface EventCardProps {
  /** Event title */
  title: string;
  /** Event description */
  description?: string;
  /** Event date */
  date: string;
  /** Event time */
  time?: string;
  /** Event location */
  location?: string;
  /** Event image URL */
  imageUrl?: string;
  /** Event category */
  category?: string;
  /** Event price */
  price?: string;
  /** Event status */
  status?: "upcoming" | "live" | "ended";
  /** Register handler */
  onRegister?: () => void;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  category,
  price,
  status = "upcoming",
  onRegister,
  variant = "basic",
  density = "normal",
  className,
}: EventCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={title}
            className={styles.image}
            loading="lazy"
          />
          {status === "live" && (
            <Badge variant="error" size="sm" className={styles.liveBadge}>
              LIVE
            </Badge>
          )}
        </div>
      )}

      <CardHeader>
        <div className={styles.eventHeader}>
          {category && (
            <Badge variant="info" size="sm">
              {category}
            </Badge>
          )}
          <h3 className={styles.title}>{title}</h3>
        </div>
      </CardHeader>

      <CardBody>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.eventDetails}>
          <div className={styles.detail}>
            <Icon name="Calendar" size="sm" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          {time && (
            <div className={styles.detail}>
              <Icon name="Clock" size="sm" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className={styles.detail}>
              <Icon name="MapPin" size="sm" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter>
        <div className={styles.eventFooter}>
          {price && <div className={styles.price}>{price}</div>}
          {onRegister && (
            <Button
              variant="primary"
              size="sm"
              onClick={onRegister}
              className={styles.registerButton}
            >
              {status === "live" ? "Join Now" : "Register"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Usage example
export function EventCardExample() {
  return (
    <div className={styles.grid}>
      <EventCard
        title="React Conference 2025"
        description="Join us for the biggest React conference of the year with amazing speakers and workshops."
        date="2025-03-15"
        time="9:00 AM - 6:00 PM"
        location="San Francisco, CA"
        imageUrl="/images/react-conference.jpg"
        category="Technology"
        price="Free"
        status="upcoming"
        onRegister={() => console.log("Registered")}
        variant="interactive"
      />
    </div>
  );
}
