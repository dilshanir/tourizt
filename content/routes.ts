/** Stylised route, not a survey map. Coordinates are in a 400x700 viewBox. */
// One continuous line with no double-backs: Colombo, Sigiriya, Kandy, Ella, Yala, Galle.
export const routePath =
  "M130,430 C120,340 170,260 200,200 C215,240 240,270 235,310 C235,350 265,390 262,430 C262,460 290,480 290,505 C270,555 215,575 168,548";

export const islandPath =
  "M205,60 C260,80 300,140 305,210 C312,280 330,330 335,400 C340,470 320,540 270,590 C230,630 180,625 150,590 C110,545 100,490 105,440 C108,380 140,330 150,270 C158,215 150,150 170,105 C180,80 190,66 205,60 Z";

export type Stop = { name: string; note: string; x: number; y: number };

export const stops: Stop[] = [
  { name: "Colombo", note: "Arrive, sleep, and see very little. That is the plan.", x: 130, y: 430 },
  { name: "Sigiriya", note: "Climb at first light, before the heat and the crowds.", x: 200, y: 200 },
  { name: "Kandy", note: "Lake, temple and the start of the railway up.", x: 235, y: 310 },
  { name: "Ella", note: "Mist, tea and a late train.", x: 262, y: 430 },
  { name: "Yala", note: "Early start, long wait, quiet jeep.", x: 290, y: 505 },
  { name: "Galle", note: "End on the fort walls with a cold drink.", x: 168, y: 548 },
];
