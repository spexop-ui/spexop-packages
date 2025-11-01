/**
 * Data Fetch Types
 * Types for useFetch hook (standalone, no provider needed)
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.6.0
 * @since 2025-10-31
 */

/**
 * Fetch options
 */
export interface FetchOptions extends Omit<RequestInit, "cache"> {
  /**
   * Request timeout in milliseconds
   */
  timeout?: number;

  /**
   * Retry configuration
   */
  retry?: RetryConfig;

  /**
   * Cache configuration
   */
  cache?: CacheConfig;

  /**
   * Deduplicate requests
   * @default true
   */
  dedupe?: boolean;
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  /**
   * Maximum number of retries
   * @default 3
   */
  count?: number;

  /**
   * Delay between retries in milliseconds
   * @default 1000
   */
  delay?: number;

  /**
   * Use exponential backoff
   * @default true
   */
  exponentialBackoff?: boolean;

  /**
   * Conditions to retry on
   */
  retryOn?: ((error: Error, attempt: number) => boolean) | number[];
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /**
   * Cache time in milliseconds
   * @default 300000 (5 minutes)
   */
  ttl?: number;

  /**
   * Cache key generator
   */
  key?: (url: string, options?: FetchOptions) => string;

  /**
   * Revalidate cache on focus
   * @default false
   */
  revalidateOnFocus?: boolean;

  /**
   * Revalidate cache on reconnect
   * @default false
   */
  revalidateOnReconnect?: boolean;
}

/**
 * Cache entry
 */
export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  expiresAt: number;
}
