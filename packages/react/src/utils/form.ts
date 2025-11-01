/**
 * Form Utility
 * Standalone form state management without providers
 *
 * Features:
 * - Form values and errors management
 * - Field validation (sync and async)
 * - Validation rules (required, email, url, min/max length, pattern, custom)
 * - Field registration and state tracking
 * - Dirty and touched state
 * - Form submission handling
 * - Reset functionality
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Validation rule types
 */
export type ValidationRule =
  | RequiredRule
  | EmailRule
  | UrlRule
  | MinLengthRule
  | MaxLengthRule
  | MinRule
  | MaxRule
  | PatternRule
  | CustomRule
  | AsyncRule;

export interface RequiredRule {
  type: "required";
  message?: string;
}

export interface EmailRule {
  type: "email";
  message?: string;
}

export interface UrlRule {
  type: "url";
  message?: string;
}

export interface MinLengthRule {
  type: "minLength";
  value: number;
  message?: string;
}

export interface MaxLengthRule {
  type: "maxLength";
  value: number;
  message?: string;
}

export interface MinRule {
  type: "min";
  value: number;
  message?: string;
}

export interface MaxRule {
  type: "max";
  value: number;
  message?: string;
}

export interface PatternRule {
  type: "pattern";
  value: RegExp;
  message?: string;
}

export interface CustomRule {
  type: "custom";
  validate: (value: unknown, formValues: FormValues) => boolean | string;
  message?: string;
}

export interface AsyncRule {
  type: "async";
  validate: (
    value: unknown,
    formValues: FormValues,
  ) => Promise<boolean | string>;
  message?: string;
}

/**
 * Field configuration
 */
export interface FieldConfig {
  name: string;
  rules?: ValidationRule[];
  defaultValue?: unknown;
  validateOn?: "change" | "blur" | "submit";
  dependencies?: string[];
}

/**
 * Field state
 */
export interface FieldState {
  value: unknown;
  error?: string;
  touched: boolean;
  dirty: boolean;
  validating: boolean;
}

/**
 * Form values
 */
export type FormValues = Record<string, unknown>;

/**
 * Form errors
 */
export type FormErrors = Record<string, string>;

/**
 * Form touched fields
 */
export type FormTouched = Record<string, boolean>;

/**
 * Form state
 */
export interface FormState {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}

/**
 * Form configuration
 */
export interface FormUtilConfig {
  initialValues?: FormValues;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  onSubmit?: (values: FormValues, helpers: FormHelpers) => void | Promise<void>;
}

/**
 * Form helpers
 */
export interface FormHelpers {
  setFieldValue: (name: string, value: unknown) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setValues: (values: FormValues) => void;
  setErrors: (errors: FormErrors) => void;
  setTouched: (touched: FormTouched) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  validateField: (name: string) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
}

/**
 * Form utility return value
 */
export interface FormUtilReturn extends FormState, FormHelpers {
  registerField: (config: FieldConfig) => void;
  unregisterField: (name: string) => void;
  getFieldState: (name: string) => FieldState | undefined;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate required field
 */
function validateRequired(value: unknown, rule: RequiredRule): string | null {
  if (value === null || value === undefined || value === "") {
    return rule.message || "This field is required";
  }
  if (Array.isArray(value) && value.length === 0) {
    return rule.message || "This field is required";
  }
  return null;
}

/**
 * Validate email format
 */
function validateEmail(value: unknown, rule: EmailRule): string | null {
  if (!value) return null;

  const emailStr = String(value);

  // Limit input length to prevent ReDoS attacks (RFC 5321 specifies max 254 chars)
  if (emailStr.length > 254) {
    return rule.message || "Invalid email address";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailStr)) {
    return rule.message || "Invalid email address";
  }
  return null;
}

/**
 * Validate URL format
 */
function validateUrl(value: unknown, rule: UrlRule): string | null {
  if (!value) return null;

  try {
    new URL(String(value));
    return null;
  } catch {
    return rule.message || "Invalid URL";
  }
}

/**
 * Validate minimum length
 */
