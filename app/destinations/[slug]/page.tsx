import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/ui/Photo";
import Footer from "@/components/sections/Footer";
import { destinations, getDestination } from "@/content/destinations";
import { resolveMedia } from "@/lib/media";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  return d ? { title: d.name, description: d.line } : {};
}

export default async function Destination({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const { photos } = resolveMedia();
  return (
    <>
      <main id="main">
        <section className="on-dark relative flex min-h-[80svh] items-end bg-ink text-bone">
          <Photo m={photos[d.media]} priority />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="relative p-6 pb-16 md:p-12 md:pb-20">
            <p className="text-sm uppercase tracking-widest text-gold-light">{d.region}</p>
            <h1 className="font-display text-display leading-[0.95]">{d.name}</h1>
          </div>
        </section>
        <section className="grid gap-10 px-6 py-24 md:grid-cols-[1fr_1fr] md:px-12">
          <p className="font-display text-h2 leading-[1.1]">{d.line}</p>
          <div>
            <p className="max-w-prose">{d.body}</p>
            <ul className="mt-8 border-t border-ink/20 pt-4">{d.stops.map((s) => <li key={s}>{s}</li>)}</ul>
            <Link href="/plan" className="mt-10 inline-block rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-ink">Plan my journey</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
