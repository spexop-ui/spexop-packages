/**
 * useFormatNumber Hook
 * Hook for formatting numbers
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useCallback, useContext } from "react";
import { I18nContext } from "../providers/I18nProvider/I18nContext.js";
import type { NumberFormatOptions } from "../providers/I18nProvider/I18nProvider.types.js";
import { formatNumber } from "../providers/I18nProvider/formatters.js";

export function useFormatNumber() {
  const context = useContext(I18nContext);

  const format = useCallback(
    (value: number, options?: NumberFormatOptions) => {
      return formatNumber(value, {
        ...options,
        locale: options?.locale || context?.locale,
      });
    },
    [context],
  );

  return format;
}
