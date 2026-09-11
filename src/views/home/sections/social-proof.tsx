import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { SocialProofContent } from "../home.types";

/**
 * Wireframe frames 1:85 and 1:135 — the same composition twice on the page,
 * so the heading id is passed in to keep both unique.
 */
export const SocialProof = ({ content, id }: { content: SocialProofContent; id: string }) => (
  <section aria-labelledby={id} className="slant-y bg-surface-tint py-24 sm:py-28 lg:py-32">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-10 px-5 sm:px-8">
      <Reveal>
        <SectionHeading id={id} align="center">
          {content.heading}
        </SectionHeading>
      </Reveal>
      <Reveal delay={80} className="w-full">
        <div className="flex min-h-[16rem] w-full items-center justify-center rounded-card border border-line-soft bg-surface p-10 shadow-card sm:min-h-[19.5rem]">
          <p className="font-display text-title font-semibold text-content">{content.box}</p>
        </div>
      </Reveal>
      <Reveal delay={140}>
        <ButtonLink href={content.cta.href} arrow>
          {content.cta.label}
        </ButtonLink>
      </Reveal>
    </div>
  </section>
);
