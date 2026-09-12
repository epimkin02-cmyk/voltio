"use client";

import { animated } from "@react-spring/web";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useProgressTrigger } from "@/hooks/animation/use-progress-trigger";

import type { CategoriesContent, CategoryLane } from "../home.types";

const HEADING_ID = "categories-heading";

/**
 * How far, in viewport widths, a car travels over the section's scroll.
 * Cars start fully off-screen on their side and cross the whole stage, so a
 * reader who keeps scrolling sees them keep driving.
 */
const TRAVEL = 1.15;

/**
 * Transiett's "Key Categories", pushed further: two lanes of real cut-out
 * EVs that drive in from opposite edges as the section scrolls into view and
 * keep rolling for as long as the reader scrolls. The whole thing is one
 * scroll-progress spring; each car reads it at its own speed, so the lane
 * spreads out like traffic rather than moving as one block.
 *
 * The stage is `sticky` inside a tall section, which is what gives the
 * scroll its length: the cars have a full extra viewport of travel before
 * the page moves on.
 */
export const Categories = ({ content }: { content: CategoriesContent }) => {
  const ref = useRef<HTMLElement>(null);
  const { interpolatedProgress } = useProgressTrigger({
    elementRef: ref,
    start: "top bottom",
    end: "bottom top",
    config: { tension: 90, friction: 22 },
  });

  return (
    <section
      ref={ref}
      id="kategorien"
      aria-labelledby={HEADING_ID}
      className="relative scroll-mt-16 lg:h-[190svh]"
    >
      <div className="flex flex-col gap-12 overflow-hidden py-16 sm:py-20 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:justify-center lg:py-0">
        <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-4 px-5 text-center sm:px-8">
          <Reveal className="flex flex-col items-center gap-4">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading id={HEADING_ID} align="center">
              {content.heading}
            </SectionHeading>
            <p className="max-w-[44rem] text-body-lg leading-relaxed text-content-muted">{content.body}</p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 lg:gap-4">
          {content.lanes.map((lane, index) => (
            <Lane key={lane.title} lane={lane} progress={interpolatedProgress} index={index} />
          ))}
        </div>

        <Reveal className="flex justify-center">
          <ButtonLink href={content.cta.href} arrow>
            {content.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
};

interface LaneProps {
  lane: CategoryLane;
  progress: ReturnType<typeof useProgressTrigger>["interpolatedProgress"];
  index: number;
}

/** A car's rendered width, in units of lane height (the cut-outs are ~2.7:1). */
const CAR_ASPECT = 2.72;
/** Gap between cars in the convoy, as a fraction of a car's width. */
const CONVOY_GAP = 0.28;

const Lane = ({ lane, progress, index }: LaneProps) => {
  const dir = lane.from === "left" ? 1 : -1;
  // The viewport width lives in a ref that starts at the design width on
  // both server and client, and is corrected after mount — reading `window`
  // during render would make the first client paint disagree with the SSR
  // markup (a hydration mismatch). Scroll re-interpolates the transforms
  // straight away, so the correction is never visible.
  const vwRef = useRef(1440);
  useEffect(() => {
    const set = () => {
      vwRef.current = window.innerWidth;
    };
    set();
    window.addEventListener("resize", set, { passive: true });
    return () => window.removeEventListener("resize", set);
  }, []);
  const side = lane.from === "left" ? "lg:justify-end" : "lg:justify-start";

  return (
    <div className="relative">
      {/* The label card sits on the far side of the road; the convoy passes
          behind it. Below `lg` it stacks above the road instead. */}
      <div className={`relative z-10 mx-auto flex w-full max-w-[81.5rem] px-5 sm:px-8 ${side}`}>
        <Reveal
          delay={60 + index * 80}
          className="flex w-full max-w-[22rem] flex-col gap-3 rounded-card bg-surface/90 p-5 shadow-card backdrop-blur max-lg:mb-4 lg:absolute lg:top-1/2 lg:-translate-y-1/2"
        >
          <h3 className="font-display text-title font-semibold text-content">{lane.title}</h3>
          <p className="text-body leading-relaxed text-content-muted">{lane.body}</p>
          <ul className="flex flex-wrap gap-2">
            {lane.chips.map((chip) => (
              <li key={chip} className="rounded-pill bg-surface-tint px-3 py-1 text-fine font-semibold text-primary-deep">
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* The road: full-bleed, clipped, with a dashed centre line that slides
          with the traffic so the ground moves too. */}
      <div className="relative h-36 w-full overflow-hidden sm:h-44 lg:h-52">
        <div aria-hidden className="absolute inset-x-0 bottom-3 h-px bg-line" />
        <animated.div
          aria-hidden
          className="absolute inset-x-0 bottom-3 h-px bg-[repeating-linear-gradient(90deg,var(--primary)_0_2.5rem,transparent_2.5rem_5rem)] opacity-40"
          style={{ backgroundPositionX: progress.to((p) => `${dir * p * -900}px`) }}
        />
        {lane.cars.map((car, i) => (
          <animated.div
            key={car.name}
            className={`absolute bottom-3 h-[calc(100%-1.5rem)] ${lane.from === "left" ? "left-0" : "right-0"}`}
            style={{
              transform: progress.to((p) => {
                // Lane height → car width; the convoy starts fully off its
                // edge, one car-and-gap behind the next, and the whole line
                // drives across the viewport and out the other side.
                const vw = vwRef.current;
                const laneH = vw >= 1024 ? 184 : vw >= 640 ? 152 : 120;
                const carW = laneH * CAR_ASPECT;
                const pitch = carW * (1 + CONVOY_GAP);
                const startX = -(carW + i * pitch);
                const distance = (vw + lane.cars.length * pitch) * TRAVEL * car.speed;
                return `translate3d(${dir * (startX + p * distance)}px, 0, 0)`;
              }),
            }}
          >
            <Image
              src={car.image.src}
              alt={car.image.alt}
              width={car.image.width}
              height={car.image.height}
              sizes="(min-width: 1024px) 32rem, 50vw"
              className="h-full w-auto max-w-none drop-shadow-[0_24px_24px_rgb(9_40_50/0.18)]"
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};
