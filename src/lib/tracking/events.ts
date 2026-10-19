/**
 * The page's event vocabulary, reported to Vercel Web Analytics.
 *
 * Same names as the agency's other landing pages (revolution-academy,
 * anwalt-schwartz-blitzer), so funnels compare side by side in the Vercel
 * dashboard under Analytics → Events.
 *
 * Vercel's analytics are cookieless and keep nothing on the device, so they
 * run on legitimate interest and are only *switched off* when a visitor turns
 * "Statistik" off in the cookie settings — that gate lives in `beforeSend`
 * (`components/common/tracking-boot.tsx`), so every call here goes through it.
 *
 * Properties are never personal (no names, e-mails, phone numbers, no form
 * answers). Vercel Pro keeps only the **first two** properties of an event,
 * so `trackEvent` orders them: the event's own first value, then the CTA the
 * popup was opened from (`cta_quelle`), then the channel (`kanal`), the rest
 * and the raw utm values behind.
 */
import { track } from "@vercel/analytics";

import { useLeadModal } from "@/components/lead/lead-modal-store";

import { captureAttribution, type Attribution } from "./session";

/** Which part of the page a thing happened in: a section id, "header", "footer". */
type Place = string;

/** 1 = vehicle fields, 2 = contact fields of the request form. */
export type OptinStep = 1 | 2;

export interface Events {
  /* The page: how far people get */
  /** A section was in view (30 % of it, or half the window). */
  section_gesehen: { section: Place };
  /** Scrolled past 25, 50, 75, 100 % of the page. */
  scroll_tiefe: { tiefe: 25 | 50 | 75 | 100 };
  /** 30, 60, 120, 300 seconds with the tab visible. */
  verweildauer: { sekunden: 30 | 60 | 120 | 300 };
  /** An FAQ row was opened. */
  faq_geoeffnet: { frage: string };
  /** The cookie decision, for the consent rate. */
  einwilligung: { wahl: "alle" | "notwendige" | "eigene"; marketing: boolean };
  /** A phone or e-mail link was tapped — the visitor chose contact over the form. */
  kontakt_klick: { art: "telefon" | "email"; ort: Place };
  /* The request */
  /** A lead CTA was pressed. */
  cta_klick: { quelle: Place };
  /** The request popup is open. */
  optin_geoeffnet: Record<string, never>;
  /** First field of a form step touched. */
  optin_schritt: { schritt: OptinStep };
  /** The browser rejected an input, or storing the request failed. */
  optin_fehler: { art: "eingabe" | "senden" };
  /** Popup closed without a stored request; furthest step reached (0 = nothing touched). */
  optin_abgebrochen: { schritt: 0 | OptinStep };
  /** "Send" pressed and the browser accepted the inputs; the server has not answered yet. */
  optin_abgeschickt: Record<string, never>;
  /** Request stored. The same moment the pixel reports "Lead". */
  lead: Record<string, never>;
}

/** Events on the way to a lead carry the CTA and the channel. */
const FUNNEL = new Set<keyof Events>([
  "optin_geoeffnet",
  "optin_schritt",
  "optin_fehler",
  "optin_abgebrochen",
  "optin_abgeschickt",
  "lead",
]);

const META = /(facebook|fb|instagram|ig|meta)/i;
const SEARCH = /(google|bing|duckduckgo|ecosia|yahoo|startpage|qwant)\./i;
const SHARED = /(whatsapp|t\.co|telegram|signal|threema|messenger|lnkd\.in|linkedin|pinterest|reddit|youtube)/i;
const MAIL = /(mail\.|webmail|outlook|gmail|gmx|web\.de|posteo|mailchi)/i;

