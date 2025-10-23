import React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationTimingFunction, AnimationVariant } from "./types.js";

/**
 * Enhanced Stagger component props
 */
export interface StaggerProps {
  /**
   * Children to stagger
   */
  children?: React.ReactNode;

  /**
   * Delay between each child (ms)
   * @default 80
   */
  delay?: number;

  /**
   * Animation variant for children
   * @default "fadeInUp"
   */
  variant?: AnimationVariant;

  /**
   * Animation duration (ms)
   * @default 400
   */
  duration?: number;

  /**
   * Timing function for animations
   * @default "ease-out"
   */
  timing?: AnimationTimingFunction;

  /**
   * Intersection threshold
   * @default 0.1
   */
  threshold?: number;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;

  /**
   * Whether to disable all animations (useful for conditional rendering)
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback fired when any animation starts
   */
  onAnimationStart?: (index: number) => void;

  /**
   * Callback fired when any animation completes
   */
  onAnimationComplete?: (index: number) => void;

  /**
   * Callback fired when all animations complete
   */
  onAllAnimationsComplete?: () => void;

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

  /**
   * Stagger direction - affects the order of animation
   * @default "forward"
   */
  direction?: "forward" | "reverse" | "center-out" | "edges-in";

  /**
   * Maximum number of children to animate (useful for performance)
   * @default Infinity
   */
  maxChildren?: number;
}

/**
 * Stagger - Enhanced sequential animation component
 * Animates children with customizable delays, directions, and callbacks for engaging content reveals
 *
 * Following "The Spexop Way":
 * - Primitives before patterns: Core animation primitive
 * - Standards before frameworks: Web platform fundamentals
 * - Accessibility before aesthetics: WCAG AA+ compliance by default
 *
 * @example
 * ```tsx
 * <Stagger delay={150} variant="fadeInUp">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Stagger>
 *
 * <Stagger
 *   delay={100}
 *   variant="slideUp"
 *   direction="center-out"
 *   onAllAnimationsComplete={() => console.log('All done!')}
 *   disabled={!shouldAnimate}
 * >
 *   <Card>Center item</Card>
 *   <Card>Side item 1</Card>
 *   <Card>Side item 2</Card>
 * </Stagger>
 * ```
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay = 80,
  variant = "fadeInUp",
  duration = 400,
  timing = "ease-out",
  threshold = 0.1,
  className = "",
  style,
  disabled = false,
  onAnimationStart,
  onAnimationComplete,
  onAllAnimationsComplete,
  hardwareAcceleration = true,
  rootMargin = "0px",
  respectReducedMotion = true,
  direction = "forward",
  maxChildren = Number.POSITIVE_INFINITY,
}) => {
  const childrenArray = React.Children.toArray(children);
  const limitedChildren = childrenArray.slice(0, maxChildren);

  // Calculate stagger order based on direction
  const getStaggerOrder = (index: number, total: number) => {
    switch (direction) {
      case "reverse":
        return total - 1 - index;
      case "center-out": {
        const center = Math.floor(total / 2);
        const distance = Math.abs(index - center);
        return distance;
      }
      case "edges-in": {
        const edgeDistance = Math.min(index, total - 1 - index);
        return edgeDistance;
      }
      default:
        return index;
    }
  };

  // Track completed animations
  const completedCount = React.useRef(0);
  const totalAnimations = limitedChildren.length;

  const handleAnimationComplete = (index: number) => {
    completedCount.current += 1;
    onAnimationComplete?.(index);

    if (completedCount.current === totalAnimations) {
      onAllAnimationsComplete?.();
    }
  };

  // Reset completed count when children change
  const prevTotalAnimations = React.useRef(totalAnimations);
  React.useEffect(() => {
    if (prevTotalAnimations.current !== totalAnimations) {
      completedCount.current = 0;
      prevTotalAnimations.current = totalAnimations;
    }
  });

  if (disabled) {
    return (
      <div
        className={`spex-stagger spex-stagger--disabled ${className}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`spex-stagger spex-stagger--${direction} ${className}`}
      style={style}
    >
      {limitedChildren.map((child, index) => {
        const staggerOrder = getStaggerOrder(index, limitedChildren.length);
        const actualDelay = staggerOrder * delay;

        // React.Children.toArray() assigns keys to children, use those
        // If no key exists, generate one using crypto or timestamp to avoid index
        const key =
          React.isValidElement(child) && child.key !== null
            ? child.key
            : `stagger-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${index}`;

        return (
          <Reveal
            key={key}
            variant={variant}
            duration={duration}
            timing={timing}
            delay={actualDelay}
            threshold={threshold}
            onAnimationStart={() => onAnimationStart?.(index)}
            onAnimationComplete={() => handleAnimationComplete(index)}
            hardwareAcceleration={hardwareAcceleration}
            rootMargin={rootMargin}
            respectReducedMotion={respectReducedMotion}
          >
            {child}
          </Reveal>
        );
      })}
    </div>
  );
};

Stagger.displayName = "Stagger";
