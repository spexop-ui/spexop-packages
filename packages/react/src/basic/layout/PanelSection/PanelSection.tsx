import type React from "react";
import styles from "./PanelSection.module.css";

export interface PanelSectionProps {
  /**
   * Section title
   */
  title: string;

  /**
   * Section content
   */
  children?: React.ReactNode;

  /**
   * Optional description/subtitle
   */
  description?: string;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Custom className for title
   */
  titleClassName?: string;

  /**
   * Custom className for content
   */
  contentClassName?: string;
}

/**
 * PanelSection - Section component for organizing panel content
 *
 * Provides consistent styling for sections with titles and content.
 * Perfect for organizing settings, forms, or any grouped content.
 *
 * Features:
 * - Section title with consistent styling
 * - Optional description
 * - Proper spacing
 * - Theme-aware styling
 * - Semantic HTML
 *
 * @example
 * ```tsx
 * <PanelSection title="Appearance">
 *   <SettingItem label="Theme">
 *     <Select ... />
 *   </SettingItem>
 *   <SettingItem label="Font Size">
 *     <Select ... />
 *   </SettingItem>
 * </PanelSection>
 * ```
 */
export function PanelSection({
  title,
  children,
  description,
  className,
  titleClassName,
  contentClassName,
}: PanelSectionProps) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${titleClassName || ""}`}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={`${styles.content} ${contentClassName || ""}`}>
        {children}
      </div>
    </section>
  );
}
