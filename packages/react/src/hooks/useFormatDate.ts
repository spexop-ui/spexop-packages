/**
 * useFormatDate Hook
 * Hook for formatting dates
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useCallback, useContext } from "react";
import { I18nContext } from "../providers/I18nProvider/I18nContext.js";
import type { DateFormatOptions } from "../providers/I18nProvider/I18nProvider.types.js";
import { formatDate } from "../providers/I18nProvider/formatters.js";

export function useFormatDate() {
  const context = useContext(I18nContext);

  const format = useCallback(
    (date: Date | number | string, options?: DateFormatOptions) => {
      return formatDate(date, {
        ...options,
        locale: options?.locale || context?.locale,
      });
    },
    [context],
  );

  return format;
}
