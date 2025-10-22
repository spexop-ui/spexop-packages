/**
 * BlogCard Pattern Example
 *
 * Composition example showing how to build a blog post card
 * using Card primitives and other Spexop components.
 *
 * This is NOT an exported component - it's a pattern example
 * that demonstrates composition techniques.
 */

import { Avatar, Badge, Card, CardBody, CardHeader, Text } from "@spexop/react";
import type { ReactNode } from "react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  href?: string;
}

export function BlogCard({
  title,
  excerpt,
  coverImage,
  author,
  date,
  readTime,
  tags,
  href,
}: BlogCardProps) {
  return (
    <Card
      variant="basic"
      density="normal"
      className="blog-card"
      onClick={href ? () => window.open(href, "_blank") : undefined}
    >
      <CardHeader>
        {coverImage && (
          <img src={coverImage} alt={title} className="blog-cover-image" />
        )}
        <h3 className="blog-title">{title}</h3>
      </CardHeader>

      <CardBody>
        <Text className="blog-excerpt" color="secondary">
          {excerpt}
        </Text>

        <div className="blog-meta">
          <Avatar src={author.avatar} name={author.name} size="sm" />
          <div className="blog-author-info">
            <Text size="sm" weight="semibold">
              {author.name}
            </Text>
            <Text size="xs" color="secondary">
              {date} • {readTime} read
            </Text>
          </div>
        </div>

        <div className="blog-tags">
          {tags.map((tag) => (
            <Badge key={tag} variant="subtle" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// Usage Example
export function BlogCardExample() {
  return (
    <BlogCard
      title="Getting Started with Spexop Design System"
      excerpt="Learn how to build beautiful, accessible interfaces using Spexop's primitives-first approach. Master the grid system, then build anything."
      coverImage="/blog/getting-started.jpg"
      author={{
        name: "Jane Smith",
        avatar: "/avatars/jane-smith.jpg",
      }}
      date="October 22, 2025"
      readTime="5 min"
      tags={["Tutorial", "Design System", "React"]}
      href="/blog/getting-started"
    />
  );
}

// CSS for styling (add to your stylesheet)
/*
.blog-card {
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.blog-card:hover {
  border-color: var(--theme-border-strong);
}

.blog-cover-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--theme-radius-sm);
  margin-bottom: var(--theme-spacing-4);
}

.blog-title {
  font-size: var(--theme-font-size-lg);
  font-weight: var(--theme-font-weight-bold);
  line-height: 1.3;
  margin: 0 0 var(--theme-spacing-3) 0;
}

.blog-excerpt {
  line-height: 1.6;
  margin-bottom: var(--theme-spacing-4);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: var(--theme-spacing-3);
  margin-bottom: var(--theme-spacing-4);
}

.blog-author-info {
  display: flex;
  flex-direction: column;
  gap: var(--theme-spacing-1);
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--theme-spacing-2);
}
*/
