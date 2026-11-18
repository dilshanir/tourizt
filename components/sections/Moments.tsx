"use client";

import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import type { ResolvedMedia } from "@/lib/media";
import { gsap, useGSAP, NO_REDUCED } from "@/lib/gsap";

// Layout, depth (parallax speed) and caption per tile. Literal class strings for Tailwind.
// Two even rows of three. The middle column sits lower for rhythm; depth comes from the parallax speed.
const tiles = [
  { id: "m1", cls: "col-span-6 md:col-span-4 aspect-[4/5]", speed: -6, cap: "Stilt fishermen, south coast" },
  { id: "m2", cls: "col-span-6 md:col-span-4 aspect-[4/5] md:mt-16", speed: 6, cap: "The line to Ella" },
  { id: "m3", cls: "col-span-6 md:col-span-4 aspect-[4/5]", speed: -8, cap: "Waterfall in the hill country" },
  { id: "m4", cls: "col-span-6 md:col-span-4 aspect-[4/5]", speed: 8, cap: "Elephants in the river" },
  { id: "m5", cls: "col-span-6 md:col-span-4 aspect-[4/5] md:mt-16", speed: -6, cap: "Boats pulled up for the day" },
  { id: "m6", cls: "col-span-12 md:col-span-4 aspect-[4/5]", speed: 6, cap: "Stone, forest, rails" },
] as const;

export default function Moments({ photos }: { photos: Record<string, ResolvedMedia> }) {
  const root = useRef<HTMLElement>(null);
  const cap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED, () => {
        // Why: tiles drift at different speeds, which gives the page depth without hiding anything.
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          gsap.fromTo(el.firstElementChild, { yPercent: -Number(el.dataset.speed) }, {
            yPercent: Number(el.dataset.speed), ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (fine.matches) {
        const x = gsap.quickTo(cap.current, "x", { duration: 0.4, ease: "power3.out" });
        const y = gsap.quickTo(cap.current, "y", { duration: 0.4, ease: "power3.out" });
        const move = (e: PointerEvent) => { x(e.clientX + 16); y(e.clientY + 16); };
        window.addEventListener("pointermove", move);
        return () => { window.removeEventListener("pointermove", move); mm.revert(); };
      }
      return () => mm.revert();
    },
    { scope: root },
  );

  const show = (text: string | null) => {
    if (!cap.current) return;
    cap.current.textContent = text ?? "";
    cap.current.style.opacity = text ? "1" : "0";
  };

  return (
    <section ref={root} className="px-6 py-24 md:px-12 md:py-40" aria-labelledby="moments-title">
      <h2 id="moments-title" className="mb-12 max-w-[16ch] font-display text-h2 leading-none md:ml-[40%]">Small things we plan around</h2>
      <div className="grid grid-cols-12 items-start gap-4 md:gap-6">
        {tiles.map((t) => (
          <figure
            key={t.id}
            data-speed={t.speed}
            onPointerEnter={() => show(t.cap)}
            onPointerLeave={() => show(null)}
            className={`${t.cls} relative overflow-hidden rounded-sm`}
          >
            <div className="absolute -inset-[10%]">
              <Photo m={photos[t.id]} sizes="(min-width:768px) 40vw, 100vw" />
            </div>
            <figcaption className="absolute bottom-0 left-0 bg-ink/70 px-3 py-1 text-sm text-bone md:hidden">{t.cap}</figcaption>
          </figure>
        ))}
      </div>
      <div ref={cap} aria-hidden="true" style={{ opacity: 0 }} className="pointer-events-none fixed left-0 top-0 z-[65] hidden rounded-sm bg-ink px-3 py-1 text-sm text-bone md:block" />
    </section>
  );
}
