export interface ThemeToggleProps {
  /** Current theme */
  currentTheme: "light" | "dark" | "auto";
  /** Theme change callback */
  onThemeChange: (theme: "light" | "dark" | "auto") => void;
  /** Visual variant */
  variant?: "icon" | "button";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
}
