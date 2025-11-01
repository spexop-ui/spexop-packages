/**
 * ActivityStream - Timeline component for displaying chronological events
 *
 * Following "The Spexop Way":
 * - Primitives before patterns - Simple flex layout with borders
 * - Borders before shadows - 2px borders for indicators, connecting lines
 * - Typography before decoration - Bold titles, clear hierarchy
 * - Tokens before magic numbers - All spacing uses theme tokens
 * - Composition before complexity - Composable items with content
 * - Standards before frameworks - Semantic HTML with ARIA
 * - Accessibility before aesthetics - Keyboard navigation, WCAG AA
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const activities = [
 *   {
 *     id: '1',
 *     title: 'Project started',
 *     description: 'Initial setup completed',
 *     timestamp: '2025-01-01',
 *     variant: 'success',
 *     icon: <Check />
 *   },
 *   {
 *     id: '2',
 *     title: 'First milestone',
 *     description: 'Core features implemented',
 *     timestamp: '2025-01-15',
 *     variant: 'info',
 *     icon: <Code />
 *   }
 * ];
 *
 * <ActivityStream
 *   items={activities}
 *   showLine
 *   showTimestamps
 *   ariaLabel="Project timeline"
 * />
 * ```
 */

import { cn } from "../../../utils/cn.js";
import styles from "./ActivityStream.module.css";
import type { ActivityStreamProps } from "./ActivityStream.types.js";

export function ActivityStream({
  items,
  orientation = "vertical",
  showLine = true,
  iconPosition = "left",
  showTimestamps = true,
  density = "normal",
  className = "",
  ariaLabel = "Activity stream",
  ...props
}: ActivityStreamProps) {
  // Determine line visibility based on number of items
  const shouldShowLine = showLine && items.length > 1;

  return (
    <ul
      className={cn(
        styles.activityStream,
        orientation === "vertical"
          ? styles.activityStreamVertical
          : styles.activityStreamHorizontal,
        styles[`density${density.charAt(0).toUpperCase() + density.slice(1)}`],
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const IconComponent = item.icon;
        const variant = item.variant || "default";
        const variantClass = variant.charAt(0).toUpperCase() + variant.slice(1);

        return (
          <li
            key={item.id}
            className={cn(
              styles.activityItem,
              iconPosition === "left" ? styles.iconLeft : styles.iconRight,
            )}
          >
            {/* Icon/Indicator */}
            <div
              className={cn(
                styles.iconContainer,
                styles[`icon${variantClass}`],
              )}
              aria-hidden="true"
            >
              {IconComponent}
            </div>

            {/* Connecting line */}
            {shouldShowLine && !isLast && (
              <div
                className={cn(
                  styles.line,
                  orientation === "vertical"
                    ? styles.lineVertical
                    : styles.lineHorizontal,
                )}
              />
            )}

            {/* Content area */}
            <div className={styles.contentArea}>
              <h3 className={styles.title}>{item.title}</h3>

              {item.description && (
                <p className={styles.description}>{item.description}</p>
              )}

              {showTimestamps && item.timestamp && (
                <time className={styles.timestamp} dateTime={item.timestamp}>
                  {item.timestamp}
                </time>
              )}

              {item.content && (
                <div className={styles.customContent}>{item.content}</div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ActivityStream;
