/**
 * useFetch Hook
 * Hook for fetching data with loading, error states, and caching
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function ProductList() {
 *   const { data, loading, error, refetch } = useFetch<Product[]>('/api/products');
 *
 *   if (loading) return <Spinner />;
 *   if (error) return <Alert variant="error">{error.message}</Alert>;
 *
 *   return <div>{data?.map(product => <ProductCard key={product.id} {...product} />)}</div>;
 * }
 * ```
 */

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DataFetchContext } from "../providers/DataFetchProvider/DataFetchContext.js";
import type { FetchOptions } from "../providers/DataFetchProvider/DataFetchProvider.types.js";
import { dataCache } from "../providers/DataFetchProvider/cache.js";

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  mutate: (newData: T) => void;
}

/**
 * Generate cache key from URL and options
 */
function generateCacheKey(url: string, options?: FetchOptions): string {
  const method = options?.method || "GET";
  const body = options?.body ? JSON.stringify(options.body) : "";
  return `${method}:${url}:${body}`;
}

/**
 * Retry with exponential backoff
 */
async function retryFetch<T>(
  fn: () => Promise<T>,
  retryConfig?: FetchOptions["retry"],
): Promise<T> {
  const maxRetries = retryConfig?.count ?? 3;
  const baseDelay = retryConfig?.delay ?? 1000;
  const useExponentialBackoff = retryConfig?.exponentialBackoff ?? true;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if should retry
      if (attempt < maxRetries) {
        if (retryConfig?.retryOn) {
          if (typeof retryConfig.retryOn === "function") {
            if (!retryConfig.retryOn(lastError, attempt)) {
              throw lastError;
            }
          } else if (Array.isArray(retryConfig.retryOn)) {
            // Retry on specific status codes
            const statusCode = (lastError as unknown as { status?: number })
              .status;
            if (statusCode && !retryConfig.retryOn.includes(statusCode)) {
              throw lastError;
            }
          }
        }

        // Calculate delay
        const delay = useExponentialBackoff
          ? baseDelay * 2 ** attempt
          : baseDelay;

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export function useFetch<T = unknown>(
  url: string | null,
  options?: FetchOptions,
): UseFetchResult<T> {
  const context = useContext(DataFetchContext);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch function
  const fetchData = useCallback(async () => {
    // Merge options with defaults inside callback
    const mergedOptions: FetchOptions = {
      ...context?.defaultOptions,
      ...options,
      cache: {
        ttl: 300000,
        ...context?.defaultOptions?.cache,
        ...options?.cache,
      },
      retry: {
        count: 3,
        delay: 1000,
        exponentialBackoff: true,
        ...context?.defaultOptions?.retry,
        ...options?.retry,
      },
    };
    if (!url) {
      setLoading(false);
      return;
    }

    // Generate cache key
    const cacheKey =
      mergedOptions.cache?.key?.(url, mergedOptions) ||
      generateCacheKey(url, mergedOptions);

    // Check cache first
    const cached = dataCache.get<T>(cacheKey);
    if (cached && mergedOptions.cache?.ttl) {
      setData(cached.data);
      setLoading(false);
      setError(null);
      return;
    }

    // Check for pending request (dedupe)
    if (mergedOptions.dedupe !== false) {
      const pending = dataCache.getPending<T>(cacheKey);
      if (pending) {
        try {
          const result = await pending;
          setData(result);
          setLoading(false);
          setError(null);
          return;
        } catch (err) {
          setError(err as Error);
          setLoading(false);
          return;
        }
      }
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      // Build full URL
      const fullUrl = context?.baseURL ? `${context.baseURL}${url}` : url;

      // Apply request interceptor
      let requestUrl = fullUrl;
      let requestOptions: FetchOptions = {
        ...mergedOptions,
        signal: abortControllerRef.current.signal,
      };

      if (context?.onRequest) {
        const intercepted = await context.onRequest(requestUrl, requestOptions);
        requestUrl = intercepted.url;
        requestOptions = {
          ...requestOptions,
          ...intercepted.options,
          signal: abortControllerRef.current.signal,
        };
      }

      // Create fetch promise
      const fetchPromise = retryFetch(async () => {
        // Apply timeout
        const timeoutId = mergedOptions.timeout
          ? setTimeout(
              () => abortControllerRef.current?.abort(),
              mergedOptions.timeout,
            )
          : null;

        try {
          // Extract our custom properties before passing to fetch
          const {
            cache: _cache,
            retry: _retry,
            dedupe: _dedupe,
            timeout: _timeout,
            ...fetchOptions
          } = requestOptions;
          const response = await fetch(requestUrl, fetchOptions);

          if (!response.ok) {
            const errorObj = new Error(
              `HTTP ${response.status}: ${response.statusText}`,
            ) as Error & { status: number; response: Response };
            errorObj.status = response.status;
            errorObj.response = response;
            throw errorObj;
          }

          let responseData = await response.json();

          // Apply response interceptor
          if (context?.onResponse) {
            responseData = await context.onResponse(response, responseData);
          }

          return responseData as T;
        } finally {
          if (timeoutId) clearTimeout(timeoutId);
        }
      }, mergedOptions.retry);

      // Store pending request
      if (mergedOptions.dedupe !== false) {
        dataCache.setPending(cacheKey, fetchPromise);
      }

      const result = await fetchPromise;

      // Cache result
      if (mergedOptions.cache?.ttl) {
        dataCache.set(cacheKey, result, mergedOptions.cache.ttl);
      }

      setData(result);
      setError(null);
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      let finalError = err as Error;

      // Apply error interceptor
      if (context?.onError) {
        finalError = await context.onError(finalError);
      }

      setError(finalError);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options, context]);

  // Refetch function
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Mutate function (optimistic updates)
  const mutate = useCallback(
    (newData: T) => {
      setData(newData);

      // Update cache
      if (url && options?.cache?.ttl) {
        const mergedOptions: FetchOptions = {
          ...context?.defaultOptions,
          ...options,
        };
        const cacheKey =
          options.cache?.key?.(url, mergedOptions) ||
          generateCacheKey(url, mergedOptions);
        dataCache.set(cacheKey, newData, options.cache.ttl);
      }
    },
    [url, options, context],
  );

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchData();

    return () => {
      // Cleanup: abort on unmount
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    mutate,
  };
}
