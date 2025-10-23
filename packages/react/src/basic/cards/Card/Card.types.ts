import type { HTMLAttributes, ReactNode } from "react";

/**
 * Card density variants
 * - compact: 16px padding (dashboard context)
 * - normal: 24px padding (default)
 * - spacious: 32px padding (blog/content context)
 */
export type CardDensity = "compact" | "normal" | "spacious";

/**
 * Card visual variants
 * - basic: Default 2px neutral border
 * - highlighted: 2px red border for emphasis
 * - outlined: 3px bold border for structure
 * - interactive: Hover changes border to red
 * - ghost: Dashed border for placeholders
 * - elevated: Colored background (keep for compatibility)
 * - featured: Full-width emphasis with gradient background and 3px border
 * - pricing: Specialized styling for pricing plans
 * - product: Specialized styling for product cards
 * - service: Specialized styling for service cards
 * - timeline: Specialized styling for timeline events
 * - default: Alias for 'basic' (backward compatibility)
 * - outline: Alias for 'outlined' (backward compatibility)
 */
export type CardVariant =
  | "basic"
  | "highlighted"
  | "outlined"
  | "interactive"
  | "ghost"
  | "elevated"
  | "featured"
  | "pricing"
  | "product"
  | "service"
  | "timeline"
  | "default"
  | "outline";

/**
 * Card interaction states
 * - idle: Default state
 * - loading: Shows loading indicator
 * - error: Shows error state
 * - success: Shows success state
 */
export type CardState = "idle" | "loading" | "error" | "success";

/**
 * Card interaction feedback
 * - none: No feedback
 * - subtle: Subtle border color change
 * - prominent: More noticeable feedback
 */
export type CardFeedback = "none" | "subtle" | "prominent";

/**
 * Card component props
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;

  /** Spacing density (padding scale) */
  density?: CardDensity;

  /** Transform to button element when clickable */
  clickable?: boolean;

  /** Stretch card to 100% height of container */
  fullHeight?: boolean;

  /** Card content */
  children?: ReactNode;

  /** Additional CSS class */
  className?: string;

  /** Click handler (requires clickable=true for button element) */
  onClick?: () => void;

  /** Card interaction state */
  state?: CardState;

  /** Interaction feedback level */
  feedback?: CardFeedback;

  /** Disabled state */
  disabled?: boolean;

  /** Loading text for loading state */
  loadingText?: string;

  /** Error message for error state */
  errorMessage?: string;

  /** Success message for success state */
  successMessage?: string;

  /** ARIA label for accessibility */
  "aria-label"?: string;

  /** ARIA described by for accessibility */
  "aria-describedby"?: string;

  /** @deprecated Use density prop instead */
  size?: CardDensity;

  /** @deprecated Use CardHeader sub-component instead */
  icon?: ReactNode | string;

  /** @deprecated Use CardHeader sub-component instead */
  title?: string;

  /** @deprecated Use CardBody sub-component instead */
  description?: string;
}

/**
 * CardHeader component props
 */
export interface CardHeaderProps {
  /** Header title */
  title?: string;

  /** Optional subtitle */
  subtitle?: string;

  /** Optional badge/tag */
  badge?: ReactNode;

  /** Sequential number badge (e.g., "01", "02", "03") */
  number?: string;

  /** Meta tag text showing relationships or outcomes */
  meta?: string;

  /** Hide bottom border */
  noBorder?: boolean;

  /** Custom content (if not using title/subtitle) */
  children?: ReactNode;

  /** Additional CSS class */
  className?: string;

  /** Title heading level (h1-h6) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /** ARIA label for title */
  "aria-label"?: string;
}

/**
 * CardBody component props
 */
export interface CardBodyProps {
  /** Body content */
  children?: ReactNode;

  /** Additional CSS class */
  className?: string;

  /** ARIA label for body content */
  "aria-label"?: string;

  /** ARIA described by for body content */
  "aria-describedby"?: string;

  /** Price value for pricing cards */
  price?: number;

  /** Currency symbol */
  currency?: string;

  /** Billing period */
  period?: string;

  /** Product rating (0-5) */
  rating?: number;

  /** Number of reviews */
  reviews?: number;

  /** Whether product is in stock */
  inStock?: boolean;

  /** Event date */
  date?: string | Date;

  /** Event time */
  time?: string;

  /** Event location */
  location?: string;

  /** Event status */
  status?: "upcoming" | "ongoing" | "completed";

  /** Product image URL */
  image?: string;

  /** Image alt text */
  imageAlt?: string;
}

/**
 * CardFooter component props
 */
export interface CardFooterProps {
  /** Footer content (typically buttons) */
  children?: ReactNode;

  /** Content alignment */
  align?: "left" | "center" | "right" | "between";

  /** Hide top border */
  noBorder?: boolean;

  /** Additional CSS class */
  className?: string;

  /** ARIA label for footer content */
  "aria-label"?: string;

  /** Primary action button label */
  primaryAction?: string;

  /** Primary action click handler */
  onPrimaryAction?: () => void;

  /** Secondary action button label */
  secondaryAction?: string;

  /** Secondary action click handler */
  onSecondaryAction?: () => void;

  /** Primary action variant */
  primaryVariant?: "primary" | "secondary" | "outline" | "ghost";

  /** Secondary action variant */
  secondaryVariant?: "primary" | "secondary" | "outline" | "ghost";

  /** Whether primary action is loading */
  primaryLoading?: boolean;

  /** Whether secondary action is loading */
  secondaryLoading?: boolean;

  /** Whether primary action is disabled */
  primaryDisabled?: boolean;

  /** Whether secondary action is disabled */
  secondaryDisabled?: boolean;
}
