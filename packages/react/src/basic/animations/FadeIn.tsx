import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps, AnimationTimingFunction } from "./types.js";

export interface FadeInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Direction of fade
   * @default "none"
   */
  direction?: "up" | "down" | "left" | "right" | "none";

  /**
   * Animation duration in milliseconds
   * @default 400
   */
  duration?: number;

  /**
   * Animation delay in milliseconds
   * @default 0
   */
  delay?: number;

  /**
   * Animation timing function
   * @default "ease-out"
   */
  timing?: AnimationTimingFunction;

  /**
   * Only animate once when entering viewport
   * @default true
   */
  once?: boolean;

  /**
   * Intersection threshold (0-1) for viewport detection
   * @default 0.1
   */
  threshold?: number;

  /**
   * Custom styles to merge with animation styles
   */
  style?: React.CSSProperties;

  /**
   * Custom className to add to the wrapper
   */
  className?: string;

  /**
   * Children to animate
   */
  children?: React.ReactNode;

  /**
   * Distance of movement in pixels (for directional fades)
   * @default 12
   */
  distance?: number;

  /**
   * Opacity range for the fade effect
   * @default { from: 0, to: 1 }
   */
  opacity?: {
    from: number;
    to: number;
  };

  /**
   * Whether to disable the animation (useful for conditional rendering)
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback fired when animation starts
   */
  onAnimationStart?: () => void;

  /**
   * Callback fired when animation completes
   */
  onAnimationComplete?: () => void;
}

/**
 * FadeIn - Convenient wrapper for fade animations with enhanced customization
 *
 * @example
 * ```tsx
 * <FadeIn direction="up" duration={800} distance={20}>
 *   <Card>Content</Card>
 * </FadeIn>
 *
 * <FadeIn
 *   direction="left"
 *   duration={600}
 *   delay={200}
 *   timing="bounce"
 *   onAnimationComplete={() => console.log('Animation done!')}
 * >
 *   <Card>Animated content</Card>
 * </FadeIn>
 * ```
 */
export const FadeIn: React.FC<FadeInProps> = ({
  direction = "none",
  duration = 400,
  delay = 0,
  timing = "ease-out",
  once = true,
  threshold = 0.1,
  style,
  className,
  children,
  distance = 12,
  opacity = { from: 0, to: 1 },
  disabled = false,
  onAnimationStart,
  onAnimationComplete,
  ...restProps
}) => {
  const variantMap = {
    none: "fadeIn",
    up: "fadeInUp",
    down: "fadeInDown",
    left: "fadeInLeft",
    right: "fadeInRight",
  } as const;

  // If disabled, render children without animation
  if (disabled) {
    return <>{children}</>;
  }

  // Create custom animation styles for distance and opacity
  const customStyle: React.CSSProperties = {
    ...style,
  };

  // Add custom distance for directional fades
  if (direction !== "none" && distance !== 12) {
    const distanceValue = `${distance}px`;
    const transformMap = {
      up: `translateY(${distanceValue})`,
      down: `translateY(-${distanceValue})`,
      left: `translateX(-${distanceValue})`,
      right: `translateX(${distanceValue})`,
    };

    customStyle.transform = transformMap[direction];
  }

  // Add custom opacity if provided
  if (opacity.from !== 0 || opacity.to !== 1) {
    customStyle.opacity = opacity.from;
  }

  // Handle animation callbacks
  const handleAnimationStart = () => {
    onAnimationStart?.();
  };

  const handleAnimationComplete = () => {
    onAnimationComplete?.();
  };

  return (
    <Reveal
      variant={variantMap[direction]}
      duration={duration}
      delay={delay}
      timing={timing}
      once={once}
      threshold={threshold}
      style={customStyle}
      className={className}
      {...restProps}
    >
      {children}
    </Reveal>
  );
};

FadeIn.displayName = "FadeIn";