function validateMinLength(value: unknown, rule: MinLengthRule): string | null {
  if (!value) return null;

  const length = String(value).length;
  if (length < rule.value) {
    return rule.message || `Minimum length is ${rule.value} characters`;
  }
  return null;
}

/**
 * Validate maximum length
 */
function validateMaxLength(value: unknown, rule: MaxLengthRule): string | null {
  if (!value) return null;

  const length = String(value).length;
  if (length > rule.value) {
    return rule.message || `Maximum length is ${rule.value} characters`;
  }
  return null;
}

/**
 * Validate minimum value
 */
function validateMin(value: unknown, rule: MinRule): string | null {
  if (value === null || value === undefined || value === "") return null;

  const numValue = Number(value);
  if (Number.isNaN(numValue) || numValue < rule.value) {
    return rule.message || `Minimum value is ${rule.value}`;
  }
  return null;
}

/**
 * Validate maximum value
 */
function validateMax(value: unknown, rule: MaxRule): string | null {
  if (value === null || value === undefined || value === "") return null;

  const numValue = Number(value);
  if (Number.isNaN(numValue) || numValue > rule.value) {
    return rule.message || `Maximum value is ${rule.value}`;
  }
  return null;
}

/**
 * Validate pattern
 */
function validatePattern(value: unknown, rule: PatternRule): string | null {
  if (!value) return null;

  if (!rule.value.test(String(value))) {
    return rule.message || "Invalid format";
  }
  return null;
}

/**
 * Validate custom rule
 */
function validateCustom(
  value: unknown,
  rule: CustomRule,
  formValues: FormValues,
): string | null {
  const result = rule.validate(value, formValues);
  if (result === true) return null;
  if (typeof result === "string") return result;
  return rule.message || "Validation failed";
}

/**
 * Validate async rule
 */
async function validateAsync(
  value: unknown,
  rule: AsyncRule,
  formValues: FormValues,
): Promise<string | null> {
  try {
    const result = await rule.validate(value, formValues);
    if (result === true) return null;
    if (typeof result === "string") return result;
    return rule.message || "Validation failed";
  } catch (error) {
    return rule.message || "Validation error";
  }
}

/**
 * Validate a single rule
 */
async function validateRule(
  value: unknown,
  rule: ValidationRule,
  formValues: FormValues,
): Promise<string | null> {
  switch (rule.type) {
    case "required":
      return validateRequired(value, rule);
    case "email":
      return validateEmail(value, rule);
    case "url":
      return validateUrl(value, rule);
    case "minLength":
      return validateMinLength(value, rule);
    case "maxLength":
      return validateMaxLength(value, rule);
    case "min":
      return validateMin(value, rule);
    case "max":
      return validateMax(value, rule);
    case "pattern":
      return validatePattern(value, rule);
    case "custom":
      return validateCustom(value, rule, formValues);
    case "async":
      return validateAsync(value, rule, formValues);
    default:
      return null;
  }
}

/**
 * Validate all rules for a field
 */
