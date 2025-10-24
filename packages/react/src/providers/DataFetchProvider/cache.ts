/**
 * Cache Implementation
 * Simple in-memory cache for data fetching
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { CacheEntry } from "./DataFetchProvider.types.js";

class DataCache {
  private cache: Map<string, CacheEntry>;
  private pending: Map<string, Promise<unknown>>;

  constructor() {
    this.cache = new Map();
    this.pending = new Map();
  }

  /**
   * Get cache entry
   */
  get<T>(key: string): CacheEntry<T> | undefined {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry;
  }

  /**
   * Set cache entry
   */
  set<T>(key: string, data: T, ttl = 300000): void {
    const timestamp = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp,
      expiresAt: timestamp + ttl,
    };

    this.cache.set(key, entry as CacheEntry);
  }

  /**
   * Delete cache entry
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Invalidate cache entries matching pattern
   */
  invalidate(pattern: string | RegExp): void {
    const keys = Array.from(this.cache.keys());

    for (const key of keys) {
      if (typeof pattern === "string") {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      } else if (pattern.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get pending request
   */
  getPending<T>(key: string): Promise<T> | undefined {
    return this.pending.get(key) as Promise<T> | undefined;
  }

  /**
   * Set pending request
   */
  setPending<T>(key: string, promise: Promise<T>): void {
    this.pending.set(key, promise);

    // Clean up after resolution
    promise
      .then(() => this.pending.delete(key))
      .catch(() => this.pending.delete(key));
  }

  /**
   * Delete pending request
   */
  deletePending(key: string): void {
    this.pending.delete(key);
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Get all keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// Export singleton instance
export const dataCache = new DataCache();
