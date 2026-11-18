import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";
import { articles } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/plan", "/about", "/privacy", ...destinations.map((d) => `/destinations/${d.slug}`), ...journeys.map((j) => `/journeys/${j.slug}`), ...articles.map((a) => `/journal/${a.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
