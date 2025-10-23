/**
 * MediaCard Pattern - Media content display
 *
 * Replaces the specialized MediaCard component removed in v0.4.0.
 * This composition pattern uses Card primitives to create a media display.
 */

import { Heart, Play, Share } from "@spexop/icons";
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
import styles from "./MediaCard.example.module.css";

export interface MediaCardProps {
  /** Media title */
  title: string;
  /** Media description */
  description?: string;
  /** Media image/video URL */
  mediaUrl: string;
  /** Media type */
  mediaType: "image" | "video";
  /** Media duration (for videos) */
  duration?: string;
  /** Media views/likes */
  views?: number;
  /** Media likes */
  likes?: number;
  /** Media tags */
  tags?: string[];
  /** Play handler */
  onPlay?: () => void;
  /** Like handler */
  onLike?: () => void;
  /** Share handler */
  onShare?: () => void;
  /** Card variant */
  variant?: "basic" | "interactive" | "elevated" | "outlined";
  /** Card density */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
}

export function MediaCard({
  title,
  description,
  mediaUrl,
  mediaType,
  duration,
  views,
  likes,
  tags,
  onPlay,
  onLike,
  onShare,
  variant = "interactive",
  density = "normal",
  className,
}: MediaCardProps) {
  return (
    <Card variant={variant} density={density} className={className}>
      <CardHeader>
        <div className={styles.mediaContainer}>
          <img
            src={mediaUrl}
            alt={title}
            className={styles.media}
            loading="lazy"
          />
          {mediaType === "video" && onPlay && (
            <Button
              variant="ghost"
              size="lg"
              className={styles.playButton}
              onClick={onPlay}
              aria-label={`Play ${title}`}
            >
              <Icon name="Play" size="lg" />
            </Button>
          )}
          {duration && <div className={styles.duration}>{duration}</div>}
        </div>
      </CardHeader>

      <CardBody>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Badge key={tag} variant="info" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardBody>

      <CardFooter>
        <div className={styles.stats}>
          {views && (
            <span className={styles.stat}>{views.toLocaleString()} views</span>
          )}
          {likes && (
            <span className={styles.stat}>{likes.toLocaleString()} likes</span>
          )}
        </div>
        <div className={styles.actions}>
          {onLike && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              className={styles.actionButton}
            >
              <Icon name="Heart" size="sm" />
            </Button>
          )}
          {onShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className={styles.actionButton}
            >
              <Icon name="Share" size="sm" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Usage example
export function MediaCardExample() {
  return (
    <div className={styles.grid}>
      <MediaCard
        title="Amazing Sunset"
        description="A beautiful sunset captured during our vacation."
        mediaUrl="/images/sunset.jpg"
        mediaType="image"
        views={1250}
        likes={89}
        tags={["nature", "sunset", "photography"]}
        onLike={() => console.log("Liked")}
        onShare={() => console.log("Shared")}
        variant="interactive"
      />
    </div>
  );
}
