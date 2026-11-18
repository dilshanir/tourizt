import type { MediaId } from "./media";

/**
 * Sample itineraries, written as starting points. The studio rebuilds each one around the traveller.
 * fromPrice stays null until a real figure is confirmed: the site then says "Price on enquiry".
 */
export type Leg = { when: string; title: string; text: string };

export type Journey = {
  slug: string;
  name: string;
  days: number;
  summary: string;
  highlights: string[];
  plan: Leg[];
  media: MediaId;
  fromPrice: string | null; // e.g. "£4,200 per person" once confirmed
};

export const journeys: Journey[] = [
  {
    slug: "the-slow-loop",
    name: "The Slow Loop",
    days: 12,
    summary: "Coast, hills and old cities in one unhurried circle, with nowhere you have to be by nine.",
    highlights: ["Galle Fort at dusk", "Kandy to Ella by train", "Sigiriya before the crowds"],
    plan: [
      { when: "Day 1", title: "Colombo", text: "Land, sleep, and see very little. A short walk by the sea if you have the energy." },
      { when: "Days 2 to 4", title: "Sigiriya and Dambulla", text: "Climb the rock at first light, rest through the heat, then the cave temples in the cool of the afternoon." },
      { when: "Days 5 to 6", title: "Kandy", text: "The lake, the temple and slow evenings. Day 6 is empty on purpose." },
      { when: "Days 7 to 9", title: "Hill country by train to Ella", text: "The long morning train up through the tea, then walking, tea and a late lunch with a view." },
      { when: "Days 10 to 12", title: "Galle and the south coast", text: "Down to the sea. The fort walls at dusk, a beach, and nothing to catch." },
    ],
    media: "coast",
    fromPrice: null,
  },
  {
    slug: "tea-and-rail",
    name: "Tea and Rail",
    days: 7,
    summary: "A short, cool trip: plantation stays, long walks and the best seats on the line.",
    highlights: ["Plantation bungalow stay", "Nine Arches at the right hour", "A tea tasting with the factory manager"],
    plan: [
      { when: "Days 1 to 2", title: "Kandy", text: "Arrive, settle, and walk round the lake. The temple early, before the queues." },
      { when: "Days 3 to 4", title: "Tea country by train", text: "The line climbs into the hills. We stay on a working plantation and walk the slopes with someone who picks there." },
      { when: "Days 5 to 7", title: "Ella", text: "Short walks, the viaduct at the right hour, and a final slow morning before you leave." },
    ],
    media: "hills",
    fromPrice: null,
  },
  {
    slug: "old-kingdoms",
    name: "Old Kingdoms",
    days: 8,
    summary: "The ancient capitals at a human pace, with a private guide who tells it straight.",
    highlights: ["Sunrise on the rock", "Cave temples with no queue", "Cycling the ruins at Polonnaruwa"],
    plan: [
      { when: "Days 1 to 2", title: "Anuradhapura", text: "The oldest of the cities: dagobas, sacred trees and quiet roads. We go early and again at dusk." },
      { when: "Days 3 to 4", title: "Polonnaruwa", text: "A flat site made for bicycles. Ruins in the morning, a long rest, then the lake at sunset." },
      { when: "Days 5 to 6", title: "Sigiriya and Dambulla", text: "The rock at first light, the cave temples later, and a free afternoon in between." },
      { when: "Days 7 to 8", title: "Kandy", text: "A softer finish: the lake, the temple and a last dinner without a schedule." },
    ],
    media: "culture",
    fromPrice: null,
  },
  {
    slug: "wild-and-quiet",
    name: "Wild and Quiet",
    days: 9,
    summary: "Two parks, a lodge with no wi-fi in the rooms, and a beach at the end to lie down on.",
    highlights: ["Dawn game drives", "Udawalawe elephants", "Three nights on the south coast"],
    plan: [
      { when: "Days 1 to 3", title: "Udawalawe", text: "Open grassland and big skies. Dawn and late-afternoon drives, with the middle of the day off." },
      { when: "Days 4 to 6", title: "Yala", text: "Small vehicles, early starts and trackers who choose where to wait. Leopards are never promised." },
      { when: "Days 7 to 9", title: "The south coast", text: "Three nights by the sea to come down from it all. Galle Fort is close if you want it." },
    ],
    media: "wild",
    fromPrice: null,
  },
];

export const getJourney = (slug: string) => journeys.find((j) => j.slug === slug);
export const priceLabel = (j: Journey) => j.fromPrice ?? "Price on enquiry";
