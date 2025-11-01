/**
 * useTranslation Hook
 * Hook for accessing translations
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
 * function Header() {
 *   const { t } = useI18nUtil({
 *     locale: "en",
 *     translations: { en: { welcome: { title: "Welcome" } } },
 *   });
 *   return <h1>{t('welcome.title')}</h1>;
 * }
 * ```
 */

import { useI18nUtil } from "../utils/i18n.js";

export function useTranslation() {
  const i18n = useI18nUtil();

  return {
    t: i18n.t,
    tn: i18n.tn,
    locale: i18n.locale,
    setLocale: i18n.setLocale,
    hasTranslation: i18n.hasTranslation,
    isRTL: i18n.isRTL,
    direction: i18n.direction,
  };
}
