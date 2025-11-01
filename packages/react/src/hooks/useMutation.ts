/**
 * useMutation Hook
 * Hook for POST/PUT/DELETE operations with loading and error states
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function CreateProduct() {
 *   const { mutate, loading, error } = useMutation<Product>('/api/products', {
 *     method: 'POST',
 *     onSuccess: (data) => {
 *       console.log('Product created:', data);
 *     }
 *   });
 *
 *   const handleSubmit = async (formData) => {
 *     await mutate(formData);
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {loading && <Spinner />}
 *       {error && <Alert variant="error">{error.message}</Alert>}
 *     </form>
 *   );
 * }
 * ```
 */

import { useCallback, useState } from "react";
import type { FetchOptions } from "../utils/dataFetch.types.js";

export interface UseMutationOptions<T, V = unknown> extends FetchOptions {
  onSuccess?: (data: T, variables: V) => void | Promise<void>;
  onError?: (error: Error, variables: V) => void | Promise<void>;
  onSettled?: (
    data: T | null,
    error: Error | null,
    variables: V,
  ) => void | Promise<void>;
}

export interface UseMutationResult<T, V = unknown> {
  mutate: (variables: V) => Promise<T | null>;
  mutateAsync: (variables: V) => Promise<T>;
  data: T | null;
  loading: boolean;
  error: Error | null;
  reset: () => void;
}

export function useMutation<T = unknown, V = unknown>(
  url: string,
  options?: UseMutationOptions<T, V>,
): UseMutationResult<T, V> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Mutate function
  const mutateAsync = useCallback(
    async (variables: V): Promise<T> => {
      // Merge options with defaults
      const mergedOptions: FetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      };
      setLoading(true);
      setError(null);

      try {
        // Build full URL
        const requestUrl = url;
        const requestOptions: FetchOptions & { body: string } = {
          ...mergedOptions,
          body: JSON.stringify(variables),
        };

        // Make request - extract our custom properties before passing to fetch
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

        const responseData = await response.json();

        setData(responseData);

        // Call onSuccess callback
        if (options?.onSuccess) {
          await options.onSuccess(responseData, variables);
        }

        // Call onSettled callback
        if (options?.onSettled) {
          await options.onSettled(responseData, null, variables);
        }

        return responseData as T;
      } catch (err) {
        const finalError = err as Error;

        setError(finalError);

        // Call onError callback
        if (options?.onError) {
          await options.onError(finalError, variables);
        }

        // Call onSettled callback
        if (options?.onSettled) {
          await options.onSettled(null, finalError, variables);
        }

        throw finalError;
      } finally {
        setLoading(false);
      }
    },
    [url, options],
  );

  // Mutate function (non-throwing)
  const mutate = useCallback(
    async (variables: V): Promise<T | null> => {
      try {
        return await mutateAsync(variables);
      } catch {
        return null;
      }
    },
    [mutateAsync],
  );

  // Reset function
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    mutateAsync,
    data,
    loading,
    error,
    reset,
  };
}
