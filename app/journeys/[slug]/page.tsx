import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/ui/Photo";
import Footer from "@/components/sections/Footer";
import { journeys, getJourney } from "@/content/journeys";
import { resolveMedia } from "@/lib/media";

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journeys/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const j = getJourney(slug);
  return j ? { title: j.name, description: j.summary } : {};
}

export default async function Journey({ params }: PageProps<"/journeys/[slug]">) {
  const { slug } = await params;
  const j = getJourney(slug);
  if (!j) notFound();
  const { photos } = resolveMedia();
  return (
    <>
      <main id="main">
        <section className="on-dark relative flex min-h-[70svh] items-end bg-ink text-bone">
          <Photo m={photos[j.media]} priority />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="relative p-6 pb-16 md:p-12 md:pb-20">
            <p className="text-sm uppercase tracking-widest text-gold-light">{j.days} days · sample journey</p>
            <h1 className="font-display text-display leading-[0.95]">{j.name}</h1>
          </div>
        </section>
        <section className="grid gap-10 px-6 py-24 md:grid-cols-2 md:px-12">
          <p className="font-display text-h2 leading-[1.1]">{j.summary}</p>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-laterite">Highlights</h2>
            <ul className="mt-4 space-y-2">{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <p className="mt-8 text-sm">{j.fromPrice ?? "From price to be confirmed."} Day-by-day detail is added once the studio supplies its itineraries.</p>
            <Link href="/plan" className="mt-8 inline-block rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-ink">Plan my journey</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
