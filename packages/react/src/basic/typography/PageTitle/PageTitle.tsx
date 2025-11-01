/**
 * PageTitle Component
 * Page title component with optional description
 *
 * Follows "The Spexop Way":
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 6: Standards before frameworks
 * - Principle 7: Accessibility before aesthetics
 *
 * @component PageTitle
 * @packageName @spexop/react
 * @description Page title with optional description
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-01-23
 *
 * @example
 * ```tsx
 * <PageTitle
 *   title="Installation"
 *   description="Get started with Spexop Design System"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PageTitle
 *   title="Components"
 *   description={<Text>Browse our component library</Text>}
 *   align="center"
 *   gap={3}
 * />
 * ```
 */

import { cn } from "../../../utils/index.js";
import { Heading } from "../Heading/Heading.js";
import { Text } from "../Text/Text.js";
import styles from "./PageTitle.module.css";
import type { PageTitleProps } from "./PageTitle.types.js";

export function PageTitle({
  title,
  description,
  level = 1,
  titleSize,
  descriptionSize = "sm",
  align = "left",
  gap = 2,
  showBorder = false,
  showAccent = false,
  accentWidth = "short",
  padded = false,
  emphasis = "default",
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}: PageTitleProps) {
  return (
    <header
      className={cn(
        styles.pageTitle,
        styles[`gap${gap}`],
        styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
        showBorder && styles.withBorder,
        showAccent && styles.withAccent,
        showAccent && styles[`accent-${accentWidth}`],
        padded && styles.padded,
        styles[`emphasis-${emphasis}`],
        className,
      )}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      <div className={styles.titleWrapper}>
        <Heading level={level} size={titleSize} align={align} noMargin>
          {title}
        </Heading>
        {showAccent && <div className={styles.accentBand} aria-hidden="true" />}
      </div>
      {description && (
        <div className={styles.descriptionWrapper}>
          {typeof description === "string" ? (
            <Text
              size={descriptionSize}
              className="text-secondary"
              align={align}
              noMargin
            >
              {description}
            </Text>
          ) : (
            description
          )}
        </div>
      )}
    </header>
  );
}

