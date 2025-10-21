/**
 * Form Component Types
 * Form wrapper with validation, loading states, and accessibility
 *
 * @component Form
 * @packageName @spexop/react
 * @description Form wrapper component with validation and loading states
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import type { FormHTMLAttributes, ReactNode } from "react";

/**
 * Form validation state
 */
export interface FormValidationState {
  /**
   * Whether the form is valid
   */
  isValid: boolean;

  /**
   * Form-level errors
   */
  errors: string[];

  /**
   * Field-level errors
   */
  fieldErrors: Record<string, string>;
}

/**
 * Form submit handler
 */
export type FormSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>,
  data: FormData,
) => void | Promise<void>;

/**
 * Form component props
 */
export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "className"> {
  /**
   * Form content
   */
  children?: ReactNode;

  /**
   * Form submit handler
   */
  onSubmit?: FormSubmitHandler;

  /**
   * Form action URL
   */
  action?: string;

  /**
   * HTTP method
   * @default 'post'
   */
  method?: "get" | "post" | "put" | "patch" | "delete";

  /**
   * Loading state (disables submit)
   * @default false
   */
  loading?: boolean;

  /**
   * Disabled state (disables entire form)
   * @default false
   */
  disabled?: boolean;

  /**
   * Validation state
   */
  validation?: FormValidationState;

  /**
   * Show loading indicator
   * @default true
   */
  showLoadingIndicator?: boolean;

  /**
   * Form variant for styling
   * @default 'default'
   */
  variant?: "default" | "card";

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Custom ID
   */
  id?: string;

  /**
   * No validation (skip browser validation)
   * @default false
   */
  noValidate?: boolean;

  // Accessibility props

  /**
   * ARIA label
   */
  "aria-label"?: string;

  /**
   * ARIA described by
   */
  "aria-describedby"?: string;

  /**
   * ARIA live region for form status
   */
  "aria-live"?: "polite" | "assertive" | "off";
}
