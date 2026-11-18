import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About", description: site.description };

export default function About() {
  return (
    <>
      <main id="main" className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <h1 className="font-display text-display leading-[0.95]">About {site.name}</h1>
        <p className="mt-10 max-w-prose">{site.description}</p>
        <p className="mt-6 max-w-prose border border-dashed border-ink/40 p-4 text-sm">Placeholder: the team, the story and the studio&apos;s details are written once the client supplies and approves them.</p>
      </main>
      <Footer />
    </>
  );
}
