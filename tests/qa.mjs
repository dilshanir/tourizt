// Browser QA: node tests/qa.mjs <baseUrl> <outDir>
import { chromium } from "@playwright/test";
import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:3111";
const out = process.argv[3] ?? "./qa-out";
fs.mkdirSync(out, { recursive: true });

const routes = ["/", "/plan", "/about", "/privacy", "/destinations/south-coast", "/journeys/tea-and-rail", "/nope"];
const problems = [];
const log = (...a) => console.log(...a);

const browser = await chromium.launch();

for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  for (const r of routes) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(`${m.type()}: ${m.text().slice(0, 200)}`); });
    page.on("pageerror", (e) => errs.push(`pageerror: ${e.message.slice(0, 200)}`));
    page.on("requestfailed", (q) => errs.push(`requestfailed: ${q.url().slice(0, 120)}`));
    page.on("response", (s) => { if (s.status() >= 400 && !s.url().endsWith("/nope")) errs.push(`http ${s.status()}: ${s.url().slice(0, 120)}`); });
    await page.goto(base + r, { waitUntil: "load" });
    await page.waitForTimeout(r === "/" ? 3500 : 800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) errs.push(`horizontal overflow ${overflow}px`);
    const slug = r.replace(/\W+/g, "_") || "home";
    await page.screenshot({ path: `${out}/${label}${slug}.png` });
    if (errs.length) problems.push({ label, route: r, errs: [...new Set(errs)] });
    await page.close();
  }

  // Home: scroll through and capture each section
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(`pageerror: ${e.message.slice(0, 200)}`));
  await page.goto(base + "/", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  log(label, "home scrollHeight", h);
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((h - viewport.height) * (i / steps)));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/${label}_scroll${i}.png` });
  }
  if (errs.length) problems.push({ label, route: "/ (scroll)", errs });
  await page.close();
  await ctx.close();
}

// Interaction tests (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(`pageerror: ${e.message.slice(0, 200)}`));
  page.on("console", (m) => { if (m.type() === "error") errs.push(`console: ${m.text().slice(0, 200)}`); });

  // first-visit hero flash check: sample headline visibility right after DOM ready
  await page.goto(base + "/", { waitUntil: "commit" });
  await page.waitForSelector("[data-word]", { state: "attached" });
  const early = await page.evaluate(() => {
    const w = document.querySelector("[data-word]");
    const r = w.getBoundingClientRect();
    const pre = document.getElementById("preloader");
    return { wordTransform: getComputedStyle(w).transform, preloader: !!pre, wordTop: Math.round(r.top) };
  });
  log("early hero state", JSON.stringify(early));
  await page.waitForTimeout(3500);

  // menu
  await page.click("button[aria-controls=menu]");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/desktop_menu.png` });
  const menuVisible = await page.evaluate(() => getComputedStyle(document.getElementById("menu")).visibility);
  log("menu visibility", menuVisible);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1000);

  // destination card expand
  await page.evaluate(() => document.getElementById("destinations").scrollIntoView());
  await page.waitForTimeout(1200);
  const card = page.locator("#destinations article button").first();
  await card.click();
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${out}/desktop_dest_open.png` });
  const dlg = await page.locator("[role=dialog]").evaluate((e) => getComputedStyle(e).visibility);
  log("dest dialog visibility", dlg);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1200);
  const dlgAfter = await page.locator("[role=dialog]").evaluate((e) => getComputedStyle(e).visibility);
  log("dest dialog after esc", dlgAfter);

  // enquiry
  await page.goto(base + "/plan", { waitUntil: "load" });
  await page.waitForTimeout(800);
  await page.click("text=Next");
  await page.waitForTimeout(400);
  const err1 = await page.locator("[role=alert]").first().textContent().catch(() => null);
  log("enquiry step1 empty error:", err1);
  await page.check("text=The Coast");
  await page.click("text=Next"); await page.waitForTimeout(400);
  await page.selectOption("#month", "March"); await page.selectOption("#nights", "About 10 days");
  await page.click("text=Next"); await page.waitForTimeout(400);
  await page.check("input[name=pace] >> nth=1");
  await page.click("text=Next"); await page.waitForTimeout(400);
  await page.check("input[name=budget] >> nth=0");
  await page.click("text=Next"); await page.waitForTimeout(400);
  await page.fill("#name", "QA Tester"); await page.fill("#email", "qa@example.com");
  await page.click("text=Send my enquiry"); await page.waitForTimeout(1200);
  const msg = await page.locator("[role=alert]").first().textContent().catch(() => null);
  log("enquiry submit message:", msg);
  await page.screenshot({ path: `${out}/desktop_enquiry_end.png` });
  if (errs.length) problems.push({ label: "interaction", route: "-", errs });
  await ctx.close();
}

await browser.close();
log("\n=== PROBLEMS ===");
log(problems.length ? JSON.stringify(problems, null, 1) : "none");
