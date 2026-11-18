import { enquirySchema } from "@/lib/enquiry";

/**
 * Enquiries are forwarded to ENQUIRY_WEBHOOK_URL (any endpoint accepting JSON, e.g. a Zapier/Make hook or a
 * CRM). Until that env var is set, we answer 503 honestly rather than pretend the message was delivered.
 */
export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return Response.json({ error: "bad_json" }, { status: 400 }); }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "invalid", issues: parsed.error.issues }, { status: 400 });

  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!hook) return Response.json({ error: "not_configured" }, { status: 503 });

  try {
    const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(parsed.data) });
    if (!r.ok) return Response.json({ error: "upstream" }, { status: 502 });
  } catch {
    return Response.json({ error: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
