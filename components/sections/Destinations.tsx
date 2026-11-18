"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import type { ResolvedMedia } from "@/lib/media";
import { destinations, type Destination } from "@/content/destinations";
import { gsap, Flip, ScrollTrigger, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";

const HOLD_MS = 600;
// Uneven widths for rhythm. Full literal class strings.
const widths = ["lg:w-[34vw]", "lg:w-[42vw]", "lg:w-[30vw]", "lg:w-[38vw]"];
const offsets = ["lg:mt-0", "lg:mt-24", "lg:mt-8", "lg:mt-32"];

export default function Destinations({ photos }: { photos: Record<string, ResolvedMedia> }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState<Destination | null>(null);
  const holdTimer = useRef<number | null>(null);
  const held = useRef(false);
  const cardEl = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        // Why: the sideways scroll turns a list of places into a short walk between them.
        const t = track.current!;
        const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
        gsap.to(t, {
          x: () => -dist(), ease: "none",
          scrollTrigger: { trigger: root.current, pin: true, scrub: 0.8, end: () => `+=${dist()}`, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const beginHold = (slug: string) => {
    held.current = false;
    holdTimer.current = window.setTimeout(() => { held.current = true; router.push(`/destinations/${slug}`); }, HOLD_MS);
  };
  const endHold = () => { if (holdTimer.current) window.clearTimeout(holdTimer.current); };

  const expand = (d: Destination, card: HTMLElement) => {
    if (held.current) return;
    cardEl.current = card;
    setOpen(d);
    requestAnimationFrame(() => {
      const img = card.querySelector<HTMLElement>("[data-card-img]");
      if (!img || !frame.current || !overlay.current) return;
      overlay.current.style.visibility = "visible";
      const reduced = !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      if (reduced) { gsap.set(frame.current, { clearProps: "all" }); return; }
      // Why: the image grows from its card to full screen, so the detail feels like the same object, not a new page.
      Flip.fit(frame.current, img, { scale: true });
      gsap.to(frame.current, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: "power3.inOut" });
      gsap.fromTo("[data-detail]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, delay: 0.55, duration: 0.5, ease: "power2.out" });
      overlay.current.querySelector<HTMLElement>("button")?.focus();
    });
  };

  const close = () => {
    const img = cardEl.current?.querySelector<HTMLElement>("[data-card-img]");
    const done = () => { if (overlay.current) overlay.current.style.visibility = "hidden"; setOpen(null); cardEl.current?.querySelector("button")?.focus(); };
    const reduced = !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (reduced || !img || !frame.current) return done();
    gsap.to("[data-detail]", { opacity: 0, duration: 0.2 });
    Flip.fit(frame.current, img, { scale: true, duration: 0.6, ease: "power3.inOut", onComplete: done });
  };

  return (
    <section id="destinations" ref={root} className="relative overflow-hidden lg:h-screen" aria-labelledby="dest-title">
      <div className="flex h-full flex-col px-6 pb-24 pt-24 md:px-12 lg:pb-12 lg:pt-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="dest-title" className="font-display text-h2 leading-none">Four ways in</h2>
          <p className="hidden max-w-[22ch] text-sm lg:block">Click to look closer. Hold to go straight in.</p>
        </div>

        <div ref={track} className="flex flex-col gap-10 lg:flex-1 lg:flex-row lg:items-start lg:gap-12 lg:will-change-transform">
          {destinations.map((d, i) => (
            <article key={d.slug} className={`${widths[i % 4]} ${offsets[i % 4]} shrink-0`}>
              <button
                type="button"
                data-cursor="view"
                aria-label={`${d.name}: ${d.region}. Open details`}
                onClick={(e) => expand(d, e.currentTarget.closest("article") as HTMLElement)}
                onPointerDown={() => beginHold(d.slug)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                className="group block w-full text-left"
              >
                <div data-card-img className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:aspect-auto lg:h-[56vh]">
                  <Photo m={photos[d.media]} sizes="(min-width:1024px) 40vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-3xl">{d.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-widest text-laterite">{d.region}</p>
                <p className="mt-2 max-w-[34ch]">{d.line}</p>
              </button>
            </article>
          ))}
        </div>
      </div>

      <div
        ref={overlay}
        style={{ visibility: "hidden" }}
        role="dialog"
        aria-modal="true"
        aria-label={open ? `${open.name} details` : "Destination details"}
        className="on-dark fixed inset-0 z-[55] text-bone"
        onKeyDown={(e) => e.key === "Escape" && close()}
      >
        <div ref={frame} className="absolute inset-0 origin-top-left overflow-hidden bg-ink">
          {open && <Photo m={photos[open.media]} priority sizes="100vw" />}
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        {open && (
          <div data-detail className="relative flex h-full flex-col justify-end gap-6 p-6 pb-16 md:p-12 md:pb-20">
            <button type="button" onClick={close} className="absolute right-6 top-24 min-h-11 text-sm uppercase tracking-widest underline underline-offset-8 md:right-12">
              Close
            </button>
            <p className="text-sm uppercase tracking-widest text-gold-light">{open.region}</p>
            <h3 className="font-display text-display leading-[0.95]">{open.name}</h3>
            <p className="max-w-xl">{open.body}</p>
            <Link href={`/destinations/${open.slug}`} className="inline-block self-start rounded-sm bg-laterite px-7 py-4">
              See the full page
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Keep ScrollTrigger imported so tree-shaking keeps the plugin registered here.
void ScrollTrigger;
