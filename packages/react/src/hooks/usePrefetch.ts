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

import { useCallback, useContext } from "react";
import { DataFetchContext } from "../providers/DataFetchProvider/DataFetchContext.js";
import type { FetchOptions } from "../providers/DataFetchProvider/DataFetchProvider.types.js";
import { dataCache } from "../providers/DataFetchProvider/cache.js";

export function usePrefetch() {
  const context = useContext(DataFetchContext);

  const prefetch = useCallback(
    async <T = unknown>(url: string, options?: FetchOptions): Promise<void> => {
      // Merge options with defaults
      const mergedOptions: FetchOptions = {
        ...context?.defaultOptions,
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
        const fullUrl = context?.baseURL ? `${context.baseURL}${url}` : url;

        // Apply request interceptor
        let requestUrl = fullUrl;
        let requestOptions = mergedOptions;

        if (context?.onRequest) {
          const intercepted = await context.onRequest(
            requestUrl,
            requestOptions,
          );
          requestUrl = intercepted.url;
          requestOptions = {
            ...requestOptions,
            ...intercepted.options,
          };
        }

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

        let responseData = await response.json();

        // Apply response interceptor
        if (context?.onResponse) {
          responseData = await context.onResponse(response, responseData);
        }

        // Cache result
        const ttl = mergedOptions.cache?.ttl ?? 300000;
        dataCache.set(cacheKey, responseData as T, ttl);
      } catch (error) {
        // Silently fail - prefetching is optional
        console.warn("Prefetch failed:", error);
      }
    },
    [context],
  );

  return prefetch;
}
