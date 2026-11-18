# Media: what to download and where it goes

The site picks files up automatically. Save each at the path below (inside `public/`). Missing files show a
labelled placeholder in dev. The full list, alt text and credits live in `content/media.ts`.

## Photos (Unsplash licence: free for commercial use, credit is kind but not required)
Download the **original / largest** size, save as JPG. Aim for 2400px wide or more.

| Save as | Source page |
|---|---|
| `public/img/hero.jpg` and `public/img/culture.jpg` | https://unsplash.com/photos/sigiriya-rock-fortress-in-sri-lanka-smUAKwMT8XA |
| `public/img/coast.jpg` | https://unsplash.com/photos/palm-trees-on-beach-shore-during-daytime-iduEaeBB_rQ |
| `public/img/hills.jpg` | https://unsplash.com/photos/blue-train-on-nine-arches-bridge-jpTT_SAU034 |
| `public/img/wild.jpg` | https://unsplash.com/photos/shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4 |
| `public/img/moment-fishermen.jpg` | https://unsplash.com/photos/stilt-fishermen-on-sri-lanka-coast-Qx8_d5dGhrs |
| `public/img/moment-train.jpg` | https://unsplash.com/photos/train-on-bridge-in-forest-vWGvoiHTFPU |
| `public/img/moment-waterfall.jpg` | https://unsplash.com/photos/waterfall-cascading-down-lush-mountain-cliff-Wak57_M4JKM |
| `public/img/moment-river-elephants.jpg` | https://unsplash.com/photos/a-herd-of-elephants-bathing-in-a-shallow-river-XBAlsr8vYKY |
| `public/img/moment-boats.jpg` | https://unsplash.com/photos/boats-lined-up-on-a-sandy-beach-with-palm-trees-Udb75nXcBJ0 |
| `public/img/moment-stone-bridge.jpg` | https://unsplash.com/photos/an-old-stone-railway-bridge-surrounded-by-lush-green-trees-_7y-feohmuc |

Skip anything marked "Unsplash+": it is paid. Check each photographer name on the page and fix `credit` in
`content/media.ts` if my pairing was wrong.

## Hero video (Pexels licence: free for commercial use)
Pick one (they are 4K-capable; download the HD version), then compress to **under 3MB**, 1080p or 720p, muted, 10 to 15s loop:

- https://www.pexels.com/video/aerial-view-of-lush-sri-lankan-tea-plantations-29979273/
- https://www.pexels.com/video/scenic-aerial-view-of-sigiriya-rock-fortress-36175878/
- https://www.pexels.com/video/aerial-view-of-sri-lankan-railway-in-lush-forest-32630178/

Compress example (ffmpeg): `ffmpeg -i in.mp4 -t 12 -an -vf scale=1280:-2 -c:v libx264 -crf 29 -preset slow -movflags +faststart public/video/hero.mp4`
Save as `public/video/hero.mp4`.

## One consistent grade
Apply the same grade to every photo before saving (lifted blacks, warm highlights, slightly muted greens). Do not fake it with CSS.
