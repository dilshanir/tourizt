# Tourizt — project rules for Claude Code

Boutique travel studio site for slow, private journeys in Sri Lanka. This file overrides the dashboard
`CLAUDE.md` in `Downloads/`, which belongs to a different project.

## Facts
- Brand: **Tourizt**. Live URL: **not decided** — `content/site.ts` holds a placeholder. Never invent a URL.
- Main action: "Plan my journey" (enquiry). Audience: UK/EU/AU travellers aged 30–55.
- Full plan: `C:\Users\Dilshani\.claude\plans\pasted-content-id-670a-role-wondrous-heron.md`

## Stack
Next.js App Router + TypeScript + Tailwind v4 + GSAP (`useGSAP`) + Lenis + OGL (one WebGL moment). Read
`node_modules/next/dist/docs/` before using Next APIs: this version differs from older ones.

## Hard rules
- Animate only `transform` and `opacity`. Every animation needs a one-line reason (explain / guide / reward), or cut it.
- Content must be fully visible with motion off. `prefers-reduced-motion` gets a calm, complete version: no Lenis, no scrub, no pin.
- Tailwind classes are written as full literal strings. Never build class names from variables.
- Colours come from tokens in `app/globals.css`. Never use gold on bone for body text (3.01:1 fails AA).
- No invented testimonials, ratings, names or prices. Use clearly labelled placeholders. No `Review` or `AggregateRating` JSON-LD.
- Banned copy: embark on a journey, unforgettable, hidden gems, breathtaking, paradise, discover the world, wanderlust, nestled, magical, seamless, carefully curated, bespoke, handpicked.
- Content lives in `content/*.ts`, typed, so the client edits without touching components.
- Persistence or storage access is always inside try/catch.

## How to work
- Small steps; for anything bigger than a few lines, show a short plan first.
- After each step: a numbered browser test list, and what I could not verify (real iOS/Android devices).
- One line per finished step in `CHANGELOG.md`. Ideas that are out of scope go in `docs/IDEAS.md`.
