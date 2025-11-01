/**
 * I18n Utility
 * Internationalization utilities without providers
 *
 * Features:
 * - Locale management with RTL support
 * - Translation functions (t, tn with pluralization)
 * - Nested key support
 * - Value interpolation
 * - Number, date, currency, relative time formatting
 * - Document attribute updates (lang, dir)
 * - Async translation loading
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useMemo, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Translation dictionary
 */
export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

/**
 * Translations map
 */
export type Translations = Record<string, TranslationDictionary>;

/**
 * Interpolation values
 */
export type InterpolationValues = Record<string, string | number>;

/**
 * I18n configuration
 */
export interface I18nUtilConfig {
  /** Initial locale */
  locale?: string;
  /** Available locales */
  locales?: string[];
  /** Translations */
  translations?: Translations;
  /** Fallback locale */
  fallbackLocale?: string;
  /** RTL locales */
  rtlLocales?: string[];
  /** Load translation function */
  loadTranslation?: (locale: string) => Promise<TranslationDictionary>;
  /** On locale change callback */
  onLocaleChange?: (locale: string) => void;
}

/**
 * I18n utility return value
 */
export interface I18nUtilReturn {
  /** Current locale */
  locale: string;
  /** Available locales */
  locales: string[];
  /** Change locale */
  setLocale: (locale: string) => Promise<void>;
  /** Translate a key */
  t: (key: string, values?: InterpolationValues) => string;
  /** Translate with pluralization */
  tn: (key: string, count: number, values?: InterpolationValues) => string;
  /** Check if translation exists */
  hasTranslation: (key: string) => boolean;
  /** Get all translations for current locale */
  getTranslations: () => TranslationDictionary;
  /** Is RTL locale */
  isRTL: boolean;
  /** Direction */
  direction: "ltr" | "rtl";
  /** Format number */
  formatNumber: (value: number, options?: NumberFormatOptions) => string;
  /** Format date */
  formatDate: (
    date: Date | number | string,
    options?: DateFormatOptions,
  ) => string;
  /** Format currency */
  formatCurrency: (value: number, options: CurrencyFormatOptions) => string;
  /** Format relative time */
  formatRelativeTime: (
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
  ) => string;
}

/**
 * Format options for numbers
 */
export interface NumberFormatOptions extends Intl.NumberFormatOptions {
  locale?: string;
}

/**
 * Format options for dates
 */
export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
}

/**
 * Format options for currency
 */
export interface CurrencyFormatOptions extends Intl.NumberFormatOptions {
  locale?: string;
  currency: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get nested value from object
 */
function getNestedValue(
  obj: TranslationDictionary,
  path: string,
): string | undefined {
  const keys = path.split(".");
  let current: string | TranslationDictionary = obj;

  for (const key of keys) {
    if (typeof current === "object" && current !== null && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

/**
 * Interpolate values into string
 */
function interpolate(str: string, values?: InterpolationValues): string {
  if (!values) return str;

  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
}

/**
 * Format number
 */
function formatNumberValue(
  value: number,
  options?: NumberFormatOptions,
  defaultLocale = "en-US",
): string {
  const locale = options?.locale || defaultLocale;
  const { locale: _, ...restOptions } = options || {};
  return new Intl.NumberFormat(locale, restOptions).format(value);
}

/**
 * Format date
 */
function formatDateValue(
  date: Date | number | string,
  options?: DateFormatOptions,
  defaultLocale = "en-US",
): string {
  const locale = options?.locale || defaultLocale;
  const { locale: _, ...restOptions } = options || {};
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, restOptions).format(dateObj);
}

/**
 * Format currency
 */
function formatCurrencyValue(
  value: number,
  options: CurrencyFormatOptions,
  defaultLocale = "en-US",
): string {
  const { locale = defaultLocale, currency, ...restOptions } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...restOptions,
  }).format(value);
}

/**
 * Format relative time
 */
function formatRelativeTimeValue(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  defaultLocale = "en-US",
): string {
  return new Intl.RelativeTimeFormat(defaultLocale, { numeric: "auto" }).format(
    value,
    unit,
  );
}

// ============================================================================
// MODULE-LEVEL STATE (Singleton Pattern)
// ============================================================================

/**
 * Global i18n state manager
 */
class I18nManager {
  private locale = "en";
  private locales: string[] = ["en"];
  private translations: Translations = {};
  private loadedTranslations: TranslationDictionary = {};
  private fallbackLocale = "en";
  private rtlLocales: string[] = ["ar", "he", "fa", "ur"];
  private loadTranslation?: (locale: string) => Promise<TranslationDictionary>;
  private onLocaleChange?: (locale: string) => void;
  private listeners: Set<() => void> = new Set();

