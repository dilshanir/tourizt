"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, NO_REDUCED } from "@/lib/gsap";
import { regions, budgets, stepSchemas, enquirySchema } from "@/lib/enquiry";

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const lengths = ["Up to a week", "About 10 days", "About two weeks", "Three weeks or more", "Not sure yet"];
const paces = ["Slow: few stops, long stays", "Balanced", "Active: a lot of walking and early starts"];
const TITLES = ["Where are you drawn to?", "When, roughly?", "Who's coming?", "What's the budget?", "How do we reach you?"];

type Values = Record<string, string | string[]>;
type Status = "idle" | "sending" | "done" | "not_configured" | "error";

export default function Enquiry() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>({ where: [], children: "0", adults: "2" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const panel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const set = (k: string, val: string | string[]) => setV((o) => ({ ...o, [k]: val }));

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCED, () => {
      // Why: the bar fills as you answer, so you can see how close you are to done. The panel slide shows direction.
      gsap.to(bar.current, { scaleX: (step + 1) / 5, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(panel.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
    });
    return () => mm.revert();
  }, { dependencies: [step], scope: panel });

  const validate = () => {
    const r = stepSchemas[step].safeParse(v);
    if (r.success) { setErrors({}); return true; }
    const e: Record<string, string> = {};
    for (const i of r.error.issues) e[String(i.path[0])] ??= i.message;
    setErrors(e);
    return false;
  };

  const go = (n: number) => { setStep(n); requestAnimationFrame(() => heading.current?.focus()); };
  const next = () => { if (validate()) go(step + 1); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const all = enquirySchema.safeParse(v);
    if (!all.success) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(all.data) });
      if (r.ok) setStatus("done");
      else setStatus(r.status === 503 ? "not_configured" : "error");
    } catch { setStatus("error"); }
  };

  const err = (k: string) => errors[k] && <p id={`${k}-err`} role="alert" className="mt-2 text-sm text-laterite">{errors[k]}</p>;
  const field = "mt-2 w-full rounded-sm border border-ink/40 bg-bone px-4 py-3 min-h-11";
  const toggleWhere = (r: string) => {
    const cur = v.where as string[];
    set("where", cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r]);
  };

  if (status === "done") {
    return (
      <div role="status" className="max-w-xl">
        <h2 className="font-display text-h2 leading-none">Thank you.</h2>
        <p className="mt-6">We&apos;ve got your enquiry and will reply by email with a first sketch of a route.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-labelledby="enq-title" className="max-w-2xl">
      <div className="h-1 w-full bg-ink/15" aria-hidden="true"><div ref={bar} className="h-full origin-left bg-laterite" style={{ transform: `scaleX(${(step + 1) / 5})` }} /></div>
      <p className="mt-3 text-sm uppercase tracking-widest" aria-live="polite">Step {step + 1} of 5</p>

      <div ref={panel} className="mt-8 min-h-72">
        <h2 id="enq-title" ref={heading} tabIndex={-1} className="font-display text-h2 leading-none outline-none">{TITLES[step]}</h2>

        {step === 0 && (
          <fieldset className="mt-8 space-y-3" aria-describedby="where-err">
            <legend className="sr-only">Places</legend>
            {[...regions, "Not sure yet"].map((r) => (
              <label key={r} className="flex min-h-11 items-center gap-3">
                <input type="checkbox" className="h-5 w-5 accent-laterite" checked={(v.where as string[]).includes(r)} onChange={() => toggleWhere(r)} />
                {r}
              </label>
            ))}
            {err("where")}
          </fieldset>
        )}

        {step === 1 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="month">Month you&apos;d like to travel</label>
              <select id="month" className={field} value={(v.month as string) ?? ""} onChange={(e) => set("month", e.target.value)} aria-describedby="month-err">
                <option value="">Choose</option>{months.map((m) => <option key={m}>{m}</option>)}
              </select>{err("month")}
            </div>
            <div>
              <label htmlFor="nights">Rough length</label>
              <select id="nights" className={field} value={(v.nights as string) ?? ""} onChange={(e) => set("nights", e.target.value)} aria-describedby="nights-err">
                <option value="">Choose</option>{lengths.map((m) => <option key={m}>{m}</option>)}
              </select>{err("nights")}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="adults">Adults</label>
                <input id="adults" type="number" min={1} max={20} inputMode="numeric" className={field} value={v.adults as string} onChange={(e) => set("adults", e.target.value)} aria-describedby="adults-err" />{err("adults")}
              </div>
              <div>
                <label htmlFor="children">Children</label>
                <input id="children" type="number" min={0} max={20} inputMode="numeric" className={field} value={v.children as string} onChange={(e) => set("children", e.target.value)} />
              </div>
            </div>
            <fieldset aria-describedby="pace-err">
              <legend>Pace</legend>
              {paces.map((p) => (
                <label key={p} className="flex min-h-11 items-center gap-3">
                  <input type="radio" name="pace" className="h-5 w-5 accent-laterite" checked={v.pace === p} onChange={() => set("pace", p)} />{p}
                </label>
              ))}{err("pace")}
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <fieldset className="mt-8" aria-describedby="budget-err">
            <legend className="mb-3 text-sm">Per person, not including international flights.</legend>
            {budgets.map((b) => (
              <label key={b} className="flex min-h-11 items-center gap-3">
                <input type="radio" name="budget" className="h-5 w-5 accent-laterite" checked={v.budget === b} onChange={() => set("budget", b)} />{b}
              </label>
            ))}{err("budget")}
          </fieldset>
        )}

        {step === 4 && (
          <div className="mt-8 space-y-5">
            <div><label htmlFor="name">Name</label><input id="name" autoComplete="name" className={field} value={(v.name as string) ?? ""} onChange={(e) => set("name", e.target.value)} aria-describedby="name-err" />{err("name")}</div>
            <div><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" className={field} value={(v.email as string) ?? ""} onChange={(e) => set("email", e.target.value)} aria-describedby="email-err" />{err("email")}</div>
            <div><label htmlFor="phone">Phone (optional)</label><input id="phone" type="tel" autoComplete="tel" className={field} value={(v.phone as string) ?? ""} onChange={(e) => set("phone", e.target.value)} /></div>
            <div><label htmlFor="message">Anything we should know? (optional)</label><textarea id="message" rows={4} className={field} value={(v.message as string) ?? ""} onChange={(e) => set("message", e.target.value)} /></div>
            <p className="text-sm">We use your details only to reply to this enquiry.</p>
          </div>
        )}
      </div>

      {status === "not_configured" && <p role="alert" className="mt-6 border border-laterite p-4">Our enquiry inbox isn&apos;t connected yet, so this wasn&apos;t sent. Nothing has been lost; your answers are still here.</p>}
      {status === "error" && <p role="alert" className="mt-6 border border-laterite p-4">Something went wrong sending that. Please try again.</p>}

      <div className="mt-8 flex items-center gap-4">
        {step > 0 && <button type="button" onClick={() => go(step - 1)} className="min-h-11 px-4 underline underline-offset-8">Back</button>}
        {step < 4 ? (
          <button type="button" onClick={next} className="min-h-11 rounded-sm bg-laterite px-7 py-3 text-bone hover:bg-ink">Next</button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="min-h-11 rounded-sm bg-laterite px-7 py-3 text-bone hover:bg-ink disabled:opacity-60">{status === "sending" ? "Sending…" : "Send my enquiry"}</button>
        )}
      </div>
    </form>
  );
}
