/**
 * Meta Pixel, strictly bound to consent.
 *
 * Without consent to "Marketing" nothing is loaded and nothing is queued: no
 * script, no request, no cookie. When consent arrives later (banner or cookie
 * settings) the pixel loads then and reports the page view.
 *
 * Events:
 *   PageView          on load (standard; the pixel also reports route changes)
 *   AnfrageGestartet  lead popup opened (custom)
 *   Lead              request submitted (standard — campaigns optimise on it)
 *
 * Every Lead carries an `eventID`. The same id travels with the submission to
 * the Funnel Builder, which reports the lead server-side through the
 * Conversions API; Meta merges the two reports by that id.
 */
import { CONSENT_EVENT, readConsent, type CookieConsent } from "@/components/common/Cookie/cookieStore";
import { META_PIXEL_ID } from "@/data/tracking";

import { sessionId } from "./session";

type Fbq = ((...args: unknown[]) => void) & {
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  callMethod?: (...args: unknown[]) => void;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let loaded = false;
let listening = false;

const allowed = () => Boolean(META_PIXEL_ID) && Boolean(readConsent()?.marketing);

/** Inject the script and initialise the pixel. Idempotent. */
function load() {
  if (loaded || typeof window === "undefined" || !META_PIXEL_ID) return;
  loaded = true;
  if (!window.fbq) {
    const fbq: Fbq = (...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else (fbq.queue ??= []).push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

/**
 * Call once on the first client render: loads right away when consent is
 * already stored, otherwise the moment it is given. A later withdrawal stops
 * every further event (`allowed()` is checked per event) and tells the pixel
 * to revoke.
 */
export function startPixel() {
  if (typeof window === "undefined" || !META_PIXEL_ID || listening) return;
  listening = true;
  if (allowed()) load();
  window.addEventListener(CONSENT_EVENT, (event) => {
    const consent = (event as CustomEvent<CookieConsent>).detail;
    if (consent?.marketing) {
      load();
      window.fbq?.("consent", "grant");
    } else if (loaded) {
      window.fbq?.("consent", "revoke");
    }
  });
}

/** Id for one Lead, shared by the browser pixel and the Conversions API. */
export const newEventId = () => `${sessionId()}-${Date.now()}`;

function cookie(name: string): string | null {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

/**
 * What the Funnel Builder needs for the Conversions API. Without marketing
 * consent only `consent: false` — the server then reports nothing to Meta and
 * stores no IP. `_fbp` / `_fbc` are set by the pixel itself (`_fbc` only when
 * the visitor arrived through an ad).
 */
export function trackingPayload(eventId: string) {
  if (!allowed()) return { consent: false as const };
  return { consent: true as const, event_id: eventId, fbp: cookie("_fbp"), fbc: cookie("_fbc") };
}

/** Report an event. Without consent it is dropped, not kept for later. */
export function trackPixel(name: "Lead" | "AnfrageGestartet", eventId?: string) {
  if (!allowed()) return;
  load();
  if (name === "Lead") window.fbq?.("track", "Lead", {}, { eventID: eventId ?? newEventId() });
  else window.fbq?.("trackCustom", name);
}
