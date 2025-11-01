/**
 * useComponentPerf Hook
 * Complete component performance tracking
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { usePerformanceUtil } from "../utils/performance.js";
import { useRenderCount } from "./useRenderCount.js";
import { useRenderTime } from "./useRenderTime.js";

export interface ComponentPerfResult {
  renderCount: number;
  lastRenderTime?: number;
  averageRenderTime?: number;
}

/**
 * useComponentPerf Hook
 * Complete component performance tracking using performance utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const perf = useComponentPerf('MyComponent');
 *
 *   return <div>Renders: {perf.renderCount}</div>;
 * }
 * ```
 */
export function useComponentPerf(componentName: string): ComponentPerfResult {
  const { getMetric } = usePerformanceUtil();
  const renderCount = useRenderCount();

  // Track render time
  useRenderTime(componentName);

  // Get metrics from utility
  const metric = getMetric(componentName);

  return {
    renderCount,
    lastRenderTime: metric?.lastRenderTime,
    averageRenderTime: metric?.averageRenderTime,
  };
}
