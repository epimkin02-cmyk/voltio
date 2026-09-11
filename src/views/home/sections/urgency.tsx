import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

import type { UrgencyContent } from "../home.types";

const HEADING_ID = "urgency-heading";

/**
 * Wireframe frame 1:376 — the closing argument. Set on the brand's deep green
 * band, the way Transiett closes its own page ("Need to sell car?").
 */
export const Urgency = ({ content }: { content: UrgencyContent }) => (
  <section aria-labelledby={HEADING_ID} className="hero-ground slant-t text-content-inverse">
    <div className="mx-auto flex w-full max-w-[52rem] flex-col items-center gap-6 px-5 pt-28 pb-20 text-center sm:px-8 sm:pt-32 sm:pb-24">
      <Reveal tag="h2" id={HEADING_ID} className="text-heading-compact font-semibold leading-tight tracking-display text-balance sm:text-heading">
        {content.heading}
      </Reveal>
      <Reveal tag="p" delay={80} className="max-w-[46rem] text-body-lg leading-relaxed text-content-inverse-muted">
        {content.body}
      </Reveal>
      <Reveal delay={140} className="pt-2">
        <ButtonLink href={content.cta.href} variant="light" arrow>
          {content.cta.label}
        </ButtonLink>
      </Reveal>
    </div>
  </section>
);
