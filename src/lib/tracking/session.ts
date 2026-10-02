/**
 * A per-page-load visitor key and the campaign parameters the visitor arrived
 * with. Both live **in memory only** — nothing is written to cookies,
 * localStorage or sessionStorage, so neither needs consent. They survive
 * client-side navigation (home → Datenschutz → home) and reset on a reload.
 */

let session: string | undefined;

/** Random key that ties a form's view / start / submit events together. */
export function sessionId(): string {
  session ??= Math.random().toString(36).slice(2) + Date.now().toString(36);
  return session;
}

export interface Attribution {
  /** `utm_*` plus the ad platforms' click ids, exactly as they arrived. */
  utm: Record<string, string>;
  /** The first URL of this visit, including its query string. */
  landingUrl: string;
  referrer: string | null;
  /** When the visit began — the form reports how long it took to convert. */
  startedAt: number;
}

const CLICK_IDS = ["ref", "fbclid", "gclid", "ttclid", "msclkid"];

let attribution: Attribution | undefined;

/**
 * Remember how the visitor arrived. Call once on the first client render;
 * later calls keep the first answer, so an internal navigation that drops the
 * query string does not erase the campaign.
 */
export function captureAttribution(): Attribution {
  if (attribution) return attribution;
  const utm: Record<string, string> = {};
  try {
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key.startsWith("utm_") || CLICK_IDS.includes(key)) utm[key] = value.slice(0, 300);
    });
  } catch {
    /* malformed query string — arrive without attribution */
  }
  attribution = {
    utm,
    landingUrl: window.location.href,
    referrer: document.referrer || null,
    startedAt: Date.now(),
  };
  return attribution;
}
