import type { Metadata } from "next";
import { seoConfig } from "@/config/seo";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  language?: "en" | "fr";
};

// Use only for pages that actually exist. No hreflang or translation routes are
// advertised until corresponding content has been published.
export function createPageMetadata({ title, description, path, language = seoConfig.defaultLanguage }: PageMetadata): Metadata {
  if (!path.startsWith("/") || path.startsWith("//") || /[?#\\]/.test(path)) {
    throw new Error("SEO paths must be local, absolute paths without queries or fragments.");
  }
  const canonical = new URL(path, seoConfig.origin);
  if (canonical.origin !== seoConfig.origin) throw new Error("Invalid canonical origin.");
  return {
    title,
    description,
    metadataBase: new URL(seoConfig.origin),
    alternates: { canonical: canonical.href },
    openGraph: {
      title, description, url: canonical.href, type: "website",
      siteName: seoConfig.brand, locale: language === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary", title, description },
  };
}

export function homepageStructuredData() {
  const homepage = `${seoConfig.origin}/`;
  const personId = `${homepage}#person`;
  const websiteId = `${homepage}#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person", "@id": personId,
        name: seoConfig.name, url: homepage,
        sameAs: [seoConfig.social.github],
        knowsAbout: [...seoConfig.focus],
        mainEntityOfPage: { "@id": websiteId },
      },
      {
        "@type": "WebSite", "@id": websiteId,
        name: seoConfig.brand, url: homepage,
        description: seoConfig.site.description,
        inLanguage: seoConfig.defaultLanguage,
        author: { "@id": personId },
        about: { "@id": personId },
      },
    ],
  };
}