  /**
   * Configure i18n manager
   */
  configure(config: I18nUtilConfig): void {
    if (config.locale) {
      this.locale = config.locale;
    }
    if (config.locales) {
      this.locales = config.locales;
    }
    if (config.translations) {
      this.translations = config.translations;
      const enTranslations = config.translations.en;
      this.loadedTranslations =
        config.translations[this.locale] || enTranslations || {};
    }
    if (config.fallbackLocale) {
      this.fallbackLocale = config.fallbackLocale;
    }
    if (config.rtlLocales) {
      this.rtlLocales = config.rtlLocales;
    }
    if (config.loadTranslation) {
      this.loadTranslation = config.loadTranslation;
    }
    if (config.onLocaleChange) {
      this.onLocaleChange = config.onLocaleChange;
    }

    // Update document attributes
    this.updateDocumentAttributes();

    this.notifyListeners();
  }

  /**
   * Get current locale
   */
  getLocale(): string {
    return this.locale;
  }

  /**
   * Get available locales
   */
  getLocales(): string[] {
    return [...this.locales];
  }

  /**
   * Get loaded translations
   */
  getLoadedTranslations(): TranslationDictionary {
    return { ...this.loadedTranslations };
  }

  /**
   * Set locale
   */
  async setLocale(newLocale: string): Promise<void> {
    if (!this.locales.includes(newLocale)) {
      console.warn(`Locale "${newLocale}" is not available`);
      return;
    }

    this.locale = newLocale;

    // Load translation if not already loaded
    if (!this.translations[newLocale] && this.loadTranslation) {
      try {
        const translation = await this.loadTranslation(newLocale);
        this.loadedTranslations = translation;
      } catch (error) {
        console.error(`Failed to load translation for "${newLocale}"`, error);
      }
    } else {
      this.loadedTranslations = this.translations[newLocale] || {};
    }

    // Update document attributes
    this.updateDocumentAttributes();

    // Call callback
    this.onLocaleChange?.(newLocale);

    this.notifyListeners();
  }

  /**
   * Translate a key
   */
  translate(key: string, values?: InterpolationValues): string {
    // Try current locale
    let translation = getNestedValue(this.loadedTranslations, key);

    // Try fallback locale
    if (!translation && this.fallbackLocale !== this.locale) {
      translation = getNestedValue(
        this.translations[this.fallbackLocale] || {},
        key,
      );
    }

    // Return key if not found
    if (!translation) {
      console.warn(`Translation not found for key: "${key}"`);
      return key;
    }

    // Interpolate values
    return interpolate(translation, values);
  }

  /**
   * Translate with pluralization
   */
  translatePlural(
    key: string,
    count: number,
    values?: InterpolationValues,
  ): string {
    const pluralKey =
      count === 0 ? `${key}.zero` : count === 1 ? `${key}.one` : `${key}.other`;

    return this.translate(pluralKey, { ...values, count });
  }

  /**
   * Check if translation exists
   */
  hasTranslation(key: string): boolean {
    return getNestedValue(this.loadedTranslations, key) !== undefined;
  }

  /**
   * Check if locale is RTL
   */
  isRTL(): boolean {
    return this.rtlLocales.includes(this.locale);
  }

  /**
   * Get direction
   */
  getDirection(): "ltr" | "rtl" {
    return this.isRTL() ? "rtl" : "ltr";
  }

