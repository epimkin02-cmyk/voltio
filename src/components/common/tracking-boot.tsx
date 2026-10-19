// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { CONSENT_EVENT, readConsent, type CookieConsent } from "@/components/common/Cookie/cookieStore";
import { trackEvent, trackOnce } from "@/lib/tracking/events";
import { startLeadmetrics } from "@/lib/tracking/leadmetrics";
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
const DEPTHS = [25, 50, 75, 100] as const;
/** Seconds with the tab visible after which `verweildauer` is reported. */
const DWELL = [30, 60, 120, 300] as const;

/** A section's name: its id, else its heading id without the suffix (as `ctaSource`). */
const sectionName = (el: Element) =>
  el.id || el.getAttribute("aria-labelledby")?.replace(/-(title|heading)$/, "") || "";

/**
 * Mount once in the root layout. Remembers the campaign parameters the
 * visitor arrived with, arms the Meta Pixel and the Leadmetrics journey
 * script (both dormant until "Marketing" consent), mounts Vercel Web
 * Analytics and reports the page-level events no component owns: the cookie
 * decision, which sections were seen, how far people scroll and how long they
 * stay (each once per page load).
 */
export const TrackingBoot = () => {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    startPixel();
    startLeadmetrics();
  }, []);

  useEffect(() => {
    const onConsent = (event: Event) => {
      const consent = (event as CustomEvent<CookieConsent>).detail;
      if (!consent) return;
      const wahl =
        consent.analytics && consent.marketing ? "alle" : !consent.analytics && !consent.marketing ? "notwendige" : "eigene";
      trackEvent("einwilligung", { wahl, marketing: consent.marketing });
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
        if (seen >= depth) trackOnce("scroll_tiefe", { tiefe: depth }, `scroll_tiefe-${depth}`);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // A section counts as seen once 30 % of it, or half the window, is in view.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = sectionName(entry.target);
          if (!name || !entry.isIntersecting) continue;
          if (entry.intersectionRatio < 0.3 && entry.intersectionRect.height < window.innerHeight * 0.5) continue;
          trackOnce("section_gesehen", { section: name }, `section_gesehen-${name}`);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3] },
    );
    document.querySelectorAll("main section").forEach((section) => observer.observe(section));

    // The dwell clock only runs while the tab is visible.
    let visible = 0;
    const clock = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      visible += 1;
      for (const seconds of DWELL) {
        if (visible === seconds) trackOnce("verweildauer", { sekunden: seconds }, `verweildauer-${seconds}`);
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      window.clearInterval(clock);
    };
  }, [pathname]);

  return <Analytics beforeSend={beforeSend} />;
};
