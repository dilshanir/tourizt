import Link from "next/link";
import { articles } from "@/content/journal";

// Offsets give the three cards an uneven rhythm. Literal class strings.
const offs = ["md:mt-0", "md:mt-16", "md:mt-6"];

export default function Journal() {
  return (
    <section id="journal" className="px-6 py-24 md:px-12 md:py-40" aria-labelledby="journal-title">
      <h2 id="journal-title" className="font-display text-h2 leading-none">From the notebook</h2>
      <ul className="mt-14 grid gap-10 md:grid-cols-3">
        {articles.map((a, i) => (
          <li key={a.slug} className={offs[i % 3]}>
            {/* Hover reveal: the underline draws and the dek lifts, so the card tells you it's the thing to read. */}
            <Link href={`/journal/${a.slug}`} className="group block border-t border-ink pt-4">
              <h3 className="font-display text-3xl leading-tight">
                <span className="bg-gradient-to-r from-laterite to-laterite bg-[length:0%_2px] bg-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{a.title}</span>
              </h3>
              <p className="mt-3 max-w-[34ch] translate-y-1 opacity-80 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{a.dek}</p>
              <span className="mt-4 inline-block text-sm uppercase tracking-widest text-laterite">Read</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
