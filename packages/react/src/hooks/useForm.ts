/**
 * useForm Hook
 * Hook for accessing form utility
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @deprecated Use useFormUtil from @spexop/react/utils instead
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const form = useFormUtil({
 *     initialValues: { email: "", password: "" },
 *     onSubmit: async (values) => {
 *       await api.login(values);
 *     },
 *   });
 *
 *   return (
 *     <form onSubmit={form.handleSubmit}>
 *       <p>Form is valid: {form.isValid}</p>
 *       <p>Form is dirty: {form.isDirty}</p>
 *       <button onClick={() => form.resetForm()}>Reset</button>
 *     </form>
 *   );
 * }
 * ```
 */

export { useFormUtil as useForm } from "../utils/form.js";
export type { FormUtilReturn as FormContextValue } from "../utils/form.js";