/** Readable channel, same labels as the CRM of the other pages. */
function channel({ utm, referrer }: Attribution): string {
  const source = (utm.utm_source ?? "").toLowerCase();
  const paid = /(paid|cpc|ppc|ads?|anzeige)/i.test(utm.utm_medium ?? "");
  let host = "";
  try {
    host = referrer ? new URL(referrer).hostname.toLowerCase().replace(/^www\./, "") : "";
  } catch {
    /* unparsable referrer: treat as none */
  }
  if (utm.gclid) return "Google Anzeige";
  if (utm.fbclid) return "Meta Anzeige";
  if (META.test(source)) return paid ? "Meta Anzeige" : "Meta organisch";
  if (/google/.test(source)) return paid ? "Google Anzeige" : "Suchmaschine";
  if (/(newsletter|email|mail)/.test(source)) return "E-Mail";
  if (SHARED.test(source)) return "Weitergeleitet";
  if (source) return "Verweis";
  if (host && host !== window.location.hostname.replace(/^www\./, "")) {
    if (SHARED.test(host)) return "Weitergeleitet";
    if (META.test(host)) return "Meta organisch";
    if (MAIL.test(host)) return "E-Mail";
    if (SEARCH.test(host + ".")) return "Suchmaschine";
    return "Verweis";
  }
  return "Direkt";
}

/** Seconds since the visitor landed. */
const secondsSinceLanding = () => Math.max(0, Math.round((Date.now() - captureAttribution().startedAt) / 1000));

/** Current scroll depth in percent. */
const scrollDepthNow = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  return height <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / height) * 100));
};

export function trackEvent<Name extends keyof Events>(name: Name, props: Events[Name]) {
  if (typeof window === "undefined") return;
  let data: Record<string, string | number | boolean> = { ...(props as Record<string, string | number | boolean>) };
  const attribution = captureAttribution();
  const kanal = channel(attribution);
  const { utm_source, utm_medium, utm_campaign } = attribution.utm;
  const utm = Object.fromEntries(
    Object.entries({ utm_source, utm_medium, utm_campaign }).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
  if (FUNNEL.has(name)) {
    const [first, ...rest] = Object.entries(data);
    const cta = useLeadModal.getState().source || "seite";
    data = {
      ...(first ? { [first[0]]: first[1] } : {}),
      cta_quelle: cta,
      kanal,
      ...Object.fromEntries(rest),
      ...(name === "lead" ? { sekunden: secondsSinceLanding() } : {}),
      ...utm,
    };
  } else if (name === "cta_klick") {
    data = { ...data, kanal, sekunden: secondsSinceLanding(), scrolltiefe: scrollDepthNow() };
  }
  // `track` calls `window.va`, which <Analytics> only creates in its effect.
  // Early events would vanish; queue them exactly like the component does.
  if (!window.va) {
    window.va = (...params) => {
      (window.vaq ??= []).push(params);
    };
  }
  try {
    track(name, data);
  } catch {
    /* analytics must never break the page */
  }
}

const fired = new Set<string>();

/** Report once per page load — for milestones such as a scroll depth. */
export function trackOnce<Name extends keyof Events>(name: Name, props: Events[Name], key: string = name) {
  if (fired.has(key)) return;
  fired.add(key);
  trackEvent(name, props);
}

/**
 * Progress through one opening of the popup: the furthest form step and
 * whether the request was stored. Reset on every open; read on close to
 * report `optin_abgebrochen`.
 */
const optin = { step: 0 as 0 | OptinStep, done: false, reached: new Set<OptinStep>() };

export const optinOpened = () => {
  optin.step = 0;
  optin.done = false;
  optin.reached.clear();
  trackEvent("optin_geoeffnet", {});
};

export const optinStep = (step: OptinStep) => {
  if (optin.reached.has(step)) return;
  optin.reached.add(step);
  if (step > optin.step) optin.step = step;
  trackEvent("optin_schritt", { schritt: step });
};

export const optinDone = () => {
  optin.done = true;
  trackEvent("lead", {});
};

export const optinClosed = () => {
  if (!optin.done) trackEvent("optin_abgebrochen", { schritt: optin.step });
};
