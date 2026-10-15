import { useEffect } from "react";

const SITE_URL = "https://letconvo.live";

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attribute).forEach(([key, attributeValue]) => element.setAttribute(key, attributeValue));
  element.setAttribute("content", value);
}

export default function SeoMeta({ title, description, path, schema, noindex = false }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;
    document.title = title;
    setMeta('meta[name="robots"]', { name: "robots" }, noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    setMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "Letconvo AI");
    setMeta('meta[property="og:image"]', { property: "og:image" }, `${SITE_URL}/logo512.png`);
    setMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary");
    setMeta('meta[name="twitter:image"]', { name: "twitter:image" }, `${SITE_URL}/logo512.png`);
    setMeta('meta[name="description"]', { name: "description" }, description);
    setMeta('meta[property="og:title"]', { property: "og:title" }, title);
    setMeta('meta[property="og:description"]', { property: "og:description" }, description);
    setMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    let structuredData = document.head.querySelector("script[data-letconvo-seo]");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.letconvoSeo = "true";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema || {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
    });
  }, [title, description, path, schema, noindex]);

  return null;
}
