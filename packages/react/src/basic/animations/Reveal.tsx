import type React from "react";
import { useEffect, useRef } from "react";
import type { AnimationProps } from "./types.js";
import { ANIMATION_PRESETS, TIMING_FUNCTIONS } from "./types.js";
import { useIntersectionObserver } from "./useIntersectionObserver.js";

/**
 * Enhanced Reveal component props
 */
export interface RevealProps extends AnimationProps {
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
 * Reveal - Enhanced universal animation wrapper component
 * Animates children when they enter the viewport with improved performance and accessibility
 *
 * Following "The Spexop Way":
 * - Primitives before patterns: Core animation primitive
 * - Standards before frameworks: Web platform fundamentals
 * - Accessibility before aesthetics: WCAG AA+ compliance by default
 *
 * @example
 * ```tsx
 * <Reveal variant="fadeInUp" duration={800} delay={200}>
 *   <Card>Animated content</Card>
 * </Reveal>
 *
 * <Reveal
 *   variant="slideUp"
 *   duration={600}
 *   onAnimationStart={() => console.log('Starting...')}
 *   onAnimationComplete={() => console.log('Complete!')}
 *   disabled={!shouldAnimate}
 * >
 *   <Card>Conditional animation</Card>
 * </Reveal>
 * ```
 */
export const Reveal: React.FC<RevealProps> = ({
  variant = "fadeIn",
  duration = 400,
  delay = 0,
  timing = "ease-out",
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
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: once,
    delay,
    rootMargin,
  });

  const hasAnimatedRef = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Check for reduced motion preference
  const prefersReducedMotion =
    respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If disabled, render children without animation
  if (disabled) {
    return <>{children}</>;
  }

  const preset = ANIMATION_PRESETS[variant];
  const timingFunction = TIMING_FUNCTIONS[timing];

  // Handle animation callbacks
  useEffect(() => {
    if (isVisible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      onAnimationStart?.();

      // Set up completion callback
      if (onAnimationComplete) {
        animationTimeoutRef.current = setTimeout(() => {
          onAnimationComplete();
        }, duration + delay);
      }
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isVisible, duration, delay, onAnimationStart, onAnimationComplete]);

  // Reset animation state when component unmounts or visibility changes
  useEffect(() => {
    if (!isVisible && !once) {
      hasAnimatedRef.current = false;
    }
  }, [isVisible, once]);

  const animationStyles: React.CSSProperties = {
    opacity: isVisible ? preset.opacity.to : preset.opacity.from,
    transform: isVisible ? preset.transform.to : preset.transform.from,
    // Only apply transition if not respecting reduced motion
    ...(prefersReducedMotion
      ? {}
      : {
          transition: `opacity ${duration}ms ${timingFunction}, transform ${duration}ms ${timingFunction}`,
        }),
    // Performance optimizations
    willChange: isVisible ? "auto" : "transform, opacity",
    backfaceVisibility: hardwareAcceleration ? "hidden" : undefined,
    transformStyle: hardwareAcceleration ? "preserve-3d" : undefined,
    perspective: hardwareAcceleration ? "1000px" : undefined,
    ...style,
  };

  return (
    <div
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className={`spex-reveal spex-reveal--${variant} ${className}`}
      style={animationStyles}
      // Accessibility attributes
      aria-hidden={!isVisible}
      role="presentation"
    >
      {children}
    </div>
  );
};

Reveal.displayName = "Reveal";
