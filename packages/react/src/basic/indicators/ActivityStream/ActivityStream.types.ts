import type { ReactNode } from "react";

/**
 * Activity Stream Item
 *
 * Represents a single event in the activity stream
 */
export interface ActivityStreamItem {
  /** Unique identifier for the item */
  id: string;
  /** Event title */
  title: string;
  /** Event description or details */
  description?: string;
  /** Optional timestamp */
  timestamp?: string;
  /** Optional icon to display */
  icon?: ReactNode;
  /** Variant style */
  variant?: "default" | "success" | "warning" | "error" | "info";
  /** Optional custom content */
  content?: ReactNode;
}

/**
 * Activity Stream Component Props
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */
export interface ActivityStreamProps {
  /** Array of activity items to display */
  items: ActivityStreamItem[];
  /** Orientation of the timeline */
  orientation?: "vertical" | "horizontal";
  /** Show or hide connecting line */
  showLine?: boolean;
  /** Position of icon/indicator relative to content */
  iconPosition?: "left" | "right";
  /** Show timestamps */
  showTimestamps?: boolean;
  /** Compact spacing */
  density?: "compact" | "normal" | "spacious";
  /** Additional CSS class */
  className?: string;
  /** ARIA label for the stream */
  ariaLabel?: string;
}

