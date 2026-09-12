import { Float } from "@/components/animation/float";
import { Spring } from "@/components/animation/springs/spring";
import { ButtonLink } from "@/components/ui/button";
import { CheckIcon, StarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

import { HeroVideo } from "./hero-video";

import type { HeroContent, TrustCard } from "../home.types";

const TITLE_ID = "hero-title";

const Stars = ({ count }: { count: number }) => (
  <span className="flex items-center gap-0.5 text-star" aria-hidden>
    {Array.from({ length: count }, (_, i) => (
      <StarIcon key={i} className="size-4" />
    ))}
  </span>
);

const Card = ({ card, className }: { card: TrustCard; className: string }) => (
  <div className={`flex items-center gap-3 rounded-card bg-surface/95 px-4 py-3 text-content shadow-float backdrop-blur ${className}`}>
    {card.figure ? (
      <span className="font-display text-title font-bold leading-none text-primary-deep">{card.figure}</span>
    ) : (
      <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-surface-tint text-primary">
        <CheckIcon className="size-4" />
      </span>
    )}
    <span className="max-w-[12rem] text-small font-medium leading-snug">{card.label}</span>
  </div>
);

/**
 * Transiett's hero, for Voltio: real footage full-bleed behind the copy — a
 * drone following a Model Y through serpentines, then the stop at the
 * lay-by — with the copy on a dark gradient at the left and the rating card
 * pinned bottom-right, as Transiett pins theirs. Holds the page's `h1`.
 */
export const Hero = ({ content }: { content: HeroContent }) => (
  <section aria-labelledby={TITLE_ID} className="relative overflow-hidden text-content-inverse">
    <HeroVideo scenes={content.video} />
    {/* Legibility: a deep-green wash from the left where the copy sits, and a
        vignette along the bottom under the cards. */}
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,var(--surface-deep)_0%,rgb(12_40_29/0.85)_30%,rgb(12_40_29/0.35)_60%,rgb(12_40_29/0.15)_100%)]" />
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgb(12_40_29/0.7))]" />

    <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[81.5rem] flex-col justify-center px-5 py-16 sm:px-8 lg:py-24">
      <div className="flex max-w-[38rem] flex-col gap-6">
        <Reveal tag="h1" id={TITLE_ID} delay={60} className="text-display-compact font-bold leading-tight tracking-display text-pretty sm:text-display">
          {content.title}
        </Reveal>

        <Reveal tag="ul" delay={120} className="flex flex-col gap-3">
          {content.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-4 text-body-lg leading-normal sm:text-lede">
              <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-pill bg-surface text-primary">
                <CheckIcon className="size-3.5" />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </Reveal>

        <Reveal delay={180} className="pt-3">
          <ButtonLink href={content.cta.href} variant="light" size="lg" arrow>
            {content.cta.label}
          </ButtonLink>
        </Reveal>

        <Reveal tag="ul" delay={240} className="flex flex-wrap gap-x-5 gap-y-2 text-small font-semibold text-content-inverse-muted">
          {content.assurances.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="size-4 text-primary" />
              {item}
            </li>
          ))}
        </Reveal>
      </div>

      {/* The rating, pinned bottom-right on the footage, and one promise
          card floating above it. */}
      <div className="mt-12 flex flex-col items-start gap-4 lg:absolute lg:right-8 lg:bottom-10 lg:mt-0 lg:items-end">
        {content.trust[1] && (
          <Spring mode="once" from={{ opacity: 0, y: 16, scale: 0.9 }} to={{ opacity: 1, y: 0, scale: 1 }} delayIn={700} config={{ tension: 220, friction: 20 }}>
            <Float amplitude={5}>
              <Card card={content.trust[1]} className="" />
            </Float>
          </Spring>
        )}
        <Spring mode="once" from={{ opacity: 0, y: 16 }} to={{ opacity: 1, y: 0 }} delayIn={500} config={{ tension: 200, friction: 22 }}>
          <a
            href={content.rating.href}
            className="flex items-center gap-3 rounded-card bg-surface-deep/70 px-5 py-4 text-content-inverse shadow-float ring-1 ring-line-inverse backdrop-blur transition duration-[var(--duration-fast)] ease-entrance hover:bg-surface-deep/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-inverse"
          >
            <span className="font-display text-title font-bold">{content.rating.score}</span>
            <Stars count={content.rating.stars} />
            <span className="text-body font-semibold underline underline-offset-4">{content.rating.count}</span>
          </a>
        </Spring>
      </div>
    </div>
  </section>
);
