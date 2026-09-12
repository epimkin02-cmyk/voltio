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
const TRAVEL = 1.3;

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
      {/* Sticky, but auto-height: a fixed viewport-tall box with centred
          content overflowed above the section on short screens and hid the
          eyebrow under the previous block's wedge. */}
      <div className="flex flex-col gap-12 overflow-hidden py-16 sm:py-20 lg:sticky lg:top-16 lg:py-14">
        <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-4 px-5 text-center sm:px-8">
          <Reveal className="flex flex-col items-center gap-4">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading id={HEADING_ID} align="center">
              {content.heading}
            </SectionHeading>
            <p className="max-w-[44rem] text-body-lg leading-relaxed text-content-muted">{content.body}</p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 lg:mt-10 lg:gap-8">
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
      {/* The road: full-bleed. The cars live in an inner clipped layer so
          they enter and leave at the edges; the label card sits on the same
          road, on the far side of the traffic, but outside the clip so its
          front-view car can ride above the card's top edge. Below `lg` the
          card stacks above the road instead. */}
      <div className="relative w-full lg:h-64">
        <div className={`relative z-10 mx-auto flex w-full max-w-[81.5rem] px-5 sm:px-8 lg:h-full lg:items-center ${side}`}>
          <Reveal
            delay={60 + index * 80}
            className="relative mt-20 flex w-full max-w-[24rem] flex-col gap-3 rounded-card bg-surface/90 p-5 pt-6 shadow-card backdrop-blur max-lg:mb-4 lg:mt-0"
          >
            {lane.front && (
              <Image
                src={lane.front.src}
                alt={lane.front.alt}
                width={lane.front.width}
                height={lane.front.height}
                sizes="14rem"
                className={`pointer-events-none absolute -top-16 w-44 drop-shadow-[0_18px_20px_rgb(9_40_50/0.25)] sm:-top-20 sm:w-52 ${
                  lane.from === "left" ? "-left-4" : "-right-4"
                }`}
              />
            )}
            <h3 className={`font-display text-title font-semibold text-content ${lane.from === "left" ? "pl-44 sm:pl-48" : "pr-44 sm:pr-48"}`}>{lane.title}</h3>
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

        <div className="relative h-36 w-full overflow-hidden sm:h-44 lg:absolute lg:inset-0 lg:h-auto">
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
                  const vw = vwRef.current;
                  const laneH = vw >= 1024 ? 232 : vw >= 640 ? 152 : 120;
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
                sizes="(min-width: 1024px) 40rem, 50vw"
                className="h-full w-auto max-w-none drop-shadow-[0_24px_24px_rgb(9_40_50/0.18)]"
              />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};
