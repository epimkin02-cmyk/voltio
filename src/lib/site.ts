/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  /**
   * The brand as the site itself spells it — the footer's copyright line and
   * the plate behind the hero both read VOLTIO.
   */
  name: "VOLTIO",
  /**
   * Drawn from the site's own copy: the hero states the offer, the process
   * screen states the terms. Written for a German search result, so it leads
   * with the transaction rather than the brand.
   */
  description:
    "Voltio kauft Elektrofahrzeuge von Privatpersonen im DACH-Raum an. Bewertung in 24 Stunden, Festpreis ohne Nachverhandeln, kostenlose Abholung und Zahlung bei Übergabe.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  /**
   * **Not set on purpose.** Inventing a handle risks pointing the card's
   * attribution at a stranger's account; fill this in with the real one.
   */
  twitterHandle: undefined as string | undefined,
  author: "VOLTIO",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#000000",
} as const;
