/**
 * useLocale Hook
 * Hook for managing locale
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @deprecated Use useI18nUtil from @spexop/react/utils instead
 *
 * @example
 * ```tsx
 * function LanguageSwitcher() {
 *   const { locale, setLocale, locales } = useI18nUtil({
 *     locale: "en",
 *     locales: ["en", "es"],
 *     translations: { en: {}, es: {} },
 *   });
 *
 *   return (
 *     <select value={locale} onChange={(e) => setLocale(e.target.value)}>
 *       {locales.map(loc => <option key={loc} value={loc}>{loc}</option>)}
 *     </select>
 *   );
 * }
 * ```
 */

import { useI18nUtil } from "../utils/i18n.js";

export function useLocale() {
  const i18n = useI18nUtil();

  return {
    locale: i18n.locale,
    locales: i18n.locales,
    setLocale: i18n.setLocale,
    isRTL: i18n.isRTL,
    direction: i18n.direction,
  };
}
