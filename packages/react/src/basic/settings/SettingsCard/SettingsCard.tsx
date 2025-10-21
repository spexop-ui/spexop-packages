import type React from "react";
import styles from "./SettingsCard.module.css";

export interface SettingsCardProps {
  /**
   * Title of the settings section
   */
  title: string;

  /**
   * Description text for the section
   */
  description?: string;

  /**
   * Content to display in the card
   */
  children?: React.ReactNode;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * SettingsCard - Card-based container for settings sections
 *
 * A clean card component for organizing settings into distinct sections.
 * Provides clear visual separation and improved readability.
 *
 * Features:
 * - Clean card design with subtle borders
 * - Clear typography hierarchy
 * - Theme-aware styling
 * - Consistent spacing and layout
 * - Matches design system tokens
 *
 * @example
 * ```tsx
 * <SettingsCard
 *   title="THEME"
 *   description="Light theme with bright backgrounds and dark text"
 * >
 *   <SegmentedControl options={themeOptions} />
 * </SettingsCard>
 * ```
 */
export function SettingsCard({
  title,
  description,
  children,
  className,
}: SettingsCardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {/* Separator Line */}
      <div className={styles.separator} />

      {/* Content */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
