/**
 * useRenderTime Hook
 * Measure component render time
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useContext, useEffect, useRef } from "react";
import { PerformanceContext } from "../providers/PerformanceProvider/PerformanceContext.js";

export function useRenderTime(componentName: string): void {
  const context = useContext(PerformanceContext);
  const startTimeRef = useRef<number>(0);

  // Mark render start
  startTimeRef.current = performance.now();

  useEffect(() => {
    // Calculate render time
    const renderTime = performance.now() - startTimeRef.current;

    // Track in context if available
    if (context?.isEnabled) {
      context.track(componentName, renderTime);
    }
  });
}
