import { useEffect } from "react";
import { SITE_CONFIG } from "@/lib/seo-config";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[] | string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SEO({
  title,
  description = SITE_CONFIG.description,
  canonical,
  keywords,
  ogType = "website",
  ogImage = SITE_CONFIG.defaultOgImage,
  noindex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title
      ? `${title} | ${SITE_CONFIG.name}`
      : SITE_CONFIG.title;
    document.title = formattedTitle;

    // Helper function to update or create meta tags
    const setMetaTag = (
      attributeName: "name" | "property",
      attributeValue: string,
      content: string
    ) => {
      let element = document.querySelector(
        `meta[${attributeName}="${attributeValue}"]`
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper function to update or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Primary Meta Tags
    setMetaTag("name", "description", description);
    
    const keywordsContent = Array.isArray(keywords)
      ? keywords.join(", ")
      : keywords || SITE_CONFIG.keywords.join(", ");
    setMetaTag("name", "keywords", keywordsContent);

    setMetaTag(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 3. Canonical URL
    const canonicalUrl = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${SITE_CONFIG.siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
      : window.location.href;
    setLinkTag("canonical", canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", `${SITE_CONFIG.name} Portfolio`);

    // 5. Twitter Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. JSON-LD Schema
    const scriptId = "dynamic-seo-schema";
    const existingScript = document.getElementById(scriptId);

    if (schema) {
      const scriptElement = existingScript || document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.setAttribute("type", "application/ld+json");
      scriptElement.textContent = JSON.stringify(schema);
      if (!existingScript) {
        document.head.appendChild(scriptElement);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [title, description, canonical, keywords, ogType, ogImage, noindex, schema]);

  return null;
}
