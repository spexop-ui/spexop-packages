import type { ReactNode } from "react";

/**
 * Hero layout variants
 */
export type HeroVariant =
  | "split"
  | "centered-compact"
  | "centered-spacious"
  | "minimal"
  | "full-bleed"
  | "modern"
  | "elegant"
  | "feature-showcase"
  | "title";

/**
 * Hero background styles
 */
export type HeroBackground =
  | "default"
  | "elevated"
  | "gradient"
  | "transparent";

/**
 * Content alignment options
 */
export type HeroAlign = "left" | "center" | "right";

/**
 * Content position for overlay layouts
 */
export type ContentPosition = "top" | "center" | "bottom";

/**
 * Animation sequence options
 */
export type AnimationSequence = "sequential" | "simultaneous";

/**
 * Button configuration for Hero actions
 */
export interface ButtonConfig {
  /**
   * Button label text
   */
  label: string;

  /**
   * Click handler
   */
  onClick: () => void;

  /**
   * Optional icon to display before label
   */
  iconLeft?: ReactNode;

  /**
   * Optional icon to display after label
   */
  iconRight?: ReactNode;

  /**
   * Button variant
   */
  variant?: "elevated" | "filled" | "tonal" | "outlined" | "standard";

  /**
   * Accessibility label
   */
  ariaLabel?: string;
}

/**
 * Media configuration for Hero
 */
export interface HeroMedia {
  /**
   * Media type
   */
  type: "image" | "video";

  /**
   * Media source URL
   */
  src: string;

  /**
   * Alt text for images
   */
  alt?: string;

  /**
   * Apply dark overlay
   */
  overlay?: boolean;

  /**
   * Video autoplay (muted, looped)
   */
  autoplay?: boolean;
}

/**
 * Stats configuration for Hero
 */
export interface HeroStat {
  /**
   * Stat value (e.g., "245+", "100%")
   */
  value: string;

  /**
   * Stat label/description
   */
  label: string;
}

/**
 * Feature configuration for feature-showcase variant
 */
export interface HeroFeature {
  /**
   * Feature icon element
   */
  icon: ReactNode;

  /**
   * Feature title
   */
  title: string;

  /**
   * Feature description
   */
  description: string;
}

/**
 * Animation configuration
 */
export interface HeroAnimationConfig {
  /**
   * Disable all animations
   * @default false
   */
  disabled?: boolean;

  /**
   * Animation sequence mode
   * @default "sequential"
   */
  sequence?: AnimationSequence;

  /**
   * Delay between staggered animations (ms)
   * @default 100
   */
  staggerDelay?: number;

  /**
   * Initial entrance delay (ms)
   * @default 0
   */
  entranceDelay?: number;
}

/**
 * Animated background pattern configuration
 */
export interface HeroBackgroundPattern {
  /**
   * Pattern variant
   * @default "particles"
   */
  variant: "particles" | "gradient" | "mesh";

  /**
   * Animation intensity
   * @default "medium"
   */
  intensity?: "low" | "medium" | "high";

  /**
   * Custom colors for patterns (CSS color values)
   * Defaults to theme-based colors
   */
  colors?: string[];
}

/**
 * Hero component props
 */
export interface HeroProps {
  /**
   * Layout variant
   * @default "centered"
   */
  variant?: HeroVariant;

  /**
   * Eyebrow content (badge/tag above title)
   */
  eyebrow?: ReactNode;

  /**
   * Main title text (required)
   */
  title: string;

  /**
   * Subtitle text
   */
  subtitle?: string;

  /**
   * Description/body text
   */
  description?: string;

  /**
   * Primary call-to-action button
   */
  primaryAction?: ButtonConfig;

  /**
   * Secondary call-to-action button
   */
  secondaryAction?: ButtonConfig;

  /**
   * Statistics/metrics to display
   */
  stats?: HeroStat[];

  /**
   * Background media
   */
  media?: HeroMedia;

  /**
   * Universal background media (works with all variants)
   * Applies behind content regardless of layout
   */
  backgroundMedia?: HeroMedia;

  /**
   * Background style
   * @default "default"
   */
  background?: HeroBackground;

  /**
   * Content alignment
   * @default "center"
   */
  align?: HeroAlign;

  /**
   * Animation configuration
   */
  animation?: HeroAnimationConfig;

  /**
   * Animated background pattern
   * Adds contemporary particle/gradient effects
   */
  backgroundPattern?: HeroBackgroundPattern;

  /**
   * Title heading level for semantic HTML
   * @default 1
   */
  titleLevel?: 1 | 2;

  /**
   * Title size scale multiplier
   * Multiplies the base clamp values (2.5rem, 8vw, 5rem)
   * @default 1
   * @example
   * titleSize={0.5} - 50% of default size
   * titleSize={1.5} - 150% of default size
   */
  titleSize?: number;

  /**
   * Overlay intensity for media backgrounds
   * Controls opacity of the overlay when media.overlay is true
   * @default undefined (uses default CSS opacity)
   * @example
   * overlayIntensity={0.3} - Light overlay
   * overlayIntensity={0.7} - Heavy overlay
   */
  overlayIntensity?: number;

  /**
   * Content position for overlay layouts (split, full-bleed)
   * @default "center"
   */
  contentPosition?: ContentPosition;

  /**
   * Features for feature-showcase variant
   */
  features?: HeroFeature[];

  /**
   * ARIA label for the hero section
   */
  ariaLabel?: string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}
