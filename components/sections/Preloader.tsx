"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSkipPreloader } from "@/lib/useMedia";

const KEY = "tz-seen";
const READY = "tz:ready";

function markReady() {
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event(READY));
}

/**
 * Why: a short dark tint covers the real load (fonts + hero image) so the page never shows half-built.
 * No counter and no line art.
 * Capped at 2s, skippable, skipped on repeat visits and for reduced motion.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setGone] = useState(false);
  const skip = useSkipPreloader(KEY);
  const gone = done || skip;

  useEffect(() => {
    if (skip) { markReady(); return; }

    const state = { p: 0 };
    let loaded = 0;
    const need = 2;
    let finished = false;
    const bump = () => { loaded += 1; };

    document.fonts?.ready.then(bump).catch(bump);
    const hero = document.querySelector<HTMLImageElement>("[data-hero-media] img");
    if (!hero || hero.complete) bump();
    else { hero.addEventListener("load", bump, { once: true }); hero.addEventListener("error", bump, { once: true }); }

    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
      gsap.to(root.current, {
        opacity: 0, duration: 0.6, ease: "power2.inOut",
        onComplete: () => { setGone(true); markReady(); },
      });
    };

    const t0 = performance.now();
    const tick = () => {
      const real = loaded / need;
      const timeCap = Math.min((performance.now() - t0) / 2000, 1);
      const target = Math.max(real, timeCap * 0.9);
      state.p += (target - state.p) * 0.12;
      if ((loaded >= need && state.p > 0.97) || performance.now() - t0 > 2000) {
        gsap.ticker.remove(tick);
        finish();
      }
    };
    gsap.ticker.add(tick);
    const skipNow = () => { gsap.ticker.remove(tick); finish(); };
    root.current?.querySelector("button")?.addEventListener("click", skipNow);
    return () => gsap.ticker.remove(tick);
  }, [skip]);

  if (gone) return null;
  return (
    <div id="preloader" ref={root} className="on-dark fixed inset-0 z-[80] flex items-end bg-ink/45 p-6 text-bone md:p-12" role="status" aria-label="Loading">
      <div className="relative flex w-full items-end justify-end">
        <button type="button" className="min-h-11 text-sm uppercase tracking-widest underline underline-offset-8">
          Skip
        </button>
      </div>
      <noscript><style>{`#preloader{display:none}`}</style></noscript>
    </div>
  );
}
