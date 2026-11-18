import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/plan", "/about", "/privacy", ...destinations.map((d) => `/destinations/${d.slug}`), ...journeys.map((j) => `/journeys/${j.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
