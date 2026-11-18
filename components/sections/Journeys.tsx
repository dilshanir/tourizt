import Link from "next/link";
import Photo from "@/components/ui/Photo";
import type { ResolvedMedia } from "@/lib/media";
import { journeys, priceLabel } from "@/content/journeys";

// A clean, readable list. Every card stays fully visible; photo side alternates for rhythm.
export default function Journeys({ photos }: { photos: Record<string, ResolvedMedia> }) {
  return (
    <section id="journeys" className="bg-sand px-6 py-24 md:px-12 md:py-40" aria-labelledby="j-title">
      <div className="mb-16 grid gap-6 lg:grid-cols-2">
        <h2 id="j-title" className="font-display text-h2 leading-none">Starting points</h2>
        <p className="max-w-[40ch] lg:justify-self-end">Four sample journeys. None are fixed. We rebuild them around your dates, pace and who&apos;s coming.</p>
      </div>
      <ul className="space-y-10 md:space-y-16">
        {journeys.map((j, i) => (
          <li key={j.slug} className="overflow-hidden rounded-sm bg-bone lg:grid lg:grid-cols-2">
            <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[28rem] ${i % 2 ? "lg:order-2" : ""}`}>
              <Photo m={photos[j.media]} sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
              <div>
                <p className="text-sm uppercase tracking-widest text-laterite">{j.days} days</p>
                <h3 className="mt-2 font-display text-4xl md:text-5xl">{j.name}</h3>
                <p className="mt-4 max-w-[40ch]">{j.summary}</p>
                <ul className="mt-6 space-y-1 border-t border-ink/20 pt-4">
                  {j.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm">{priceLabel(j)}</p>
                <Link href={`/journeys/${j.slug}`} className="shrink-0 whitespace-nowrap rounded-sm bg-ink px-5 py-3 text-bone hover:bg-laterite">See the days</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
