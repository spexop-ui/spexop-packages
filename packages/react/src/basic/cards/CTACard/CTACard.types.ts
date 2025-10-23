/**
 * CTACard Types
 * @module @spexop/react/cards
 */

import type {
  CardDensity,
  CardFeedback,
  CardState,
  CardVariant,
} from "../Card/Card.types.js";

/**
 * Action button configuration
 */
export interface CTAAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant override */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

/**
 * Props for CTACard component
 */
export interface CTACardProps {
  /** Main headline */
  headline: string;
  /** Supporting description */
  description: string;
  /** Primary action button */
  primaryAction: CTAAction;
  /** Optional secondary action button */
  secondaryAction?: CTAAction;
  /** Optional icon or illustration */
  icon?: React.ReactNode;
  /** Card visual variant */
  variant?: CardVariant;
  /** Card density */
  density?: CardDensity;
  /** Center align content */
  centered?: boolean;
  /** Card state */
  state?: CardState;
  /** Feedback level */
  feedback?: CardFeedback;
  /** Loading text */
  loadingText?: string;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Accessibility label */
  "aria-label"?: string;
  /** Accessibility description */
  "aria-describedby"?: string;
}
