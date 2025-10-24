/**
 * Data Fetch Provider Types
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { ReactNode } from "react";

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

/**
 * Data fetch context value
 */
export interface DataFetchContextValue {
  /**
   * Global fetch options
   */
  defaultOptions?: FetchOptions;

  /**
   * Base URL for requests
   */
  baseURL?: string;

  /**
   * Request interceptor
   */
  onRequest?: (
    url: string,
    options?: FetchOptions,
  ) => Promise<{ url: string; options?: FetchOptions }>;

  /**
   * Response interceptor
   */
  onResponse?: <T>(response: Response, data: T) => Promise<T>;

  /**
   * Error interceptor
   */
  onError?: (error: Error) => Promise<Error>;

  /**
   * Clear cache
   */
  clearCache: (key?: string) => void;

  /**
   * Invalidate cache
   */
  invalidateCache: (key: string | RegExp) => void;

  /**
   * Get cache entry
   */
  getCacheEntry: <T>(key: string) => CacheEntry<T> | undefined;

  /**
   * Set cache entry
   */
  setCacheEntry: <T>(key: string, data: T, ttl?: number) => void;
}

/**
 * Data fetch provider props
 */
export interface DataFetchProviderProps {
  children: ReactNode;
  defaultOptions?: FetchOptions;
  baseURL?: string;
  onRequest?: (
    url: string,
    options?: FetchOptions,
  ) => Promise<{ url: string; options?: FetchOptions }>;
  onResponse?: <T>(response: Response, data: T) => Promise<T>;
  onError?: (error: Error) => Promise<Error>;
}
