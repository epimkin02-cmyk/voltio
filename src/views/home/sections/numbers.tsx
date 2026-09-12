import { ButtonLink } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { NumbersContent } from "../home.types";

const HEADING_ID = "numbers-heading";

/**
 * Wireframe frame 1:135 (the second social-proof block), as Transiett's
 * "in numbers": four big figures on cards.
 */
export const Numbers = ({ content }: { content: NumbersContent }) => (
  <section id="zahlen" aria-labelledby={HEADING_ID} className="slant-y scroll-mt-16 bg-surface-tint py-24 sm:py-28 lg:py-32">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-12 px-5 sm:px-8">
      <Reveal className="flex flex-col items-center gap-4">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <SectionHeading id={HEADING_ID} align="center">
          {content.heading}
        </SectionHeading>
        <p className="max-w-[40rem] text-center text-body-lg leading-relaxed text-content-muted">{content.body}</p>
      </Reveal>

      <ul className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.stats.map((stat, index) => (
          <Reveal
            tag="li"
            key={stat.label}
            delay={80 + index * 70}
            className="flex flex-col gap-3 rounded-card border border-line-soft bg-surface p-7 shadow-card transition duration-[var(--duration-normal)] ease-entrance hover:-translate-y-1 hover:shadow-float"
          >
            <CountUp
              figure={stat.figure}
              className="font-display text-display-compact font-bold leading-none tracking-display text-primary-deep"
            />
            <span className="text-body-lg leading-snug text-content-muted">{stat.label}</span>
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
