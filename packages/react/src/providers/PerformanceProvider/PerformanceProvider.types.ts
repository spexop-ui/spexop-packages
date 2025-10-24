/**
 * Performance Provider Types
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { ReactNode } from "react";

/**
 * Performance metric
 */
export interface PerformanceMetric {
  componentName: string;
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  totalRenderTime: number;
  timestamp: number;
}

/**
 * Performance context value
 */
export interface PerformanceContextValue {
  metrics: Map<string, PerformanceMetric>;
  track: (componentName: string, renderTime: number) => void;
  getMetric: (componentName: string) => PerformanceMetric | undefined;
  clearMetrics: () => void;
  isEnabled: boolean;
}

/**
 * Performance provider props
 */
export interface PerformanceProviderProps {
  children: ReactNode;
  enabled?: boolean;
  threshold?: number;
}
