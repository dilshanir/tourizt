import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/ui/Photo";
import Footer from "@/components/sections/Footer";
import { journeys, getJourney, priceLabel } from "@/content/journeys";
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
            <p className="mt-8 text-sm">{priceLabel(j)}. Every journey is rebuilt around your dates, pace and who&apos;s coming.</p>
            <Link href="/plan" className="mt-8 inline-block rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-ink">Plan my journey</Link>
          </div>
        </section>
        <section className="border-t border-ink/20 px-6 py-24 md:px-12" aria-labelledby="plan-title">
          <h2 id="plan-title" className="font-display text-h2 leading-none">The days</h2>
          <ol className="mt-12 space-y-10">
            {j.plan.map((l) => (
              <li key={l.when} className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-10">
                <p className="text-sm uppercase tracking-widest text-laterite">{l.when}</p>
                <div>
                  <h3 className="font-display text-3xl">{l.title}</h3>
                  <p className="mt-2 max-w-prose">{l.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
