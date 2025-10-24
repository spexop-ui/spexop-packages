/**
 * I18n Context
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { createContext } from "react";
import type { I18nContextValue } from "./I18nProvider.types.js";

export const I18nContext = createContext<I18nContextValue | null>(null);

I18nContext.displayName = "I18nContext";
