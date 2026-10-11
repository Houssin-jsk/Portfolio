import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Add published pages here, with genuine editorial modification dates only.
  return [{ url: `${seoConfig.origin}/`, changeFrequency: "monthly", priority: 1 }];
}
