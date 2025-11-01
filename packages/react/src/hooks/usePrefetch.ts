/**
 * usePrefetch Hook
 * Hook for prefetching data
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function ProductLink({ productId }) {
 *   const prefetch = usePrefetch();
 *
 *   return (
 *     <Link
 *       to={`/products/${productId}`}
 *       onMouseEnter={() => prefetch(`/api/products/${productId}`)}
 *     >
 *       View Product
 *     </Link>
 *   );
 * }
 * ```
 */

import { useCallback } from "react";
import { dataCache } from "../utils/dataCache.js";
import type { FetchOptions } from "../utils/dataFetch.types.js";

/**
 * usePrefetch Hook
 * Hook for prefetching data (standalone, no provider needed)
 *
 * @example
 * ```tsx
 * function ProductLink({ productId }) {
 *   const prefetch = usePrefetch();
 *
 *   return (
 *     <Link
 *       to={`/products/${productId}`}
 *       onMouseEnter={() => prefetch(`/api/products/${productId}`)}
 *     >
 *       View Product
 *     </Link>
 *   );
 * }
 * ```
 */
export function usePrefetch() {
  const prefetch = useCallback(
    async <T = unknown>(url: string, options?: FetchOptions): Promise<void> => {
      // Merge options with defaults
      const mergedOptions: FetchOptions = {
        ...options,
      };

      // Generate cache key
      const cacheKey = `${mergedOptions.method || "GET"}:${url}`;

      // Check if already cached
      if (dataCache.get(cacheKey)) {
        return;
      }

      try {
        // Build full URL
        const requestUrl = url;
        const requestOptions = mergedOptions;

        // Fetch data - extract our custom cache config before passing to fetch
        const {
          cache: _cache,
          retry: _retry,
          dedupe: _dedupe,
          timeout: _timeout,
          ...fetchOptions
        } = requestOptions;
        const response = await fetch(requestUrl, fetchOptions);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();

        // Cache result
        const ttl = mergedOptions.cache?.ttl ?? 300000;
        dataCache.set(cacheKey, responseData as T, ttl);
      } catch (error) {
        // Silently fail - prefetching is optional
        console.warn("Prefetch failed:", error);
      }
    },
    [],
  );

  return prefetch;
}
