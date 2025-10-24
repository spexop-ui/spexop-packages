/**
 * useComponentPerf Hook
 * Complete component performance tracking
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useContext } from "react";
import { PerformanceContext } from "../providers/PerformanceProvider/PerformanceContext.js";
import { useRenderCount } from "./useRenderCount.js";
import { useRenderTime } from "./useRenderTime.js";

export interface ComponentPerfResult {
  renderCount: number;
  lastRenderTime?: number;
  averageRenderTime?: number;
}

export function useComponentPerf(componentName: string): ComponentPerfResult {
  const context = useContext(PerformanceContext);
  const renderCount = useRenderCount();

  // Track render time
  useRenderTime(componentName);

  // Get metrics from context
  const metric = context?.getMetric(componentName);

  return {
    renderCount,
    lastRenderTime: metric?.lastRenderTime,
    averageRenderTime: metric?.averageRenderTime,
  };
}
