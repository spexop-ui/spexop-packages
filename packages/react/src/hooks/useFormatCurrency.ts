/**
 * useFormatCurrency Hook
 * Hook for formatting currency
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useCallback } from "react";
import { useI18nUtil } from "../utils/i18n.js";

/**
 * useFormatCurrency Hook
 * Hook for formatting currency using i18n utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const formatCurrency = useFormatCurrency();
 *
 *   return <div>{formatCurrency(100, { currency: 'USD' })}</div>;
 * }
 * ```
 */
export function useFormatCurrency() {
  const { formatCurrency } = useI18nUtil({
    locale: "en",
  });

  const format = useCallback(
    (value: number, options: Parameters<typeof formatCurrency>[1]) => {
      return formatCurrency(value, options);
    },
    [formatCurrency],
  );

  return format;
}
