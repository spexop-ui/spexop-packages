/**
 * useTranslation Hook
 * Hook for accessing translations
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function Header() {
 *   const { t } = useTranslation();
 *   return <h1>{t('welcome.title')}</h1>;
 * }
 * ```
 */

import { useContext } from "react";
import { I18nContext } from "../providers/I18nProvider/I18nContext.js";

export function useTranslation() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  return {
    t: context.t,
    tn: context.tn,
    locale: context.locale,
    setLocale: context.setLocale,
    hasTranslation: context.hasTranslation,
    isRTL: context.isRTL,
    direction: context.direction,
  };
}
