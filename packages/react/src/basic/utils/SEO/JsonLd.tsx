/**
 * JsonLd Component
 * JSON-LD structured data
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useEffect } from "react";
import type { JsonLdProps } from "./SEO.types.js";

export function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.type = "application/ld+json";

    // Add @context if not present
    const structuredData = Array.isArray(data)
      ? data.map((item) => ({
          "@context": "https://schema.org",
          ...item,
        }))
      : {
          "@context": "https://schema.org",
          ...data,
        };

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}
