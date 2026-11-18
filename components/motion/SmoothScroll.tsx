"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Why: Lenis gives the slow, weighted scroll that fits an unhurried brand.
 * It is off entirely when the visitor prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      tick = null;
    };

    const apply = () => (mq.matches ? stop() : start());
    apply();
    mq.addEventListener("change", apply);

    return () => {
      mq.removeEventListener("change", apply);
      stop();
    };
  }, []);

  return null;
}
