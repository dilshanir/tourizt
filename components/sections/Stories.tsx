import { stories } from "@/content/stories";

const steps = [
  { n: "01", title: "Tell us", text: "Where you're drawn to, when, who's coming and roughly what you'd like to spend. Five short questions." },
  { n: "02", title: "We sketch", text: "We reply by email with a first route: the places, the order and the pace." },
  { n: "03", title: "We adjust", text: "You change what you like. We rework it until it feels like your trip, not ours." },
  { n: "04", title: "You go", text: "Private drivers, local guides and hotels we'd stay in ourselves, all arranged before you land." },
];

// Real guest stories only. While there are none, this section explains how a trip is planned instead.
export default function Stories() {
  const has = stories.length > 0;
  return (
    <section className="on-dark bg-slate px-6 py-24 text-bone md:px-12 md:py-40" aria-labelledby="stories-title">
      <h2 id="stories-title" className="font-display text-h2 leading-none">{has ? "Guest stories" : "How a trip comes together"}</h2>
      {has ? (
        <ul className="mt-12 grid gap-12 md:grid-cols-2">
          {stories.map((s) => (
            <li key={s.name} className="md:odd:mt-16">
              <blockquote className="font-display text-3xl leading-snug">&ldquo;{s.quote}&rdquo;</blockquote>
              <p className="mt-4 text-sm uppercase tracking-widest">{s.name}, {s.trip}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="mt-14 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className={i % 2 ? "md:mt-12" : ""}>
              <p className="font-display text-5xl text-gold-light">{s.n}</p>
              <h3 className="mt-4 font-display text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-[30ch]">{s.text}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
