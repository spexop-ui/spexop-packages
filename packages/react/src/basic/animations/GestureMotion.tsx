import type React from "react";
import { Motion } from "./Motion.js";
import {
  type GestureMotionConfig,
  useGestureMotion,
} from "./useGestureMotion.js";

/**
 * Gesture Motion component props
 */
export interface GestureMotionProps extends GestureMotionConfig {
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
  spring?:
    | "default"
    | "gentle"
    | "wobbly"
    | "stiff"
    | "slow"
    | "molasses"
    | "bouncy"
    | "crisp"
    | "smooth"
    | "elastic";
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
 * GestureMotion - Enhanced Motion component with gesture support
 * Provides gesture-based animation triggers and momentum
 *
 * @example
 * ```tsx
 * <GestureMotion type="scale" spring="wobbly" enableMomentum>
 *   <div>Gesture-controlled content</div>
 * </GestureMotion>
 * ```
 */
export const GestureMotion: React.FC<GestureMotionProps> = ({
  type = "scale",
  spring = "gentle",
  style,
  className = "",
  children,
  distance = 20,
  hardwareAcceleration = true,
  threshold = 10,
  maxVelocity = 1000,
  friction = 0.95,
  enableMomentum = true,
  enableGestures = true,
}) => {
  const { progress, isActive, gestureHandlers } = useGestureMotion({
    threshold,
    maxVelocity,
    friction,
    enableMomentum,
    enableGestures,
  });

  return (
    <div {...gestureHandlers} className={className} style={style}>
      <Motion
        isActive={isActive}
        type={type}
        spring={spring}
        distance={distance}
        hardwareAcceleration={hardwareAcceleration}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </Motion>
    </div>
  );
};

GestureMotion.displayName = "GestureMotion";
