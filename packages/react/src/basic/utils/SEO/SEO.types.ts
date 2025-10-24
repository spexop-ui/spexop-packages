/**
 * SEO Component Types
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

export interface SEOProps {
  /**
   * Page title
   */
  title: string;

  /**
   * Page description
   */
  description: string;

  /**
   * Canonical URL
   */
  canonical?: string;

  /**
   * OG image URL
   */
  image?: string;

  /**
   * Page type
   * @default 'website'
   */
  type?: "website" | "article" | "product" | "profile";

  /**
   * Site name
   */
  siteName?: string;

  /**
   * Twitter card type
   * @default 'summary_large_image'
   */
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";

  /**
   * Twitter handle
   */
  twitterHandle?: string;

  /**
   * Locale
   * @default 'en_US'
   */
  locale?: string;

  /**
   * Keywords
   */
  keywords?: string[];

  /**
   * Author
   */
  author?: string;

  /**
   * Published time (ISO 8601)
   */
  publishedTime?: string;

  /**
   * Modified time (ISO 8601)
   */
  modifiedTime?: string;

  /**
   * Robots meta tag
   * @default 'index,follow'
   */
  robots?: string;

  /**
   * Viewport meta tag
   * @default 'width=device-width, initial-scale=1'
   */
  viewport?: string;

  /**
   * Theme color
   */
  themeColor?: string;

  /**
   * Structured data (JSON-LD)
   */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];

  /**
   * Additional meta tags
   */
  additionalMetaTags?: MetaTag[];

  /**
   * Additional link tags
   */
  additionalLinkTags?: LinkTag[];
}

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
  httpEquiv?: string;
}

export interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  hreflang?: string;
}

export interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export interface OpenGraphProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}
