/**
 * SEO Component
 * Meta tags and structured data for SEO
 *
 * Follows "The Spexop Way":
 * - Principle 6: Standards before frameworks (uses native meta tags)
 * - Principle 7: Accessibility before aesthetics
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 *
 * @example
 * ```tsx
 * <SEO
 *   title="Product Name"
 *   description="Product description"
 *   image="/og-image.jpg"
 *   type="product"
 *   structuredData={{
 *     '@type': 'Product',
 *     name: 'Product Name',
 *     price: '$99'
 *   }}
 * />
 * ```
 */

import { useEffect } from "react";
import { JsonLd } from "./JsonLd.js";
import { OpenGraph } from "./OpenGraph.js";
import type { SEOProps } from "./SEO.types.js";

export function SEO({
  title,
  description,
  canonical,
  image,
  type = "website",
  siteName,
  twitterCard = "summary_large_image",
  twitterHandle,
  locale = "en_US",
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  robots = "index,follow",
  viewport = "width=device-width, initial-scale=1",
  themeColor,
  structuredData,
  additionalMetaTags = [],
  additionalLinkTags = [],
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Create or update meta tags
    const metaTags: Array<{
      name?: string;
      property?: string;
      content: string;
      httpEquiv?: string;
    }> = [
      { name: "description", content: description },
      { name: "robots", content: robots },
      { name: "viewport", content: viewport },
    ];

    if (keywords.length > 0) {
      metaTags.push({ name: "keywords", content: keywords.join(", ") });
    }

    if (author) {
      metaTags.push({ name: "author", content: author });
    }

    if (themeColor) {
      metaTags.push({ name: "theme-color", content: themeColor });
    }

    // Twitter tags
    metaTags.push({ name: "twitter:card", content: twitterCard });
    metaTags.push({ name: "twitter:title", content: title });
    metaTags.push({ name: "twitter:description", content: description });

    if (twitterHandle) {
      metaTags.push({ name: "twitter:site", content: twitterHandle });
      metaTags.push({ name: "twitter:creator", content: twitterHandle });
    }

    if (image) {
      metaTags.push({ name: "twitter:image", content: image });
    }

    // Article-specific tags
    if (type === "article") {
      if (publishedTime) {
        metaTags.push({
          property: "article:published_time",
          content: publishedTime,
        });
      }
      if (modifiedTime) {
        metaTags.push({
          property: "article:modified_time",
          content: modifiedTime,
        });
      }
      if (author) {
        metaTags.push({ property: "article:author", content: author });
      }
    }

    // Add additional meta tags
    metaTags.push(...additionalMetaTags);

    // Update or create meta tags
    for (const tag of metaTags) {
      const selector = tag.name
        ? `meta[name="${tag.name}"]`
        : tag.property
          ? `meta[property="${tag.property}"]`
          : null;

      if (selector) {
        let element = document.querySelector(selector);
        if (!element) {
          element = document.createElement("meta");
          if (tag.name) element.setAttribute("name", tag.name);
          if (tag.property) element.setAttribute("property", tag.property);
          if (tag.httpEquiv) element.setAttribute("http-equiv", tag.httpEquiv);
          document.head.appendChild(element);
        }
        element.setAttribute("content", tag.content);
      }
    }

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Add additional link tags
    for (const linkTag of additionalLinkTags) {
      let link = document.querySelector(`link[rel="${linkTag.rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", linkTag.rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", linkTag.href);
      if (linkTag.sizes) link.setAttribute("sizes", linkTag.sizes);
      if (linkTag.type) link.setAttribute("type", linkTag.type);
      if (linkTag.hreflang) link.setAttribute("hreflang", linkTag.hreflang);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on cleanup to avoid flickering
      // They will be updated if SEO component remounts with different props
    };
  }, [
    title,
    description,
    canonical,
    image,
    type,
    twitterCard,
    twitterHandle,
    keywords,
    author,
    publishedTime,
    modifiedTime,
    robots,
    viewport,
    themeColor,
    additionalMetaTags,
    additionalLinkTags,
  ]);

  return (
    <>
      {/* OpenGraph tags */}
      <OpenGraph
        title={title}
        description={description}
        url={canonical}
        image={image}
        type={type}
        siteName={siteName}
        locale={locale}
      />

      {/* Structured data */}
      {structuredData && <JsonLd data={structuredData} />}
    </>
  );
}
