"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSkipPreloader } from "@/lib/useMedia";
import { routePath } from "@/content/routes";

const KEY = "tz-seen";
const READY = "tz:ready";

function markReady() {
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event(READY));
}

/**
 * Why: covers the real load (fonts + hero image) with the route line drawing in, so the wait shows the brand idea.
 * Capped at 2s, skippable, skipped on repeat visits and for reduced motion.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setGone] = useState(false);
  const [count, setCount] = useState(0);
  const skip = useSkipPreloader(KEY);
  const gone = done || skip;

  useEffect(() => {
    if (skip) { markReady(); return; }

    const path = root.current?.querySelector<SVGPathElement>("path");
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
        yPercent: -100, duration: 0.6, ease: "power3.inOut",
        onComplete: () => { setGone(true); markReady(); },
      });
    };

    const t0 = performance.now();
    const tick = () => {
      const real = loaded / need;
      const timeCap = Math.min((performance.now() - t0) / 2000, 1);
      const target = Math.max(real, timeCap * 0.9);
      state.p += (target - state.p) * 0.12;
      if (path) gsap.set(path, { drawSVG: `0% ${Math.round(state.p * 100)}%` });
      setCount(Math.round(state.p * 100));
      if ((loaded >= need && state.p > 0.97) || performance.now() - t0 > 2000) {
        gsap.ticker.remove(tick);
        if (path) gsap.set(path, { drawSVG: "0% 100%" });
        setCount(100);
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
    <div id="preloader" ref={root} className="fixed inset-0 z-[80] flex items-end bg-bone p-6 md:p-12" role="status" aria-label="Loading">
      <svg viewBox="0 0 400 700" className="absolute inset-y-0 right-0 h-full w-auto max-w-full opacity-90" aria-hidden="true">
        <path d={routePath} fill="none" stroke="#9c3f25" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="relative flex w-full items-end justify-between">
        <span className="font-display text-7xl tabular-nums md:text-9xl">{count}</span>
        <button type="button" className="min-h-11 text-sm uppercase tracking-widest underline underline-offset-8">
          Skip
        </button>
      </div>
      <noscript><style>{`#preloader{display:none}`}</style></noscript>
    </div>
  );
}
