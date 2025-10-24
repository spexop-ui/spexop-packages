/**
 * Performance Provider
 * Context provider for performance tracking
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * <PerformanceProvider enabled={process.env.NODE_ENV === 'development'}>
 *   <App />
 * </PerformanceProvider>
 * ```
 */

import { useCallback, useMemo, useRef } from "react";
import { PerformanceContext } from "./PerformanceContext.js";
import type {
  PerformanceContextValue,
  PerformanceMetric,
  PerformanceProviderProps,
} from "./PerformanceProvider.types.js";

export function PerformanceProvider({
  children,
  enabled = process.env.NODE_ENV === "development",
  threshold = 16,
}: PerformanceProviderProps) {
  const metricsRef = useRef<Map<string, PerformanceMetric>>(new Map());

  // Track performance
  const track = useCallback(
    (componentName: string, renderTime: number) => {
      if (!enabled) return;

      const existing = metricsRef.current.get(componentName);

      if (existing) {
        const newRenderCount = existing.renderCount + 1;
        const newTotalTime = existing.totalRenderTime + renderTime;

        metricsRef.current.set(componentName, {
          componentName,
          renderCount: newRenderCount,
          lastRenderTime: renderTime,
          averageRenderTime: newTotalTime / newRenderCount,
          totalRenderTime: newTotalTime,
          timestamp: Date.now(),
        });

        // Warn if render time exceeds threshold
        if (renderTime > threshold) {
          console.warn(
            `[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (threshold: ${threshold}ms)`,
          );
        }
      } else {
        metricsRef.current.set(componentName, {
          componentName,
          renderCount: 1,
          lastRenderTime: renderTime,
          averageRenderTime: renderTime,
          totalRenderTime: renderTime,
          timestamp: Date.now(),
        });
      }
    },
    [enabled, threshold],
  );

  // Get metric
  const getMetric = useCallback((componentName: string) => {
    return metricsRef.current.get(componentName);
  }, []);

  // Clear metrics
  const clearMetrics = useCallback(() => {
    metricsRef.current.clear();
  }, []);

  // Context value
  const contextValue: PerformanceContextValue = useMemo(
    () => ({
      metrics: metricsRef.current,
      track,
      getMetric,
      clearMetrics,
      isEnabled: enabled,
    }),
    [track, getMetric, clearMetrics, enabled],
  );

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}
