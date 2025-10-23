import { useId } from "react";
import styles from "./TextInput.module.css";
import type { TextInputProps } from "./TextInput.types.js";

export function TextInput({
  label,
  id: providedId,
  name,
  type = "text",
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  size = "md",
  variant = "default",
  error,
  helpText,
  leftIcon,
  rightIcon,
  className,
  onChange,
  onBlur,
  onFocus,
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = providedId || generatedId;

  // Determine variant based on error state
  const inputVariant = error ? "error" : variant;

  // Build CSS classes
  const inputClassList = [
    styles.input,
    size === "sm" ? styles.inputSizeSm : null,
    size === "lg" ? styles.inputSizeLg : null,
    inputVariant === "error" ? styles.inputError : null,
    inputVariant === "success" ? styles.inputSuccess : null,
    leftIcon ? styles.inputWithLeftIcon : null,
    rightIcon ? styles.inputWithRightIcon : null,
    leftIcon && rightIcon ? styles.inputWithBothIcons : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClassList = [
    styles.inputContainer,
    inputVariant === "error" ? styles.hasError : null,
    inputVariant === "success" ? styles.hasSuccess : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.textInput}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.requiredIndicator} aria-label="required">
            *
          </span>
        )}
      </label>

      <div className={containerClassList}>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClassList}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helpText
                ? `${inputId}-help`
                : undefined
          }
          {...props}
        />

        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>

      {error && (
        <div
          id={`${inputId}-error`}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {helpText && !error && (
        <div id={`${inputId}-help`} className={styles.helpText}>
          {helpText}
        </div>
      )}
    </div>
  );
}
