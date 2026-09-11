import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { StepsContent } from "../home.types";

const HEADING_ID = "steps-heading";

/**
 * Wireframe frame 1:313, drawn the way Transiett draws its "How does it
 * work": an illustration, a number and a title per step, on the mint band.
 *
 * The illustrations are flat renders on white; `mix-blend-multiply` lets the
 * band show through their white ground, which is cleaner than a cut-out (the
 * remover ate a figure's head on the third one).
 */
export const Steps = ({ content }: { content: StepsContent }) => (
  <section id="ablauf" aria-labelledby={HEADING_ID} className="slant-y scroll-mt-16 bg-surface-tint py-24 sm:py-28 lg:py-32">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-14 px-5 sm:px-8">
      <Reveal>
        <SectionHeading id={HEADING_ID} align="center">
          {content.heading}
        </SectionHeading>
      </Reveal>

      <ol className="grid w-full gap-12 sm:grid-cols-3 sm:gap-8">
        {content.items.map((item, index) => (
          <Reveal tag="li" key={item.title} delay={80 + index * 90} className="flex flex-col gap-5">
            {item.image ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 640px) 24rem, 100vw"
                className="aspect-[3/2] w-full object-contain mix-blend-multiply [filter:brightness(1.04)]"
              />
            ) : (
              <div className="aspect-[3/2] w-full rounded-card bg-surface/60" />
            )}
            <span className="font-display text-body-lg font-semibold text-primary-deep">
              {String(index + 1).padStart(2, "0")}.
            </span>
            <h3 className="text-title font-semibold text-content">{item.title}</h3>
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
