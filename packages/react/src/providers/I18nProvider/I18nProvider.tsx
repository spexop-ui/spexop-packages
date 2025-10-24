/**
 * I18n Provider
 * Internationalization provider
 *
 * Follows "The Spexop Way":
 * - Principle 6: Standards before frameworks (uses native Intl APIs)
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * const translations = {
 *   en: { welcome: 'Welcome', user: { greeting: 'Hello {{name}}' } },
 *   es: { welcome: 'Bienvenido', user: { greeting: 'Hola {{name}}' } }
 * };
 *
 * <I18nProvider locale="en" translations={translations}>
 *   <App />
 * </I18nProvider>
 * ```
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { I18nContext } from "./I18nContext.js";
import type {
  I18nContextValue,
  I18nProviderProps,
  InterpolationValues,
  TranslationDictionary,
} from "./I18nProvider.types.js";

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

export function I18nProvider({
  children,
  locale: initialLocale = "en",
  locales = ["en"],
  translations,
  fallbackLocale = "en",
  rtlLocales = ["ar", "he", "fa", "ur"],
  loadTranslation,
  onLocaleChange,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState(initialLocale);
  const [loadedTranslations, setLoadedTranslations] =
    useState<TranslationDictionary>(translations[initialLocale] || {});

  // Check if locale is RTL
  const isRTL = useMemo(() => {
    return rtlLocales.includes(locale);
  }, [locale, rtlLocales]);

  // Set locale
  const setLocale = useCallback(
    async (newLocale: string) => {
      if (!locales.includes(newLocale)) {
        console.warn(`Locale "${newLocale}" is not available`);
        return;
      }

      setLocaleState(newLocale);

      // Load translation if not already loaded
      if (!translations[newLocale] && loadTranslation) {
        try {
          const translation = await loadTranslation(newLocale);
          setLoadedTranslations(translation);
        } catch (error) {
          console.error(`Failed to load translation for "${newLocale}"`, error);
        }
      } else {
        setLoadedTranslations(translations[newLocale] || {});
      }

      // Call callback
      onLocaleChange?.(newLocale);

      // Update document attributes
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = rtlLocales.includes(newLocale)
          ? "rtl"
          : "ltr";
      }
    },
    [locales, translations, loadTranslation, onLocaleChange, rtlLocales],
  );

  // Translate function
  const t = useCallback(
    (key: string, values?: InterpolationValues): string => {
      // Try current locale
      let translation = getNestedValue(loadedTranslations, key);

      // Try fallback locale
      if (!translation && fallbackLocale !== locale) {
        translation = getNestedValue(translations[fallbackLocale] || {}, key);
      }

      // Return key if not found
      if (!translation) {
        console.warn(`Translation not found for key: "${key}"`);
        return key;
      }

      // Interpolate values
      return interpolate(translation, values);
    },
    [loadedTranslations, fallbackLocale, locale, translations],
  );

  // Translate with pluralization
  const tn = useCallback(
    (key: string, count: number, values?: InterpolationValues): string => {
      const pluralKey =
        count === 0
          ? `${key}.zero`
          : count === 1
            ? `${key}.one`
            : `${key}.other`;

      return t(pluralKey, { ...values, count });
    },
    [t],
  );

  // Check if translation exists
  const hasTranslation = useCallback(
    (key: string): boolean => {
      return getNestedValue(loadedTranslations, key) !== undefined;
    },
    [loadedTranslations],
  );

  // Get all translations
  const getTranslations = useCallback((): TranslationDictionary => {
    return loadedTranslations;
  }, [loadedTranslations]);

  // Set initial document attributes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
  }, [locale, isRTL]);

  // Context value
  const contextValue: I18nContextValue = useMemo(
    () => ({
      locale,
      locales,
      setLocale,
      t,
      tn,
      hasTranslation,
      getTranslations,
      isRTL,
      direction: isRTL ? "rtl" : "ltr",
    }),
    [locale, locales, setLocale, t, tn, hasTranslation, getTranslations, isRTL],
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}
