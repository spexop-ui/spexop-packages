/**
 * Image Component Types
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { ImgHTMLAttributes } from "react";

export type ImageFormat = "webp" | "avif" | "jpeg" | "png" | "gif";

export type ObjectFit = "contain" | "cover" | "fill" | "none" | "scale-down";

export interface ImageSource {
  src: string;
  width?: number;
  media?: string;
  type?: string;
}

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "placeholder"> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alternative text for accessibility
   */
  alt: string;

  /**
   * Image width in pixels
   */
  width?: number;

  /**
   * Image height in pixels
   */
  height?: number;

  /**
   * Lazy load the image
   * @default true
   */
  lazy?: boolean;

  /**
   * Blur-up placeholder type
   * @default 'none'
   */
  placeholder?: "blur" | "shimmer" | "none";

  /**
   * Low-quality image placeholder URL
   */
  blurDataURL?: string;

  /**
   * Responsive image sources
   */
  sources?: ImageSource[];

  /**
   * Sizes attribute for responsive images
   */
  sizes?: string;

  /**
   * Image formats to try (in order)
   * @default ['webp', 'jpeg']
   */
  formats?: ImageFormat[];

  /**
   * Object-fit CSS property
   * @default 'cover'
   */
  objectFit?: ObjectFit;

  /**
   * Object-position CSS property
   */
  objectPosition?: string;

  /**
   * Show loading skeleton
   * @default true
   */
  showSkeleton?: boolean;

  /**
   * Fallback image on error
   */
  fallbackSrc?: string;

  /**
   * Priority loading (disable lazy load)
   * @default false
   */
  priority?: boolean;

  /**
   * Quality for optimization (1-100)
   */
  quality?: number;

  /**
   * Callback when image loads
   */
  onLoad?: () => void;

  /**
   * Callback when image errors
   */
  onError?: () => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Aspect ratio (e.g., "16/9", "4/3")
   */
  aspectRatio?: string;
}

export interface ImageState {
  loaded: boolean;
  error: boolean;
  isInView: boolean;
}
