import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";

import type { HeaderContent } from "../home.types";

/**
 * Wireframe frame 1:22 — logo left, phone + CTA right. No nav in the frame,
 * so none here. Sticky, white, a soft rule underneath once content scrolls
 * behind it.
 */
export const SiteHeader = ({ content }: { content: HeaderContent }) => (
  <header className="sticky top-0 z-40 border-b border-line-soft bg-surface/95 backdrop-blur">
    <div className="mx-auto flex h-[4.5rem] w-full max-w-[81.5rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[5.75rem]">
      <Link
        href="/"
        aria-label={`${content.brand} – Startseite`}
        className="font-display text-title font-bold tracking-[0.18em] text-primary-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {content.brand}
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href={content.phone.href}
          className="group flex items-center gap-2 font-display text-body font-semibold text-content hover:text-primary sm:text-title focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="grid size-10 place-items-center rounded-pill bg-surface-tint text-primary transition duration-[var(--duration-fast)] ease-entrance group-hover:bg-primary group-hover:text-content-inverse sm:size-11">
            <PhoneIcon className="size-5" />
          </span>
          <span className="max-sm:sr-only">{content.phone.label}</span>
        </a>
        <ButtonLink href={content.cta.href} className="max-sm:hidden">
          {content.cta.label}
        </ButtonLink>
      </div>
    </div>
  </header>
);
