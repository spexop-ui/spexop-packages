/**
 * Data Fetch Context
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { createContext } from "react";
import type { DataFetchContextValue } from "./DataFetchProvider.types.js";

export const DataFetchContext = createContext<DataFetchContextValue | null>(
  null,
);

DataFetchContext.displayName = "DataFetchContext";
