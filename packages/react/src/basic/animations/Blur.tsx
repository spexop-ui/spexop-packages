import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export interface BlurProps extends Omit<AnimationProps, "variant"> {
  blurAmount?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Blur: React.FC<BlurProps> = ({
  blurAmount = 10,
  duration = 500,
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
    filter: `blur(${blurAmount}px)`,
    opacity: 0,
  };

  return (
    <Reveal
      variant="fadeIn"
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

Blur.displayName = "Blur";
