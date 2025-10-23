/**
 * TestimonialCard Pattern - Customer testimonial display
 *
 * Replaces the specialized TestimonialCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a testimonial display.
 */

import { Info } from "@spexop/icons";
import { Avatar, Card, CardBody, CardHeader, Icon } from "@spexop/react";
import React from "react";
import styles from "./TestimonialCard.example.module.css";

export interface TestimonialCardProps {
  /** Testimonial text */
  quote: string;
  /** Customer name */
  name: string;
  /** Customer title/role */
  title: string;
  /** Customer company */
  company?: string;
  /** Customer avatar URL */
  avatarUrl?: string;
  /** Customer rating (1-5) */
  rating?: number;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  title,
  company,
  avatarUrl,
  rating,
  variant = "basic",
  density = "normal",
  className,
}: TestimonialCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        <div className={styles.quoteIcon}>
          <Icon name="Info" size="lg" />
        </div>
        {rating && (
          <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="Star"
                size="sm"
                className={`${styles.star} ${
                  star <= rating ? styles.filled : styles.empty
                }`}
              />
            ))}
          </div>
        )}
      </CardHeader>

      <CardBody>
        <blockquote className={styles.quote}>"{quote}"</blockquote>
      </CardBody>

      <CardHeader>
        <div className={styles.author}>
          <Avatar
            name={name}
            src={avatarUrl}
            size="md"
            className={styles.avatar}
          />
          <div className={styles.authorInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.title}>
              {title}
              {company && ` at ${company}`}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

// Usage example
export function TestimonialCardExample() {
  return (
    <div className={styles.grid}>
      <TestimonialCard
        quote="This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed."
        name="Sarah Johnson"
        title="Product Manager"
        company="TechCorp"
        avatarUrl="/images/sarah-johnson.jpg"
        rating={5}
        variant="elevated"
      />

      <TestimonialCard
        quote="Outstanding support and a great product. Highly recommended for any team looking to improve their workflow."
        name="Mike Chen"
        title="CTO"
        company="StartupXYZ"
        rating={5}
        variant="basic"
      />
    </div>
  );
}
