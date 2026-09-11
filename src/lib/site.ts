/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "VOLTIO",
  /** Written from the hero's own promise, for a German search result. */
  description:
    "Voltio verkauft dein Elektroauto in Ø 5 Tagen zum Bestpreis: Angebote aus dem gesamten DACH-Raum, alles aus einer Hand von Angebot bis Abholung, Geld nach 5 Tagen auf dem Wunschkonto.",
  /** Public origin, no trailing slash. Set `NEXT_PUBLIC_SITE_URL` in production. */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/open-graph.png",
  twitterHandle: undefined as string | undefined,
  author: "VOLTIO",
  locale: "de_DE",
  /** Browser theme-color (address bar / PWA) — the brand's deep green. */
  themeColor: "#0e5c46",
} as const;
