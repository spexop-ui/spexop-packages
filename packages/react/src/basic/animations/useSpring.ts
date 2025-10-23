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
  /** Precision threshold for settling (lower = more precise) */
  precision?: number;
  /** Maximum duration in milliseconds (0 = unlimited) */
  maxDuration?: number;
}

/**
 * Spring animation presets
 * Enhanced with better physics and more natural motion curves
 */
export const SPRING_PRESETS = {
  // Default spring - balanced and versatile
  default: {
    stiffness: 170,
    damping: 26,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Gentle spring - smooth and subtle
  gentle: {
    stiffness: 120,
    damping: 14,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Wobbly spring - bouncy with overshoot
  wobbly: {
    stiffness: 180,
    damping: 12,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Stiff spring - quick and snappy
  stiff: {
    stiffness: 210,
    damping: 20,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Slow spring - deliberate and smooth
  slow: {
    stiffness: 280,
    damping: 60,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Molasses spring - very slow and heavy
  molasses: {
    stiffness: 280,
    damping: 120,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Bouncy spring - highly elastic with multiple bounces
  bouncy: {
    stiffness: 200,
    damping: 8,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Crisp spring - sharp and precise
  crisp: {
    stiffness: 250,
    damping: 30,
    mass: 0.8,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Smooth spring - fluid and elegant
  smooth: {
    stiffness: 150,
    damping: 22,
    mass: 1.2,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },

  // Elastic spring - rubber-like with stretch
  elastic: {
    stiffness: 160,
    damping: 10,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0,
  },
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
  const {
    stiffness,
    damping,
    mass,
    precision = 0.001,
    maxDuration = 0,
  } = config;

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let startTime = performance.now();

    // Use refs to track current animation state
    let currentValue = valueRef.current;
    let currentVelocity = velocityRef.current;

    const animate = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.064); // Cap at ~60fps
      lastTime = time;
      const elapsed = time - startTime;

      // Enhanced spring physics with improved stability
      const displacement = currentValue - target;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * currentVelocity;
      const acceleration = (springForce + dampingForce) / mass;

      // Use Verlet integration for better stability
      const newVelocity = currentVelocity + acceleration * deltaTime;
      const newValue = currentValue + newVelocity * deltaTime;

      // Update refs
      valueRef.current = newValue;
      velocityRef.current = newVelocity;
      currentValue = newValue;
      currentVelocity = newVelocity;

      // Enhanced settling detection with configurable precision
      const isSettled =
        Math.abs(currentValue - target) < precision &&
        Math.abs(currentVelocity) < precision * 10;

      // Check for maximum duration limit
      const hasMaxDuration = maxDuration > 0 && elapsed > maxDuration;

      if (isSettled || hasMaxDuration) {
        valueRef.current = target;
        velocityRef.current = 0;
        setValue(target);
      } else {
        setValue(currentValue);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation if value differs from target
    if (Math.abs(currentValue - target) > precision) {
      startTime = performance.now();
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
  }, [target, stiffness, damping, mass, precision, maxDuration]);

  return value;
}
