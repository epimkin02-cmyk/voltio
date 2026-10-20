/**
 * POST /api/lead — the lead form's only backend.
 *
 * One request per visitor, on submit. The answers become ONE flat record of
 * strings (no nested objects: that is the shape Leadmetrics and Leadtable
 * accept, learned on Revolution Academy and Doglovers) and go, in parallel, to
 * every configured target:
 *
 *   LEADMETRICS_WEBHOOK_URL      Leadmetrics lead webhook
 *   LEADTABLE_WEBHOOK_URL        lead-table.com generic webhook
 *   UMSATZPILOT_LEADS_WEBHOOK_URL  the agency's own Leadtable
 *
 * Every key is always present, empty or not: Leadmetrics' mapping wizard only
 * offers the keys of the FIRST record it received. The answer keys keep the
 * `antwort_<field>` names the mappings were built on.
 *
 * The visitor is thanked as soon as one target accepted the lead; a target
 * that failed (after one retry) is logged with its name and status, never the
 * person's data. No target configured or none reachable: 5xx, the form shows
 * its error.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

const text = (max: number) => z.string().trim().max(max).optional().default("");

const schema = z.object({
  answers: z.object({
    marke: z.string().trim().min(1).max(80),
    modell: text(120),
    fahrzeug_freitext: text(200),
    erstzulassung: text(10),
    kilometerstand: text(20),
    name: z.string().trim().min(1).max(120),
    email: z.email().max(200),
    telefon: text(40),
    quelle: text(60),
  }),
  tracking: z.object({
    consent: z.boolean(),
    event_id: z.string().max(120).optional(),
    fbp: z.string().max(300).nullish(),
    fbc: z.string().max(500).nullish(),
  }),
  attribution: z.object({
    page_url: z.string().max(2000),
    referrer: z.string().max(2000).nullish(),
    utm: z.record(z.string().max(40), z.string().max(300)).default({}),
    duration_ms: z.number().nonnegative().optional(),
  }),
});

type Lead = z.infer<typeof schema>;

/** Origin header must be our own host. Browsers always send it on POST. */
function sameOrigin(req: NextRequest): boolean {
  const own = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").toLowerCase();
  if (!own) return true;
  const from = req.headers.get("origin") || req.headers.get("referer");
  if (!from) return false;
  try {
    return new URL(from).host.toLowerCase() === own;
  } catch {
    return false;
  }
}

/** A few requests per IP and ten minutes — generous, an IP is not a person. */
const hits = new Map<string, { n: number; until: number }>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  const hit = hits.get(ip);
  if (!hit || now > hit.until) {
    hits.set(ip, { n: 1, until: now + 10 * 60_000 });
    if (hits.size > 5000) for (const [k, v] of hits) if (now > v.until) hits.delete(k);
    return false;
  }
  return ++hit.n > 10;
}

/** Any notation in, E.164 out. No country code: Germany. */
function e164(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (!digits) return "";
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  return `+49${digits.replace(/^0/, "")}`;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

function record({ answers: a, tracking: t, attribution: at }: Lead, req: NextRequest): Record<string, string> {
  const [first = "", ...rest] = a.name.split(/\s+/);
  const vehicle = a.fahrzeug_freitext || [a.marke, a.modell].filter(Boolean).join(" ");
  const summary = [
    ["Marke", a.marke],
    ["Modell", a.modell],
    ["Fahrzeug (Freitext)", a.fahrzeug_freitext],
    ["Erstzulassung", a.erstzulassung],
    ["Kilometerstand", a.kilometerstand],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const local = /^https?:\/\/(localhost|127\.0\.0\.1)([:/]|$)/i.test(at.page_url);
  const consent = t.consent;

  return {
    name: a.name,
    first_name: first,
    last_name: rest.join(" "),
    email: a.email.toLowerCase(),
    phone: e164(a.telefon),
    antwort_marke: a.marke,
    antwort_modell: a.modell,
    antwort_fahrzeug_freitext: a.fahrzeug_freitext,
    antwort_erstzulassung: a.erstzulassung,
    antwort_kilometerstand: a.kilometerstand,
    antwort_name: a.name,
    antwort_email: a.email,
    antwort_telefon: a.telefon,
    antwort_quelle: a.quelle,
    fahrzeug: vehicle,
    zusammenfassung: summary,
    page_url: at.page_url,
    referrer: at.referrer ?? "",
    ...Object.fromEntries(UTM_KEYS.map((k) => [k, at.utm[k] ?? ""])),
    dauer_sekunden: at.duration_ms ? String(Math.round(at.duration_ms / 1000)) : "",
    land: req.headers.get("x-vercel-ip-country") ?? "",
    marketing_einwilligung: consent ? "true" : "false",
    // Conversions API matching — only with marketing consent.
    event_id: consent ? (t.event_id ?? "") : "",
    fbp: consent ? (t.fbp ?? "") : "",
    fbc: consent ? (t.fbc ?? "") : "",
    ip: consent ? (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "") : "",
    user_agent: consent ? (req.headers.get("user-agent") ?? "").slice(0, 400) : "",
    eingegangen: new Date().toISOString(),
    funnel_slug: "voltio-ankauf",
    lead_status: "Anfrage",
    test: local ? "true" : "false",
  };
}

async function deliver(target: string, url: string, body: string): Promise<boolean> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        signal: AbortSignal.timeout(8000),
      });
      const reply = (await res.text()).trim().slice(0, 120);
      if (res.ok) {
        console.info(`[lead] ${target}: HTTP ${res.status} ${reply || "(leer)"}`);
        return true;
      }
      console.error(`[lead] ${target} Versuch ${attempt}: HTTP ${res.status} ${reply}`);
      if (res.status < 500) return false;
    } catch (error) {
      console.error(`[lead] ${target} Versuch ${attempt}:`, error instanceof Error ? error.name : error);
    }
    if (attempt === 1) await new Promise((r) => setTimeout(r, 800));
  }
  return false;
}

export const POST = handle(async (req) => {
  if (!sameOrigin(req)) throw new ApiError(403, "forbidden", "Forbidden.");
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) throw new ApiError(429, "too_many", "Too many requests.");

  const lead = schema.parse(await req.json());
  const env = getServerEnv();
  const targets = Object.entries({
    leadmetrics: env.LEADMETRICS_WEBHOOK_URL,
    leadtable: env.LEADTABLE_WEBHOOK_URL,
    "umsatzpilot-leads": env.UMSATZPILOT_LEADS_WEBHOOK_URL,
  }).filter((entry): entry is [string, string] => Boolean(entry[1]));
  if (!targets.length) {
    console.error("[lead] no webhook configured — lead NOT forwarded");
    throw new ApiError(503, "not_configured", "Lead targets are not configured.");
  }

  const body = JSON.stringify(record(lead, req));
  const results = await Promise.all(targets.map(([name, url]) => deliver(name, url, body)));
  if (!results.some(Boolean)) throw new ApiError(502, "not_delivered", "No target accepted the lead.");
  return NextResponse.json({ ok: true });
});
