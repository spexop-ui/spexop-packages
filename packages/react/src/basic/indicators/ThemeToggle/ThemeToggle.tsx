/**
 * ThemeToggle - Theme switcher component
 *
 * A purpose-built button that cycles through light, dark, and auto theme modes.
 * Provides a clean, accessible interface with automatic icon selection from @spexop/icons
 * (Sun for light, Moon for dark, Monitor for auto/system theme).
 *
 * Following "The Spexop Way":
 * - Principle 5: Composition before complexity - Built using IconButton primitive
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ with clear ARIA labels
 *
 * Features:
 * - Cycles through light → dark → auto → light
 * - Automatic icon selection based on theme state
 * - Two variants: icon-only and button with outline
 * - Three sizes: small, medium, large
 * - Full keyboard navigation (Tab, Enter, Space)
 * - WCAG AA+ accessible with proper ARIA attributes
 * - Theme-aware styling using design tokens
 * - TypeScript support with full type safety
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * Basic usage with icon variant
 * ```tsx
 * import { ThemeToggle } from '@spexop/react';
 * import { useState } from 'react';
 *
 * function App() {
 *   const [theme, setTheme] = useState('light');
 *
 *   return (
 *     <ThemeToggle
 *       currentTheme={theme}
 *       onThemeChange={setTheme}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * Button variant with size in settings panel
 * ```tsx
 * <ThemeToggle
 *   currentTheme={theme}
 *   onThemeChange={setTheme}
 *   variant="button"
 *   size="lg"
 * />
 * ```
 *
 * @example
 * With localStorage persistence
 * ```tsx
 * import { ThemeToggle } from '@spexop/react';
 * import { useState, useEffect } from 'react';
 *
 * function App() {
 *   const [theme, setTheme] = useState(() =>
 *     localStorage.getItem('theme') || 'light'
 *   );
 *
 *   useEffect(() => {
 *     localStorage.setItem('theme', theme);
 *   }, [theme]);
 *
 *   return (
 *     <ThemeToggle
 *       currentTheme={theme}
 *       onThemeChange={setTheme}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * With system preference detection for auto theme
 * ```tsx
 * import { ThemeToggle } from '@spexop/react';
 * import { useState, useEffect } from 'react';
 *
 * function App() {
 *   const [theme, setTheme] = useState('auto');
 *   const [systemTheme, setSystemTheme] = useState('light');
 *
 *   useEffect(() => {
 *     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
 *     setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
 *
 *     const handler = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
 *     mediaQuery.addEventListener('change', handler);
 *     return () => mediaQuery.removeEventListener('change', handler);
 *   }, []);
 *
 *   const effectiveTheme = theme === 'auto' ? systemTheme : theme;
 *
 *   return (
 *     <div data-theme={effectiveTheme}>
 *       <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
 *     </div>
 *   );
 * }
 * ```
 */

import { Monitor, Moon, Sun } from "@spexop/icons";
import { IconButton } from "../../buttons/IconButton/index.js";
import type { ThemeToggleProps } from "./ThemeToggle.types.js";

/**
 * ThemeToggle Component
 * Cycles through light → dark → auto themes
 */
export function ThemeToggle({
  currentTheme,
  onThemeChange,
  variant = "icon",
  size = "md",
  className = "",
}: ThemeToggleProps) {
  // Select the appropriate theme icon
  const ThemeIcon =
    currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Monitor;

  const themeLabel = `Theme: ${currentTheme}`;

  // Cycle to next theme
  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "auto"> = ["light", "dark", "auto"];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    if (nextTheme) {
      onThemeChange(nextTheme);
    }
  };

  if (variant === "icon") {
    return (
      <IconButton
        icon={ThemeIcon}
        label={themeLabel}
        onClick={cycleTheme}
        size={size}
        strokeWidth={1}
        className={className}
      />
    );
  }

  // Button variant could be expanded in the future
  return (
    <IconButton
      icon={ThemeIcon}
      label={themeLabel}
      onClick={cycleTheme}
      size={size}
      strokeWidth={1}
      variant="outline"
      className={className}
    />
  );
}
