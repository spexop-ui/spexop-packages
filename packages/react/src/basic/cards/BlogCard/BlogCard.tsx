/**
 * BlogCard Component
 * Specialized card for blog post previews
 *
 * @deprecated This component will be removed in v0.4.0.
 * Use Card composition patterns instead. See: src/patterns/cards/BlogCard.example.tsx
 *
 * @module @spexop/react/cards
 */

import { Calendar, Clock } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Card } from "../Card/Card.js";
import styles from "./BlogCard.module.css";
import type { BlogCardProps } from "./BlogCard.types.js";

/**
 * BlogCard - Displays blog post previews with metadata
 *
 * Perfect for blog listing pages, content grids, and article showcases.
 * Includes cover image, title, excerpt, author info, and tags.
 *
 * @example
 * ```tsx
 * import { BlogCard } from '@spexop/react';
 *
 * <BlogCard
 *   title="Getting Started with Spexop"
 *   excerpt="Learn how to build beautiful UIs with our design system..."
 *   coverImage="/blog/getting-started.jpg"
 *   author="Jane Smith"
 *   date="2025-10-19"
 *   readTime="5 min"
 *   tags={["Tutorial", "Beginner"]}
 *   href="/blog/getting-started"
 * />
 * ```
 */
export const BlogCard = forwardRef<HTMLAnchorElement, BlogCardProps>(
  (
    {
      title,
      excerpt,
      coverImage,
      author,
      date,
      readTime,
      tags,
      href,
      variant = "basic",
      className,
      ...props
    },
    ref,
  ) => {
    // Deprecation warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "@spexop/react: BlogCard is deprecated and will be removed in v0.4.0. " +
          "Use Card composition patterns instead. See: https://spexop.dev/patterns/cards",
      );
    }

    // Format date if it's a Date object
    const formatDate = (d: string | Date): string => {
      if (typeof d === "string") return d;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return (
      <Card
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        variant={variant}
        density="normal"
        className={cn(styles.blogCard, className)}
        {...props}
      >
        <a href={href} className={styles.blogCard}>
          {coverImage && (
            <img
              src={coverImage}
              alt={title}
              className={styles.coverImage}
              loading="lazy"
            />
          )}

          <h3 className={styles.title}>{title}</h3>

          <p className={styles.excerpt}>{excerpt}</p>

          <div className={styles.meta}>
            {author && <span className={styles.metaItem}>{author}</span>}
            {author && (date || readTime) && (
              <span className={styles.metaDivider}>·</span>
            )}
            {date && (
              <span className={styles.metaItem}>
                <Calendar size={14} />
                {formatDate(date)}
              </span>
            )}
            {readTime && (
              <>
                <span className={styles.metaDivider}>·</span>
                <span className={styles.metaItem}>
                  <Clock size={14} />
                  {readTime}
                </span>
              </>
            )}
          </div>

          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </a>
      </Card>
    );
  },
);

BlogCard.displayName = "BlogCard";
