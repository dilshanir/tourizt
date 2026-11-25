"use client";

import Link from "next/link";
import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import type { ResolvedMedia } from "@/lib/media";
import { gsap, useGSAP, NO_REDUCED } from "@/lib/gsap";
import { site } from "@/content/site";

export default function Hero({ poster, video }: { poster: ResolvedMedia; video: string | null }) {
  const root = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED, () => {
        // Video only plays when motion is welcome and data saving is off.
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (vid.current && !saveData) vid.current.play().catch(() => {});

        // Why: the intro text and button fade up on load, after the photo has had the first moment.
        // fromTo gives explicit start AND end values, so a double-run in dev (StrictMode) can't leave a stale offset.
        // Its start state renders immediately, which hides the text again before the CSS pre-hide is released.
        gsap.fromTo("[data-hero-fade]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
        root.current?.classList.remove("hero-pre");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero-pre on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-bone" aria-labelledby="hero-title">
      <div className="absolute inset-0" data-hero-media>
        <Photo m={poster} priority sizes="100vw" />
        {video && (
          <video ref={vid} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="metadata" poster={poster.src ?? undefined} aria-hidden="true">
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
      </div>

      <div className="relative w-full px-6 pb-16 pt-32 md:px-12 md:pb-24">
        <div data-hero-fade className="flex flex-col gap-6 md:max-w-xl">
          <h1 id="hero-title" className="text-[length:var(--text-body)] font-normal leading-relaxed">Slow, private journeys across Sri Lanka, planned by people who have taken the train, climbed the rock early and waited in the jeep.</h1>
          <Link href={site.primaryCta.href} className="inline-block self-start rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-bone hover:text-ink">
            {site.primaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
