"use client";

import { animated, useTransition } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

import type { HeaderContent } from "../home.types";

const MENU_ID = "site-menu";

/** Section anchors are written as `#id`; `/#id` also works from the legal pages. */
const toHref = (href: string) => (href.startsWith("#") ? `/${href}` : href);

/**
 * Wireframe frame 1:22 — logo, section links, phone and CTA in a 64px bar.
 * Sticky; it grows a shadow once the page has moved under it. Below `lg`
 * the section links live in a menu that drops from the bar (a spring), with
 * the CTA at its foot — most visitors arrive on a phone, and the links were
 * simply gone there before.
 */
export const SiteHeader = ({ content }: { content: HeaderContent }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const stopScroll = useScroll((s) => s.stop);
  const startScroll = useScroll((s) => s.start);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The open menu pauses the page under it and closes on Escape or on a
  // resize up to the desktop layout, where the links are in the bar again.
  useEffect(() => {
    if (!open) return;
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onWide = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
      startScroll();
    };
  }, [open, stopScroll, startScroll]);

  const panel = useTransition(open, {
    from: { opacity: 0, y: -12 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -8 },
    config: { tension: 320, friction: 30 },
  });

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-surface/90 backdrop-blur transition-shadow duration-[var(--duration-normal)] ease-entrance ${
        scrolled || open ? "border-line-soft shadow-card" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[81.5rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          aria-label={`${content.brand} – Startseite`}
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Sektionen" className="max-lg:hidden">
          <ul className="flex items-center gap-8">
            {content.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={toHref(item.href)}
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

          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-control text-content transition duration-[var(--duration-fast)] ease-entrance hover:bg-surface-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {panel((style, show) =>
        show ? (
          <animated.div
            id={MENU_ID}
            style={{ opacity: style.opacity, transform: style.y.to((y) => `translateY(${y}px)`) }}
            className="absolute inset-x-0 top-full border-b border-line-soft bg-surface shadow-float lg:hidden"
          >
            <nav aria-label="Sektionen" className="mx-auto flex w-full max-w-[81.5rem] flex-col gap-2 px-5 py-5 sm:px-8">
              <ul className="flex flex-col">
                {content.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={toHref(item.href)}
                      onClick={() => setOpen(false)}
                      className="block rounded-control px-3 py-3 font-display text-body-lg font-semibold text-content transition duration-[var(--duration-fast)] ease-entrance hover:bg-surface-tint hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 border-t border-line-soft px-3 pt-4">
                <a
                  href={content.phone.href}
                  className="flex items-center gap-2 font-display text-body-lg font-semibold text-content hover:text-primary"
                >
                  <PhoneIcon className="size-5 text-primary" />
                  {content.phone.label}
                </a>
                <div onClick={() => setOpen(false)}>
                  <ButtonLink href={content.cta.href} className="w-full">
                    {content.cta.label}
                  </ButtonLink>
                </div>
              </div>
            </nav>
          </animated.div>
        ) : null,
      )}
    </header>
  );
};
