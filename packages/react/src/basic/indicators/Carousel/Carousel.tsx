import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon/Icon.js";
import styles from "./Carousel.module.css";
import type { CarouselProps } from "./Carousel.types.js";

/**
 * Carousel - Slideshow component following Spexop design principles
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * Features:
 * - Border-based design (3px bold borders, no shadows)
 * - High-contrast navigation controls (WCAG AAA)
 * - Keyboard accessible (Arrow keys, Home, End)
 * - Auto-play with pause on hover
 * - Dot indicators and item counter
 * - Infinite loop support
 * - Reduced motion support
 *
 * Design Principles:
 * - Borders Before Shadows (Principle #2) - 3px borders, zero shadows
 * - Typography Before Decoration (Principle #3) - Semibold counter
 * - Accessibility Before Aesthetics (Principle #7) - WCAG AAA, keyboard, ARIA
 * - Tokens Before Magic Numbers (Principle #4) - All spacing uses tokens
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: '1', content: <img src="slide1.jpg" alt="Slide 1" /> },
 *   { id: '2', content: <img src="slide2.jpg" alt="Slide 2" /> },
 *   { id: '3', content: <img src="slide3.jpg" alt="Slide 3" /> }
 * ];
 *
 * <Carousel
 *   items={items}
 *   showArrows
 *   showDots
 *   ariaLabel="Product showcase"
 * />
 * ```
 */
