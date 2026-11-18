import Image from "next/image";
import type { ResolvedMedia } from "@/lib/media";
import type { Tone } from "@/content/media";

// Full literal class strings so Tailwind can find them.
const toneClass: Record<Tone, string> = {
  tea: "bg-gradient-to-br from-tea to-slate text-bone",
  laterite: "bg-gradient-to-br from-laterite to-ink text-bone",
  slate: "bg-gradient-to-br from-slate to-ink text-bone",
  sand: "bg-gradient-to-br from-sand to-bone text-ink",
};

type Props = { m: ResolvedMedia; className?: string; sizes?: string; priority?: boolean };

/** Fills its parent (parent must be `relative` with a size/aspect). Shows a placeholder until the file exists. */
export default function Photo({ m, className = "", sizes = "100vw", priority = false }: Props) {
  if (!m.src) {
    return (
      <div role="img" aria-label={m.alt} className={`absolute inset-0 ${toneClass[m.tone]} ${className}`}>
        {process.env.NODE_ENV !== "production" && (
          <span className="absolute bottom-2 left-3 text-xs opacity-70">Photo to add: {m.id}</span>
        )}
      </div>
    );
  }
  return <Image src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}
