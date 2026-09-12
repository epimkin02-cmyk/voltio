import Image from "next/image";

import { Parallax } from "@/components/animation/parallax";
import { ButtonLink } from "@/components/ui/button";
import { CrossIcon } from "@/components/ui/icons";
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
        <Reveal tag="ul" delay={60} className="flex flex-col gap-2.5">
          {content.pains.map((pain) => (
            <li key={pain} className="flex items-start gap-3 text-body-lg text-content">
              <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-pill bg-danger/10 text-danger">
                <CrossIcon className="size-3" />
              </span>
              {pain}
            </li>
          ))}
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
      <Reveal delay={120} className="relative">
        <PlaceholderBox wedge image={content.image}>
          {content.heading}
        </PlaceholderBox>
        {/* The illustration hangs off the photo's corner on its own depth:
            it drifts faster than the page, so the two read as layers. */}
        {content.illustration && (
          <Parallax distance={-90} distanceX={-30} className="absolute -bottom-10 -left-10 w-[46%] max-lg:hidden">
            <div className="rounded-card bg-surface p-3 shadow-float">
              <Image
                src={content.illustration.src}
                alt={content.illustration.alt}
                width={content.illustration.width}
                height={content.illustration.height}
                sizes="16rem"
                className="w-full rounded-control object-contain"
              />
            </div>
          </Parallax>
        )}
      </Reveal>
    </div>
  </section>
);
