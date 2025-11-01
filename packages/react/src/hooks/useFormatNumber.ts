/**
 * useFormatNumber Hook
 * Hook for formatting numbers
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useCallback } from "react";
import { useI18nUtil } from "../utils/i18n.js";

/**
 * useFormatNumber Hook
 * Hook for formatting numbers using i18n utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const formatNumber = useFormatNumber();
 *
 *   return <div>{formatNumber(1234.56)}</div>;
 * }
 * ```
 */
export function useFormatNumber() {
  const { formatNumber } = useI18nUtil({
    locale: "en",
  });

  const format = useCallback(
    (value: number, options?: Parameters<typeof formatNumber>[1]) => {
      return formatNumber(value, options);
    },
    [formatNumber],
  );

  return format;
}
