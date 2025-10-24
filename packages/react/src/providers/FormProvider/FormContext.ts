/**
 * Form Context
 * Context for form state management
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { createContext } from "react";
import type { FormContextValue } from "./FormProvider.types.js";

export const FormContext = createContext<FormContextValue | null>(null);

FormContext.displayName = "FormContext";
