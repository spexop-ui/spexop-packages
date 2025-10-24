/**
 * Form Provider
 * Context provider for form state management and validation
 *
 * Follows "The Spexop Way":
 * - Principle 6: Standards before frameworks (uses native HTML form APIs)
 * - Principle 7: Accessibility before aesthetics (built-in ARIA support)
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * <FormProvider
 *   initialValues={{ email: '', password: '' }}
 *   onSubmit={async (values) => {
 *     await api.login(values);
 *   }}
 * >
 *   <FormField name="email" label="Email" />
 *   <FormField name="password" label="Password" type="password" />
 *   <Button type="submit">Login</Button>
 * </FormProvider>
 * ```
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { FormContext } from "./FormContext.js";
import type {
  FieldConfig,
  FieldState,
  FormContextValue,
  FormErrors,
  FormProviderProps,
  FormTouched,
  FormValues,
} from "./FormProvider.types.js";
import { validateField } from "./validators.js";

export function FormProvider({
  children,
  initialValues = {},
  validateOnChange = true,
  validateOnBlur = true,
  validateOnMount = false,
  onSubmit,
}: FormProviderProps) {
  // State
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Field registry
  const fieldsRef = useRef<Map<string, FieldConfig>>(new Map());

  // Computed state
  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) => values[key] !== initialValues[key],
    );
  }, [values, initialValues]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Register field
  const registerField = useCallback((config: FieldConfig) => {
    fieldsRef.current.set(config.name, config);

    // Set initial value if not already set
    setValues((prev) => {
      if (prev[config.name] !== undefined) return prev;
      return {
        ...prev,
        [config.name]: config.defaultValue ?? "",
      };
    });
  }, []);

  // Unregister field
  const unregisterField = useCallback((name: string) => {
    fieldsRef.current.delete(name);
  }, []);

  // Get field state
  const getFieldState = useCallback(
    (name: string): FieldState | undefined => {
      const field = fieldsRef.current.get(name);
      if (!field) return undefined;

      return {
        value: values[name],
        error: errors[name],
        touched: touched[name] || false,
        dirty: values[name] !== initialValues[name],
        validating: false,
      };
    },
    [values, errors, touched, initialValues],
  );

  // Set field value
  const setFieldValue = useCallback(
    async (name: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Validate on change if enabled
      if (validateOnChange) {
        const field = fieldsRef.current.get(name);
        if (field?.rules) {
          const error = await validateField(value, field.rules, {
            ...values,
            [name]: value,
          });
          setErrors((prev) => {
            if (error) {
              return { ...prev, [name]: error };
            }
            const { [name]: _, ...rest } = prev;
            return rest;
          });
        }
      }
    },
    [validateOnChange, values],
  );

  // Set field error
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // Set field touched
  const setFieldTouched = useCallback(
    async (name: string, touchedValue: boolean) => {
      setTouched((prev) => ({ ...prev, [name]: touchedValue }));

      // Validate on blur if enabled and field is touched
      if (validateOnBlur && touchedValue) {
        const field = fieldsRef.current.get(name);
        if (field?.rules) {
          const error = await validateField(values[name], field.rules, values);
          setErrors((prev) => {
            if (error) {
              return { ...prev, [name]: error };
            }
            const { [name]: _, ...rest } = prev;
            return rest;
          });
        }
      }
    },
    [validateOnBlur, values],
  );

  // Validate single field
  const validateFieldFn = useCallback(
    async (name: string): Promise<boolean> => {
      const field = fieldsRef.current.get(name);
      if (!field?.rules) return true;

      setIsValidating(true);
      const error = await validateField(values[name], field.rules, values);
      setIsValidating(false);

      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        return false;
      }

      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
      return true;
    },
    [values],
  );

  // Validate entire form
  const validateForm = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);
    const newErrors: FormErrors = {};

    const validationPromises = Array.from(fieldsRef.current.entries()).map(
      async ([name, field]) => {
        if (field.rules) {
          const error = await validateField(values[name], field.rules, values);
          if (error) {
            newErrors[name] = error;
          }
        }
      },
    );

    await Promise.all(validationPromises);
    setIsValidating(false);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }, [values]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsValidating(false);
    setSubmitCount(0);
  }, [initialValues]);

  // Handle submit
  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      setSubmitCount((prev) => prev + 1);
      setIsSubmitting(true);

      // Validate form
      const formIsValid = await validateForm();

      if (!formIsValid) {
        setIsSubmitting(false);
        return;
      }

      // Call onSubmit handler
      if (onSubmit) {
        try {
          await onSubmit(values, {
            setFieldValue,
            setFieldError,
            setFieldTouched,
            setValues,
            setErrors,
            setTouched,
            setSubmitting: setIsSubmitting,
            resetForm,
            validateField: validateFieldFn,
            validateForm,
          });
        } catch (error) {
          // Handle submit error
          console.error("Form submission error:", error);
        }
      }

      setIsSubmitting(false);
    },
    [
      validateForm,
      onSubmit,
      values,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      resetForm,
      validateFieldFn,
    ],
  );

  // Context value
  const contextValue: FormContextValue = useMemo(
    () => ({
      // State
      values,
      errors,
      touched,
      isSubmitting,
      isValidating,
      isValid,
      isDirty,
      submitCount,
      // Methods
      setFieldValue,
      setFieldError,
      setFieldTouched,
      setValues,
      setErrors,
      setTouched,
      setSubmitting: setIsSubmitting,
      resetForm,
      validateField: validateFieldFn,
      validateForm,
      registerField,
      unregisterField,
      getFieldState,
    }),
    [
      values,
      errors,
      touched,
      isSubmitting,
      isValidating,
      isValid,
      isDirty,
      submitCount,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      resetForm,
      validateFieldFn,
      validateForm,
      registerField,
      unregisterField,
      getFieldState,
    ],
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}
