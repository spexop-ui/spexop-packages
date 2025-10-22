import { useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverOptions {
  /**
   * Threshold for triggering animation (0-1)
   * @default 0.1
   */
  threshold?: number;

  /**
   * Root margin for intersection
   * @default "0px"
   */
  rootMargin?: string;

  /**
   * Only trigger once
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Delay before triggering (ms)
   * @default 0
   */
  delay?: number;
}

/**
 * Hook for detecting when an element enters the viewport
 * Uses IntersectionObserver for performance
 *
 * @example
 * ```tsx
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
 *
 * <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>
 *   Content
 * </div>
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {},
): [React.RefObject<T | null>, boolean] {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }

          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return [ref, isVisible];
}
