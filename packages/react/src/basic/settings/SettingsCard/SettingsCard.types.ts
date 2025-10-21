import type React from "react";

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
