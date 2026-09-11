import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { StepsContent } from "../home.types";

const HEADING_ID = "steps-heading";

/** Wireframe frame 1:313 — three step cards under a centred heading. */
export const Steps = ({ content }: { content: StepsContent }) => (
  <section aria-labelledby={HEADING_ID} className="slant-y bg-surface-tint py-24 sm:py-28 lg:py-32">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-12 px-5 sm:px-8">
      <Reveal>
        <SectionHeading id={HEADING_ID} align="center">
          {content.heading}
        </SectionHeading>
      </Reveal>

      <ol className="grid w-full gap-6 sm:grid-cols-3">
        {content.items.map((item, index) => (
          <Reveal
            tag="li"
            key={item}
            delay={80 + index * 90}
            className="flex min-h-[16rem] flex-col items-center justify-center gap-5 rounded-card border border-line-soft bg-surface p-8 text-center shadow-card"
          >
            <span
              aria-hidden
              className="grid size-14 place-items-center rounded-pill bg-primary font-display text-lede font-semibold text-content-inverse"
            >
              {index + 1}
            </span>
            <span className="font-display text-title font-semibold text-content">{item}</span>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={140}>
        <ButtonLink href={content.cta.href} arrow>
          {content.cta.label}
        </ButtonLink>
      </Reveal>
    </div>
  </section>
);
