/**
 * StickySection Component
 * Section wrapper that ensures ContextNav sticky positioning works correctly
 *
 * @packageName @spexop/react
 * @description Wrapper component that handles sticky positioning requirements for ContextNav
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 1.0.0
 * @since 2025-10-14
 *
 */

import { type ReactNode, forwardRef } from "react";
import type { SectionProps } from "../Section/Section.js";
import { Section } from "../Section/Section.js";
import styles from "./StickySection.module.css";

export interface StickySectionProps extends Omit<SectionProps, "children"> {
  /** Section content */
  children?: ReactNode;

  /** ContextNav component - will be rendered with proper sticky positioning */
  contextNav?: ReactNode;

  /** Whether to apply sticky-safe layout (default: true) */
  stickySafe?: boolean;
}

/**
 * StickySection - Section wrapper that ensures ContextNav sticky positioning works
 *
 * This component automatically handles the CSS requirements for sticky positioning:
 * - No overflow properties on parent containers
 * - Proper layout structure
 * - Automatic spacing between sections
 *
 * @example
 * ```tsx
 * <StickySection
 *   variant="white"
 *   label="FEATURES"
 *   title="Our Features"
 *   contextNav={
 *     <ContextNav
 *       number="01"
 *       title="Features"
 *       topOffset={80}
 *       navLinks={[
 *         { label: "Feature 1", href: "#feature1" },
 *         { label: "Feature 2", href: "#feature2" }
 *       ]}
 *     />
 *   }
 * >
 *   <Grid columns={{ xs: 1, md: 2 }} gap={6}>
 *     <div id="feature1">Feature 1</div>
 *     <div id="feature2">Feature 2</div>
 *   </Grid>
 * </StickySection>
 * ```
 */
export const StickySection = forwardRef<HTMLElement, StickySectionProps>(
  (
    {
      children,
      contextNav,
      stickySafe = true,
      marginBottom = "normal",
      className,
      ...sectionProps
    },
    ref,
  ) => {
    const classes = [
      styles.stickySection,
      stickySafe && styles.stickySafe,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={classes}>
        <Section
          ref={ref}
          marginBottom={marginBottom}
          contextNav={contextNav}
          className={className}
          {...sectionProps}
        >
          {children}
        </Section>
      </div>
    );
  },
);

StickySection.displayName = "StickySection";
