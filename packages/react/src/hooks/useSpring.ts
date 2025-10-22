import { useEffect, useRef, useState } from "react";

/**
 * Spring animation configuration
 */
export interface SpringConfig {
  /** Spring stiffness (higher = faster) */
  stiffness?: number;
  /** Spring damping (higher = less bouncy) */
  damping?: number;
  /** Spring mass (higher = slower) */
  mass?: number;
  /** Initial velocity */
  velocity?: number;
}

/**
 * Spring animation presets
 */
export const SPRING_PRESETS = {
  default: { stiffness: 170, damping: 26, mass: 1, velocity: 0 },
  gentle: { stiffness: 120, damping: 14, mass: 1, velocity: 0 },
  wobbly: { stiffness: 180, damping: 12, mass: 1, velocity: 0 },
  stiff: { stiffness: 210, damping: 20, mass: 1, velocity: 0 },
  slow: { stiffness: 280, damping: 60, mass: 1, velocity: 0 },
  molasses: { stiffness: 280, damping: 120, mass: 1, velocity: 0 },
} as const;

export type SpringPreset = keyof typeof SPRING_PRESETS;

/**
 * Hook for spring-based animations
 * Provides smooth, physics-based motion
 *
 * @example
 * ```tsx
 * const scale = useSpring(isOpen ? 1 : 0, 'wobbly');
 * const opacity = useSpring(isVisible ? 1 : 0);
 * ```
 */
export function useSpring(
  target: number,
  configOrPreset: SpringConfig | SpringPreset = "default",
): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
  const velocityRef = useRef(0);

  const config =
    typeof configOrPreset === "string"
      ? SPRING_PRESETS[configOrPreset]
      : { ...SPRING_PRESETS.default, ...configOrPreset };

  // Extract config values for dependencies
  const { stiffness, damping, mass } = config;

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    // Use refs to track current animation state
    let currentValue = valueRef.current;
    let currentVelocity = velocityRef.current;

    const animate = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.064); // Cap at ~60fps
      lastTime = time;

      // Spring physics calculation
      const springForce = -stiffness * (currentValue - target);
      const dampingForce = -damping * currentVelocity;
      const acceleration = (springForce + dampingForce) / mass;

      currentVelocity += acceleration * deltaTime;
      currentValue += currentVelocity * deltaTime;

      // Update refs
      valueRef.current = currentValue;
      velocityRef.current = currentVelocity;

      // Check if spring has settled
      const isSettled =
        Math.abs(currentValue - target) < 0.001 &&
        Math.abs(currentVelocity) < 0.001;

      if (isSettled) {
        valueRef.current = target;
        velocityRef.current = 0;
        setValue(target);
      } else {
        setValue(currentValue);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation if value differs from target
    if (Math.abs(currentValue - target) > 0.001) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      valueRef.current = target;
      velocityRef.current = 0;
      setValue(target);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, stiffness, damping, mass]);

  return value;
}
