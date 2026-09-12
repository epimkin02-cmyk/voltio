import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { PhoneIcon, StarIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

import type { FooterContent } from "../home.types";

const SOCIAL: Record<FooterContent["social"][number]["name"], { label: string; path: string }> = {
  instagram: {
    label: "Instagram",
    path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7zm5 3.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM17.5 6a1 1 0 110 2 1 1 0 010-2z",
  },
  facebook: {
    label: "Facebook",
    path: "M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.4V5.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.2v3h2.5v7h2.8z",
  },
  linkedin: {
    label: "LinkedIn",
    path: "M6.4 9.5h2.6V19H6.4V9.5zM7.7 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm3.1 4.5h2.5v1.3c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 2 3.5 4.5V19H17v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-2.6V9.5z",
  },
};

/**
 * Transiett's footer, for Voltio: the deep-green ground, a faded lineup of
 * cars as a watermark behind it, brand and rating on the left, link columns
 * and opening hours on the right, social marks and the legal line under a
 * rule.
 */
export const SiteFooter = ({ content }: { content: FooterContent }) => (
  <footer className="hero-ground relative overflow-hidden text-content-inverse">
    {content.watermark && (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* The watermark: the lineup, darkened, faded, and masked so it
            dissolves into the ground at the top and the sides. */}
        <Image
          src={content.watermark.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-25 mix-blend-luminosity [mask-image:linear-gradient(180deg,transparent_0%,black_45%,black_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--surface-deep)_0%,transparent_30%,transparent_70%,var(--surface-deep)_100%)] opacity-70" />
      </div>
    )}

    <div className="relative mx-auto flex w-full max-w-[75rem] flex-col gap-12 px-5 pt-16 pb-10 sm:px-8 lg:pt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_repeat(3,minmax(0,1fr))] lg:gap-10">
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            aria-label={`${content.brand} – Startseite`}
            className="self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-inverse"
          >
            <Logo tone="light" />
          </Link>
          <p className="text-body leading-relaxed text-content-inverse-muted">{content.tagline}</p>
          <SmartLink
            href={content.rating.href}
            className="flex flex-wrap items-center gap-2 text-body font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-inverse"
          >
            <span className="font-display text-title">{content.rating.score}</span>
            <span className="flex items-center gap-0.5 text-star" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="size-4" />
              ))}
            </span>
            <span className="underline underline-offset-4">{content.rating.label}</span>
          </SmartLink>
          <div className="flex flex-col gap-2 pt-2">
            <a href={content.phone.href} className="flex items-center gap-2 font-display text-body-lg font-semibold hover:text-primary">
              <PhoneIcon className="size-5" />
              {content.phone.label}
            </a>
            <a href={content.email.href} className="text-body text-content-inverse-muted hover:text-content-inverse">
              {content.email.label}
            </a>
          </div>
        </div>

        {content.columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-4">
            <h3 className="font-display text-body-lg font-semibold">{column.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className="text-body text-content-inverse-muted underline-offset-4 transition duration-[var(--duration-fast)] ease-entrance hover:text-content-inverse hover:underline"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-body-lg font-semibold">{content.hours.title}</h3>
          <dl className="flex flex-col gap-2.5 text-body text-content-inverse-muted">
            {content.hours.rows.map((row) => (
              <div key={row.day} className="flex justify-between gap-4">
                <dt>{row.day}</dt>
                <dd className="text-content-inverse">{row.time}</dd>
              </div>
            ))}
          </dl>
          <div className="pt-2">
            <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-t border-line-inverse pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-content-inverse-muted">{content.copyright}</p>
        {/* Profiles without a URL yet are simply not rendered — a dead
            icon would be a link to nowhere. */}
        <ul className="flex gap-3">
          {content.social.filter((item) => item.href).map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                aria-label={SOCIAL[item.name].label}
                className="grid size-10 place-items-center rounded-pill bg-surface text-primary-deep transition duration-[var(--duration-fast)] ease-entrance hover:bg-primary hover:text-content-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-inverse"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
                  <path d={SOCIAL[item.name].path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
