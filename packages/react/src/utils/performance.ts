/**
 * Performance Utility
 * Component rendering performance tracking without providers
 *
 * Features:
 * - Track component render times
 * - Calculate average, total, and last render time
 * - Warn when render time exceeds threshold
 * - Get metrics for individual components
 * - Clear metrics
 * - Enable/disable tracking
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Performance metric for a component
 */
export interface PerformanceMetric {
  /** Component name */
  componentName: string;
  /** Number of renders */
  renderCount: number;
  /** Last render time in ms */
  lastRenderTime: number;
  /** Average render time in ms */
  averageRenderTime: number;
  /** Total render time in ms */
  totalRenderTime: number;
  /** Last update timestamp */
  timestamp: number;
}

/**
 * Performance utility configuration
 */
export interface PerformanceUtilConfig {
  /** Enable performance tracking */
  enabled?: boolean;
  /** Render time threshold in ms (default: 16ms for 60fps) */
  threshold?: number;
}

/**
 * Performance utility return value
 */
export interface PerformanceUtilReturn {
  /** All metrics */
  metrics: Map<string, PerformanceMetric>;
  /** Track component render time */
  track: (componentName: string, renderTime: number) => void;
  /** Get metric for a component */
  getMetric: (componentName: string) => PerformanceMetric | undefined;
  /** Clear all metrics */
  clearMetrics: () => void;
  /** Check if tracking is enabled */
  isEnabled: boolean;
  /** Get all metrics as array */
  getAllMetrics: () => PerformanceMetric[];
}

// ============================================================================
// MODULE-LEVEL STATE (Singleton Pattern)
// ============================================================================

/**
 * Global performance tracker
 */
class PerformanceTracker {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private enabled: boolean = process.env.NODE_ENV === "development";
  private threshold = 16; // 60fps = 16.67ms per frame
  private listeners: Set<() => void> = new Set();

  /**
   * Configure tracker
   */
  configure(config: PerformanceUtilConfig): void {
    if (config.enabled !== undefined) {
      this.enabled = config.enabled;
    }
    if (config.threshold !== undefined) {
      this.threshold = config.threshold;
    }
    this.notifyListeners();
  }

  /**
   * Get configuration
   */
  getConfig(): { enabled: boolean; threshold: number } {
    return {
      enabled: this.enabled,
      threshold: this.threshold,
    };
  }

  /**
   * Track component render time
   */
  track(componentName: string, renderTime: number): void {
    if (!this.enabled) return;

    const existing = this.metrics.get(componentName);

    if (existing) {
      const newRenderCount = existing.renderCount + 1;
      const newTotalTime = existing.totalRenderTime + renderTime;

      this.metrics.set(componentName, {
        componentName,
        renderCount: newRenderCount,
        lastRenderTime: renderTime,
        averageRenderTime: newTotalTime / newRenderCount,
        totalRenderTime: newTotalTime,
        timestamp: Date.now(),
      });

      // Warn if render time exceeds threshold
      if (renderTime > this.threshold) {
        console.warn(
          `[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (threshold: ${this.threshold}ms)`,
        );
      }
    } else {
      this.metrics.set(componentName, {
        componentName,
        renderCount: 1,
        lastRenderTime: renderTime,
        averageRenderTime: renderTime,
        totalRenderTime: renderTime,
        timestamp: Date.now(),
      });
    }

    this.notifyListeners();
  }

  /**
   * Get metric for a component
   */
  getMetric(componentName: string): PerformanceMetric | undefined {
    return this.metrics.get(componentName);
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
    this.notifyListeners();
  }

  /**
   * Check if tracking is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

// Singleton instance
const performanceTracker = new PerformanceTracker();

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * usePerformanceUtil Hook
 * Provider-free performance tracking utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { track } = usePerformanceUtil({
 *     enabled: true,
 *     threshold: 16,
 *   });
 *
 *   useEffect(() => {
 *     const start = performance.now();
 *     return () => {
 *       const end = performance.now();
 *       track("MyComponent", end - start);
 *     };
 *   });
 *
 *   return <div>Content</div>;
 * }
 * ```
 */
export function usePerformanceUtil(
  config?: PerformanceUtilConfig,
): PerformanceUtilReturn {
  const [metrics, setMetrics] = useState(() => {
    const allMetrics = performanceTracker.getAllMetrics();
    const newMetrics = new Map<string, PerformanceMetric>();
    for (const metric of allMetrics) {
      newMetrics.set(metric.componentName, metric);
    }
    return newMetrics;
  });

  // Configure on mount if config provided
  useEffect(() => {
    if (config) {
      performanceTracker.configure(config);
    }
  }, [config]);

  // Subscribe to changes
  useEffect(() => {
    const unsubscribe = performanceTracker.subscribe(() => {
      // Get fresh metrics
      const allMetrics = performanceTracker.getAllMetrics();
      const newMetrics = new Map<string, PerformanceMetric>();
      for (const metric of allMetrics) {
        newMetrics.set(metric.componentName, metric);
      }
      setMetrics(newMetrics);
    });

    return unsubscribe;
  }, []);

  // Memoized handlers
  const track = useCallback((componentName: string, renderTime: number) => {
    performanceTracker.track(componentName, renderTime);
  }, []);

  const getMetric = useCallback((componentName: string) => {
    return performanceTracker.getMetric(componentName);
  }, []);

  const clearMetrics = useCallback(() => {
    performanceTracker.clearMetrics();
  }, []);

  const getAllMetrics = useCallback(() => {
    return performanceTracker.getAllMetrics();
  }, []);

  return {
    metrics,
    track,
    getMetric,
    clearMetrics,
    isEnabled: performanceTracker.isEnabled(),
    getAllMetrics,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default usePerformanceUtil;
