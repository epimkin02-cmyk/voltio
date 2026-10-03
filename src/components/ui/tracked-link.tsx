"use client";

import type { AnchorHTMLAttributes } from "react";

import { trackEvent, type Events } from "@/lib/tracking/events";

export interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The contact channel this link opens. */
  art: Events["kontakt_klick"]["art"];
  /** Where on the page it sits ("header", "footer", "menu"). */
  ort: Events["kontakt_klick"]["ort"];
}

/**
 * A plain `<a>` for `tel:` and `mailto:` links that reports the tap as a
 * `kontakt_klick` event — the one conversion the form cannot see.
 */
export const TrackedLink = ({ art, ort, onClick, children, ...props }: TrackedLinkProps) => (
  <a
    {...props}
    onClick={(e) => {
      trackEvent("kontakt_klick", { art, ort });
      onClick?.(e);
    }}
  >
    {children}
  </a>
);
