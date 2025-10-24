/**
 * useLocale Hook
 * Hook for managing locale
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function LanguageSwitcher() {
 *   const { locale, setLocale, locales } = useLocale();
 *
 *   return (
 *     <select value={locale} onChange={(e) => setLocale(e.target.value)}>
 *       {locales.map(loc => <option key={loc} value={loc}>{loc}</option>)}
 *     </select>
 *   );
 * }
 * ```
 */

import { useContext } from "react";
import { I18nContext } from "../providers/I18nProvider/I18nContext.js";

export function useLocale() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useLocale must be used within an I18nProvider");
  }

  return {
    locale: context.locale,
    locales: context.locales,
    setLocale: context.setLocale,
    isRTL: context.isRTL,
    direction: context.direction,
  };
}