  /**
   * Update document attributes
   */
  private updateDocumentAttributes(): void {
    if (typeof document === "undefined") return;

    document.documentElement.lang = this.locale;
    document.documentElement.dir = this.getDirection();
  }

  /**
   * Subscribe to changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

// Singleton instance
const i18nManager = new I18nManager();

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useI18nUtil Hook
 * Provider-free internationalization utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, locale, setLocale } = useI18nUtil({
 *     locale: "en",
 *     locales: ["en", "es"],
 *     translations: {
 *       en: { welcome: "Welcome" },
 *       es: { welcome: "Bienvenido" },
 *     },
 *   });
 *
 *   return (
 *     <div>
 *       <h1>{t("welcome")}</h1>
 *       <button onClick={() => setLocale("es")}>Switch to Spanish</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useI18nUtil(config?: I18nUtilConfig): I18nUtilReturn {
  const [locale, setLocaleState] = useState(() => {
    if (config) {
      i18nManager.configure(config);
    }
    return i18nManager.getLocale();
  });
  const [loadedTranslations, setLoadedTranslations] = useState(() =>
    i18nManager.getLoadedTranslations(),
  );

  // Configure on mount if config provided
  useEffect(() => {
    if (config) {
      i18nManager.configure(config);
      setLocaleState(i18nManager.getLocale());
      setLoadedTranslations(i18nManager.getLoadedTranslations());
    }
  }, [config]);

  // Subscribe to changes
  useEffect(() => {
    const unsubscribe = i18nManager.subscribe(() => {
      setLocaleState(i18nManager.getLocale());
      setLoadedTranslations(i18nManager.getLoadedTranslations());
    });

    return unsubscribe;
  }, []);

  // Memoized values (re-compute when locale changes via subscription)
  // biome-ignore lint/correctness/useExhaustiveDependencies: locale is needed to trigger recomputation when locale changes
  const isRTL = useMemo(() => i18nManager.isRTL(), [locale]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: locale is needed to trigger recomputation when locale changes
  const direction = useMemo(() => i18nManager.getDirection(), [locale]);
  const locales = useMemo(() => i18nManager.getLocales(), []);

  // Memoized handlers (callbacks don't use dependencies directly, they call manager methods)
  const setLocale = useCallback(async (newLocale: string) => {
    await i18nManager.setLocale(newLocale);
  }, []);

  const t = useCallback((key: string, values?: InterpolationValues): string => {
    return i18nManager.translate(key, values);
  }, []);

  const tn = useCallback(
    (key: string, count: number, values?: InterpolationValues): string => {
      return i18nManager.translatePlural(key, count, values);
    },
    [],
  );

  const hasTranslation = useCallback((key: string): boolean => {
    return i18nManager.hasTranslation(key);
  }, []);

  const getTranslations = useCallback((): TranslationDictionary => {
    return i18nManager.getLoadedTranslations();
  }, []);

  const formatNumber = useCallback(
    (value: number, options?: NumberFormatOptions): string => {
      return formatNumberValue(value, options, locale);
    },
    [locale],
  );

  const formatDate = useCallback(
    (date: Date | number | string, options?: DateFormatOptions): string => {
      return formatDateValue(date, options, locale);
    },
    [locale],
  );

  const formatCurrency = useCallback(
    (value: number, options: CurrencyFormatOptions): string => {
      return formatCurrencyValue(value, options, locale);
    },
    [locale],
  );

  const formatRelativeTime = useCallback(
    (value: number, unit: Intl.RelativeTimeFormatUnit): string => {
      return formatRelativeTimeValue(value, unit, locale);
    },
    [locale],
  );

  // Update document attributes on mount and locale change
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = direction;
    }
  }, [locale, direction]);

  return {
    locale,
    locales,
    setLocale,
    t,
    tn,
    hasTranslation,
    getTranslations,
    isRTL,
    direction,
    formatNumber,
    formatDate,
    formatCurrency,
    formatRelativeTime,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useI18nUtil;
