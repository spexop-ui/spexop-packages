/**
 * useRenderTime Hook
 * Measure component render time
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useEffect, useRef } from "react";
import { usePerformanceUtil } from "../utils/performance.js";

/**
 * useRenderTime Hook
 * Measure component render time using performance utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useRenderTime('MyComponent');
 *
 *   return <div>Content</div>;
 * }
 * ```
 */
export function useRenderTime(componentName: string): void {
  const { track } = usePerformanceUtil();
  const startTimeRef = useRef<number>(0);

  // Mark render start
  startTimeRef.current = performance.now();

  useEffect(() => {
    // Calculate render time
    const renderTime = performance.now() - startTimeRef.current;

    // Track render time
    track(componentName, renderTime);
  });
}
