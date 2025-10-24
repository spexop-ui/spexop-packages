/**
 * I18n Provider Types
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { ReactNode } from "react";

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
 * Plural forms
 */
export interface PluralForms {
  zero?: string;
  one: string;
  two?: string;
  few?: string;
  many?: string;
  other: string;
}

/**
 * Interpolation values
 */
export type InterpolationValues = Record<string, string | number>;

/**
 * I18n context value
 */
export interface I18nContextValue {
  /**
   * Current locale
   */
  locale: string;

  /**
   * Available locales
   */
  locales: string[];

  /**
   * Change locale
   */
  setLocale: (locale: string) => void;

  /**
   * Translate a key
   */
  t: (key: string, values?: InterpolationValues) => string;

  /**
   * Translate with pluralization
   */
  tn: (key: string, count: number, values?: InterpolationValues) => string;

  /**
   * Check if translation exists
   */
  hasTranslation: (key: string) => boolean;

  /**
   * Get all translations for current locale
   */
  getTranslations: () => TranslationDictionary;

  /**
   * Is RTL locale
   */
  isRTL: boolean;

  /**
   * Direction
   */
  direction: "ltr" | "rtl";
}

/**
 * I18n provider props
 */
export interface I18nProviderProps {
  children: ReactNode;

  /**
   * Initial locale
   * @default 'en'
   */
  locale?: string;

  /**
   * Available locales
   */
  locales?: string[];

  /**
   * Translations
   */
  translations: Translations;

  /**
   * Fallback locale
   * @default 'en'
   */
  fallbackLocale?: string;

  /**
   * RTL locales
   */
  rtlLocales?: string[];

  /**
   * Load translation function
   */
  loadTranslation?: (locale: string) => Promise<TranslationDictionary>;

  /**
   * On locale change callback
   */
  onLocaleChange?: (locale: string) => void;
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
