import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About", description: site.description };

const beliefs = [
  { t: "Fewer stops, longer stays", d: "A trip with six places in twelve days beats one with twelve. We would rather you remember a place than tick it." },
  { t: "Private, not packaged", d: "Your own driver and your own guide, on your timetable. No coach, no group, no waiting for someone else's photo." },
  { t: "Local people first", d: "We plan with Sri Lankan drivers, guides and hosts, and we pay them properly. The best days come from them." },
  { t: "Honest about what's hard", d: "Heat, delays and long roads are part of it. We tell you before you go, not after." },
];

export default function About() {
  return (
    <>
      <main id="main" className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <p className="text-sm uppercase tracking-widest text-laterite">About</p>
        <h1 className="mt-4 max-w-[16ch] font-display text-display leading-[0.95]">Slow journeys, planned by hand</h1>
        <div className="mt-12 max-w-prose space-y-6">
          <p>{site.name} is a small travel studio that plans private journeys across Sri Lanka: the coast, the tea hills, the old cities and the wild south.</p>
          <p>We started from a simple annoyance. Most trips to the island are built to fit as much in as possible, so you spend your days in a vehicle and your evenings tired. We build the other kind: fewer stops, early starts when they&apos;re worth it, and long, empty afternoons.</p>
          <p>Every journey is shaped around you. Tell us when you can travel, who is coming and how you like to move, and we&apos;ll send back a first sketch of a route. You change what you like, and we rework it until it feels right.</p>
        </div>
        <ul className="mt-20 grid gap-10 md:grid-cols-2">
          {beliefs.map((b, i) => (
            <li key={b.t} className={i % 2 ? "md:mt-12" : ""}>
              <h2 className="font-display text-3xl">{b.t}</h2>
              <p className="mt-3 max-w-[40ch]">{b.d}</p>
            </li>
          ))}
        </ul>
        <Link href="/plan" className="mt-16 inline-block rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-ink">Plan my journey</Link>
      </main>
      <Footer />
    </>
  );
}
