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
    | "slideRight"
    | "rotate"
    | "flipX"
    | "flipY"
    | "zoom"
    | "bounce"
    | "shake";
  /** Spring configuration or preset */
  spring?: SpringConfig | SpringPreset;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Custom className */
  className?: string;
  /** Children to animate */
  children?: React.ReactNode;
  /** Animation distance/scale multiplier */
  distance?: number;
  /** Enable hardware acceleration */
  hardwareAcceleration?: boolean;
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
  distance = 20,
  hardwareAcceleration = true,
}) => {
  const progress = useSpring(isActive ? 1 : 0, spring);

  const getTransform = (): string => {
    const easeProgress = progress;
    const reverseProgress = 1 - progress;

    switch (type) {
      case "scale":
        return `scale(${0.8 + easeProgress * 0.2})`;
      case "zoom":
        return `scale(${0.5 + easeProgress * 0.5})`;
      case "slideDown":
        return `translateY(${reverseProgress * -distance}px)`;
      case "slideUp":
        return `translateY(${reverseProgress * distance}px)`;
      case "slideLeft":
        return `translateX(${reverseProgress * distance}px)`;
      case "slideRight":
        return `translateX(${reverseProgress * -distance}px)`;
      case "rotate":
        return `rotate(${reverseProgress * 180}deg)`;
      case "flipX":
        return `rotateX(${reverseProgress * 180}deg)`;
      case "flipY":
        return `rotateY(${reverseProgress * 180}deg)`;
      case "bounce": {
        // Create a bounce effect with scale and translate
        const bounceScale =
          easeProgress > 0.5
            ? 1.1 - (easeProgress - 0.5) * 0.2
            : 0.8 + easeProgress * 0.4;
        const bounceY =
          easeProgress > 0.5
            ? -(easeProgress - 0.5) * distance * 2
            : reverseProgress * distance;
        return `translateY(${bounceY}px) scale(${bounceScale})`;
      }
      case "shake": {
        // Create a shake effect
        const shakeX =
          Math.sin(easeProgress * Math.PI * 8) *
          distance *
          0.3 *
          reverseProgress;
        return `translateX(${shakeX}px)`;
      }
      default:
        return "none";
    }
  };

  const motionStyles: React.CSSProperties = {
    opacity: progress,
    transform: getTransform(),
    // Enable hardware acceleration for better performance
    transformStyle: hardwareAcceleration ? "preserve-3d" : undefined,
    backfaceVisibility: hardwareAcceleration ? "hidden" : undefined,
    perspective: hardwareAcceleration ? "1000px" : undefined,
    ...style,
  };

  return (
    <div className={`spex-motion ${className}`} style={motionStyles}>
      {children}
    </div>
  );
};

Motion.displayName = "Motion";
