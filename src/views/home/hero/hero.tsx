import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { CheckIcon, StarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

import type { HeroContent, TrustCard } from "../home.types";

const TITLE_ID = "hero-title";

const Stars = ({ count }: { count: number }) => (
  <span className="flex items-center gap-0.5 text-star" aria-hidden>
    {Array.from({ length: count }, (_, i) => (
      <StarIcon key={i} className="size-4" />
    ))}
  </span>
);

/** One of the floating cards beside the car. */
const Card = ({ card, stars, className }: { card: TrustCard; stars?: number; className: string }) => (
  <div
    className={`flex items-center gap-3 rounded-card bg-surface px-4 py-3 text-content shadow-float ${className}`}
  >
    {card.figure ? (
      <span className="font-display text-title font-bold leading-none text-primary-deep">
        {card.figure}
      </span>
    ) : (
      <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-surface-tint text-primary">
        <CheckIcon className="size-4" />
      </span>
    )}
    <span className="flex flex-col gap-0.5">
      {stars && <Stars count={stars} />}
      <span className="max-w-[11rem] text-small font-medium leading-snug">{card.label}</span>
    </span>
  </div>
);

/**
 * Wireframe frame 1:39, reworked at the client's request: the lead form has
 * moved to the closing section, and the right half is the car on a stage —
 * a cut-out 3D render on a glowing floor, ringed by the trust cards. Holds
 * the page's `h1`.
 */
export const Hero = ({ content }: { content: HeroContent }) => (
  <section aria-labelledby={TITLE_ID} className="hero-ground relative overflow-hidden text-content-inverse">
    <div aria-hidden className="absolute inset-0 bg-scrim/40" />
    <div className="relative mx-auto grid w-full max-w-[81.5rem] items-center gap-12 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-10 lg:py-24">
      <div className="flex flex-col gap-6">
        <Reveal tag="p" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lede">
          <span className="font-display font-semibold">{content.rating.score}</span>
          <Stars count={content.rating.stars} />
          <span className="text-content-inverse-muted">{content.rating.count}</span>
        </Reveal>

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

        <Reveal delay={180} className="pt-2">
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

      {content.car && (
        <Reveal delay={150} className="relative mx-auto w-full max-w-[44rem] lg:max-w-none">
          {/* The stage: a soft green glow and a contact shadow under the car. */}
          <div
            aria-hidden
            className="absolute inset-x-[5%] top-[10%] bottom-[15%] rounded-[50%] bg-primary/35 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-[15%] bottom-[10%] h-[10%] rounded-[50%] bg-scrim blur-2xl"
          />
          <Image
            src={content.car.src}
            alt={content.car.alt}
            width={content.car.width}
            height={content.car.height}
            priority
            sizes="(min-width: 1024px) 44rem, 100vw"
            className="relative w-full drop-shadow-[0_40px_50px_rgb(0_0_0/0.5)] lg:translate-x-6 lg:scale-110"
          />

          {content.trust[0] && (
            <Card
              card={content.trust[0]}
              stars={content.rating.stars}
              className="absolute top-[6%] left-0 sm:left-[2%]"
            />
          )}
          {content.trust[1] && (
            <Card card={content.trust[1]} className="absolute right-0 bottom-[8%] sm:right-[2%]" />
          )}
          {content.trust[2] && (
            <Card card={content.trust[2]} className="absolute bottom-[-2%] left-[4%] max-sm:hidden" />
          )}
        </Reveal>
      )}
    </div>
  </section>
);
