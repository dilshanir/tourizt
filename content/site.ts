export const site = {
  name: "Tourizt",
  // PLACEHOLDER: replace with the real live URL before SEO / launch. Never invent one.
  url: "https://example.com",
  urlIsPlaceholder: true,
  locale: "en",
  description:
    "Tourizt plans slow, private journeys across Sri Lanka: the coast, the tea hills, the old cities and the wild south.",
  primaryCta: { label: "Plan my journey", href: "/plan" },
  // Real contact details not supplied yet. null = the footer points to the enquiry form instead.
  contact: null as null | { email: string; phone?: string },
  nav: [
    { label: "Destinations", href: "/#destinations" },
    { label: "Journeys", href: "/#journeys" },
    { label: "Journal", href: "/#journal" },
    { label: "About", href: "/about" },
  ],
} as const;
