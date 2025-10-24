/**
 * useForm Hook
 * Hook for accessing form context
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const form = useForm();
 *
 *   return (
 *     <div>
 *       <p>Form is valid: {form.isValid}</p>
 *       <p>Form is dirty: {form.isDirty}</p>
 *       <button onClick={() => form.resetForm()}>Reset</button>
 *     </div>
 *   );
 * }
 * ```
 */

import { useContext } from "react";
import { FormContext } from "../providers/FormProvider/FormContext.js";
import type { FormContextValue } from "../providers/FormProvider/FormProvider.types.js";

export function useForm(): FormContextValue {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
}
