import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "./useSpring.js";

/**
 * Gesture motion configuration
 */
export interface GestureMotionConfig {
  /** Minimum distance to trigger gesture */
  threshold?: number;
  /** Maximum velocity for momentum */
  maxVelocity?: number;
  /** Friction for momentum decay */
  friction?: number;
  /** Enable momentum-based animation */
  enableMomentum?: boolean;
  /** Enable gesture-based triggers */
  enableGestures?: boolean;
}

/**
 * Hook for gesture-based motion animations
 * Provides momentum and gesture-based animation triggers
 *
 * @example
 * ```tsx
 * const { progress, gestureHandlers } = useGestureMotion({
 *   threshold: 10,
 *   enableMomentum: true
 * });
 *
 * <div {...gestureHandlers}>
 *   <Motion isActive={progress > 0.5} type="scale">
 *     Content
 *   </Motion>
 * </div>
 * ```
 */
export function useGestureMotion(config: GestureMotionConfig = {}) {
  const {
    threshold = 10,
    maxVelocity = 1000,
    friction = 0.95,
    enableMomentum = true,
    enableGestures = true,
  } = config;

  const [isActive, setIsActive] = useState(false);
  const [velocity, setVelocity] = useState(0);

  // Use spring for smooth progress animation
  const progress = useSpring(isActive ? 1 : 0, "gentle");

  // Refs for gesture tracking
  const startPosRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const momentumRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Handle momentum decay
  useEffect(() => {
    if (!enableMomentum || Math.abs(momentumRef.current) < 0.1) return;

    const decayMomentum = () => {
      momentumRef.current *= friction;
      setVelocity(momentumRef.current);

      if (Math.abs(momentumRef.current) > 0.1) {
        requestAnimationFrame(decayMomentum);
      } else {
        momentumRef.current = 0;
        setVelocity(0);
      }
    };

    requestAnimationFrame(decayMomentum);
  }, [friction, enableMomentum]);

  // Handle touch/mouse start
  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (!enableGestures) return;

      startPosRef.current = { x: clientX, y: clientY };
      lastPosRef.current = { x: clientX, y: clientY };
      lastTimeRef.current = performance.now();
      isDraggingRef.current = true;
      momentumRef.current = 0;
    },
    [enableGestures],
  );

  // Handle touch/mouse move
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!enableGestures || !isDraggingRef.current) return;

      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime === 0) return;

      const deltaX = clientX - lastPosRef.current.x;
      const deltaY = clientY - lastPosRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Calculate velocity
      const currentVelocity = distance / deltaTime;
      momentumRef.current = Math.min(currentVelocity, maxVelocity);
      setVelocity(currentVelocity);

      // Check threshold
      const totalDistance = Math.sqrt(
        (clientX - startPosRef.current.x) ** 2 +
          (clientY - startPosRef.current.y) ** 2,
      );

      if (totalDistance > threshold) {
        setIsActive(true);
      }

      lastPosRef.current = { x: clientX, y: clientY };
      lastTimeRef.current = currentTime;
    },
    [enableGestures, threshold, maxVelocity],
  );

  // Handle touch/mouse end
  const handleEnd = useCallback(() => {
    if (!enableGestures) return;

    isDraggingRef.current = false;

    if (!enableMomentum || Math.abs(momentumRef.current) < 0.1) {
      setIsActive(false);
    }
  }, [enableGestures, enableMomentum]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      handleEnd();
    },
    [handleEnd],
  );

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    },
    [handleStart],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleEnd();
    },
    [handleEnd],
  );

  // Keyboard handlers
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsActive(!isActive);
      }
    },
    [isActive],
  );

  // Gesture handlers object
  const gestureHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    role: "button",
    "aria-pressed": isActive,
  };

  return {
    progress,
    isActive,
    velocity,
    gestureHandlers,
    setIsActive,
  };
}
