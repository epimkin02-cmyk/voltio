/**
 * Leadmetrics journey script (jrny_v2.js), strictly bound to consent.
 *
 * Like the Meta Pixel it waits for "Marketing": without it nothing is loaded.
 * The script records the visitor's journey (pages, campaign parameters, click
 * ids) but creates no lead itself. The lead reaches Leadmetrics through the
 * Funnel Builder webhook (via Make); `attributeLead` ties the recorded journey
 * to that lead's e-mail and phone right after a successful submission.
 *
 * `data-consent="true"` is required: without it the script starts as
 * "declined", loads but opens no session. It is set because the tag is only
 * ever injected after consent. A later withdrawal calls `setConsent(false)`.
 */
import { CONSENT_EVENT, readConsent, type CookieConsent } from "@/components/common/Cookie/cookieStore";
import { LEADMETRICS_JOURNEY_ID } from "@/data/tracking";

type Lmetrics = {
  attribute?: (data: { email?: string; phone?: string }) => void;
  setConsent?: (granted: boolean) => void;
  reject_consent?: () => void;
};

declare global {
  interface Window {
    lmetrics?: Lmetrics;
  }
}

let loaded = false;
let listening = false;

const allowed = () => Boolean(LEADMETRICS_JOURNEY_ID) && Boolean(readConsent()?.marketing);

/** Inject the tag once. The library reads its settings from the data attributes. */
function load() {
  if (loaded || typeof window === "undefined" || !LEADMETRICS_JOURNEY_ID) return;
  loaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://harvest.lead-metrics.com/scripts/jrny_v2.js";
  script.setAttribute("data-jrny", LEADMETRICS_JOURNEY_ID);
  script.setAttribute("data-frm-dtct", "true");
  script.setAttribute("data-multi-dmn", "true");
  script.setAttribute("data-isolated", "true");
  script.setAttribute("data-consent", "true");
  document.head.appendChild(script);
}

/** Call once on the first client render, next to `startPixel`. */
export function startLeadmetrics() {
  if (typeof window === "undefined" || !LEADMETRICS_JOURNEY_ID || listening) return;
  listening = true;
  if (allowed()) load();
  window.addEventListener(CONSENT_EVENT, (event) => {
    const consent = (event as CustomEvent<CookieConsent>).detail;
    if (consent?.marketing) {
      load();
      window.lmetrics?.setConsent?.(true);
    } else if (loaded) {
      const lm = window.lmetrics;
      if (lm?.setConsent) lm.setConsent(false);
      else lm?.reject_consent?.();
    }
  });
}

/**
 * Bind the recorded journey to the person who just sent a request. Never
 * throws: a blocked script must not turn a stored lead into an error.
 */
export function attributeLead(data: { email: string; phone?: string }) {
  if (!allowed()) return;
  const lm = window.lmetrics;
  if (!lm?.attribute) {
    console.warn("[leadmetrics] journey not attributed: window.lmetrics.attribute is missing");
    return;
  }
  try {
    lm.attribute({ email: data.email || undefined, phone: data.phone || undefined });
  } catch (error) {
    console.error("[leadmetrics] attribute failed:", error);
  }
}
