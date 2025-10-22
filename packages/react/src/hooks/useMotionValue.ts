import { useEffect, useRef, useState } from "react";

/**
 * Easing function types
 */
type EasingFunction = (t: number) => number;

/**
 * Easing functions for smooth animations
 */
export const EASINGS = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => {
    const t1 = t - 1;
    return t1 * t1 * t1 + 1;
  },
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => {
    const t1 = t - 1;
    return 1 - t1 * t1 * t1 * t1;
  },
  easeInOutQuart: (t: number) => {
    if (t < 0.5) {
      return 8 * t * t * t * t;
    }
    const t1 = t - 1;
    return 1 - 8 * t1 * t1 * t1 * t1;
  },
  easeInExpo: (t: number) => (t === 0 ? 0 : 2 ** (10 * (t - 1))),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 2 ** (20 * t - 10) / 2;
    return (2 - 2 ** (-20 * t + 10)) / 2;
  },
} as const;

export type EasingType = keyof typeof EASINGS;

/**
 * Hook for animated values with easing
 * Provides smooth transitions between values
 *
 * @example
 * ```tsx
 * const opacity = useMotionValue(isVisible ? 1 : 0, { duration: 300, easing: 'easeOutCubic' });
 * const scale = useMotionValue(isHovered ? 1.05 : 1, { duration: 200 });
 * ```
 */
export function useMotionValue(
  target: number,
  options: {
    duration?: number;
    easing?: EasingType | EasingFunction;
    delay?: number;
  } = {},
): number {
  const { duration = 300, easing = "easeOutCubic", delay = 0 } = options;
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  // Keep ref in sync with state
  valueRef.current = value;

  const easingFn: EasingFunction =
    typeof easing === "string" ? EASINGS[easing] : easing;

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const startAnimation = () => {
      const startValue = valueRef.current;
      const startTime = performance.now();
      const endTime = startTime + duration;

      const animate = (time: number) => {
        if (time >= endTime) {
          setValue(target);
          return;
        }

        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);
        const newValue = startValue + (target - startValue) * easedProgress;

        setValue(newValue);
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation after delay
    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [target, duration, delay, easingFn]);

  return value;
}
