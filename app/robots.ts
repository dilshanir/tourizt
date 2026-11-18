import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// While the URL is a placeholder, block crawlers so a preview deployment is never indexed.
export default function robots(): MetadataRoute.Robots {
  if (site.urlIsPlaceholder) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
