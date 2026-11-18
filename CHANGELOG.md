# Changelog

- M1 step 1: scaffolded Next.js 16.4.6 + TS + Tailwind v4; deps (gsap, @gsap/react, lenis, ogl, zod); tokens, fonts, skip link, grain, Lenis↔ScrollTrigger sync (off for reduced motion), project CLAUDE.md.
- M2/M3 first pass: all 11 home sections (preloader, hero, manifesto, pinned destinations with hold-to-enter + Flip expand, route map with DrawSVG + MotionPath, sticky journeys, parallax moments, stories placeholder, journal, footer wordmark), menu overlay, custom cursor, View Transitions, 5-step validated enquiry + `/api/enquiry`, destination and journey pages, about/privacy placeholders, 404, sitemap, robots (blocks crawlers while URL is a placeholder), TravelAgency JSON-LD. Media manifest + `docs/MEDIA.md`. Type-check, lint, build and route smoke test pass.
- QA pass (Playwright, `tests/qa.mjs`): fixed hero headline flashing before its intro (pre-hidden with `visibility`), preloader flash on reload, nav bar styling, duplicate journey photo, doubled-back route line, moments mosaic gap, cursor dot stuck in corner, wrapping "See the days" button. Added real Unsplash photos.
- Hero intro rewritten with fromTo (fixes headline stuck below its mask in dev/StrictMode).
- Filled placeholders: journey day-by-day plans, 3 journal articles + pages, About, Privacy, 'How a trip comes together' (replaces empty guest-stories block until real stories exist), prices -> 'Price on enquiry'.
- Layout cleanup: solid header, journeys as a plain alternating list (no overlapping stack), destinations cards aligned and fully visible, moments as two even rows.
- Loading screen: removed cream background (line draws over the hero photo with a dark tint, fades out); html background is dark so nothing white flashes on reload.
- Loading screen: removed the route line art (tint + Skip only).
