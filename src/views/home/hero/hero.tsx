import { ButtonLink } from "@/components/ui/button";
import { CheckIcon, StarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

import { LeadForm } from "./lead-form";

import type { HeroContent } from "../home.types";

const TITLE_ID = "hero-title";

/**
 * Wireframe frame 1:39 — copy left, lead form right, on a dark ground.
 * Holds the page's `h1`.
 */
export const Hero = ({ content }: { content: HeroContent }) => (
  <section aria-labelledby={TITLE_ID} className="hero-ground relative text-content-inverse">
    <div aria-hidden className="absolute inset-0 bg-scrim/40" />
    <div className="relative mx-auto grid w-full max-w-[81.5rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,39.8rem)] lg:items-center lg:gap-20 lg:py-24">
      <div className="flex flex-col gap-6 lg:max-w-[36.5rem]">
        <Reveal tag="p" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lede">
          <span className="font-display font-semibold">{content.rating.score}</span>
          <span className="flex items-center gap-0.5 text-star" aria-hidden>
            {Array.from({ length: content.rating.stars }, (_, i) => (
              <StarIcon key={i} className="size-5" />
            ))}
          </span>
          <span className="text-content-inverse-muted">{content.rating.count}</span>
        </Reveal>

        {/* The frame breaks the line after "in"; Poppins Bold runs wider than
            the frame's Inter, so the break is left to the column and the two
            halves simply read on. */}
        <Reveal tag="h1" id={TITLE_ID} delay={60} className="text-display-compact font-bold leading-tight tracking-display text-pretty sm:text-display">
          {content.title[0]} {content.title[1]}
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

        <Reveal delay={180} className="pt-2">
          <ButtonLink href={content.cta.href} variant="light" size="lg">
            {content.cta.label}
          </ButtonLink>
        </Reveal>

        <Reveal tag="p" delay={240} className="text-body font-semibold text-content-inverse-muted">
          {content.note}
        </Reveal>
      </div>

      <Reveal id="anfrage" delay={120} className="scroll-mt-28 rounded-card bg-surface p-6 text-content shadow-float sm:p-8 lg:p-10">
        <LeadForm content={content.form} />
      </Reveal>
    </div>
  </section>
);
