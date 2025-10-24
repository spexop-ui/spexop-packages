/**
 * useInfiniteScroll Hook
 * Hook for infinite scrolling with pagination
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function ProductList() {
 *   const { data, loading, hasMore, loadMore, containerRef } = useInfiniteScroll<Product>({
 *     url: '/api/products',
 *     pageSize: 20
 *   });
 *
 *   return (
 *     <div ref={containerRef}>
 *       {data.map(product => <ProductCard key={product.id} {...product} />)}
 *       {loading && <Spinner />}
 *       {hasMore && <button onClick={loadMore}>Load More</button>}
 *     </div>
 *   );
 * }
 * ```
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { FetchOptions } from "../providers/DataFetchProvider/DataFetchProvider.types.js";
import { useFetch } from "./useFetch.js";

export interface UseInfiniteScrollOptions extends FetchOptions {
  url: string;
  pageSize?: number;
  initialPage?: number;
  getNextPageParam?: (
    lastPage: unknown,
    allPages: unknown[],
  ) => number | undefined;
  threshold?: number;
  enabled?: boolean;
}

export interface UseInfiniteScrollResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll<T = unknown>({
  url,
  pageSize = 20,
  initialPage = 1,
  getNextPageParam,
  threshold = 0.8,
  enabled = true,
  ...fetchOptions
}: UseInfiniteScrollOptions): UseInfiniteScrollResult<T> {
  const [page, setPage] = useState(initialPage);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Build paginated URL
  const paginatedUrl = enabled
    ? `${url}${url.includes("?") ? "&" : "?"}page=${page}&limit=${pageSize}`
    : null;

  // Fetch current page
  const { data, loading, error } = useFetch<T[]>(paginatedUrl, fetchOptions);

  // Update all data when new page loads
  useEffect(() => {
    if (data) {
      setAllData((prev) => {
        const newData = page === initialPage ? data : [...prev, ...data];

        // Check if there's more data
        if (data.length < pageSize) {
          setHasMore(false);
        } else if (getNextPageParam) {
          const nextPage = getNextPageParam(data, newData);
          setHasMore(nextPage !== undefined);
        }

        return newData;
      });
    }
  }, [data, page, pageSize, initialPage, getNextPageParam]);

  // Load more function
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  // Reset function
  const reset = useCallback(() => {
    setPage(initialPage);
    setAllData([]);
    setHasMore(true);
  }, [initialPage]);

  // Setup intersection observer for auto-loading
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      {
        threshold,
      },
    );

    // Observe last child
    const container = containerRef.current;
    const lastChild = container.lastElementChild;
    if (lastChild) {
      observerRef.current.observe(lastChild);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enabled, loading, hasMore, loadMore, threshold]);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    containerRef,
  };
}