export function Carousel({
  items,
  activeIndex: controlledIndex,
  onChange,
  variant = "slide",
  autoPlayInterval,
  showArrows = true,
  showDots = true,
  showCounter = false,
  showThumbnails = false,
  thumbnailPosition = "bottom",
  loop = true,
  enableKeyboard = true,
  enableSwipe = true,
  showPeek = false,
  peekAmount = 60,
  lazyLoad = false,
  preloadCount = 1,
  transitionDuration = 300,
  aspectRatio,
  className = "",
  ariaLabel = "Carousel",
  pauseOnHover = true,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Minimum swipe/drag distance in pixels
  const minSwipeDistance = 50;

  // Use controlled or uncontrolled index
  const activeIndex = controlledIndex ?? internalIndex;

  // Clear auto-play timer
  const clearAutoPlayTimer = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  // Navigate to specific index
  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      let newIndex = index;

      // Handle looping
      if (loop) {
        if (newIndex < 0) {
          newIndex = items.length - 1;
        } else if (newIndex >= items.length) {
          newIndex = 0;
        }
      } else {
        // Clamp to valid range
        newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
      }

      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), transitionDuration);

      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }

      onChange?.(newIndex);
    },
    [
      isTransitioning,
      loop,
      items.length,
      controlledIndex,
      onChange,
      transitionDuration,
    ],
  );

  // Navigate to previous item
  const goToPrevious = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  // Navigate to next item
  const goToNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  // Touch handlers for swipe gestures
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enableSwipe) return;
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    },
    [enableSwipe],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!enableSwipe) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [enableSwipe],
  );

  const onTouchEnd = useCallback(() => {
    if (!enableSwipe || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  }, [enableSwipe, touchStart, touchEnd, goToNext, goToPrevious]);

  // Mouse drag handlers for desktop
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enableSwipe || variant === "fade") return;
      setIsDragging(true);
      setDragStart(e.clientX);
      setDragOffset(0);
      e.preventDefault();
    },
    [enableSwipe, variant],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragStart) return;
      const currentOffset = e.clientX - dragStart;
      setDragOffset(currentOffset);
    },
    [isDragging, dragStart],
  );

  const onMouseUp = useCallback(() => {
    if (!isDragging || !dragStart) return;

    const distance = -dragOffset; // Negative because we want left drag to go next
    const isLeftDrag = distance > minSwipeDistance;
    const isRightDrag = distance < -minSwipeDistance;

    if (isLeftDrag) {
      goToNext();
    } else if (isRightDrag) {
      goToPrevious();
    }

    setIsDragging(false);
    setDragStart(null);
    setDragOffset(0);
  }, [isDragging, dragStart, dragOffset, goToNext, goToPrevious]);

  const onMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
      setDragOffset(0);
    }
  }, [isDragging]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlayInterval) return;

    const shouldPause = pauseOnHover && isHovered;

    if (shouldPause) {
      clearAutoPlayTimer();
      return;
    }

    clearAutoPlayTimer();
    autoPlayTimerRef.current = setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearAutoPlayTimer();
  }, [autoPlayInterval, pauseOnHover, isHovered, goToNext, clearAutoPlayTimer]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if carousel is focused or contains focused element
      if (!carouselRef.current?.contains(document.activeElement)) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case "Home":
          event.preventDefault();
          goToIndex(0);
          break;
        case "End":
          event.preventDefault();
          goToIndex(items.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboard, goToPrevious, goToNext, goToIndex, items.length]);

  // Determine if previous/next buttons should be disabled
  const isPreviousDisabled = !loop && activeIndex === 0;
  const isNextDisabled = !loop && activeIndex === items.length - 1;

  // Determine if a slide should be rendered (for lazy loading)
  const shouldRenderSlide = useCallback(
    (index: number): boolean => {
      if (!lazyLoad) return true;

      // Always render active slide
      if (index === activeIndex) return true;

      // Render slides within preload range
      const distance = Math.abs(index - activeIndex);
      if (distance <= preloadCount) return true;

      // For looping carousel, also check wraparound
      if (loop) {
        const wrapDistance = Math.min(
          Math.abs(index - activeIndex + items.length),
          Math.abs(index - activeIndex - items.length),
        );
        return wrapDistance <= preloadCount;
      }

      return false;
    },
    [lazyLoad, activeIndex, preloadCount, loop, items.length],
  );

  return (
    <section
      ref={carouselRef}
      className={`${styles.carousel} ${className} ${showThumbnails && thumbnailPosition === "side" ? styles.carouselWithSideThumbnails : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div className={styles.carouselMain}>
        {/* Carousel viewport */}
        <div
          className={`${styles.viewport} ${showPeek ? styles.viewportPeek : ""}`}
          style={{
            padding: showPeek
              ? `0 ${typeof peekAmount === "number" ? `${peekAmount}px` : peekAmount}`
              : undefined,
            aspectRatio: aspectRatio || undefined,
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides container */}
          <div
            className={`${styles.slidesContainer} ${variant === "fade" ? styles.slidesFade : styles.slidesSlide} ${isDragging ? styles.dragging : ""}`}
            style={{
              transform:
                variant === "slide"
                  ? `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`
                  : undefined,
              transitionDuration: isDragging
                ? "0ms"
                : `${transitionDuration}ms`,
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            aria-live="polite"
            aria-atomic="true"
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.slide} ${variant === "fade" ? (index === activeIndex ? styles.slideActive : styles.slideInactive) : ""}`}
                aria-hidden={index !== activeIndex}
                aria-label={item.ariaLabel}
                role="group"
                aria-roledescription="slide"
                style={{
                  opacity:
                    variant === "fade"
                      ? index === activeIndex
                        ? 1
                        : 0
                      : undefined,
                  transitionDuration:
                    variant === "fade" ? `${transitionDuration}ms` : undefined,
                }}
              >
                {shouldRenderSlide(index) ? item.content : null}
              </div>
            ))}
          </div>

          {/* Previous button */}
          {showArrows && (
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowPrevious}`}
              onClick={goToPrevious}
              disabled={isPreviousDisabled}
              aria-label="Previous slide"
            >
              <Icon name="chevronLeft" size="lg" />
            </button>
          )}

          {/* Next button */}
          {showArrows && (
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowNext}`}
              onClick={goToNext}
              disabled={isNextDisabled}
              aria-label="Next slide"
            >
              <Icon name="chevronRight" size="lg" />
            </button>
          )}
        </div>

        {/* Controls (dots and counter) */}
        <div className={styles.controls}>
          {/* Dot indicators */}
          {showDots && (
            <div
              className={styles.dots}
              role="tablist"
              aria-label="Carousel navigation"
            >
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === activeIndex}
                  role="tab"
                />
              ))}
            </div>
          )}

          {/* Counter */}
          {showCounter && (
            <div
              className={styles.counter}
              aria-live="polite"
              aria-atomic="true"
            >
              {activeIndex + 1} / {items.length}
            </div>
          )}
        </div>

        {/* Thumbnail navigation - Bottom */}
        {showThumbnails && thumbnailPosition === "bottom" && (
          <div
            className={styles.thumbnails}
            role="tablist"
            aria-label="Carousel thumbnail navigation"
          >
            {items.map((item, index) => (
              <button
                key={`thumb-${item.id}`}
                type="button"
                className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
                onClick={() => goToIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToIndex(index);
                  } else if (
                    e.key === "ArrowRight" &&
                    index < items.length - 1
                  ) {
                    e.preventDefault();
                    (
                      e.currentTarget.nextElementSibling as HTMLButtonElement
                    )?.focus();
                  } else if (e.key === "ArrowLeft" && index > 0) {
                    e.preventDefault();
                    (
                      e.currentTarget
                        .previousElementSibling as HTMLButtonElement
                    )?.focus();
                  }
                }}
                aria-label={item.thumbnailAlt || `Go to slide ${index + 1}`}
                aria-selected={index === activeIndex}
                role="tab"
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.thumbnailAlt || `Slide ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                ) : (
                  <div className={styles.thumbnailPlaceholder}>{index + 1}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail navigation - Side */}
      {showThumbnails && thumbnailPosition === "side" && (
        <div
          className={styles.thumbnailsSide}
          role="tablist"
          aria-label="Carousel thumbnail navigation"
        >
          {items.map((item, index) => (
            <button
              key={`thumb-${item.id}`}
              type="button"
              className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
              onClick={() => goToIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToIndex(index);
                } else if (e.key === "ArrowDown" && index < items.length - 1) {
                  e.preventDefault();
                  (
                    e.currentTarget.nextElementSibling as HTMLButtonElement
                  )?.focus();
                } else if (e.key === "ArrowUp" && index > 0) {
                  e.preventDefault();
                  (
                    e.currentTarget.previousElementSibling as HTMLButtonElement
                  )?.focus();
                }
              }}
              aria-label={item.thumbnailAlt || `Go to slide ${index + 1}`}
              aria-selected={index === activeIndex}
              role="tab"
            >
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.thumbnailAlt || `Slide ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              ) : (
                <div className={styles.thumbnailPlaceholder}>{index + 1}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
