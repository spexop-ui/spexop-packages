export { cn } from "./cn.js";
export { debounce } from "./debounce.js";
export { isBrowser } from "./isBrowser.js";
export { dataCache } from "./dataCache.js";
export type { FetchOptions, CacheEntry } from "./dataFetch.types.js";

// Utility hooks and functions
export {
  useToastUtil,
  type Toast as ToastData,
  type ToastOptions as ToastUtilOptions,
  type ToastUtilConfig,
  type ToastUtilReturn,
} from "./toast.js";

export {
  useModalUtil,
  type Modal as ModalData,
  type ModalOptions as ModalUtilOptions,
  type ModalSize as ModalUtilSize,
  type ModalUtilConfig,
  type ModalUtilReturn,
} from "./modal.js";

export {
  useAccessibilityUtil,
  type AccessibilityState as AccessibilityUtilState,
  type AccessibilityUtilConfig,
  type AccessibilityUtilReturn,
} from "./accessibility.js";

export {
  useDebugUtil,
  type DebugOptions,
  type DebugState as DebugUtilState,
  type DebugUtilConfig,
  type DebugUtilReturn,
} from "./debug.js";

export {
  useFormUtil,
  type FieldConfig as FormFieldConfig,
  type FieldState as FormFieldState,
  type FormErrors as FormUtilErrors,
  type FormHelpers as FormUtilHelpers,
  type FormState as FormUtilState,
  type FormTouched as FormUtilTouched,
  type FormUtilConfig,
  type FormUtilReturn,
  type FormValues as FormUtilValues,
  type ValidationRule as FormValidationRule,
} from "./form.js";

export {
  useI18nUtil,
  type CurrencyFormatOptions as I18nCurrencyFormatOptions,
  type DateFormatOptions as I18nDateFormatOptions,
  type I18nUtilConfig,
  type I18nUtilReturn,
  type InterpolationValues as I18nInterpolationValues,
  type NumberFormatOptions as I18nNumberFormatOptions,
  type TranslationDictionary as I18nTranslationDictionary,
  type Translations as I18nTranslations,
} from "./i18n.js";

export {
  usePerformanceUtil,
  type PerformanceMetric as PerformanceUtilMetric,
  type PerformanceUtilConfig,
  type PerformanceUtilReturn,
} from "./performance.js";

export {
  useThemeUtil,
  applyModeToDocument,
  getStoredMode,
  getSystemMode,
  initializeMode,
  resolveMode,
  setStoredMode,
  type ResolvedThemeMode as ResolvedThemeUtilMode,
  type ThemeMode as ThemeUtilMode,
  type ThemeUtilConfig,
  type ThemeUtilReturn,
  DEFAULTS,
  SYSTEM_MODE_QUERY,
} from "./theme.js";
