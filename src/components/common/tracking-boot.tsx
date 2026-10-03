// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { CONSENT_EVENT, readConsent, type CookieConsent } from "@/components/common/Cookie/cookieStore";
import { trackEvent, trackOnce } from "@/lib/tracking/events";
import { startPixel } from "@/lib/tracking/pixel";
import { captureAttribution } from "@/lib/tracking/session";

/**
 * Vercel Web Analytics is cookieless; it runs unless the visitor has turned
 * "Statistik" off. Checked per event, so a later change applies at once.
 */
const beforeSend = (event: BeforeSendEvent) => {
  const consent = readConsent();
  return consent && !consent.analytics ? null : event;
};

/** Scroll milestones of the home page, as a share of the whole document. */
const DEPTHS = [50, 90] as const;

/**
 * Mount once in the root layout. Remembers the campaign parameters the
 * visitor arrived with, arms the Meta Pixel (dormant until "Marketing"
 * consent), mounts Vercel Web Analytics and reports the page-level events
 * no component owns: the cookie decision and how far people scroll.
 */
export const TrackingBoot = () => {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    startPixel();
  }, []);

  useEffect(() => {
    const onConsent = (event: Event) => {
      const consent = (event as CustomEvent<CookieConsent>).detail;
      if (!consent) return;
      const auswahl =
        consent.analytics && consent.marketing ? "alle" : !consent.analytics && !consent.marketing ? "notwendige" : "eigene";
      trackEvent("einwilligung", { auswahl, statistik: consent.analytics, marketing: consent.marketing });
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    let ticking = false;
    const measure = () => {
      ticking = false;
      const root = document.documentElement;
      const total = root.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const seen = Math.round((window.scrollY / total) * 100);
      for (const depth of DEPTHS) {
        if (seen >= depth) trackOnce("scrolltiefe", { tiefe: depth }, `scrolltiefe-${depth}`);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return <Analytics beforeSend={beforeSend} />;
};
