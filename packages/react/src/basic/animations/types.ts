import type React from "react";

/**
 * Animation variant types
 */
export type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "zoomIn"
  | "zoomOut"
  | "scaleUp"
  | "rotateIn";

/**
 * Animation timing function types
 */
export type AnimationTimingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "bounce"
  | "elastic";

/**
 * Animation preset configurations
 */
export interface AnimationPreset {
  keyframes: string;
  transform: {
    from: string;
    to: string;
  };
  opacity: {
    from: number;
    to: number;
  };
}

/**
 * Common animation props
 */
export interface AnimationProps {
  /**
   * Animation variant
   * @default "fadeIn"
   */
  variant?: AnimationVariant;

  /**
   * Animation duration (ms)
   * @default 400
   */
  duration?: number;

  /**
   * Animation delay (ms)
   * @default 0
   */
  delay?: number;

  /**
   * Timing function
   * @default "ease-out"
   */
  timing?: AnimationTimingFunction;

  /**
   * Only animate once when entering viewport
   * @default true
   */
  once?: boolean;

  /**
   * Intersection threshold (0-1)
   * @default 0.1
   */
  threshold?: number;

  /**
   * Custom styles to merge
   */
  style?: React.CSSProperties;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Children to animate
   */
  children?: React.ReactNode;
}

/**
 * Animation presets with transform and opacity values
 * Subtle, non-distracting animations
 */
export const ANIMATION_PRESETS: Record<AnimationVariant, AnimationPreset> = {
  fadeIn: {
    keyframes: "spex-fadeIn",
    transform: { from: "none", to: "none" },
    opacity: { from: 0, to: 1 },
  },
  fadeInUp: {
    keyframes: "spex-fadeInUp",
    transform: { from: "translateY(12px)", to: "translateY(0)" },
    opacity: { from: 0, to: 1 },
  },
  fadeInDown: {
    keyframes: "spex-fadeInDown",
    transform: { from: "translateY(-12px)", to: "translateY(0)" },
    opacity: { from: 0, to: 1 },
  },
  fadeInLeft: {
    keyframes: "spex-fadeInLeft",
    transform: { from: "translateX(-12px)", to: "translateX(0)" },
    opacity: { from: 0, to: 1 },
  },
  fadeInRight: {
    keyframes: "spex-fadeInRight",
    transform: { from: "translateX(12px)", to: "translateX(0)" },
    opacity: { from: 0, to: 1 },
  },
  slideUp: {
    keyframes: "spex-slideUp",
    transform: { from: "translateY(20px)", to: "translateY(0)" },
    opacity: { from: 0, to: 1 },
  },
  slideDown: {
    keyframes: "spex-slideDown",
    transform: { from: "translateY(-20px)", to: "translateY(0)" },
    opacity: { from: 0, to: 1 },
  },
  slideLeft: {
    keyframes: "spex-slideLeft",
    transform: { from: "translateX(20px)", to: "translateX(0)" },
    opacity: { from: 0, to: 1 },
  },
  slideRight: {
    keyframes: "spex-slideRight",
    transform: { from: "translateX(-20px)", to: "translateX(0)" },
    opacity: { from: 0, to: 1 },
  },
  zoomIn: {
    keyframes: "spex-zoomIn",
    transform: { from: "scale(0.95)", to: "scale(1)" },
    opacity: { from: 0, to: 1 },
  },
  zoomOut: {
    keyframes: "spex-zoomOut",
    transform: { from: "scale(1.05)", to: "scale(1)" },
    opacity: { from: 0, to: 1 },
  },
  scaleUp: {
    keyframes: "spex-scaleUp",
    transform: { from: "scale(0.92)", to: "scale(1)" },
    opacity: { from: 0, to: 1 },
  },
  rotateIn: {
    keyframes: "spex-rotateIn",
    transform: { from: "rotate(-3deg) scale(0.97)", to: "rotate(0) scale(1)" },
    opacity: { from: 0, to: 1 },
  },
};

/**
 * Timing function mappings to CSS cubic-bezier
 */
export const TIMING_FUNCTIONS: Record<AnimationTimingFunction, string> = {
  linear: "linear",
  ease: "ease",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
};
