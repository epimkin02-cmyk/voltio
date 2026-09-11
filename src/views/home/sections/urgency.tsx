import { Reveal } from "@/components/ui/reveal";

import { LeadForm } from "./lead-form";

import type { UrgencyContent } from "../home.types";

const HEADING_ID = "urgency-heading";

/**
 * Wireframe frame 1:376 — the closing argument, on the brand's deep green
 * band, with the lead form beside it (moved here from the hero at the
 * client's request). Every CTA on the page lands on `#anfrage`.
 */
export const Urgency = ({ content }: { content: UrgencyContent }) => (
  <section id="anfrage" aria-labelledby={HEADING_ID} className="hero-ground slant-t scroll-mt-16 text-content-inverse">
    <div className="mx-auto grid w-full max-w-[75rem] items-center gap-12 px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-20">
      <div className="flex flex-col gap-6">
        <Reveal tag="h2" id={HEADING_ID} className="text-heading-compact font-semibold leading-tight tracking-display sm:text-heading">
          {content.heading}
        </Reveal>
        <Reveal tag="p" delay={80} className="max-w-[40rem] text-body-lg leading-relaxed text-content-inverse-muted">
          {content.body}
        </Reveal>
      </div>
      <Reveal delay={120} className="rounded-card bg-surface p-6 text-content shadow-float sm:p-8">
        <LeadForm content={content.form} />
      </Reveal>
    </div>
  </section>
);
