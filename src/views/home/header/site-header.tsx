"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

import type { HeaderContent } from "../home.types";

/**
 * Wireframe frame 1:22 — logo, section links, phone and CTA in a 64px bar.
 * Sticky; it grows a shadow once the page has moved under it, so the bar
 * reads as floating over content rather than as part of the hero.
 */
export const SiteHeader = ({ content }: { content: HeaderContent }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-surface/90 backdrop-blur transition-shadow duration-[var(--duration-normal)] ease-entrance ${
        scrolled ? "border-line-soft shadow-card" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[81.5rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          aria-label={`${content.brand} – Startseite`}
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Logo />
        </Link>

        <nav aria-label="Sektionen" className="max-lg:hidden">
          <ul className="flex items-center gap-8">
            {content.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-small font-semibold text-content transition duration-[var(--duration-fast)] ease-entrance hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
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
              <PhoneIcon className="size-4" />
            </span>
            <span className="max-md:sr-only">{content.phone.label}</span>
          </a>
          <ButtonLink href={content.cta.href} className="max-sm:hidden">
            {content.cta.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
};
