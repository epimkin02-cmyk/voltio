"use client";

import { animated, useSpring, useTrail } from "@react-spring/web";
import { useEffect, useRef } from "react";

/** Sparks around the badge: angle in degrees, distance in px. */
const SPARKS = [0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => ({
  rad: (deg * Math.PI) / 180,
  dist: i % 2 ? 52 : 64,
}));

export interface LeadThanksProps {
  title: string;
  text: string;
  close: string;
  /** Id for the heading, so the dialog keeps a label after the form is gone. */
  headingId: string;
  onClose: () => void;
}

/**
 * The thank-you state inside the lead popup, shown in place of the form once
 * the request is stored. A ring draws itself, the tick follows, a halo and a
 * burst of sparks leave the badge, then title, text and button rise in. All
 * springs, so `ReducedMotion` skips straight to the end state.
 */
export const LeadThanks = ({ title, text, close, headingId, onClose }: LeadThanksProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // The submit button is gone; give keyboard and screen-reader users a target.
  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  const badge = useSpring({
    from: { scale: 0.4, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { tension: 260, friction: 14 },
  });
  const ring = useSpring({
    from: { offset: 1 },
    to: { offset: 0 },
    delay: 80,
    config: { tension: 120, friction: 22 },
  });
  const tick = useSpring({
    from: { offset: 1 },
    to: { offset: 0 },
    delay: 380,
    config: { tension: 180, friction: 24 },
  });
  const burst = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    delay: 440,
    config: { tension: 70, friction: 18 },
  });
  const trail = useTrail(3, {
    from: { opacity: 0, y: 14 },
    to: { opacity: 1, y: 0 },
    delay: 540,
    config: { tension: 260, friction: 26 },
  });
  const rise = (i: number) => ({
    opacity: trail[i].opacity,
    transform: trail[i].y.to((y) => `translateY(${y}px)`),
  });

  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center gap-6 py-6 text-center" aria-live="polite">
      <div className="relative grid size-24 place-items-center">
        {/* Halo */}
        <animated.span
          aria-hidden
          className="absolute inset-0 rounded-pill bg-primary/20"
          style={{
            opacity: burst.t.to((t) => 0.6 * (1 - t)),
            scale: burst.t.to((t) => 0.8 + t * 1.1),
          }}
        />
        {/* Sparks */}
        {SPARKS.map(({ rad, dist }, i) => (
          <animated.span
            key={i}
            aria-hidden
            className={`absolute top-1/2 left-1/2 -mt-1 -ml-1 size-2 rounded-pill ${i % 2 ? "bg-primary-deep" : "bg-primary"}`}
            style={{
              opacity: burst.t.to((t) => (t < 0.55 ? 1 : Math.max(0, (1 - t) / 0.45))),
              transform: burst.t.to(
                (t) => `translate(${Math.cos(rad) * dist * t}px, ${Math.sin(rad) * dist * t}px) scale(${1 - t * 0.5})`,
              ),
            }}
          />
        ))}
        {/* Badge */}
        <animated.div
          style={badge}
          className="relative grid size-24 place-items-center rounded-pill bg-surface-tint"
        >
          <svg viewBox="0 0 96 96" fill="none" aria-hidden className="size-24 -rotate-90">
            <animated.circle
              cx="48"
              cy="48"
              r="44"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={ring.offset}
              className="stroke-primary"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <svg viewBox="0 0 96 96" fill="none" aria-hidden className="absolute inset-0 size-24">
            <animated.path
              d="M30 49.5l12 11.5L66 36"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={tick.offset}
              className="stroke-primary"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </animated.div>
      </div>

      <div className="flex max-w-[26rem] flex-col gap-2">
        <animated.h2 id={headingId} style={rise(0)} className="text-title font-semibold leading-snug text-content">
          {title}
        </animated.h2>
        <animated.p style={rise(1)} className="text-body leading-normal text-content-muted">
          {text}
        </animated.p>
      </div>

      <animated.div style={rise(2)}>
        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-12 items-center justify-center rounded-control border border-line px-8 font-display text-body font-semibold text-content transition duration-[var(--duration-normal)] ease-entrance hover:border-primary hover:text-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {close}
        </button>
      </animated.div>
    </div>
  );
};
