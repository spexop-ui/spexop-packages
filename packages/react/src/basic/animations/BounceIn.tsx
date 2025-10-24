import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps, AnimationTimingFunction } from "./types.js";

export interface BounceInProps extends Omit<AnimationProps, "variant"> {
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  delay?: number;
  timing?: AnimationTimingFunction;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  bounceHeight?: number;
  disabled?: boolean;
}

export const BounceIn: React.FC<BounceInProps> = ({
  direction = "up",
  duration = 600,
  delay = 0,
  timing = "ease-out",
  once = true,
  threshold = 0.1,
  style,
  className,
  children,
  bounceHeight = 30,
  disabled = false,
  ...restProps
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  const customStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <Reveal
      variant={direction === "none" ? "scaleUp" : "fadeInUp"}
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

BounceIn.displayName = "BounceIn";
