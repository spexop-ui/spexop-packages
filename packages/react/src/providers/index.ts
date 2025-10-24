/**
 * Providers - Context providers for Spexop Design System
 */

// ============================================================================
// DEBUG PROVIDER
// ============================================================================
export type {
  DebugContextValue,
  DebugProviderProps,
  DebugState,
} from "./DebugProvider/index.js";
export {
  DebugContext,
  DebugProvider,
  useDebug,
} from "./DebugProvider/index.js";

// ============================================================================
// UNIFIED THEME PROVIDER (Main Theme System)
// ============================================================================
export type {
  ResolvedTheme,
  ResolvedThemeMode,
  Theme,
  ThemeMode,
  UnifiedThemeContextValue,
  UnifiedThemeProviderProps,
} from "./UnifiedThemeProvider/index.js";
export {
  UnifiedThemeContext,
  UnifiedThemeProvider,
  // Convenient aliases for shorter API
  UnifiedThemeProvider as ThemeProvider,
  useUnifiedTheme,
  useUnifiedTheme as useTheme,
} from "./UnifiedThemeProvider/index.js";

// ============================================================================
// TOAST PROVIDER
// ============================================================================
export type {
  Toast as ToastData,
  ToastContextValue,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastVariant,
} from "./ToastProvider/index.js";
export {
  ToastContext,
  ToastProvider,
  useToast,
} from "./ToastProvider/index.js";

// ============================================================================
// MODAL PROVIDER
// ============================================================================
export type {
  Modal as ModalData,
  ModalContextValue,
  ModalOptions,
  ModalProviderProps,
  ModalSize,
} from "./ModalProvider/index.js";
export {
  ModalContext,
  ModalProvider,
  useModal,
} from "./ModalProvider/index.js";

// ============================================================================
// ACCESSIBILITY PROVIDER
// ============================================================================
export type {
  AccessibilityContextValue,
  AccessibilityProviderProps,
  AccessibilityState,
} from "./AccessibilityProvider/index.js";
export {
  AccessibilityContext,
  AccessibilityProvider,
  useAccessibility,
} from "./AccessibilityProvider/index.js";

// ============================================================================
// FORM PROVIDER
// ============================================================================
export type {
  AsyncRule,
  CustomRule,
  EmailRule,
  FieldConfig,
  FieldState,
  FormConfig,
  FormContextValue,
  FormErrors,
  FormHelpers,
  FormProviderProps,
  FormState,
  FormTouched,
  FormValues,
  MaxLengthRule,
  MaxRule,
  MinLengthRule,
  MinRule,
  PatternRule,
  RequiredRule,
  UrlRule,
  ValidationRule,
} from "./FormProvider/index.js";
export {
  FormContext,
  FormProvider,
} from "./FormProvider/index.js";

// ============================================================================
// DATA FETCH PROVIDER
// ============================================================================
export type {
  CacheConfig,
  CacheEntry,
  DataFetchContextValue,
  DataFetchProviderProps,
  FetchOptions,
  RetryConfig,
} from "./DataFetchProvider/index.js";
export {
  DataFetchContext,
  DataFetchProvider,
  dataCache,
} from "./DataFetchProvider/index.js";

// ============================================================================
// I18N PROVIDER
// ============================================================================
export type {
  CurrencyFormatOptions,
  DateFormatOptions,
  I18nContextValue,
  I18nProviderProps,
  InterpolationValues,
  NumberFormatOptions,
  PluralForms,
  TranslationDictionary,
  Translations,
} from "./I18nProvider/index.js";
export {
  formatCurrency,
  formatDate,
  formatNumber,
  formatRelativeTime,
  I18nContext,
  I18nProvider,
} from "./I18nProvider/index.js";

// ============================================================================
// PERFORMANCE PROVIDER
// ============================================================================
export type {
  PerformanceContextValue,
  PerformanceMetric,
  PerformanceProviderProps,
} from "./PerformanceProvider/index.js";
export {
  PerformanceContext,
  PerformanceProvider,
} from "./PerformanceProvider/index.js";
