"use client";

import { useRef, useState } from "react";
import { routePath, islandPath, stops, type Stop } from "@/content/routes";
import { gsap, useGSAP, NO_REDUCED } from "@/lib/gsap";

export default function RouteMap() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Stop | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED, () => {
        // Why: the line drawing as you scroll shows the order of the trip, and the dot shows where you are on it.
        const st = { trigger: root.current, start: "top 60%", end: "bottom 70%", scrub: 0.6 };
        gsap.fromTo("#route-line", { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", scrollTrigger: st });
        gsap.to("#route-dot", {
          ease: "none",
          motionPath: { path: "#route-line", align: "#route-line", alignOrigin: [0.5, 0.5] },
          scrollTrigger: st,
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="on-dark bg-tea px-6 py-24 text-bone md:px-12 md:py-40" aria-labelledby="map-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="map-title" className="font-display text-h2 leading-[1]">One line,<br />six stops</h2>
          <p className="mt-6 max-w-[38ch]">A sample route. Pick a stop to see why it&apos;s on the line. Yours will look different.</p>
          <div aria-live="polite" className="mt-8 min-h-28 border-t border-bone/30 pt-6">
            {active ? (
              <>
                <p className="font-display text-3xl">{active.name}</p>
                <p className="mt-2 max-w-[34ch]">{active.note}</p>
              </>
            ) : (
              <p className="opacity-80">No stop selected.</p>
            )}
          </div>
        </div>

        <div className="relative mx-auto aspect-[400/700] w-full max-w-md">
          <svg viewBox="0 0 400 700" className="absolute inset-0 h-full w-full" role="img" aria-label="Stylised map of Sri Lanka with a route through six stops">
            <path d={islandPath} fill="#27323b" stroke="#d9a441" strokeOpacity="0.4" strokeWidth="1.5" />
            <path id="route-line" d={routePath} fill="none" stroke="#d9a441" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle id="route-dot" r="7" fill="#f6f0e4" />
          </svg>
          {stops.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(s)}
              aria-pressed={active?.name === s.name}
              aria-label={`${s.name}: ${s.note}`}
              style={{ left: `${(s.x / 400) * 100}%`, top: `${(s.y / 700) * 100}%` }}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <span className={`block h-3.5 w-3.5 rounded-full border-2 border-gold-light ${active?.name === s.name ? "bg-gold-light" : "bg-tea"}`} />
              <span className="pointer-events-none absolute left-9 whitespace-nowrap text-sm">{s.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
