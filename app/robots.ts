import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/design-preview"] },
    sitemap: `${seoConfig.origin}/sitemap.xml`,
  };
}
