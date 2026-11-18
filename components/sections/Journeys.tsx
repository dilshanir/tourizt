"use client";

import Link from "next/link";
import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import type { ResolvedMedia } from "@/lib/media";
import { journeys, priceLabel } from "@/content/journeys";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";

// Full literal strings: each card sticks slightly lower than the one before.
const tops = ["lg:top-24", "lg:top-36", "lg:top-48", "lg:top-60"];

export default function Journeys({ photos }: { photos: Record<string, ResolvedMedia> }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        // Why: each card settles back as the next one lands, so the stack reads as a deck you are working through.
        const cards = gsap.utils.toArray<HTMLElement>("[data-jcard]");
        cards.forEach((c, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(c, { scale: 0.94, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 25%", scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="journeys" ref={root} className="bg-sand px-6 py-24 md:px-12 md:py-40" aria-labelledby="j-title">
      <div className="mb-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <h2 id="j-title" className="font-display text-h2 leading-none">Starting points</h2>
        <p className="max-w-[40ch] lg:justify-self-end">Four sample journeys. None are fixed. We rebuild them around your dates, pace and who&apos;s coming.</p>
      </div>
      <ul className="space-y-8">
        {journeys.map((j, i) => (
          <li key={j.slug} data-jcard className={`${tops[i % 4]} sticky top-20 origin-top overflow-hidden rounded-sm bg-bone lg:grid lg:min-h-[60vh] lg:grid-cols-[1.1fr_1fr]`}>
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Photo m={photos[j.media]} sizes="(min-width:1024px) 55vw, 100vw" />
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
