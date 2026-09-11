import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

import type { HeaderContent } from "../home.types";

const NAV_LINK =
  "font-display text-small font-semibold text-content transition duration-[var(--duration-fast)] ease-entrance hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

/**
 * Wireframe frame 1:22, slimmed: logo, section links, phone, CTA in a 64px
 * bar. Sticky, white, a soft rule underneath.
 */
export const SiteHeader = ({ content }: { content: HeaderContent }) => (
  <header className="sticky top-0 z-40 border-b border-line-soft bg-surface/95 backdrop-blur">
    <div className="mx-auto flex h-16 w-full max-w-[81.5rem] items-center justify-between gap-6 px-5 sm:px-8">
      <Link
        href="/"
        aria-label={`${content.brand} – Startseite`}
        className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <Logo />
      </Link>

      <nav aria-label="Sektionen" className="max-lg:hidden">
        <ul className="flex items-center gap-8">
          {content.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={NAV_LINK}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3 sm:gap-5">
        <a
          href={content.phone.href}
          className="group flex items-center gap-2 font-display text-body font-semibold text-content hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="grid size-9 place-items-center rounded-pill bg-surface-tint text-primary transition duration-[var(--duration-fast)] ease-entrance group-hover:bg-primary group-hover:text-content-inverse">
            <PhoneIcon className="size-4.5" />
          </span>
          <span className="max-md:sr-only">{content.phone.label}</span>
        </a>
        <ButtonLink href={content.cta.href} className="max-sm:hidden !h-10 !px-5">
          {content.cta.label}
        </ButtonLink>
      </div>
    </div>
  </header>
);
