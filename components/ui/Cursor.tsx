"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMedia } from "@/lib/useMedia";

/**
 * Why: tells the visitor what a hover will do (view / drag / hold). Fine pointers only, off for reduced motion.
 * Elements opt in with data-cursor="view|hold|drag".
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const on = useMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

  useEffect(() => {
    if (!on || !dot.current) return;
    const el = dot.current;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    gsap.set(el, { opacity: 0 }); // hidden until the mouse first moves, so no dot sits in the corner
    const move = (e: PointerEvent) => {
      if (el.style.opacity === "0") gsap.set(el, { opacity: 1, x: e.clientX, y: e.clientY });
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const kind = t?.dataset.cursor ?? "";
      if (label.current) label.current.textContent = kind;
      gsap.to(el.firstElementChild, { scale: kind ? 4.2 : 1, duration: 0.3, ease: "power2.out", overwrite: true });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [on]);

  if (!on) return null;
  return (
    <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[70]">
      <div className="-ml-1.5 -mt-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-laterite mix-blend-normal">
        <span ref={label} className="text-[3px] font-medium uppercase leading-none tracking-wider text-bone" />
      </div>
    </div>
  );
}
