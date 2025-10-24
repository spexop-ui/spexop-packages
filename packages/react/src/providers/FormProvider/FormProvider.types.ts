/**
 * Form Provider Types
 * Type definitions for form validation and state management
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { ReactNode } from "react";

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
export interface FormConfig {
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
 * Form context value
 */
export interface FormContextValue extends FormState, FormHelpers {
  registerField: (config: FieldConfig) => void;
  unregisterField: (name: string) => void;
  getFieldState: (name: string) => FieldState | undefined;
}

/**
 * Form provider props
 */
export interface FormProviderProps extends FormConfig {
  children: ReactNode;
}
