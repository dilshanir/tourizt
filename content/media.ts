/**
 * Media manifest. Drop the file at `public/<file>` and it is picked up automatically (see lib/media.ts).
 * Until then a labelled placeholder renders. All photos are from Unsplash (Unsplash License: free commercial use).
 * Photographer names were read from each photo's own page when downloaded (2400px wide originals).
 */
export type Tone = "tea" | "laterite" | "slate" | "sand";

export type MediaItem = {
  file: string; // path under /public
  alt: string; // written, not generated
  tone: Tone; // placeholder colour
  credit: string;
  source: string; // page to download from
};

export const media = {
  hero: {
    file: "img/hero.jpg",
    alt: "Aerial view of the Sigiriya rock fortress rising out of green forest",
    tone: "tea",
    credit: "Dylan Shaw / Unsplash",
    source: "https://unsplash.com/photos/sigiriya-rock-fortress-in-sri-lanka-smUAKwMT8XA",
  },
  coast: {
    file: "img/coast.jpg",
    alt: "Palm trees leaning over a quiet stretch of Sri Lankan beach",
    tone: "sand",
    credit: "Dinuka Lankaloka / Unsplash",
    source: "https://unsplash.com/photos/palm-trees-on-beach-shore-during-daytime-iduEaeBB_rQ",
  },
  hills: {
    file: "img/hills.jpg",
    alt: "A blue train crossing the Nine Arches Bridge through green hills",
    tone: "tea",
    credit: "Hendrik Cornelissen / Unsplash",
    source: "https://unsplash.com/photos/blue-train-on-nine-arches-bridge-jpTT_SAU034",
  },
  culture: {
    file: "img/culture.jpg",
    alt: "The flat-topped rock fortress of Sigiriya seen over forest",
    tone: "laterite",
    credit: "Dylan Shaw / Unsplash",
    source: "https://unsplash.com/photos/sigiriya-rock-fortress-in-sri-lanka-smUAKwMT8XA",
  },
  wild: {
    file: "img/wild.jpg",
    alt: "A group of elephants walking along a river bank beneath forested hills",
    tone: "slate",
    credit: "Alex Azabache / Unsplash",
    source: "https://unsplash.com/photos/shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4",
  },
  m1: {
    file: "img/moment-fishermen.jpg",
    alt: "Stilt fishermen on poles in the surf off the south coast",
    tone: "sand",
    credit: "Daniel Klein / Unsplash",
    source: "https://unsplash.com/photos/stilt-fishermen-on-sri-lanka-coast-Qx8_d5dGhrs",
  },
  m2: {
    file: "img/moment-train.jpg",
    alt: "A train moving through forest on a high bridge",
    tone: "tea",
    credit: "Anton Lecock / Unsplash",
    source: "https://unsplash.com/photos/train-on-bridge-in-forest-vWGvoiHTFPU",
  },
  m3: {
    file: "img/moment-waterfall.jpg",
    alt: "A waterfall dropping down a steep, green mountain face",
    tone: "slate",
    credit: "Thushal Madhushankha / Unsplash",
    source: "https://unsplash.com/photos/waterfall-cascading-down-lush-mountain-cliff-Wak57_M4JKM",
  },
  m4: {
    file: "img/moment-river-elephants.jpg",
    alt: "A herd of elephants bathing in a shallow river",
    tone: "laterite",
    credit: "Kseniia Zapiatkina / Unsplash",
    source: "https://unsplash.com/photos/a-herd-of-elephants-bathing-in-a-shallow-river-XBAlsr8vYKY",
  },
  m5: {
    file: "img/moment-boats.jpg",
    alt: "Fishing boats pulled up on sand beneath palm trees",
    tone: "sand",
    credit: "Sajith Sukumaran / Unsplash",
    source: "https://unsplash.com/photos/boats-lined-up-on-a-sandy-beach-with-palm-trees-Udb75nXcBJ0",
  },
  m6: {
    file: "img/moment-stone-bridge.jpg",
    alt: "An old stone railway bridge closed in by trees",
    tone: "tea",
    credit: "llxvisuals / Unsplash",
    source: "https://unsplash.com/photos/an-old-stone-railway-bridge-surrounded-by-lush-green-trees-_7y-feohmuc",
  },
} as const satisfies Record<string, MediaItem>;

export type MediaId = keyof typeof media;

/** Hero video: under 3MB, muted, looped. Compress after download (see docs/MEDIA.md). */
export const heroVideo = {
  file: "video/hero.mp4",
  credit: "Pexels creator (verify on page)",
  candidates: [
    "https://www.pexels.com/video/aerial-view-of-lush-sri-lankan-tea-plantations-29979273/",
    "https://www.pexels.com/video/scenic-aerial-view-of-sigiriya-rock-fortress-36175878/",
    "https://www.pexels.com/video/aerial-view-of-sri-lankan-railway-in-lush-forest-32630178/",
  ],
} as const;
