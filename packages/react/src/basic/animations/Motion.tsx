import type React from "react";
import {
  type SpringConfig,
  type SpringPreset,
  useSpring,
} from "./useSpring.js";

/**
 * Motion component props
 */
export interface MotionProps {
  /** Whether the element is visible/active */
  isActive: boolean;
  /** Animation type */
  type?:
    | "fade"
    | "scale"
    | "slideDown"
    | "slideUp"
    | "slideLeft"
    | "slideRight";
  /** Spring configuration or preset */
  spring?: SpringConfig | SpringPreset;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Custom className */
  className?: string;
  /** Children to animate */
  children?: React.ReactNode;
}

/**
 * Motion - Spring-based animation component
 * Uses physics-based spring animations for smooth, natural motion
 *
 * @example
 * ```tsx
 * <Motion isActive={isOpen} type="slideDown" spring="wobbly">
 *   <div>Animated content</div>
 * </Motion>
 * ```
 */
export const Motion: React.FC<MotionProps> = ({
  isActive,
  type = "fade",
  spring = "default",
  style,
  className = "",
  children,
}) => {
  const progress = useSpring(isActive ? 1 : 0, spring);

  const getTransform = (): string => {
    switch (type) {
      case "scale":
        return `scale(${0.9 + progress * 0.1})`;
      case "slideDown":
        return `translateY(${(1 - progress) * -20}px)`;
      case "slideUp":
        return `translateY(${(1 - progress) * 20}px)`;
      case "slideLeft":
        return `translateX(${(1 - progress) * 20}px)`;
      case "slideRight":
        return `translateX(${(1 - progress) * -20}px)`;
      default:
        return "none";
    }
  };

  const motionStyles: React.CSSProperties = {
    opacity: progress,
    transform: getTransform(),
    ...style,
  };

  return (
    <div className={`spex-motion ${className}`} style={motionStyles}>
      {children}
    </div>
  );
};

Motion.displayName = "Motion";
