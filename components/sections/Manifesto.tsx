"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, NO_REDUCED } from "@/lib/gsap";

const TEXT =
  "We don't sell tours. We plan days. A long breakfast, one good ruin, a train you can sit on the right side of, and nobody herding you back to the bus. Fewer stops, more time in each. That's the whole idea.";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED, () => {
        // Why: words light up with your scroll, so reading pace and scroll pace match.
        gsap.fromTo("[data-m]", { opacity: 0.2 }, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true },
        });
        return () => ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-6 py-32 md:px-12 md:py-48" aria-label="Our approach">
      <p className="max-w-[28ch] font-display text-h2 leading-[1.1] md:ml-[12%] md:max-w-[34ch]">
        {TEXT.split(" ").map((w, i) => (
          <span key={i} data-m className="inline-block pr-[0.25em]">{w}</span>
        ))}
      </p>
    </section>
  );
}
