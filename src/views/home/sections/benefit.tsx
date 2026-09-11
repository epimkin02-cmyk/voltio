import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PlaceholderBox } from "@/components/ui/placeholder-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { BenefitContent } from "../home.types";

export interface BenefitProps {
  content: BenefitContent;
  index: number;
  /** Media on the left (frames 1:96 and 1:122) or on the right (1:109). */
  mediaSide: "start" | "end";
}

/** Wireframe frames 1:96 / 1:109 / 1:122 — three alternating benefit blocks. */
export const Benefit = ({ content, index, mediaSide }: BenefitProps) => {
  const headingId = `benefit-${index}-heading`;
  return (
    <section id={index === 1 ? "vorteile" : undefined} aria-labelledby={headingId} className="scroll-mt-16 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid w-full max-w-[75rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-[5.75rem]">
        <Reveal
          delay={100}
          className={mediaSide === "start" ? "lg:order-1" : "lg:order-2"}
        >
          <PlaceholderBox wedge image={content.image}>
            <strong className="font-semibold text-content">{content.media.strong}</strong>
            {content.media.rest}
          </PlaceholderBox>
        </Reveal>
        <div className={`flex flex-col gap-5 ${mediaSide === "start" ? "lg:order-2" : "lg:order-1"}`}>
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={40}>
            <SectionHeading id={headingId}>{content.heading}</SectionHeading>
          </Reveal>
          <Reveal tag="p" delay={80} className="text-body-lg leading-relaxed text-content-muted">
            {content.body}
          </Reveal>
          <Reveal delay={140} className="pt-2">
            <ButtonLink href={content.cta.href} arrow>
              {content.cta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
