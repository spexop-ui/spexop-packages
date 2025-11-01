/**
 * FormField Component
 * Form field wrapper with validation and error display
 *
 * Follows "The Spexop Way":
 * - Principle 2: Borders before shadows
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 7: Accessibility before aesthetics
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * <FormField
 *   name="email"
 *   label="Email Address"
 *   rules={[
 *     { type: 'required', message: 'Email is required' },
 *     { type: 'email', message: 'Invalid email format' }
 *   ]}
 * >
 *   <TextInput />
 * </FormField>
 * ```
 */

import { cloneElement, isValidElement, useMemo } from "react";
import { useFormField } from "../../../hooks/useFormField.js";
import { cn } from "../../../utils/index.js";
import styles from "./FormField.module.css";
import type { FormFieldProps } from "./FormField.types.js";

export function FormField({
  name,
  label,
  helperText,
  rules,
  defaultValue,
  validateOn = "blur",
  dependencies,
  showRequired = false,
  children,
  className,
  id,
  errorMessage,
  hideError = false,
  // Controlled props for standalone usage
  value: controlledValue,
  onChange: controlledOnChange,
  onBlur: controlledOnBlur,
  error: controlledError,
}: FormFieldProps) {
  // Use controlled props if provided, otherwise use form field hook
  const isControlled =
    controlledValue !== undefined ||
    controlledOnChange !== undefined ||
    controlledOnBlur !== undefined ||
    controlledError !== undefined;

  const field = isControlled
    ? {
        value: controlledValue,
        onChange: controlledOnChange || (() => {}),
        onBlur: controlledOnBlur || (() => {}),
        error: controlledError,
        touched: true,
      }
    : useFormField({
        name,
        rules,
        defaultValue,
        validateOn,
        dependencies,
      });

  // Generate unique ID
  const fieldId = id || `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  // Check if field is required
  const isRequired = useMemo(() => {
    if (showRequired) return true;
    return rules?.some((rule) => rule.type === "required");
  }, [rules, showRequired]);

  // Display error
  const displayError =
    errorMessage || controlledError || (isControlled ? undefined : field.error);
  const hasError =
    !hideError && (isControlled ? !!displayError : field.touched && displayError);

  // Clone child with field props
  const childElement = useMemo(() => {
    if (!isValidElement(children)) return children;

    // Pass field state to child component
    return cloneElement(
      children as React.ReactElement<unknown>,
      {
        id: fieldId,
        name,
        value: field.value,
        onChange: field.onChange,
        onBlur: field.onBlur,
        "aria-invalid": hasError ? "true" : undefined,
        "aria-describedby":
          [hasError ? errorId : undefined, helperText ? helperId : undefined]
            .filter(Boolean)
            .join(" ") || undefined,
        "aria-required": isRequired ? "true" : undefined,
      } as Record<string, unknown>,
    );
  }, [
    children,
    fieldId,
    name,
    field.value,
    field.onChange,
    field.onBlur,
    hasError,
    errorId,
    helperText,
    helperId,
    isRequired,
  ]);

  return (
    <div className={cn(styles.field, hasError && styles.fieldError, className)}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>{childElement}</div>

      {helperText && !hasError && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}

      {hasError && (
        <span id={errorId} className={styles.error} role="alert">
          {displayError}
        </span>
      )}
    </div>
  );
}
