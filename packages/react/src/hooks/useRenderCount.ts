/**
 * useRenderCount Hook
 * Track component render count
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useEffect, useRef } from "react";

export function useRenderCount(componentName?: string): number {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;

    if (componentName && process.env.NODE_ENV === "development") {
      console.log(`[${componentName}] Render count: ${renderCount.current}`);
    }
  });

  return renderCount.current;
}
