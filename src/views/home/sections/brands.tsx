import Image from "next/image";

import { Parallax } from "@/components/animation/parallax";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { BrandsContent } from "../home.types";

const HEADING_ID = "brands-heading";

/**
 * "Most popular brands at Transiett", for Voltio: heading and an illustration
 * on the left, a grid of logo tiles on the right, on the angled mint wedge.
 *
 * Each logo is a monochrome SVG used as a **CSS mask** over `currentColor`,
 * so the tiles can recolour on hover without a second asset — and so a
 * logo pulled from a public icon set is rendered in our ink, not its own.
 */
export const Brands = ({ content }: { content: BrandsContent }) => (
  <section aria-labelledby={HEADING_ID} className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
    {/* Transiett's diagonal wedge: mint, cut from the top-right down to the
        bottom-left, behind the tiles. */}
    <div
      aria-hidden
      className="absolute inset-y-0 right-0 w-[70%] bg-surface-tint [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] max-lg:hidden"
    />
    <div className="relative mx-auto grid w-full max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={40}>
          <SectionHeading id={HEADING_ID}>{content.heading}</SectionHeading>
        </Reveal>
        <Reveal tag="p" delay={80} className="text-body-lg leading-relaxed text-content-muted">
          {content.body}
        </Reveal>
        {content.image && (
          <Parallax distance={60} className="mt-4 max-lg:hidden">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              sizes="26rem"
              className="w-full max-w-[24rem] object-contain mix-blend-multiply [filter:brightness(1.04)]"
            />
          </Parallax>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {content.brands.map((brand, index) => (
            <Reveal
              tag="li"
              key={brand.slug}
              delay={40 + index * 35}
              className="group aspect-square rounded-card bg-surface shadow-card transition duration-[var(--duration-normal)] ease-entrance hover:-translate-y-1 hover:shadow-float"
            >
              <div className="grid size-full place-items-center p-5 text-content transition duration-[var(--duration-normal)] ease-entrance group-hover:text-primary">
                <span
                  role="img"
                  aria-label={brand.name}
                  title={brand.name}
                  className="block size-full bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                  style={{ maskImage: `url(/assets/brands/${brand.slug}.svg)`, WebkitMaskImage: `url(/assets/brands/${brand.slug}.svg)` }}
                />
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal tag="p" delay={200} className="text-body text-content-faint lg:text-right">
          {content.more}
        </Reveal>
      </div>
    </div>
  </section>
);
