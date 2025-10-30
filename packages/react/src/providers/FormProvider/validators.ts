/**
 * Form Validators
 * Built-in validation functions
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import type {
  AsyncRule,
  CustomRule,
  EmailRule,
  FormValues,
  MaxLengthRule,
  MaxRule,
  MinLengthRule,
  MinRule,
  PatternRule,
  RequiredRule,
  UrlRule,
  ValidationRule,
} from "./FormProvider.types.js";

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

  // Email regex with length limit to prevent ReDoS attacks
  // The pattern [^\s@]+\.[^\s@]+ can be slow on malicious inputs, but with
  // the 254 character limit above, worst-case performance is bounded and acceptable.
  // Input length limit is the primary defense against ReDoS for this pattern.
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
export async function validateRule(
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
export async function validateField(
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
