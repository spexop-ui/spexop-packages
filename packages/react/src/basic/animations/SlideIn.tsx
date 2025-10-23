import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

/**
 * Enhanced SlideIn component props
 */
export interface SlideInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Direction of slide
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";

  /**
   * Distance to slide in pixels
   * @default 20
   */
  distance?: number;

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
 * SlideIn - Enhanced slide animation component
 * Provides smooth sliding effects with customizable direction and distance for engaging content reveals
 *
 * Following "The Spexop Way":
 * - Primitives before patterns: Core animation primitive
 * - Standards before frameworks: Web platform fundamentals
 * - Accessibility before aesthetics: WCAG AA+ compliance by default
 *
 * @example
 * ```tsx
 * <SlideIn direction="left" duration={700}>
 *   <Card>Content</Card>
 * </SlideIn>
 *
 * <SlideIn
 *   direction="up"
 *   distance={30}
 *   duration={500}
 *   onAnimationStart={() => console.log('Starting...')}
 *   onAnimationComplete={() => console.log('Complete!')}
 *   disabled={!shouldAnimate}
 * >
 *   <Card>Custom slide distance</Card>
 * </SlideIn>
 * ```
 */
export const SlideIn: React.FC<SlideInProps> = ({
  direction = "up",
  distance = 20,
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
    up: "slideUp",
    down: "slideDown",
    left: "slideLeft",
    right: "slideRight",
  } as const;

  // Create custom transform values based on direction and distance
  const getTransform = (dir: string, dist: number) => {
    switch (dir) {
      case "up":
        return `translateY(${dist}px)`;
      case "down":
        return `translateY(-${dist}px)`;
      case "left":
        return `translateX(${dist}px)`;
      case "right":
        return `translateX(-${dist}px)`;
      default:
        return `translateY(${dist}px)`;
    }
  };

  const customStyle: React.CSSProperties = {
    ...style,
    // Override the default transform with custom distance
    transform: getTransform(direction, distance),
  };

  return (
    <Reveal
      variant={variantMap[direction]}
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

SlideIn.displayName = "SlideIn";
