/**
 * LoadingStates Components
 *
 * Comprehensive loading state components for various use cases.
 * Includes PageSkeleton, CardSkeleton, TextSkeleton, LoadingOverlay, and LoadingButton.
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built with simple skeleton primitives
 * - Principle 4: Tokens before magic numbers - Uses design tokens for spacing
 * - Principle 5: Composition before complexity - Composable loading states
 * - Principle 7: Accessibility before aesthetics - Proper ARIA labels
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * // Full page loading
 * <PageSkeleton sections={3} showHeader />
 *
 * // Card loading
 * <CardSkeleton showImage lines={3} />
 *
 * // Text loading
 * <TextSkeleton lines={4} />
 *
 * // Loading overlay
 * <LoadingOverlay message="Loading content..." />
 * ```
 */

import { Spinner } from "../Spinner/Spinner.js";
import styles from "./LoadingStates.module.css";
import type {
  CardSkeletonProps,
  LoadingOverlayProps,
  PageSkeletonProps,
  TextSkeletonProps,
} from "./LoadingStates.types.js";

/**
 * TextSkeleton - Versatile text loading skeleton
 */
export function TextSkeleton({
  lines = 1,
  width = "100%",
  height,
  size = "md",
  speed = "normal",
  variant = "text",
  borderRadius,
  className = "",
  style = {},
}: TextSkeletonProps) {
  const sizeClass = styles[`size-${size}`];
  const speedClass = styles[`speed-${speed}`];
  const variantClass = styles[`variant-${variant}`];

  const skeletonStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    ...style,
  };

  if (lines === 1) {
    return (
      <div
        className={`${styles.skeleton} ${sizeClass} ${speedClass} ${variantClass} ${className}`.trim()}
        style={skeletonStyle}
        role="status"
        aria-label="Loading content"
        aria-live="polite"
      />
    );
  }

  return (
    <div
      className={styles.textSkeletonGroup}
      role="status"
      aria-label="Loading content"
      aria-live="polite"
    >
      {Array.from({ length: lines }).map((_, index) => {
        const isLastLine = index === lines - 1;
        const lineWidth = isLastLine ? `${Math.random() * 30 + 60}%` : width;

        return (
          <div
            key={`skeleton-line-${
              // biome-ignore lint/suspicious/noArrayIndexKey: Static list, no reordering
              index
            }`}
            className={`${styles.skeleton} ${sizeClass} ${speedClass} ${variantClass}`.trim()}
            style={{
              width: lineWidth,
              height,
              borderRadius,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * CardSkeleton - Loading skeleton for card components
 */
export function CardSkeleton({
  showImage = true,
  showAvatar = false,
  lines = 3,
  showFooter = false,
  size = "md",
  speed = "normal",
  className = "",
  style = {},
}: CardSkeletonProps) {
  const sizeClass = styles[`size-${size}`];
  const speedClass = styles[`speed-${speed}`];

  return (
    <div
      className={`${styles.cardSkeleton} ${sizeClass} ${className}`.trim()}
      style={style}
      role="status"
      aria-label="Loading card"
      aria-live="polite"
    >
      {showImage && (
        <div
          className={`${styles.skeleton} ${styles.cardImage} ${speedClass}`.trim()}
        />
      )}

      <div className={styles.cardContent}>
        {showAvatar && (
          <div className={styles.cardHeader}>
            <div
              className={`${styles.skeleton} ${styles.avatar} ${speedClass}`.trim()}
            />
            <div className={styles.cardHeaderText}>
              <div
                className={`${styles.skeleton} ${styles.avatarText} ${speedClass}`.trim()}
                style={{ width: "60%" }}
              />
              <div
                className={`${styles.skeleton} ${styles.avatarText} ${speedClass}`.trim()}
                style={{ width: "40%" }}
              />
            </div>
          </div>
        )}

        <TextSkeleton lines={lines} size={size} speed={speed} />

        {showFooter && (
          <div className={styles.cardFooter}>
            <div
              className={`${styles.skeleton} ${sizeClass} ${speedClass}`.trim()}
              style={{ width: "80px", height: "32px", borderRadius: "8px" }}
            />
            <div
              className={`${styles.skeleton} ${sizeClass} ${speedClass}`.trim()}
              style={{ width: "80px", height: "32px", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * PageSkeleton - Full page loading skeleton
 */
export function PageSkeleton({
  showHeader = true,
  showNav = false,
  sections = 3,
  showSidebar = false,
  size = "md",
  speed = "normal",
  className = "",
  style = {},
}: PageSkeletonProps) {
  const speedClass = styles[`speed-${speed}`];

  return (
    <div
      className={`${styles.pageSkeleton} ${className}`.trim()}
      style={style}
      role="status"
      aria-label="Loading page"
      aria-live="polite"
    >
      {showHeader && (
        <div className={styles.pageHeader}>
          <div
            className={`${styles.skeleton} ${speedClass}`.trim()}
            style={{ width: "150px", height: "40px" }}
          />
          <div className={styles.pageHeaderActions}>
            <div
              className={`${styles.skeleton} ${speedClass}`.trim()}
              style={{ width: "100px", height: "36px", borderRadius: "8px" }}
            />
            <div
              className={`${styles.skeleton} ${speedClass}`.trim()}
              style={{ width: "36px", height: "36px", borderRadius: "50%" }}
            />
          </div>
        </div>
      )}

      {showNav && (
        <div className={styles.pageNav}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`nav-item-${
                // biome-ignore lint/suspicious/noArrayIndexKey: Static list, no reordering
                index
              }`}
              className={`${styles.skeleton} ${speedClass}`.trim()}
              style={{ width: "100%", height: "44px", marginBottom: "8px" }}
            />
          ))}
        </div>
      )}

      <div className={styles.pageLayout}>
        {showSidebar && (
          <div className={styles.pageSidebar}>
            <div
              className={`${styles.skeleton} ${speedClass}`.trim()}
              style={{ width: "100%", height: "200px", marginBottom: "16px" }}
            />
            <TextSkeleton lines={6} size={size} speed={speed} />
          </div>
        )}

        <div className={styles.pageContent}>
          {Array.from({ length: sections }).map((_, index) => (
            <div
              key={`section-${
                // biome-ignore lint/suspicious/noArrayIndexKey: Static list, no reordering
                index
              }`}
              className={styles.pageSection}
            >
              <div
                className={`${styles.skeleton} ${speedClass}`.trim()}
                style={{ width: "40%", height: "32px", marginBottom: "16px" }}
              />
              <TextSkeleton lines={4} size={size} speed={speed} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * LoadingOverlay - Full-screen or section loading overlay
 */
export function LoadingOverlay({
  showBackdrop = true,
  message,
  variant = "spinner",
  size = "lg",
  speed = "normal",
  children,
  backdropOpacity = 0.75,
  className = "",
  style = {},
}: LoadingOverlayProps) {
  const sizeClass = styles[`size-${size}`];
  const speedClass = styles[`speed-${speed}`];

  return (
    <div
      className={`${styles.loadingOverlay} ${className}`.trim()}
      style={style}
      role="status"
      aria-label={message || "Loading"}
      aria-live="polite"
    >
      {showBackdrop && (
        <div
          className={styles.backdrop}
          style={{ opacity: backdropOpacity }}
          aria-hidden="true"
        />
      )}

      <div className={styles.overlayContent}>
        {children || (
          <>
            {variant === "spinner" && (
              <Spinner
                size={size === "sm" ? "sm" : size === "md" ? "md" : "lg"}
              />
            )}

            {variant === "dots" && (
              <div className={`${styles.dotsLoader} ${speedClass}`.trim()}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
              </div>
            )}

            {variant === "pulse" && (
              <div
                className={`${styles.pulseLoader} ${sizeClass} ${speedClass}`.trim()}
              />
            )}

            {variant === "bars" && (
              <div className={`${styles.barsLoader} ${speedClass}`.trim()}>
                <div className={styles.bar} />
                <div className={styles.bar} />
                <div className={styles.bar} />
                <div className={styles.bar} />
              </div>
            )}

            {message && <p className={styles.loadingMessage}>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}

// Re-export types
export type {
  BaseLoadingProps,
  CardSkeletonProps,
  LoadingOverlayProps,
  LoadingSize,
  PageSkeletonProps,
  TextSkeletonProps,
  AnimationSpeed,
} from "./LoadingStates.types.js";
