/**
 * FormField Component Types
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type { ReactNode } from "react";
import type { FormValidationRule } from "../../../utils/index.js";

export interface FormFieldProps {
  /**
   * Field name (must match form value key)
   */
  name: string;

  /**
   * Field label
   */
  label?: string;

  /**
   * Help text displayed below the field
   */
  helperText?: string;

  /**
   * Validation rules
   */
  rules?: FormValidationRule[];

  /**
   * Default value
   */
  defaultValue?: unknown;

  /**
   * When to validate
   * @default 'blur'
   */
  validateOn?: "change" | "blur" | "submit";

  /**
   * Other fields this field depends on
   */
  dependencies?: string[];

  /**
   * Show required indicator
   * @default false
   */
  showRequired?: boolean;

  /**
   * Field input element
   */
  children: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Field ID
   */
  id?: string;

  /**
   * Custom error message override
   */
  errorMessage?: string;

  /**
   * Hide error message
   * @default false
   */
  hideError?: boolean;

  /**
   * Controlled value (for standalone usage without FormProvider)
   */
  value?: unknown;

  /**
   * Controlled onChange handler (for standalone usage without FormProvider)
   */
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;

  /**
   * Controlled onBlur handler (for standalone usage without FormProvider)
   */
  onBlur?: () => void;

  /**
   * Controlled error (for standalone usage without FormProvider)
   */
  error?: string;
}
