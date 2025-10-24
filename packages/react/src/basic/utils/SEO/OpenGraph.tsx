/**
 * OpenGraph Component
 * OpenGraph protocol meta tags
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import { useEffect } from "react";
import type { OpenGraphProps } from "./SEO.types.js";

export function OpenGraph({
  title,
  description,
  url,
  image,
  type = "website",
  siteName,
  locale = "en_US",
}: OpenGraphProps) {
  useEffect(() => {
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:locale", content: locale },
    ];

    if (url) {
      ogTags.push({ property: "og:url", content: url });
    }

    if (image) {
      ogTags.push({ property: "og:image", content: image });
    }

    if (siteName) {
      ogTags.push({ property: "og:site_name", content: siteName });
    }

    // Update or create OG tags
    for (const tag of ogTags) {
      const selector = `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", tag.property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", tag.content);
    }
  }, [title, description, url, image, type, siteName, locale]);

  return null;
}
