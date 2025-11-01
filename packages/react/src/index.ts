/**
 * Spexop React Components
 *
 * @packageName @spexop/react
 * @description Production-ready React components for modern web apps
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.6.0
 * @since 2025-10-31
 * @license MIT
 */

// Re-export all basic components (60+ components organized by category)
// This includes animations, so we don't need to re-export them separately
export * from "./basic/index.js";

// Re-export all hooks
export * from "./hooks/index.js";

// Re-export all utilities (provider-free approach)
export * from "./utils/index.js";

// ============================================================================
// PROVIDERS REMOVED
// ============================================================================
// NOTE: Providers have been removed in v0.6.0. Use utilities from ./utils instead.
// - ToastProvider → useToastUtil
// - ModalProvider → useModalUtil
// - AccessibilityProvider → useAccessibilityUtil
// - DebugProvider → useDebugUtil
// - FormProvider → useFormUtil
// - I18nProvider → useI18nUtil
// - PerformanceProvider → usePerformanceUtil
// - ThemeProvider → useThemeUtil (for mode), use generateCSS from @spexop/theme for theme config
//
// For theme config injection, use generateCSS from @spexop/theme:
// ```tsx
// import { generateCSS } from '@spexop/theme';
// import { techPreset } from '@spexop/theme';
//
// useEffect(() => {
//   const css = generateCSS(techPreset);
//   const style = document.createElement('style');
//   style.textContent = css;
//   document.head.appendChild(style);
// }, []);
// ```
// Re-export templates (for builder app)
// Note: These are not typically used directly in consumer apps
// but are provided for the builder and template system
export * as templates from "./templates/index.js";

// Package version
export const version = "0.6.0";
