import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import { FaqItem } from "./faq-item";

import type { FaqContent } from "../home.types";

const HEADING_ID = "faq-heading";

/** Wireframe frame 1:328 — six collapsed rows, with an illustration beside them from `lg`. */
/** FAQPage structured data — the same questions and answers, for search. */
const faqJsonLd = (content: FaqContent) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });

export const Faq = ({ content }: { content: FaqContent }) => (
  <section id="faq" aria-labelledby={HEADING_ID} className="scroll-mt-16 py-16 sm:py-20 lg:py-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(content) }} />
    <div className="mx-auto grid w-full max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] lg:items-start lg:gap-20">
      <div className="flex flex-col gap-8 lg:sticky lg:top-28">
        <Reveal className="flex flex-col gap-4">
          <SectionHeading id={HEADING_ID}>{content.heading}</SectionHeading>
          <p className="max-w-[28rem] text-body-lg leading-relaxed text-content-muted">{content.body}</p>
        </Reveal>
        {content.image && (
          <Reveal delay={80} className="max-lg:hidden">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              sizes="(min-width: 1024px) 30rem, 0px"
              className="w-full max-w-[30rem] object-contain mix-blend-multiply [filter:brightness(1.04)]"
            />
          </Reveal>
        )}
      </div>
      <Reveal delay={80} className="border-t border-line">
        {content.items.map((item) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </Reveal>
    </div>
  </section>
);
