/**
 * DashboardCard Types
 * @module @spexop/react/cards
 */

import type { CardVariant } from "../Card/Card.types.js";

/**
 * Props for DashboardCard component
 */
export interface DashboardCardProps {
  /** Widget title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional header actions (buttons, menus, etc.) */
  actions?: React.ReactNode;
  /** Main content (charts, tables, etc.) */
  children?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Card visual variant */
  variant?: CardVariant;
  /** Additional CSS class names */
  className?: string;
}
