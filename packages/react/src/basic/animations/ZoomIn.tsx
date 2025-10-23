import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

/**
 * Enhanced ZoomIn component props
 */
export interface ZoomInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Zoom variant
   * @default "in"
   */
  type?: "in" | "out";

  /**
   * Initial scale factor (0-1, where 1 is normal size)
   * @default 0.95 for "in", 1.05 for "out"
   */
  fromScale?: number;

  /**
   * Final scale factor (0-2, where 1 is normal size)
   * @default 1
   */
  toScale?: number;

  /**
   * Callback fired when animation starts
   */
  onAnimationStart?: () => void;

  /**
   * Callback fired when animation completes
   */
  onAnimationComplete?: () => void;

  /**
   * Whether to disable the animation (useful for conditional rendering)
   * @default false
   */
  disabled?: boolean;

  /**
   * Enable hardware acceleration for better performance
   * @default true
   */
  hardwareAcceleration?: boolean;

  /**
   * Custom root margin for intersection observer
   * @default "0px"
   */
  rootMargin?: string;

  /**
   * Whether to respect prefers-reduced-motion
   * @default true
   */
  respectReducedMotion?: boolean;
}

/**
 * ZoomIn - Enhanced zoom animation component
 * Provides smooth zoom effects with customizable scale ranges for engaging content reveals
 *
 * Following "The Spexop Way":
 * - Primitives before patterns: Core animation primitive
 * - Standards before frameworks: Web platform fundamentals
 * - Accessibility before aesthetics: WCAG AA+ compliance by default
 *
 * @example
 * ```tsx
 * <ZoomIn type="in" duration={500}>
 *   <Card>Content</Card>
 * </ZoomIn>
 *
 * <ZoomIn
 *   type="out"
 *   fromScale={1.1}
 *   toScale={0.9}
 *   duration={600}
 *   onAnimationStart={() => console.log('Starting...')}
 *   onAnimationComplete={() => console.log('Complete!')}
 *   disabled={!shouldAnimate}
 * >
 *   <Card>Custom zoom range</Card>
 * </ZoomIn>
 * ```
 */
export const ZoomIn: React.FC<ZoomInProps> = ({
  type = "in",
  fromScale,
  toScale = 1,
  duration = 400,
  timing = "ease-out",
  delay = 0,
  once = true,
  threshold = 0.1,
  style,
  className = "",
  children,
  onAnimationStart,
  onAnimationComplete,
  disabled = false,
  hardwareAcceleration = true,
  rootMargin = "0px",
  respectReducedMotion = true,
}) => {
  const variantMap = {
    in: "zoomIn",
    out: "zoomOut",
  } as const;

  // Set default fromScale based on type if not provided
  const defaultFromScale = fromScale ?? (type === "in" ? 0.95 : 1.05);

  // Create custom transform values based on scale range
  const customStyle: React.CSSProperties = {
    ...style,
    // Override the default transform with custom scale values
    transform: `scale(${defaultFromScale})`,
  };

  return (
    <Reveal
      variant={variantMap[type]}
      duration={duration}
      timing={timing}
      delay={delay}
      once={once}
      threshold={threshold}
      style={customStyle}
      className={className}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      disabled={disabled}
      hardwareAcceleration={hardwareAcceleration}
      rootMargin={rootMargin}
      respectReducedMotion={respectReducedMotion}
    >
      {children}
    </Reveal>
  );
};

ZoomIn.displayName = "ZoomIn";
