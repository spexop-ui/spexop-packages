/**
 * useFormField Hook
 * Hook for managing individual form fields
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * function EmailInput() {
 *   const field = useFormField({
 *     name: 'email',
 *     rules: [
 *       { type: 'required', message: 'Email is required' },
 *       { type: 'email', message: 'Invalid email' }
 *     ]
 *   });
 *
 *   return (
 *     <div>
 *       <input
 *         type="email"
 *         value={field.value}
 *         onChange={field.onChange}
 *         onBlur={field.onBlur}
 *       />
 *       {field.error && <span>{field.error}</span>}
 *     </div>
 *   );
 * }
 * ```
 */

import { useEffect, useMemo } from "react";
import type { FormFieldConfig, FormValidationRule } from "../utils/index.js";
import { useForm } from "./useForm.js";

export interface UseFormFieldOptions {
  name: string;
  rules?: FormValidationRule[];
  defaultValue?: unknown;
  validateOn?: "change" | "blur" | "submit";
  dependencies?: string[];
}

export interface UseFormFieldReturn {
  value: unknown;
  error?: string;
  touched: boolean;
  dirty: boolean;
  validating: boolean;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur: () => void;
  setValue: (value: unknown) => void;
  setError: (error: string) => void;
  setTouched: (touched: boolean) => void;
  validate: () => Promise<boolean>;
}

export function useFormField({
  name,
  rules,
  defaultValue,
  validateOn = "blur",
  dependencies,
}: UseFormFieldOptions): UseFormFieldReturn {
  const form = useForm();

  // Register field on mount
  useEffect(() => {
    const config: FormFieldConfig = {
      name,
      rules,
      defaultValue,
      validateOn,
      dependencies,
    };
    form.registerField(config);

    return () => {
      form.unregisterField(name);
    };
  }, [name, rules, defaultValue, validateOn, dependencies, form]);

  // Get field state
  const fieldState = form.getFieldState(name);

  // Handle change
  const handleChange = useMemo(
    () =>
      (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => {
        const { value, type, checked } = event.target as HTMLInputElement;
        const fieldValue = type === "checkbox" ? checked : value;
        form.setFieldValue(name, fieldValue);
      },
    [name, form],
  );

  // Handle blur
  const handleBlur = useMemo(
    () => () => {
      form.setFieldTouched(name, true);
    },
    [name, form],
  );

  // Set value
  const setValue = useMemo(
    () => (value: unknown) => {
      form.setFieldValue(name, value);
    },
    [name, form],
  );

  // Set error
  const setError = useMemo(
    () => (error: string) => {
      form.setFieldError(name, error);
    },
    [name, form],
  );

  // Set touched
  const setTouched = useMemo(
    () => (touched: boolean) => {
      form.setFieldTouched(name, touched);
    },
    [name, form],
  );

  // Validate
  const validate = useMemo(
    () => () => {
      return form.validateField(name);
    },
    [name, form],
  );

  return {
    value: fieldState?.value ?? defaultValue ?? "",
    error: fieldState?.error,
    touched: fieldState?.touched ?? false,
    dirty: fieldState?.dirty ?? false,
    validating: fieldState?.validating ?? false,
    onChange: handleChange,
    onBlur: handleBlur,
    setValue,
    setError,
    setTouched,
    validate,
  };
}
