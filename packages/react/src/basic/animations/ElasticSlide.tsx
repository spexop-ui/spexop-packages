import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export interface ElasticSlideProps extends Omit<AnimationProps, "variant"> {
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ElasticSlide: React.FC<ElasticSlideProps> = ({
  direction = "left",
  duration = 800,
  delay = 0,
  once = true,
  threshold = 0.1,
  style,
  className,
  children,
  disabled = false,
  ...restProps
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  const variantMap = {
    left: "slideLeft",
    right: "slideRight",
    up: "slideUp",
    down: "slideDown",
  } as const;

  return (
    <Reveal
      variant={variantMap[direction]}
      duration={duration}
      delay={delay}
      timing="ease-out"
      once={once}
      threshold={threshold}
      style={style}
      className={className}
      {...restProps}
    >
      {children}
    </Reveal>
  );
};

ElasticSlide.displayName = "ElasticSlide";
