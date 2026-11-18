"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, useGSAP, NO_REDUCED } from "@/lib/gsap";
import { site } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const isHome = usePathname() === "/";
  // Why: over the dark hero the bar stays clear; elsewhere a dark bar keeps the white items readable.
  const scrolled = useSyncExternalStore(
    (cb) => { window.addEventListener("scroll", cb, { passive: true }); return () => window.removeEventListener("scroll", cb); },
    () => window.scrollY > 40,
    () => false,
  );
  const overlay = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Why: the clip-path wipe shows the menu rising from the button, so the overlay feels attached to it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED, () => {
        tl.current = gsap
          .timeline({ paused: true })
          .fromTo(overlay.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.inOut" })
          .from("[data-menu-link]", { yPercent: 110, stagger: 0.07, duration: 0.6, ease: "expo.out" }, "-=0.3");
      });
      return () => mm.revert();
    },
    { scope: overlay },
  );

  useEffect(() => {
    const main = document.getElementById("main");
    const el = overlay.current;
    if (!el) return;
    if (open) {
      main?.setAttribute("inert", "");
      el.removeAttribute("inert");
      el.style.visibility = "visible";
      if (tl.current) tl.current.play();
      el.querySelector<HTMLElement>("a")?.focus();
    } else {
      main?.removeAttribute("inert");
      el.setAttribute("inert", "");
      if (tl.current) tl.current.reverse().then(() => { if (el) el.style.visibility = "hidden"; });
      else el.style.visibility = "hidden";
    }
    const key = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const f = [toggle.current, ...Array.from(el.querySelectorAll<HTMLElement>("a"))].filter(Boolean) as HTMLElement[];
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white transition-colors duration-300 md:px-12 ${
        open || (isHome && !scrolled) ? "bg-transparent" : "bg-ink"
      }`}
    >
      <Link href="/" className="font-display text-2xl tracking-tight" onClick={() => setOpen(false)}>
        {site.name}
      </Link>
      <div className="flex items-center gap-6">
        <Link href={site.primaryCta.href} className="hidden text-sm uppercase tracking-widest underline-offset-8 hover:underline sm:inline">
          {site.primaryCta.label}
        </Link>
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
          className="min-h-11 min-w-11 text-sm uppercase tracking-widest"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="menu"
        ref={overlay}
        inert
        style={{ visibility: "hidden" }}
        className="on-dark fixed inset-0 z-[-1] flex flex-col justify-center bg-ink px-6 text-bone md:px-12"
      >
        <nav aria-label="Main">
          <ul className="space-y-2">
            {[...site.nav, { label: site.primaryCta.label, href: site.primaryCta.href }].map((l) => (
              <li key={l.label} className="overflow-hidden">
                <Link
                  data-menu-link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="inline-block font-display text-5xl leading-tight hover:text-gold-light md:text-7xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
