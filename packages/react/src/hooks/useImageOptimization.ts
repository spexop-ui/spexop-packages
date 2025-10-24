/**
 * useImageOptimization Hook
 * Hook for optimizing image loading
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function MyImage() {
 *   const { imgRef, loaded, error } = useImageOptimization({
 *     src: '/image.jpg',
 *     lazy: true
 *   });
 *
 *   return (
 *     <img ref={imgRef} src={loaded ? '/image.jpg' : '/placeholder.jpg'} />
 *   );
 * }
 * ```
 */

import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver.js";

export interface UseImageOptimizationOptions {
  src: string;
  lazy?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export interface UseImageOptimizationReturn {
  imgRef: React.RefObject<HTMLImageElement | null>;
  loaded: boolean;
  error: boolean;
  isInView: boolean;
}

export function useImageOptimization({
  src,
  lazy = true,
  priority = false,
  onLoad,
  onError,
}: UseImageOptimizationOptions): UseImageOptimizationReturn {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Use intersection observer for lazy loading
  const [observerRef, isInView] = useIntersectionObserver({
    threshold: 0.01,
    triggerOnce: true,
  });

  // Set the ref
  useEffect(() => {
    if (imgRef.current && lazy && !priority) {
      observerRef.current = imgRef.current;
    }
  }, [observerRef, lazy, priority]);

  // Determine if image should load
  const shouldLoad = priority || !lazy || isInView;

  // Load image
  useEffect(() => {
    if (!shouldLoad) return;

    const img = new Image();

    const handleLoad = () => {
      setLoaded(true);
      setError(false);
      onLoad?.();
    };

    const handleError = () => {
      setError(true);
      setLoaded(false);
      onError?.();
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    img.src = src;

    // If image is already loaded (from cache)
    if (img.complete) {
      handleLoad();
    }

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src, shouldLoad, onLoad, onError]);

  return {
    imgRef,
    loaded,
    error,
    isInView,
  };
}
