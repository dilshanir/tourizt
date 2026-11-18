import fs from "node:fs";
import path from "node:path";
import { media, heroVideo, type MediaId, type Tone } from "@/content/media";

export type ResolvedMedia = { id: MediaId; src: string | null; alt: string; tone: Tone; credit: string };

const exists = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

/** Server-only: marks which manifest files are actually present in /public. */
export function resolveMedia(): { photos: Record<MediaId, ResolvedMedia>; video: string | null } {
  const photos = {} as Record<MediaId, ResolvedMedia>;
  for (const id of Object.keys(media) as MediaId[]) {
    const m = media[id];
    photos[id] = { id, src: exists(m.file) ? `/${m.file}` : null, alt: m.alt, tone: m.tone, credit: m.credit };
  }
  return { photos, video: exists(heroVideo.file) ? `/${heroVideo.file}` : null };
}
