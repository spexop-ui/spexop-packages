/**
 * Data Fetch Provider
 * Context provider for data fetching with caching and request management
 *
 * Follows "The Spexop Way":
 * - Principle 6: Standards before frameworks (uses native fetch API)
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * <DataFetchProvider
 *   baseURL="https://api.example.com"
 *   defaultOptions={{ timeout: 10000 }}
 * >
 *   <App />
 * </DataFetchProvider>
 * ```
 */

import { useCallback, useMemo } from "react";
import { DataFetchContext } from "./DataFetchContext.js";
import type {
  CacheEntry,
  DataFetchContextValue,
  DataFetchProviderProps,
} from "./DataFetchProvider.types.js";
import { dataCache } from "./cache.js";

export function DataFetchProvider({
  children,
  defaultOptions,
  baseURL,
  onRequest,
  onResponse,
  onError,
}: DataFetchProviderProps) {
  // Clear cache
  const clearCache = useCallback((key?: string) => {
    if (key) {
      dataCache.delete(key);
    } else {
      dataCache.clear();
    }
  }, []);

  // Invalidate cache
  const invalidateCache = useCallback((pattern: string | RegExp) => {
    dataCache.invalidate(pattern);
  }, []);

  // Get cache entry
  const getCacheEntry = useCallback(
    <T,>(key: string): CacheEntry<T> | undefined => {
      return dataCache.get<T>(key);
    },
    [],
  );

  // Set cache entry
  const setCacheEntry = useCallback(
    <T,>(key: string, data: T, ttl?: number) => {
      dataCache.set(key, data, ttl);
    },
    [],
  );

  // Context value
  const contextValue: DataFetchContextValue = useMemo(
    () => ({
      defaultOptions,
      baseURL,
      onRequest,
      onResponse,
      onError,
      clearCache,
      invalidateCache,
      getCacheEntry,
      setCacheEntry,
    }),
    [
      defaultOptions,
      baseURL,
      onRequest,
      onResponse,
      onError,
      clearCache,
      invalidateCache,
      getCacheEntry,
      setCacheEntry,
    ],
  );

  return (
    <DataFetchContext.Provider value={contextValue}>
      {children}
    </DataFetchContext.Provider>
  );
}
