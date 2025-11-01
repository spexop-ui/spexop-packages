import type { ReactNode } from "react";

/**
 * Hero layout variants
 */
export type HeroVariant =
  | "split"
  | "split-image"
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
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "text"
    | "pill"
    | "border-emphasis"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "neutral";

  /**
   * Text color preference (useful for dark backgrounds)
   * @default 'auto'
   */
  textColor?: "auto" | "light" | "dark";

  /**
   * Border weight (following "Borders before shadows" principle)
   * @default 'normal'
   */
  borderWeight?: "thin" | "normal" | "thick";

  /**
   * Border style
   * @default 'solid'
   */
  borderStyle?: "solid" | "dashed" | "dotted";

  /**
   * Accessibility label
   */
  ariaLabel?: string;
}

/**
 * Image fit options for background images
 */
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";

/**
 * Image position options for background images (CSS object-position values)
 */
export type ImagePosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right"
  | string; // Allow custom values like "20% 80%"

/**
 * Overlay gradient position for background images
 */
export type OverlayPosition = "top" | "bottom" | "center";

/**
 * Parallax effect intensity for background images
 */
export type ParallaxIntensity = "none" | "subtle" | "medium" | "strong";

/**
 * Image size presets for convenient sizing
 */
export type ImageSizePreset = "compact" | "medium" | "large" | "full";

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
   * If srcLight or srcDark are provided, src is used as fallback
   */
  src: string;

  /**
   * Light theme image source URL
   * Overrides src when in light theme mode
   */
  srcLight?: string;

  /**
   * Dark theme image source URL
   * Overrides src when in dark theme mode
   */
  srcDark?: string;

  /**
   * Alt text for images (required for accessibility)
   */
  alt?: string;

  /**
   * Apply dark overlay
   */
  overlay?: boolean;

  /**
   * Video autoplay (muted, looped)
   * @default false
   */
  autoplay?: boolean;

  /**
   * Image fit behavior (CSS object-fit)
   * Only applies to images, not videos
   * @default "cover"
   */
  imageFit?: ImageFit;

  /**
   * Image position (CSS object-position)
   * Controls which part of the image is visible when using cover/contain
   * Only applies to images, not videos
   * @default "center"
   * @example
   * imagePosition="top center" - Show top portion of image
   * imagePosition="20% 80%" - Custom positioning
   */
  imagePosition?: ImagePosition;

  /**
   * Overlay gradient position for better text readability
   * Only applies when overlay is true
   * @default "center"
   */
  overlayPosition?: OverlayPosition;

  /**
   * Parallax effect for background images
   * Creates subtle scroll-based movement effect
   * Only applies to background images (backgroundMedia prop)
   * @default "none"
   */
  parallax?: ParallaxIntensity;

  /**
   * Image size preset for convenient sizing
   * Only applies to images in split/regular layouts (not backgroundMedia)
   * @default "full"
   * @example
   * imageSize="compact" - Smaller, more compact image
   * imageSize="medium" - Medium sized image
   * imageSize="large" - Large image
   * imageSize="full" - Full width/height (default)
   */
  imageSize?: ImageSizePreset;

  /**
   * Custom image width (CSS value)
   * Overrides imageSize preset if provided
   * Only applies to images in split/regular layouts (not backgroundMedia)
   * @example
   * imageWidth="400px"
   * imageWidth="50%"
   * imageWidth="30vw"
   */
  imageWidth?: string;

  /**
   * Custom image height (CSS value)
   * Overrides imageSize preset if provided
   * Only applies to images in split/regular layouts (not backgroundMedia)
   * @example
   * imageHeight="300px"
   * imageHeight="50vh"
   */
  imageHeight?: string;

  /**
   * Maximum image width (CSS value)
   * Constrains the maximum width of the image
   * Only applies to images in split/regular layouts (not backgroundMedia)
   * @example
   * maxImageWidth="600px"
   * maxImageWidth="80%"
   */
  maxImageWidth?: string;

  /**
   * Maximum image height (CSS value)
   * Constrains the maximum height of the image
   * Only applies to images in split/regular layouts (not backgroundMedia)
   * @example
   * maxImageHeight="500px"
   * maxImageHeight="70vh"
   */
  maxImageHeight?: string;

  /**
   * Aspect ratio for the image container (CSS aspect-ratio value)
   * Only applies to images in split/regular layouts (not backgroundMedia)
   * @default undefined (natural aspect ratio)
   * @example
   * aspectRatio="16/9" - Widescreen aspect ratio
   * aspectRatio="4/3" - Traditional aspect ratio
   * aspectRatio="1/1" - Square
   * aspectRatio="3/4" - Portrait
   */
  aspectRatio?: string;

  /**
   * Border style for the media container
   * Only applies to images/videos in split/regular layouts (not backgroundMedia)
   * @default "default" (2px solid border using theme border color)
   * @example
   * border="none" - No border
   * border="default" - Theme border (2px solid)
   * border="thick" - Thicker border (3px)
   * border="thicker" - Even thicker border (4px)
   */
  border?: "none" | "default" | "thick" | "thicker";

  /**
   * Custom border color (CSS color value)
   * Overrides default theme border color
   * Only applies when border is not "none"
   * @example
   * borderColor="#3b82f6"
   * borderColor="var(--theme-primary)"
   * borderColor="rgba(0, 0, 0, 0.2)"
   */
  borderColor?: string;

  /**
   * Custom border width (CSS value)
   * Overrides default border width
   * Only applies when border is not "none"
   * @example
   * borderWidth="1px"
   * borderWidth="3px"
   * borderWidth="0.5rem"
   */
  borderWidth?: string;

  /**
   * Border radius for the media container (CSS value)
   * Overrides default border radius
   * @example
   * borderRadius="8px"
   * borderRadius="0" - Square corners
   * borderRadius="50%" - Circular
   */
  borderRadius?: string;

  /**
   * Media credits/attribution
   * React node or function that receives theme info and returns React node
   * Typically shown as a small text overlay at the bottom of the image
   * @example
   * credits={
   *   <>Photo by <a href="...">Photographer Name</a> on <a href="...">Unsplash</a></>
   * }
   * @example
   * credits={({ isDark }) => (
   *   <>Photo by <a href="...">{isDark ? 'Dark Photographer' : 'Light Photographer'}</a></>
   * )}
   */
  credits?: ReactNode | ((options: { isDark: boolean }) => ReactNode);

  /**
   * Credits background color (CSS color or token)
   * Overrides default token-driven background
   * @example
   * creditsBackgroundColor="var(--theme-surface)"
   * creditsBackgroundColor="rgba(255,255,255,0.85)"
   */
  creditsBackgroundColor?: string;

  /**
   * Credits text color (CSS color or token)
   * Overrides default token-driven text color
   * @example
   * creditsTextColor="var(--theme-text)"
   * creditsTextColor="#ffffff"
   */
  creditsTextColor?: string;

  /**
   * Credits border color (CSS color or token)
   * Overrides default token-driven border color
   * @example
   * creditsBorderColor="var(--theme-border)"
   */
  creditsBorderColor?: string;

  /**
   * Mark media as AI generated
   * Shows an "AI Generated" badge on the media
   * @default false
   */
  aiGenerated?: boolean;

  /**
   * Image filter configuration
   * CSS filters for visual effects on images
   * Only applies to images, not videos
   */
  filters?: {
    /**
     * Blur filter (CSS blur value)
     * @example "0px", "2px", "10px"
     */
    blur?: string;

    /**
     * Brightness filter (0-1 or percentage)
     * @example 0.5, "50%", "120%"
     */
    brightness?: number | string;

    /**
     * Contrast filter (0-1 or percentage)
     * @example 1.2, "120%", "200%"
     */
    contrast?: number | string;

    /**
     * Grayscale filter (0-1 or percentage)
     * @example 0, 1, "100%"
     */
    grayscale?: number | string;

    /**
     * Hue rotation (degrees)
     * @example 0, 90, 180
     */
    hueRotate?: number;

    /**
     * Invert filter (0-1 or percentage)
     * @example 0, 1, "100%"
     */
    invert?: number | string;

    /**
     * Opacity filter (0-1)
     * @example 0.5, 1
     */
    opacity?: number;

    /**
     * Saturate filter (0-1 or percentage)
     * @example 0, 1.5, "150%"
     */
    saturate?: number | string;

    /**
     * Sepia filter (0-1 or percentage)
     * @example 0, 1, "100%"
     */
    sepia?: number | string;
  };

  /**
   * Image animation configuration
   * Entrance animations for images when they enter viewport
   * Only applies to images, not videos
   */
  animation?: {
    /**
     * Animation type
     * @default "none"
     */
    type?:
      | "none"
      | "fadeIn"
      | "slideInLeft"
      | "slideInRight"
      | "slideInUp"
      | "slideInDown"
      | "zoomIn"
      | "scaleUp"
      | "rotateIn";

    /**
     * Animation duration in milliseconds
     * @default 600
     */
    duration?: number;

    /**
     * Animation delay in milliseconds
     * @default 0
     */
    delay?: number;

    /**
     * Animation easing function
     * @default "ease-out"
     */
    easing?: string;
  };
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
   * Content theme for text and buttons over background media
   * Use "light" for dark backgrounds/videos, "dark" for light backgrounds/videos
   * @default "light" (when backgroundMedia exists), "auto" (when no backgroundMedia)
   * @example
   * contentTheme="light" - White text and borders (for dark video backgrounds)
   * contentTheme="dark" - Dark text and borders (for light video backgrounds)
   */
  contentTheme?: "light" | "dark" | "auto";

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
   * Image position for split-image variant
   * Controls whether image appears on left or right side
   * Only applies to split-image variant
   * @default "right"
   */
  imagePosition?: "left" | "right";

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
