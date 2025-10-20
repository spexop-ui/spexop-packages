/**
 * ButtonGridItem Component
 * Interactive component that displays media with overlay content and performs actions
 *
 * @component ButtonGridItem
 * @packageName @spexop/react
 * @description Interactive media card with overlay content and call-to-action
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import { useCallback } from "react";
import styles from "./ButtonGridItem.module.css";
import type { ButtonGridItemProps } from "./ButtonGridItem.types.js";

/**
 * ButtonGridItem component
 *
 * @example
 * ```tsx
 * <ButtonGridItem
 *   media={<img src="image.jpg" alt="Description" />}
 *   label="Learn More"
 *   description="Discover our comprehensive design system"
 *   buttonText="Get Started"
 *   onClick={() => console.log('Card clicked')}
 * />
 * ```
 */
export function ButtonGridItem({
  media,
  label,
  description,
  buttonText,
  onClick,
  className = "",
  aspectRatio = "16/9",
  minHeight = 300,
  "aria-label": ariaLabel,
  "aria-label-button": ariaLabelButton,
}: ButtonGridItemProps) {
  // Handle card click (clicking anywhere on the card)
  const handleCardClick = useCallback(() => {
    requestAnimationFrame(() => {
      onClick();
    });
  }, [onClick]);

  // Handle button click (prevents event bubbling)
  const handleButtonClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      requestAnimationFrame(() => {
        onClick();
      });
    },
    [onClick],
  );

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        requestAnimationFrame(() => {
          onClick();
        });
      }
    },
    [onClick],
  );

  // Compose classNames
  const cardClassName = [styles.buttonGridItem, className]
    .filter(Boolean)
    .join(" ");

  // Calculate container styles
  const containerStyle: React.CSSProperties = {
    aspectRatio,
    minHeight: `${minHeight}px`,
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: This is a complex card container that needs to hold media (video/img) and overlay content, cannot be a simple button element
    <div
      className={cardClassName}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || `${label}: ${description}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      style={containerStyle}
    >
      {/* Media Container */}
      <div className={styles.mediaContainer}>{media}</div>

      {/* Content Overlay */}
      <div className={styles.contentOverlay}>
        <div className={styles.content}>
          <h3 className={styles.label}>{label}</h3>
          <p className={styles.description}>{description}</p>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleButtonClick}
            aria-label={ariaLabelButton || buttonText}
          >
            {buttonText}
            <svg
              className={styles.buttonIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
