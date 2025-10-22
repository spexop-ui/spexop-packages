import type { ReactNode } from "react";

/**
 * Carousel Item Types
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 */
export interface CarouselItem {
  /** Unique identifier for the item */
  id: string;
  /** Content to display in the carousel item */
  content: ReactNode;
  /** Optional aria-label for the item */
  ariaLabel?: string;
  /** Optional thumbnail URL for thumbnail navigation */
  thumbnail?: string;
  /** Optional alt text for thumbnail image */
  thumbnailAlt?: string;
}

/**
 * Carousel Component Props
 */
export interface CarouselProps {
  /** Array of items to display in the carousel */
  items: CarouselItem[];
  /** Current active item index (controlled mode) */
  activeIndex?: number;
  /** Callback when active item changes */
  onChange?: (index: number) => void;
  /** Transition variant */
  variant?: "slide" | "fade";
  /** Auto-advance interval in milliseconds (disabled if not provided) */
  autoPlayInterval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show item counter (e.g., "1 / 5") */
  showCounter?: boolean;
  /** Show thumbnail navigation */
  showThumbnails?: boolean;
  /** Thumbnail position layout */
  thumbnailPosition?: "bottom" | "side";
  /** Enable infinite loop */
  loop?: boolean;
  /** Enable keyboard navigation */
  enableKeyboard?: boolean;
  /** Enable touch/swipe gestures for mobile */
  enableSwipe?: boolean;
  /** Show partial next/previous slides (peek mode) */
  showPeek?: boolean;
  /** Peek amount in pixels or percentage */
  peekAmount?: number | string;
  /** Enable lazy loading for performance */
  lazyLoad?: boolean;
  /** Number of slides to preload when lazy loading */
  preloadCount?: number;
  /** Transition duration in milliseconds */
  transitionDuration?: number;
  /** Aspect ratio for slides (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for the carousel */
  ariaLabel?: string;
  /** Pause auto-play on hover */
  pauseOnHover?: boolean;
}
