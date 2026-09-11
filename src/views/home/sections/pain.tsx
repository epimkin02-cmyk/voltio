import { ButtonLink } from "@/components/ui/button";
import { PlaceholderBox } from "@/components/ui/placeholder-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { PainContent } from "../home.types";

const HEADING_ID = "pain-heading";

/** Wireframe frame 1:70 — copy left, optional media right. */
export const Pain = ({ content }: { content: PainContent }) => (
  <section aria-labelledby={HEADING_ID} className="py-16 sm:py-20 lg:py-24">
    <div className="mx-auto grid w-full max-w-[75rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,33.4rem)_minmax(0,1fr)] lg:gap-[5.75rem]">
      <div className="flex flex-col gap-6">
        <Reveal>
          <SectionHeading id={HEADING_ID}>{content.heading}</SectionHeading>
        </Reveal>
        <Reveal tag="p" delay={80} className="text-body-lg leading-relaxed text-content-muted">
          {content.body}
        </Reveal>
        <Reveal delay={140}>
          <ButtonLink href={content.cta.href} arrow>
            {content.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
      <Reveal delay={120}>
        <PlaceholderBox wedge>{content.media}</PlaceholderBox>
      </Reveal>
    </div>
  </section>
);
