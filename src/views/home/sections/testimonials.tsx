import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { TestimonialsContent } from "../home.types";

const HEADING_ID = "testimonials-heading";

/**
 * Wireframe frame 1:85 (the first social-proof block), drawn the way Transiett
 * draws its reviews: the rating at the head, three quote cards, each with the
 * seller's car underneath.
 */
export const Testimonials = ({ content }: { content: TestimonialsContent }) => (
  <section aria-labelledby={HEADING_ID} className="slant-y bg-surface-tint py-24 sm:py-28 lg:py-32">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-12 px-5 sm:px-8">
      <Reveal className="flex flex-col items-center gap-4">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <SectionHeading id={HEADING_ID} align="center">
          {content.heading}
        </SectionHeading>
        <p className="flex items-center gap-2 text-body-lg text-content-muted">
          <span className="font-display font-semibold text-content">{content.rating.score}</span>
          <span className="flex items-center gap-0.5 text-star" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className="size-4" />
            ))}
          </span>
          {content.rating.count}
        </p>
      </Reveal>

      <ul className="grid w-full gap-6 md:grid-cols-3">
        {content.items.map((item, index) => (
          <Reveal
            tag="li"
            key={item.name}
            delay={80 + index * 90}
            className="flex flex-col gap-5 rounded-card border border-line-soft bg-surface p-7 shadow-card transition duration-[var(--duration-normal)] ease-entrance hover:-translate-y-1 hover:shadow-float"
          >
            <span className="flex items-center gap-0.5 text-star" aria-label="5 von 5 Sternen">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="size-4" />
              ))}
            </span>
            <blockquote className="flex-1 text-body-lg leading-relaxed text-content">
              „{item.quote}“
            </blockquote>
            <footer className="flex flex-col items-start gap-3 border-t border-line-soft pt-4">
              <span className="flex items-baseline gap-2">
                <span className="font-display font-semibold text-content">{item.name}</span>
                <span className="text-small text-content-faint">{item.place}</span>
              </span>
              <span className="rounded-pill bg-surface-tint px-3 py-1 text-fine font-semibold text-primary-deep">
                {item.vehicle}
              </span>
            </footer>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={140}>
        <ButtonLink href={content.cta.href} arrow>
          {content.cta.label}
        </ButtonLink>
      </Reveal>
    </div>
  </section>
);
