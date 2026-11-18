// Captures early frames of first load and reload: node tests/frames.mjs <url> <outDir>
import { chromium } from "@playwright/test";
import fs from "node:fs";
const [url, out] = [process.argv[2], process.argv[3]];
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
const p = await ctx.newPage();

async function sample(tag) {
  const t0 = Date.now();
  const nav = p.goto(url, { waitUntil: "commit" });
  await nav;
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const s = await p
      .evaluate(() => {
        const w = document.querySelector("[data-word]");
        const vis = w ? getComputedStyle(w).visibility : "none";
        const r = w?.getBoundingClientRect();
        const pre = document.getElementById("preloader");
        const preShown = pre ? getComputedStyle(pre).display !== "none" : false;
        const clipTop = w?.parentElement?.getBoundingClientRect();
        return { vis, ty: w ? getComputedStyle(w).transform : null, preShown, ready: document.documentElement.dataset.ready ?? null, skip: document.documentElement.dataset.tzSkip ?? null, top: r && Math.round(r.top), clipH: clipTop && Math.round(clipTop.height) };
      })
      .catch(() => null);
    rows.push(`${Date.now() - t0}ms ${JSON.stringify(s)}`);
    await p.screenshot({ path: `${out}/${tag}_${String(i).padStart(2, "0")}.png` }).catch(() => {});
    await p.waitForTimeout(250);
  }
  console.log(`--- ${tag}\n` + rows.join("\n"));
}
await sample("first");
await p.waitForTimeout(2500);
await sample("reload");
await b.close();
