import { ButtonLink } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

import type { UrgencyContent } from "../home.types";

const HEADING_ID = "urgency-heading";

/**
 * Wireframe frame 1:376 — the closing argument on the brand's deep green
 * band. One button; it opens the lead popup, as every CTA on the page does.
 */
export const Urgency = ({ content }: { content: UrgencyContent }) => (
  <section id="anfrage" aria-labelledby={HEADING_ID} className="hero-ground slant-t scroll-mt-16 text-content-inverse">
    <div className="mx-auto flex w-full max-w-[52rem] flex-col items-center gap-6 px-5 pt-28 pb-20 text-center sm:px-8 sm:pt-32 sm:pb-24">
      <Reveal tag="h2" id={HEADING_ID} className="text-heading-compact font-semibold leading-tight tracking-display text-balance sm:text-heading">
        {content.heading}
      </Reveal>
      <Reveal tag="p" delay={80} className="max-w-[44rem] text-body-lg leading-relaxed text-content-inverse-muted">
        {content.body}
      </Reveal>
      <Reveal delay={140} className="pt-2">
        <ButtonLink href={content.cta.href} variant="light" size="lg" arrow>
          {content.cta.label}
        </ButtonLink>
      </Reveal>
      <Reveal tag="ul" delay={200} className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-small font-semibold text-content-inverse-muted">
        {content.assurances.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckIcon className="size-4 text-primary" />
            {item}
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);
