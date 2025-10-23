import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

/**
 * Enhanced RotateIn component props
 */
export interface RotateInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Rotation angle in degrees (negative values rotate counter-clockwise)
   * @default -3
   */
  angle?: number;

  /**
   * Scale factor for the rotation effect
   * @default 0.97
   */
  scale?: number;

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
 * RotateIn - Enhanced rotate and fade in animation component
 * Provides subtle rotation with scale and fade effects for engaging content reveals
 *
 * Following "The Spexop Way":
 * - Primitives before patterns: Core animation primitive
 * - Standards before frameworks: Web platform fundamentals
 * - Accessibility before aesthetics: WCAG AA+ compliance by default
 *
 * @example
 * ```tsx
 * <RotateIn duration={700} timing="bounce">
 *   <Card>Content</Card>
 * </RotateIn>
 *
 * <RotateIn
 *   angle={-5}
 *   scale={0.95}
 *   duration={600}
 *   onAnimationStart={() => console.log('Starting...')}
 *   onAnimationComplete={() => console.log('Complete!')}
 *   disabled={!shouldAnimate}
 * >
 *   <Card>Custom rotation</Card>
 * </RotateIn>
 * ```
 */
export const RotateIn: React.FC<RotateInProps> = ({
  angle = -3,
  scale = 0.97,
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
  // Create custom transform values based on angle and scale
  const customStyle: React.CSSProperties = {
    ...style,
    // Override the default transform with custom values
    transform: `rotate(${angle}deg) scale(${scale})`,
  };

  return (
    <Reveal
      variant="rotateIn"
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

RotateIn.displayName = "RotateIn";
