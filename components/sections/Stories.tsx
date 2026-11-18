import { stories } from "@/content/stories";

export default function Stories() {
  return (
    <section className="bg-slate px-6 py-24 text-bone md:px-12 md:py-40 on-dark" aria-labelledby="stories-title">
      <h2 id="stories-title" className="font-display text-h2 leading-none">Guest stories</h2>
      {stories.length === 0 ? (
        <div className="mt-10 max-w-xl border border-dashed border-bone/50 p-8">
          <p className="text-sm uppercase tracking-widest text-gold-light">Placeholder</p>
          <p className="mt-3">Real guest stories go here, in guests&apos; own words, with their permission. None have been added yet.</p>
        </div>
      ) : (
        <ul className="mt-12 grid gap-12 md:grid-cols-2">
          {stories.map((s) => (
            <li key={s.name} className="md:odd:mt-16">
              <blockquote className="font-display text-3xl leading-snug">&ldquo;{s.quote}&rdquo;</blockquote>
              <p className="mt-4 text-sm uppercase tracking-widest">{s.name}, {s.trip}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