async function validateFieldRules(
  value: unknown,
  rules: ValidationRule[] | undefined,
  formValues: FormValues,
): Promise<string | null> {
  if (!rules || rules.length === 0) return null;

  for (const rule of rules) {
    const error = await validateRule(value, rule, formValues);
    if (error) return error;
  }

  return null;
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useFormUtil Hook
 * Provider-free form state management utility
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const {
 *     values,
 *     errors,
 *     handleSubmit,
 *     registerField,
 *     getFieldState,
 *   } = useFormUtil({
 *     initialValues: { email: "", password: "" },
 *     onSubmit: async (values) => {
 *       await api.login(values);
 *     },
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         {...registerField({ name: "email", rules: [{ type: "required" }] })}
 *       />
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useFormUtil(config: FormUtilConfig = {}): FormUtilReturn {
  const {
    initialValues = {},
    validateOnChange = true,
    validateOnBlur = true,
    validateOnMount = false,
    onSubmit,
  } = config;

  // State
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Field registry
  const fieldsRef = useRef<Map<string, FieldConfig>>(new Map());
  const initialValuesRef = useRef<FormValues>(initialValues);

  // Update initial values ref when config changes
  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  // Computed state
  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) => values[key] !== initialValuesRef.current[key],
    );
  }, [values]);

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
        dirty: values[name] !== initialValuesRef.current[name],
        validating: false,
      };
    },
    [values, errors, touched],
  );

  // Validate a field
  const validateField = useCallback(
    async (name: string): Promise<boolean> => {
      const field = fieldsRef.current.get(name);
      if (!field) return true;

      const value = values[name];
      const error = await validateFieldRules(value, field.rules, values);

      setErrors((prev) => {
        if (error) {
          return { ...prev, [name]: error };
        }
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      return !error;
    },
    [values],
  );

  // Validate all fields
  const validateForm = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);

    try {
      const fieldNames = Array.from(fieldsRef.current.keys());
      const validationResults = await Promise.all(
        fieldNames.map((name) => validateField(name)),
      );

      const isValid = validationResults.every((result) => result);

      return isValid;
    } finally {
      setIsValidating(false);
    }
  }, [validateField]);

  // Set field value
  const setFieldValue = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate on change if enabled
      if (validateOnChange) {
        const field = fieldsRef.current.get(name);
        if (field && field.validateOn !== "submit") {
          void validateField(name);
        }
      }
    },
    [validateOnChange, validateField],
  );

  // Set field error
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // Set field touched
  const setFieldTouched = useCallback(
    (name: string, touchedValue: boolean) => {
      setTouched((prev) => ({ ...prev, [name]: touchedValue }));

      // Validate on blur if enabled
      if (validateOnBlur && touchedValue) {
        const field = fieldsRef.current.get(name);
        if (field && field.validateOn !== "change") {
          void validateField(name);
        }
      }
    },
    [validateOnBlur, validateField],
  );

  // Set all values
  const setValuesHelper = useCallback((newValues: FormValues) => {
    setValues(newValues);
  }, []);

  // Set all errors
  const setErrorsHelper = useCallback((newErrors: FormErrors) => {
    setErrors(newErrors);
  }, []);

  // Set all touched
  const setTouchedHelper = useCallback((newTouched: FormTouched) => {
    setTouched(newTouched);
  }, []);

  // Set submitting
  const setSubmitting = useCallback((submitting: boolean) => {
    setIsSubmitting(submitting);
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValuesRef.current);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsValidating(false);
    setSubmitCount(0);
  }, []);

  // Handle submit
  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      // Validate all fields
      const isValid = await validateForm();

      if (!isValid) {
        // Mark all fields as touched
        const allFields = Array.from(fieldsRef.current.keys());
        setTouched((prev) => {
          const newTouched = { ...prev };
          for (const fieldName of allFields) {
            newTouched[fieldName] = true;
          }
          return newTouched;
        });
        return;
      }

      // Submit form
      setSubmitCount((prev) => prev + 1);
      setIsSubmitting(true);

      try {
        const helpers: FormHelpers = {
          setFieldValue,
          setFieldError,
          setFieldTouched,
          setValues: setValuesHelper,
          setErrors: setErrorsHelper,
          setTouched: setTouchedHelper,
          setSubmitting,
          resetForm,
          validateField,
          validateForm,
        };

        await onSubmit?.(values, helpers);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      values,
      onSubmit,
      validateForm,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      setValuesHelper,
      setErrorsHelper,
      setTouchedHelper,
      setSubmitting,
      resetForm,
      validateField,
    ],
  );

  // Validate on mount
  useEffect(() => {
    if (validateOnMount) {
      void validateForm();
    }
  }, [validateOnMount, validateForm]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isValid,
    isDirty,
    submitCount,
    registerField,
    unregisterField,
    getFieldState,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setValues: setValuesHelper,
    setErrors: setErrorsHelper,
    setTouched: setTouchedHelper,
    setSubmitting,
    resetForm,
    validateField,
    validateForm,
    handleSubmit,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default useFormUtil;
