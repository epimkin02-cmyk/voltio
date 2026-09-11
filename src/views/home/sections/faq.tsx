import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import { FaqItem } from "./faq-item";

import type { FaqContent } from "../home.types";

const HEADING_ID = "faq-heading";

/** Wireframe frame 1:328 — six collapsed rows under a centred heading. */
export const Faq = ({ content }: { content: FaqContent }) => (
  <section aria-labelledby={HEADING_ID} className="py-16 sm:py-20 lg:py-24">
    <div className="mx-auto flex w-full max-w-[48.5rem] flex-col gap-10 px-5 sm:px-8">
      <Reveal>
        <SectionHeading id={HEADING_ID} align="center">
          {content.heading}
        </SectionHeading>
      </Reveal>
      <Reveal delay={80} className="border-t border-line">
        {content.items.map((item) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </Reveal>
    </div>
  </section>
);
