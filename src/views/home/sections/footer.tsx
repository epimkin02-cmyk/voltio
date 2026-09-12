import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

import type { FooterContent } from "../home.types";

/** Wireframe frame 1:385 — the footer, on the brand's darkest green. */
export const SiteFooter = ({ content }: { content: FooterContent }) => (
  <footer className="bg-surface-deep text-content-inverse">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-10 px-5 py-14 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            aria-label={`${content.brand} – Startseite`}
            className="self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-inverse"
          >
            <Logo tone="light" />
          </Link>
          <p className="max-w-[24rem] text-body text-content-inverse-muted">{content.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={content.phone.href}
            className="flex items-center gap-2 font-display text-body-lg font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-inverse"
          >
            <PhoneIcon className="size-5" />
            {content.phone.label}
          </a>
          <a
            href={content.email.href}
            className="text-body-lg text-content-inverse-muted hover:text-content-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-inverse"
          >
            {content.email.label}
          </a>
          <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-line-inverse pt-6 text-small text-content-inverse-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{content.copyright}</p>
        <ul className="flex gap-6">
          {content.legal.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="hover:text-content-inverse">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
