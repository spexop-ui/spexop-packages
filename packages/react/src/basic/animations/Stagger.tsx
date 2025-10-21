import React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationVariant } from "./types.js";

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
}

/**
 * Stagger - Animate children sequentially with delay
 *
 * @example
 * ```tsx
 * <Stagger delay={150} variant="fadeInUp">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Stagger>
 * ```
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay = 80,
  variant = "fadeInUp",
  duration = 400,
  threshold = 0.1,
  className = "",
  style,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`spex-stagger ${className}`} style={style}>
      {childrenArray.map((child, index) => {
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
            delay={index * delay}
            threshold={threshold}
          >
            {child}
          </Reveal>
        );
      })}
    </div>
  );
};

Stagger.displayName = "Stagger";
