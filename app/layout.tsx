import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Header from "@/components/ui/Header";
import Cursor from "@/components/ui/Cursor";
import { site } from "@/content/site";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: slow, private journeys in Sri Lanka`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

// TravelAgency JSON-LD. No ratings or reviews. URL is omitted until the real one is set.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  description: site.description,
  ...(site.urlIsPlaceholder ? {} : { url: site.url }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.locale} suppressHydrationWarning className={`${fraunces.variable} ${hanken.variable} antialiased`}>
      <body className="grain min-h-screen">
        <a href="#main" className="absolute left-4 top-4 z-[90] -translate-y-24 rounded-sm bg-ink px-4 py-2 text-bone focus:translate-y-0">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Runs before first paint: marks JS as available so the hero intro can pre-hide. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");`,
          }}
        />
        <SmoothScroll />
        <Cursor />
        <Header />
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
