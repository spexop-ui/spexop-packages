/**
 * useFormatDate Hook
 * Hook for formatting dates
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useCallback } from "react";
import { useI18nUtil } from "../utils/i18n.js";

/**
 * useFormatDate Hook
 * Hook for formatting dates using i18n utility
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const formatDate = useFormatDate();
 *
 *   return <div>{formatDate(new Date())}</div>;
 * }
 * ```
 */
export function useFormatDate() {
  const { formatDate } = useI18nUtil({
    locale: "en",
  });

  const format = useCallback(
    (
      date: Date | number | string,
      options?: Parameters<typeof formatDate>[1],
    ) => {
      return formatDate(date, options);
    },
    [formatDate],
  );

  return format;
}
