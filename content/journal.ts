/**
 * Journal articles, drafted by the studio's web team for the owner to fact-check before launch.
 * `reviewed` is for the owner to flip once a local expert has checked the details.
 */
export type Article = { slug: string; title: string; dek: string; body: string[]; reviewed: boolean };

export const articles: Article[] = [
  {
    slug: "the-train-from-kandy",
    title: "The train from Kandy: how to do it properly",
    dek: "The long line up to Ella takes most of a day. Here is how to make it the best part of the trip.",
    reviewed: false,
    body: [
      "The railway from Kandy up to Ella climbs through tea country for most of a day. It is slow, it is often late, and it is one of the best ways to see the hills. Treat it as the day's main event, not as a lift between two hotels.",
      "Reserved seats in the better carriages sell out well ahead, so we book them as soon as your dates are fixed. If you can't get one, don't panic: second class is cheaper, busier and often more fun. Bring water, something to eat, and a layer, because it gets cool as you climb.",
      "Stand at an open door for the viaducts, but hold on and keep your phone away from the edge. Then sit back down. The best views tend to arrive when you've stopped looking for them.",
      "We send your driver ahead to meet you at the other end with your bags, so you step off the train with nothing to carry and nowhere to be.",
    ],
  },
  {
    slug: "when-to-go",
    title: "Two coasts, two monsoons: when to go where",
    dek: "Why there is almost always a sunny side of the island.",
    reviewed: false,
    body: [
      "Sri Lanka has two monsoons, and they arrive at different times. Roughly, the south-west monsoon wets the west and south coasts from around May to September, and the north-east monsoon wets the east and north from around October to January.",
      "That is why the island works nearly all year, if you pick the right side. The west and south coasts are usually at their best between about December and March. The east coast is usually at its best from about April to September.",
      "The hill country is cooler and can be wet at almost any time, so we plan walks for the mornings and keep afternoons flexible. The dry-zone parks, such as Yala and Udawalawe, are best in the drier months, when animals gather at the water.",
      "Weather shifts from year to year, so we check the forecast close to your dates and adjust the order of the trip if we need to. That flexibility is the reason to plan this with someone, rather than book it all in advance.",
    ],
  },
  {
    slug: "rice-and-curry",
    title: "Rice and curry, properly",
    dek: "What arrives on the table, and how to eat it.",
    reviewed: false,
    body: [
      "Rice and curry is not one dish. It is a table: a heap of rice, then several small curries around it. A typical spread might include dhal, a vegetable curry, a fish or chicken curry, a green mallung of finely chopped leaves, and a sambol, often made with coconut and chilli.",
      "Most people eat with their right hand, mixing a little of each curry into the rice and pressing it together with their fingertips. Use a spoon if you'd prefer; nobody will mind. The one rule is to try everything, including the thing you can't identify.",
      "Heat varies a lot from kitchen to kitchen. Tell us if you'd like it gentler, and we'll pass that on to the people cooking for you. The best meals on a trip are often the plain ones, in a family home, at a table with no menu.",
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
