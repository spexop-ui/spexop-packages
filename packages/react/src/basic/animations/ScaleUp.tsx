import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

/**
 * Enhanced ScaleUp component props
 */
export interface ScaleUpProps extends Omit<AnimationProps, "variant"> {
  /**
   * Initial scale factor (0-1, where 1 is normal size)
   * @default 0.92
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
 * ScaleUp - Enhanced scale animation component
 * Provides smooth scaling effects with customizable scale ranges for engaging content reveals
 *
 * Following "The Spexop Way":
 * - Primitives before patterns: Core animation primitive
 * - Standards before frameworks: Web platform fundamentals
 * - Accessibility before aesthetics: WCAG AA+ compliance by default
 *
 * @example
 * ```tsx
 * <ScaleUp duration={600} timing="elastic">
 *   <Card>Content</Card>
 * </ScaleUp>
 *
 * <ScaleUp
 *   fromScale={0.8}
 *   toScale={1.1}
 *   duration={500}
 *   onAnimationStart={() => console.log('Starting...')}
 *   onAnimationComplete={() => console.log('Complete!')}
 *   disabled={!shouldAnimate}
 * >
 *   <Card>Custom scale range</Card>
 * </ScaleUp>
 * ```
 */
export const ScaleUp: React.FC<ScaleUpProps> = ({
  fromScale = 0.92,
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
  // Create custom transform values based on scale range
  const customStyle: React.CSSProperties = {
    ...style,
    // Override the default transform with custom scale values
    transform: `scale(${fromScale})`,
  };

  return (
    <Reveal
      variant="scaleUp"
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

ScaleUp.displayName = "ScaleUp";
