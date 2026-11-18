"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, NO_REDUCED } from "@/lib/gsap";
import { site } from "@/content/site";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED, () => {
        // Why: the wordmark rising into place closes the page like a film title card.
        gsap.fromTo("[data-wordmark]", { yPercent: 100 }, {
          yPercent: 0, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom bottom", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="on-dark overflow-hidden bg-ink px-6 pt-24 text-bone md:px-12">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="max-w-[18ch] font-display text-h2 leading-[1.05]">Tell us when, and who&apos;s coming.</p>
          <Link href={site.primaryCta.href} className="mt-8 inline-block rounded-sm bg-laterite px-7 py-4 hover:bg-bone hover:text-ink">{site.primaryCta.label}</Link>
        </div>
        <div className="space-y-4 md:justify-self-end">
          {site.contact ? (
            <p>{site.contact.email}</p>
          ) : (
            <p className="max-w-[30ch] text-sm opacity-80">Send us an enquiry and we&apos;ll reply by email with a first sketch of a route.</p>
          )}
          <ul className="flex gap-6 text-sm uppercase tracking-widest">
            <li><Link href="/about" className="hover:text-gold-light">About</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-light">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-20 overflow-hidden">
        <p data-wordmark aria-hidden="true" className="font-display text-[22vw] leading-[0.8] tracking-tight">{site.name}</p>
      </div>
    </footer>
  );
}
