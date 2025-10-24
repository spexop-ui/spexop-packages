/**
 * Image Component
 * Optimized image component with lazy loading and responsive srcset
 *
 * Follows "The Spexop Way":
 * - Principle 4: Tokens before magic numbers
 * - Principle 6: Standards before frameworks (uses native picture element)
 * - Principle 7: Accessibility before aesthetics
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * <Image
 *   src="/hero.jpg"
 *   alt="Hero image"
 *   width={1600}
 *   height={900}
 *   lazy
 *   placeholder="blur"
 *   blurDataURL="/hero-blur.jpg"
 * />
 * ```
 */

import { useMemo } from "react";
import { useImageOptimization } from "../../../hooks/useImageOptimization.js";
import { cn } from "../../../utils/index.js";
import styles from "./Image.module.css";
import type { ImageProps } from "./Image.types.js";

export function Image({
  src,
  alt,
  width,
  height,
  lazy = true,
  placeholder = "none",
  blurDataURL,
  sources = [],
  sizes,
  formats = ["webp", "jpeg"],
  objectFit = "cover",
  objectPosition,
  showSkeleton = true,
  fallbackSrc,
  priority = false,
  quality,
  onLoad,
  onError,
  className,
  aspectRatio,
  style,
  ...props
}: ImageProps) {
  // Use optimization hook
  const { imgRef, loaded, error, isInView } = useImageOptimization({
    src,
    lazy: lazy && !priority,
    priority,
    onLoad,
    onError,
  });

  // Calculate aspect ratio percentage
  const aspectRatioPercent = useMemo(() => {
    if (aspectRatio) {
      const [w, h] = aspectRatio.split("/").map(Number);
      return `${(h / w) * 100}%`;
    }
    if (width && height) {
      return `${(height / width) * 100}%`;
    }
    return undefined;
  }, [aspectRatio, width, height]);

  // Determine which src to show
  const displaySrc = useMemo(() => {
    if (error && fallbackSrc) return fallbackSrc;
    if (!loaded && placeholder === "blur" && blurDataURL) return blurDataURL;
    if (!loaded || !isInView) return blurDataURL || src;
    return src;
  }, [error, fallbackSrc, loaded, placeholder, blurDataURL, isInView, src]);

  // Build srcset
  const srcSet = useMemo(() => {
    if (sources.length === 0) return undefined;
    return sources.map((source) => `${source.src} ${source.width}w`).join(", ");
  }, [sources]);

  // Generate picture sources for different formats
  const pictureEl = useMemo(() => {
    if (formats.length === 0 || sources.length === 0) return null;

    return (
      <>
        {formats.map((format) => (
          <source
            key={format}
            type={`image/${format}`}
            srcSet={sources
              .map((source) => {
                const formatSrc = source.src.replace(
                  /\.(jpg|jpeg|png|gif)$/i,
                  `.${format}`,
                );
                return `${formatSrc} ${source.width}w`;
              })
              .join(", ")}
            sizes={sizes}
          />
        ))}
      </>
    );
  }, [formats, sources, sizes]);

  // Image classes
  const imageClassName = cn(
    styles.image,
    styles[`image${objectFit.charAt(0).toUpperCase()}${objectFit.slice(1)}`],
    !loaded && placeholder === "blur" && styles.blur,
    loaded && placeholder === "blur" && styles.blurLoaded,
    loaded && styles.fadeIn,
    !loaded && styles.loading,
    loaded && styles.loaded,
    className,
  );

  // Container styles
  const containerStyle = useMemo(() => {
    const baseStyle: React.CSSProperties &
      Record<string, string | number | undefined> = {
      ...style,
    };

    if (aspectRatioPercent) {
      baseStyle["--aspect-ratio"] = aspectRatioPercent;
    }

    return baseStyle;
  }, [style, aspectRatioPercent]);

  // Image styles
  const imageStyle = useMemo(() => {
    const imgStyle: React.CSSProperties = {};

    if (objectPosition) {
      imgStyle.objectPosition = objectPosition;
    }

    if (width && !aspectRatio) {
      imgStyle.width = `${width}px`;
    }

    if (height && !aspectRatio) {
      imgStyle.height = `${height}px`;
    }

    return imgStyle;
  }, [objectPosition, width, height, aspectRatio]);

  // Error state
  if (error && !fallbackSrc) {
    return (
      <div
        className={cn(
          styles.container,
          aspectRatioPercent && styles.aspectRatio,
          className,
        )}
        style={containerStyle}
      >
        <div className={styles.error} role="img" aria-label={alt}>
          <span>Image failed to load</span>
        </div>
      </div>
    );
  }

  const content = (
    <div
      className={cn(styles.container, aspectRatioPercent && styles.aspectRatio)}
      style={containerStyle}
    >
      {/* Loading skeleton */}
      {showSkeleton && !loaded && placeholder === "shimmer" && (
        <div className={styles.skeleton} aria-hidden="true" />
      )}

      {/* Image element */}
      {pictureEl ? (
        <picture>
          {pictureEl}
          <img
            ref={imgRef}
            src={displaySrc}
            width={width}
            height={height}
            loading={lazy && !priority ? "lazy" : "eager"}
            decoding="async"
            srcSet={srcSet}
            sizes={sizes}
            className={imageClassName}
            style={imageStyle}
            {...props}
            alt={alt}
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={displaySrc}
          width={width}
          height={height}
          loading={lazy && !priority ? "lazy" : "eager"}
          decoding="async"
          srcSet={srcSet}
          sizes={sizes}
          className={imageClassName}
          style={imageStyle}
          {...props}
          alt={alt}
        />
      )}
    </div>
  );

  return content;
}
