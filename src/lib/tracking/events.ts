/**
 * The page's own event vocabulary, reported to Vercel Web Analytics.
 *
 * Vercel's analytics are cookieless and keep nothing on the device, so they
 * run on legitimate interest and are only *switched off* when a visitor turns
 * "Statistik" off in the cookie settings — that gate lives in `beforeSend`
 * (`components/common/tracking-boot.tsx`), so every call here goes through it.
 *
 * Rules for an event: a short German name, properties that are never personal
 * (no names, e-mails, phone numbers), values that stay useful as a filter in
 * the dashboard. Add a new event to `Events` first; the type keeps call sites
 * honest.
 */
import { track } from "@vercel/analytics";

/** Which part of the page a thing happened in: a section id, "header", "footer". */
type Place = string;

export interface Events {
  /** A lead CTA was pressed and the popup opened. */
  cta_klick: { quelle: Place };
  /** First focus on a form field — the visitor started to fill it in. */
  anfrage_begonnen: { quelle: Place };
  /** The request was stored successfully. No personal data, only the vehicle and the campaign. */
  anfrage_gesendet: {
    quelle: Place;
    marke: string;
    modell: string;
    mit_telefon: boolean;
    utm_source: string;
    utm_campaign: string;
  };
  /** The request could not be stored (network, backend down). */
  anfrage_fehler: { quelle: Place };
  /** A phone or e-mail link was tapped — the visitor chose contact over the form. */
  kontakt_klick: { art: "telefon" | "email"; ort: Place };
  /** An FAQ row was opened. */
  faq_geoeffnet: { frage: string };
  /** The cookie decision, for the consent rate. */
  einwilligung: { auswahl: "alle" | "notwendige" | "eigene"; statistik: boolean; marketing: boolean };
  /** The visitor scrolled past a milestone of the home page. */
  scrolltiefe: { tiefe: 50 | 90 };
}

export function trackEvent<Name extends keyof Events>(name: Name, props: Events[Name]) {
  try {
    track(name, props);
  } catch {
    /* analytics must never break the page */
  }
}

const fired = new Set<string>();

/** Report once per page load — for milestones such as "form started". */
export function trackOnce<Name extends keyof Events>(name: Name, props: Events[Name], key: string = name) {
  if (fired.has(key)) return;
  fired.add(key);
  trackEvent(name, props);
}
