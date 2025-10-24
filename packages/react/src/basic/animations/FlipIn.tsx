import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export interface FlipInProps extends Omit<AnimationProps, "variant"> {
  axis?: "x" | "y";
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FlipIn: React.FC<FlipInProps> = ({
  axis = "y",
  duration = 600,
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

  const customStyle: React.CSSProperties = {
    ...style,
    transformStyle: "preserve-3d",
  };

  return (
    <Reveal
      variant="rotateIn"
      duration={duration}
      delay={delay}
      timing="ease-out"
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

FlipIn.displayName = "FlipIn";
