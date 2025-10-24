/**
 * Performance Context
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { createContext } from "react";
import type { PerformanceContextValue } from "./PerformanceProvider.types.js";

export const PerformanceContext = createContext<PerformanceContextValue | null>(
  null,
);

PerformanceContext.displayName = "PerformanceContext";
