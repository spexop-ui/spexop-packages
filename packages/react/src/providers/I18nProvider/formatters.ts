/**
 * Formatters for i18n
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type {
  CurrencyFormatOptions,
  DateFormatOptions,
  NumberFormatOptions,
} from "./I18nProvider.types.js";

/**
 * Format number
 */
export function formatNumber(
  value: number,
  options?: NumberFormatOptions,
): string {
  const locale = options?.locale || "en-US";
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format date
 */
export function formatDate(
  date: Date | number | string,
  options?: DateFormatOptions,
): string {
  const locale = options?.locale || "en-US";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format currency
 */
export function formatCurrency(
  value: number,
  options: CurrencyFormatOptions,
): string {
  const { locale = "en-US", currency, ...restOptions } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...restOptions,
  }).format(value);
}

/**
 * Format relative time
 */
export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale = "en-US",
): string {
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    value,
    unit,
  );
}
