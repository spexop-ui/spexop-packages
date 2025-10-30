/**
 * Alert Icons
 *
 * Semantic SVG icons for alert components
 * Designed for accessibility and visual clarity
 */

/**
 * Info icon - Modern filled circle with information symbol
 */
export const InfoIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Information" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1"/><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6.5" r="1.2" fill="currentColor"/><rect x="9" y="9" width="2" height="6" rx="1" fill="currentColor"/></svg>`;

/**
 * Success icon - Filled circle with elegant checkmark
 */
export const SuccessIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Success" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1"/><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 10.5l2.5 2.5 5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/**
 * Warning icon - Modern triangle with exclamation
 */
export const WarningIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Warning" focusable="false"><path d="M10 2L18 16H2L10 2z" fill="currentColor" opacity="0.1"/><path d="M10 2L18 16H2L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="9" y="7" width="2" height="5" rx="1" fill="currentColor"/><circle cx="10" cy="14" r="1.2" fill="currentColor"/></svg>`;

/**
 * Error icon - Filled circle with sophisticated X
 */
export const ErrorIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Error" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1"/><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="m7.5 7.5 5 5m0-5-5 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`;

/**
 * Solid filled versions for premium appearance
 */
export const InfoIconSolid = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Information" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor"/><circle cx="10" cy="6.5" r="1.2" fill="white"/><rect x="9" y="9" width="2" height="6" rx="1" fill="white"/></svg>`;

export const SuccessIconSolid = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Success" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor"/><path d="M6.5 10.5l2.5 2.5 5-5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const WarningIconSolid = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Warning" focusable="false"><path d="M10 2L18 16H2L10 2z" fill="currentColor"/><rect x="9" y="7" width="2" height="5" rx="1" fill="white"/><circle cx="10" cy="14" r="1.2" fill="white"/></svg>`;

export const ErrorIconSolid = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Error" focusable="false"><circle cx="10" cy="10" r="10" fill="currentColor"/><path d="m7.5 7.5 5 5m0-5-5 5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`;

/**
 * Alert icons mapping
 */
export const AlertIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
} as const;

/**
 * Solid filled alert icons mapping
 */
export const AlertIconsSolid = {
  info: InfoIconSolid,
  success: SuccessIconSolid,
  warning: WarningIconSolid,
  error: ErrorIconSolid,
} as const;

export type AlertIconVariant = keyof typeof AlertIcons;
