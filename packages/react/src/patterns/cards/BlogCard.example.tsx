/**
 * BlogCard Pattern - Article preview with metadata
 *
 * Replaces the specialized BlogCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a blog post preview.
 *
 * @example
 * ```tsx
 * <BlogCard
 *   title="Getting Started with React"
 *   author="Jane Doe"
 *   date="2025-10-22"
 *   tags={["Tutorial", "React", "JavaScript"]}
 *   excerpt="Learn the fundamentals of React development..."
 *   imageUrl="/images/blog-post.jpg"
 *   readTime="5 min read"
 *   href="/blog/getting-started-react"
 * />
 * ```
 */

import { Avatar, Badge, Card, CardBody, CardHeader, Link } from "@spexop/react";
import React from "react";
import styles from "./BlogCard.example.module.css";

export interface BlogCardProps {
  /** Article title */
  title: string;
  /** Author name */
  author: string;
  /** Publication date */
  date: string;
  /** Article tags */
  tags: string[];
  /** Article excerpt */
  excerpt: string;
  /** Featured image URL */
  imageUrl?: string;
  /** Estimated read time */
  readTime?: string;
  /** Article URL */
  href?: string;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function BlogCard({
  title,
  author,
  date,
  tags,
  excerpt,
  imageUrl,
  readTime,
  href,
  variant = "basic",
  density = "normal",
  className,
}: BlogCardProps) {
  return (
    <>
      {href ? (
        <Link href={href} className={styles.link}>
          <Card variant={variant} density={density} className={className}>
            {imageUrl && (
              <div className={styles.imageContainer}>
                <img
                  src={imageUrl}
                  alt={title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            )}

            <CardHeader>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.meta}>
                <Avatar name={author} size="sm" />
                <div className={styles.authorInfo}>
                  <span className={styles.author}>{author}</span>
                  <div className={styles.dateTime}>
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString()}
                    </time>
                    {readTime && (
                      <span className={styles.readTime}>• {readTime}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <p className={styles.excerpt}>{excerpt}</p>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <Badge key={tag} variant="info" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        </Link>
      ) : (
        <Card variant={variant} density={density} className={className}>
          {imageUrl && (
            <div className={styles.imageContainer}>
              <img
                src={imageUrl}
                alt={title}
                className={styles.image}
                loading="lazy"
              />
            </div>
          )}

          <CardHeader>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.meta}>
              <Avatar name={author} size="sm" />
              <div className={styles.authorInfo}>
                <span className={styles.author}>{author}</span>
                <div className={styles.dateTime}>
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString()}
                  </time>
                  {readTime && (
                    <span className={styles.readTime}>• {readTime}</span>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <p className={styles.excerpt}>{excerpt}</p>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Badge key={tag} variant="info" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}

// Usage example
export function BlogCardExample() {
  return (
    <div className={styles.grid}>
      <BlogCard
        title="Getting Started with React"
        author="Jane Doe"
        date="2025-10-22"
        tags={["Tutorial", "React", "JavaScript"]}
        excerpt="Learn the fundamentals of React development with this comprehensive guide covering components, hooks, and state management."
        imageUrl="/images/blog-post.jpg"
        readTime="5 min read"
        href="/blog/getting-started-react"
        variant="interactive"
      />

      <BlogCard
        title="Advanced TypeScript Patterns"
        author="John Smith"
        date="2025-10-20"
        tags={["TypeScript", "Advanced", "Patterns"]}
        excerpt="Explore advanced TypeScript patterns and techniques for building robust applications."
        readTime="8 min read"
        href="/blog/advanced-typescript"
        variant="basic"
        density="compact"
      />
    </div>
  );
}
