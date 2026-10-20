/**
 * Where leads go: the page's own `/api/lead` route.
 *
 * The browser sends the finished request once, on submit — nothing personal
 * leaves the page before the visitor presses the button. The route turns it
 * into one flat record and forwards it to Leadmetrics, Leadtable and the
 * agency's own Leadtable (see `app/api/lead/route.ts`).
 */
import { trackingPayload } from "./pixel";
import { captureAttribution } from "./session";

/** The form's answers. Keys become `antwort_<key>` in the forwarded record. */
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

/**
 * Send the request. Throws when no target accepted it, so the form can say so
 * instead of thanking the visitor for a lead that never arrived.
 * `eventId` is the Lead event's id — the same one the browser pixel reports.
 */
export async function submitLead(answers: LeadAnswers, eventId: string) {
  const attribution = captureAttribution();
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      answers,
      tracking: trackingPayload(eventId),
      attribution: {
        page_url: attribution.landingUrl,
        referrer: attribution.referrer,
        utm: attribution.utm,
        duration_ms: Date.now() - attribution.startedAt,
      },
    }),
  });
  if (!response.ok) throw new Error(`Lead ${response.status}`);
}
