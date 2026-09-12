"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useCookieStore } from "@/components/common/Cookie/cookieStore";
import { useLeadModal } from "@/components/lead/lead-modal-store";
import { LEAD_HREF } from "@/components/ui/button";

/** The href that opens the cookie preferences instead of navigating. */
export const COOKIES_HREF = "#cookies";

export interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * A text link that knows the page's two "virtual" targets: `#anfrage` opens
 * the lead popup and `#cookies` opens the cookie preferences. Every other
 * href is a plain link. Section anchors are written as `/#id`, so they work
 * from the legal pages as well as from the home page.
 */
export const SmartLink = ({ href, children, className }: SmartLinkProps) => {
  const openLead = useLeadModal((s) => s.openModal);
  const openCookies = useCookieStore((s) => s.openModal);

  if (href === LEAD_HREF || href === COOKIES_HREF) {
    const onClick = href === LEAD_HREF ? openLead : openCookies;
    return (
      <button type="button" onClick={onClick} className={`cursor-pointer text-left ${className ?? ""}`}>
        {children}
      </button>
    );
  }
  const target = href.startsWith("#") ? `/${href}` : href;
  return (
    <Link href={target} className={className}>
      {children}
    </Link>
  );
};
