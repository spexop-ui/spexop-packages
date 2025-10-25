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
   * @recommended Use values between 0.5 and 2.0 for best results
   * @example
   * titleSize={0.5} - 50% of default size
   * titleSize={1.5} - 150% of default size
   */
  titleSize?: number;

  /**
   * Title text color (CSS color or design token)
   * @default "var(--theme-text)"
   * @example
   * titleColor="var(--theme-primary)"
   * titleColor="#FF5733"
   */
  titleColor?: string;

  /**
   * Title font weight
   * @default "var(--theme-font-weight-bold)"
   * @example
   * titleWeight={700}
   * titleWeight="bold"
   */
  titleWeight?: number | string;

  /**
   * Title letter spacing
   * @default "-0.02em"
   * @example
   * titleLetterSpacing="0"
   * titleLetterSpacing="0.05em"
   */
  titleLetterSpacing?: string;

  /**
   * Title max width
   * @default undefined
   * @example
   * titleMaxWidth="800px"
   * titleMaxWidth="60ch"
   */
  titleMaxWidth?: string;

  /**
   * Title opacity
   * @default 1
   * @example
   * titleOpacity={0.9}
   */
  titleOpacity?: number;

  /**
   * Title line height
   * @default "1.1"
   * @example
   * titleLineHeight={1.2}
   * titleLineHeight="1.5"
   */
  titleLineHeight?: number | string;

  /**
   * Subtitle size scale multiplier
   * Multiplies the base clamp values (1.25rem, 3vw, 1.75rem)
   * @default 1
   * @recommended Use values between 0.5 and 2.0 for best results
   * @example
   * subtitleSize={0.8} - 80% of default size
   * subtitleSize={1.2} - 120% of default size
   */
  subtitleSize?: number;

  /**
   * Subtitle text color (CSS color or design token)
   * @default "var(--theme-text-secondary)"
   * @example
   * subtitleColor="var(--theme-text)"
   * subtitleColor="var(--theme-primary)"
   */
  subtitleColor?: string;

  /**
   * Subtitle font weight
   * @default "var(--theme-font-weight-semibold)"
   * @example
   * subtitleWeight={600}
   * subtitleWeight="semibold"
   */
  subtitleWeight?: number | string;

  /**
   * Subtitle letter spacing
   * @default "-0.01em"
   * @example
   * subtitleLetterSpacing="0"
   * subtitleLetterSpacing="0.02em"
   */
  subtitleLetterSpacing?: string;

  /**
   * Subtitle max width
   * @default undefined
   * @example
   * subtitleMaxWidth="700px"
   * subtitleMaxWidth="70ch"
   */
  subtitleMaxWidth?: string;

  /**
   * Subtitle opacity
   * @default 1
   * @example
   * subtitleOpacity={0.9}
   */
  subtitleOpacity?: number;

  /**
   * Subtitle line height
   * @default "1.4"
   * @example
   * subtitleLineHeight={1.5}
   * subtitleLineHeight="1.6"
   */
  subtitleLineHeight?: number | string;

  /**
   * Description size scale multiplier
   * Multiplies the base clamp values (1rem, 2vw, 1.125rem)
   * @default 1
   * @recommended Use values between 0.5 and 2.0 for best results
   * @example
   * descriptionSize={0.9} - 90% of default size
   * descriptionSize={1.1} - 110% of default size
   */
  descriptionSize?: number;

  /**
   * Description text color (CSS color or design token)
   * @default "var(--theme-text-secondary)"
   * @example
   * descriptionColor="var(--theme-text)"
   */
  descriptionColor?: string;

  /**
   * Description font weight
   * @default "var(--theme-font-weight-regular)"
   * @example
   * descriptionWeight={500}
   * descriptionWeight="medium"
   */
  descriptionWeight?: number | string;

  /**
   * Description letter spacing
   * @default "0"
   * @example
   * descriptionLetterSpacing="0.01em"
   */
  descriptionLetterSpacing?: string;

  /**
   * Description max width
   * @default "65ch"
   * @example
   * descriptionMaxWidth="800px"
   * descriptionMaxWidth="70ch"
   */
  descriptionMaxWidth?: string;

  /**
   * Description opacity
   * @default 1
   * @example
   * descriptionOpacity={0.85}
   */
  descriptionOpacity?: number;

  /**
   * Description line height
   * @default "1.7"
   * @example
   * descriptionLineHeight={1.8}
   * descriptionLineHeight="2"
   */
  descriptionLineHeight?: number | string;

  /**
   * Stats value size scale multiplier
   * Multiplies the base clamp values (2rem, 4vw, 3rem)
   * @default 1
   * @recommended Use values between 0.5 and 2.0 for best results
   * @example
   * statsValueSize={1.2} - 120% of default size
   */
  statsValueSize?: number;

  /**
   * Stats value color
   * @default "var(--theme-primary)"
   * @example
   * statsValueColor="var(--theme-text)"
   */
  statsValueColor?: string;

  /**
   * Stats value font weight
   * @default "var(--theme-font-weight-bold)"
   * @example
   * statsValueWeight={800}
   */
  statsValueWeight?: number | string;

  /**
   * Stats label size (direct CSS value, NOT a multiplier)
   * Unlike titleSize, subtitleSize, etc., this accepts a direct font-size value
   * @default "var(--theme-font-size-sm)"
   * @example
   * statsLabelSize="1rem"
   * statsLabelSize="16px"
   * statsLabelSize="var(--theme-font-size-base)"
   */
  statsLabelSize?: string;

  /**
   * Stats label color
   * @default "var(--theme-text-secondary)"
   * @example
   * statsLabelColor="var(--theme-text)"
   */
  statsLabelColor?: string;

  /**
   * Stats label font weight
   * @default "var(--theme-font-weight-semibold)"
   * @example
   * statsLabelWeight={500}
   */
  statsLabelWeight?: number | string;

  /**
   * Stats label text transform
   * @default "uppercase"
   * @example
   * statsLabelTransform="none"
   */
  statsLabelTransform?: "none" | "uppercase" | "lowercase" | "capitalize";

  /**
   * Stats value line height
   * @default "1"
   * @example
   * statsValueLineHeight={1.2}
   * statsValueLineHeight="1.3"
   */
  statsValueLineHeight?: number | string;

  /**
   * Stats label line height
   * @default "1.3"
   * @example
   * statsLabelLineHeight={1.5}
   * statsLabelLineHeight="normal"
   */
  statsLabelLineHeight?: number | string;

  /**
   * Stats value letter spacing
   * @default "-0.02em"
   * @example
   * statsValueLetterSpacing="0"
   * statsValueLetterSpacing="0.05em"
   */
  statsValueLetterSpacing?: string;

  /**
   * Stats label letter spacing
   * @default "0.05em"
   * @example
   * statsLabelLetterSpacing="0.1em"
   * statsLabelLetterSpacing="normal"
   */
  statsLabelLetterSpacing?: string;

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
