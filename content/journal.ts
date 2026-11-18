/** Placeholder articles. approved:false renders a visible "pending approval" tag. */
export type Article = { slug: string; title: string; dek: string; approved: boolean };

export const articles: Article[] = [
  { slug: "the-train-from-kandy", title: "The train from Kandy: which side to sit on", dek: "A short guide to the left-hand windows, the open doors and the delays.", approved: false },
  { slug: "when-to-go", title: "Two coasts, two monsoons: when to go where", dek: "Why there is almost always a sunny side of the island.", approved: false },
  { slug: "rice-and-curry", title: "Rice and curry, properly", dek: "What arrives on the table and how to eat it with your hand.", approved: false },
];
