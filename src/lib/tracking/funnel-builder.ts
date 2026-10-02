/**
 * Where leads go: the Funnel Builder's headless API.
 *
 * The page renders its own form; this client only sends data — the popup was
 * opened (`view`), someone began typing (`start`), and the finished request.
 * Half-filled forms are **not** stored: nothing personal leaves the browser
 * before the visitor presses the submit button.
 *
 * This is the one deliberate exception to "the browser only calls same-origin
 * `/api/*`" (ADR in `obsidian/architecture/decisions-log.md`): the endpoint is
 * public and keyless, and the Conversions API needs the visitor's own IP and
 * browser, which a server-side relay would replace with ours.
 *
 * No `sendBeacon`: it sends credentials, and the API's `*` CORS grant rejects
 * credentialed requests. `fetch` with `credentials: "omit"` and `keepalive`
 * does the same job correctly.
 */
import { FUNNEL_BUILDER_URL, FUNNEL_SLUG } from "@/data/tracking";

import { trackingPayload } from "./pixel";
import { captureAttribution, sessionId } from "./session";

/** Field ids of the funnel "voltio-ankauf" — keep both sides identical. */
export interface LeadAnswers {
  marke: string;
  modell?: string;
  fahrzeug_freitext?: string;
  erstzulassung?: string;
  kilometerstand?: string;
  name: string;
  email: string;
  telefon?: string;
  /** Which part of the page the popup was opened from. */
  quelle?: string;
}

const ENDPOINT = `${FUNNEL_BUILDER_URL}/api/f/${FUNNEL_SLUG}`;
const FIELD_COUNT = 9;

type FunnelEvent = "view" | "start" | "complete";

/** Anonymous funnel statistics. Never throws, never blocks the UI. */
export function funnelEvent(type: FunnelEvent) {
  if (typeof window === "undefined") return;
  void fetch(`${ENDPOINT}/event`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    credentials: "omit",
    body: JSON.stringify({ session_id: sessionId(), type, step_index: null }),
  }).catch(() => {});
}

let started = false;

/** First interaction with a field — reported once per visit. */
export function funnelStarted() {
  if (started) return;
  started = true;
  funnelEvent("start");
}

/** Known fields only, trimmed, empty values dropped. */
function clean(answers: LeadAnswers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(answers)) {
    const text = typeof value === "string" ? value.trim() : "";
    if (text) out[key] = text;
  }
  return out;
}

/**
 * Store the request. Throws when it could not be delivered, so the form can
 * say so instead of thanking the visitor for a lead that never arrived.
 * `eventId` is the Lead event's id — the same one the browser pixel reports.
 */
export async function submitLead(answers: LeadAnswers, eventId: string) {
  const attribution = captureAttribution();
  const response = await fetch(`${ENDPOINT}/respond`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    credentials: "omit",
    body: JSON.stringify({
      response_id: null,
      session_id: sessionId(),
      answers: clean(answers),
      complete: true,
      last_step: FIELD_COUNT,
      meta: {
        page_url: attribution.landingUrl,
        referrer: attribution.referrer,
        utm: attribution.utm,
        user_agent: navigator.userAgent,
        duration_ms: Date.now() - attribution.startedAt,
        embedded: false,
        tracking: trackingPayload(eventId),
      },
    }),
  });
  const json = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!response.ok || !json.ok) throw new Error(json.error ?? `Funnel Builder ${response.status}`);
  funnelEvent("complete");
}
