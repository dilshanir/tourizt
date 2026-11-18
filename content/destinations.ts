import type { MediaId } from "./media";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  line: string; // one sensory line
  body: string;
  media: MediaId;
  stops: string[];
};

export const destinations: Destination[] = [
  {
    slug: "south-coast",
    name: "The Coast",
    region: "Colombo to Galle",
    line: "Salt on the windows and fishing boats before breakfast.",
    body: "The west and south coast is where most journeys begin and some end. Slow mornings in Galle Fort, long lunches on a verandah, then a walk to the water when the heat drops.",
    media: "coast",
    stops: ["Colombo", "Galle Fort", "Mirissa"],
  },
  {
    slug: "hill-country",
    name: "The Tea Hills",
    region: "Kandy, Nuwara Eliya, Ella",
    line: "Six a.m. in Ella. The mist hasn't lifted and the train is late again. Good.",
    body: "Cooler air, steep green slopes and railway cuttings. This is the part of the island to do by train and on foot, with someone who knows which carriage has the open door.",
    media: "hills",
    stops: ["Kandy", "Nuwara Eliya", "Ella"],
  },
  {
    slug: "cultural-triangle",
    name: "The Old Cities",
    region: "Sigiriya, Dambulla, Anuradhapura, Polonnaruwa",
    line: "Brick, stone and dawn light on very old ground.",
    body: "Ancient capitals, cave temples and a rock fortress you climb before the tour buses arrive. We time these stops for the quiet hours and keep the days short.",
    media: "culture",
    stops: ["Sigiriya", "Dambulla", "Polonnaruwa"],
  },
  {
    slug: "wild-south",
    name: "The Wild South",
    region: "Yala, Udawalawe",
    line: "Dust, a jeep engine cut to nothing, and a long wait. Worth it.",
    body: "Safari with patience: small vehicles, early starts and trackers who choose where to wait, not where the crowd is.",
    media: "wild",
    stops: ["Udawalawe", "Yala"],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
