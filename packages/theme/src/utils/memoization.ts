/**
 * Memoization Utilities for Performance Optimization
 * Cache expensive operations and theme generation results
 *
 * @module @spexop/theme/utils
 */

/**
 * Simple LRU (Least Recently Used) Cache implementation
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly maxSize: number;

  constructor(maxSize = 50) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // Remove if exists to re-add at end
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    // Remove oldest if over size limit
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * Create a hash key from function arguments
 */
function createHashKey(args: unknown[]): string {
  try {
    return JSON.stringify(args);
  } catch {
    // Fallback for circular references
    return args.map((arg) => String(arg)).join("|");
  }
}

/**
 * Memoize a function with LRU cache
 *
 * @param fn - Function to memoize
 * @param cacheSize - Maximum cache size (default: 50)
 * @returns Memoized function
 *
 * @example
 * ```typescript
 * const expensiveFunction = (theme: SpexopThemeConfig) => {
 *   // Expensive operation
 *   return generateCSS(theme);
 * };
 *
 * const memoized = memoize(expensiveFunction);
 * const result1 = memoized(theme); // Executes function
 * const result2 = memoized(theme); // Returns cached result
 * ```
 */
export function memoize<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  cacheSize = 50,
): (...args: TArgs) => TReturn {
  const cache = new LRUCache<string, TReturn>(cacheSize);

  const memoized = (...args: TArgs): TReturn => {
    const key = createHashKey(args);
    const cached = cache.get(key);

    if (cached !== undefined) {
      return cached;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };

  // Add cache control methods
  (memoized as { clearCache?: () => void }).clearCache = () => cache.clear();

  return memoized;
}

/**
 * Memoize theme generation functions
 *
 * @param generator - Generator function to memoize
 * @returns Memoized generator
 *
 * @example
 * ```typescript
 * const memoizedCSS = memoizeGenerator(generateCSS);
 * ```
 */
export function memoizeGenerator<T, R>(
  generator: (config: T, ...args: unknown[]) => R,
): (config: T, ...args: unknown[]) => R {
  return memoize(generator, 20); // Smaller cache for generators
}

/**
 * Debounce function execution
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```typescript
 * const handleChange = debounce((theme) => {
 *   updatePreview(theme);
 * }, 300);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): T {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return ((...args: unknown[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}

/**
 * Throttle function execution
 *
 * @param fn - Function to throttle
 * @param limit - Minimum time between executions in milliseconds
 * @returns Throttled function
 *
 * @example
 * ```typescript
 * const handleScroll = throttle(() => {
 *   updateScrollPosition();
 * }, 100);
 * ```
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number,
): T {
  let inThrottle = false;

  return ((...args: unknown[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  }) as T;
}

/**
 * Batch multiple theme updates
 *
 * @param updates - Array of update functions
 * @returns Combined update function
 *
 * @example
 * ```typescript
 * const updateTheme = batchUpdates([
 *   (theme) => ({ ...theme, colors: newColors }),
 *   (theme) => ({ ...theme, typography: newTypography }),
 * ]);
 * ```
 */
export function batchUpdates<T>(
  updates: Array<(current: T) => T>,
): (initial: T) => T {
  return (initial: T) => {
    return updates.reduce((current, update) => update(current), initial);
  };
}

/**
 * Lazy evaluation wrapper
 *
 * @param fn - Function to evaluate lazily
 * @returns Function that caches first result
 *
 * @example
 * ```typescript
 * const getTheme = lazy(() => loadExpensiveTheme());
 * const theme1 = getTheme(); // Loads theme
 * const theme2 = getTheme(); // Returns cached theme
 * ```
 */
export function lazy<T>(fn: () => T): () => T {
  let cached: T | undefined;
  let executed = false;

  return () => {
    if (!executed) {
      cached = fn();
      executed = true;
    }
    return cached as T;
  };
}

/**
 * Performance measurement utility
 *
 * @param label - Label for the operation
 * @param fn - Function to measure
 * @returns Function result and execution time
 *
 * @example
 * ```typescript
 * const result = measurePerformance("CSS Generation", () => {
 *   return generateCSS(theme);
 * });
 * console.log(`Generated in ${result.time}ms`);
 * ```
 */
export function measurePerformance<T>(
  label: string,
  fn: () => T,
): { result: T; time: number } {
  // Use performance.now() if available, otherwise Date.now()
  const perfAPI = (globalThis as { performance?: { now?: () => number } })
    .performance;
  const now = perfAPI?.now ? perfAPI.now.bind(perfAPI) : () => Date.now();

  const start = now();
  const result = fn();
  const end = now();
  const time = end - start;

  if (typeof console !== "undefined") {
    console.log(`[Performance] ${label}: ${time.toFixed(2)}ms`);
  }

  return { result, time };
}

/**
 * Create a memoized selector for theme properties
 *
 * @param selector - Function to select from theme
 * @returns Memoized selector
 *
 * @example
 * ```typescript
 * const selectColors = createSelector((theme) => theme.colors);
 * const colors1 = selectColors(theme); // Executes
 * const colors2 = selectColors(theme); // Cached
 * ```
 */
export function createSelector<T, R>(
  selector: (theme: T) => R,
): (theme: T) => R {
  return memoize(selector, 10);
}
