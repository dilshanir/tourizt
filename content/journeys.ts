import type { MediaId } from "./media";

/** SAMPLE itineraries. Replace with the studio's real journeys. Prices stay null until confirmed. */
export type Journey = {
  slug: string;
  name: string;
  days: number;
  summary: string;
  highlights: string[];
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
    media: "coast",
    fromPrice: null,
  },
  {
    slug: "tea-and-rail",
    name: "Tea and Rail",
    days: 7,
    summary: "A short, cool trip: plantation stays, long walks and the best seats on the line.",
    highlights: ["Plantation bungalow stay", "Nine Arches at the right hour", "A tea tasting with the factory manager"],
    media: "hills",
    fromPrice: null,
  },
  {
    slug: "old-kingdoms",
    name: "Old Kingdoms",
    days: 8,
    summary: "The ancient capitals at a human pace, with a private guide who tells it straight.",
    highlights: ["Sunrise on the rock", "Cave temples with no queue", "Cycling the ruins at Polonnaruwa"],
    media: "culture",
    fromPrice: null,
  },
  {
    slug: "wild-and-quiet",
    name: "Wild and Quiet",
    days: 9,
    summary: "Two parks, a lodge with no wi-fi in the rooms, and a beach at the end to lie down on.",
    highlights: ["Dawn game drives", "Udawalawe elephants", "Three nights on the south coast"],
    media: "wild",
    fromPrice: null,
  },
];

export const getJourney = (slug: string) => journeys.find((j) => j.slug === slug);
