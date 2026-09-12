"use client";

import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

import { useLeadModal } from "@/components/lead/lead-modal-store";

import { ArrowIcon } from "./icons";

export type ButtonVariant = "primary" | "light" | "outline" | "hero";
export type ButtonSize = "md" | "lg";

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show the trailing arrow (the hero and section CTAs carry one). */
  arrow?: boolean;
  className?: string;
}

/** The one href that opens the lead popup instead of navigating. */
export const LEAD_HREF = "#anfrage";

const BASE =
  "group inline-flex cursor-pointer items-center justify-center gap-3 rounded-control font-display font-semibold leading-none whitespace-nowrap transition duration-[var(--duration-normal)] ease-entrance focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const VARIANTS: Record<Exclude<ButtonVariant, "hero">, string> = {
  primary:
    "bg-primary text-content-inverse shadow-card hover:bg-primary-hover hover:-translate-y-0.5",
  light:
    "bg-surface text-primary-deep shadow-card hover:bg-surface-tint hover:-translate-y-0.5",
  outline:
    "border border-line bg-surface text-content hover:border-primary hover:text-primary",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-small tracking-eyebrow uppercase",
  lg: "h-14 px-8 text-body-lg sm:h-16 sm:px-10 sm:text-lede",
};

/**
 * The page's call to action. Pointed at `LEAD_HREF` it is a button that opens
 * the lead popup; any other href is a plain link. Hover is a CSS transition
 * on token timing — the narrow exception to the springs-only rule (ADR-0014).
 */
export const ButtonLink = ({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: ButtonLinkProps) => {
  const openModal = useLeadModal((s) => s.openModal);

  if (variant === "hero") {
    return (
      <HeroCta href={href} onOpen={openModal} className={className}>
        {children}
      </HeroCta>
    );
  }

  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowIcon className="size-5 shrink-0 transition-transform duration-[var(--duration-normal)] ease-entrance group-hover:translate-x-1" />
      )}
    </>
  );

  if (href === LEAD_HREF) {
    return (
      <button type="button" onClick={openModal} className={classes}>
        {inner}
      </button>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
};

/** How far the hero button follows the pointer, in px. */
const MAGNET = 7;

/**
 * The hero's button. A green-to-deep-green gradient with a glass highlight,
 * an outer glow that swells on hover, a sheen that sweeps across it every
 * few seconds, and an arrow disc that slides. It is also magnetic: it leans
 * toward the pointer while hovered and springs back when it leaves.
 */
const HeroCta = ({
  href,
  onOpen,
  className = "",
  children,
}: {
  href: string;
  onOpen: () => void;
  className?: string;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0, config: { tension: 300, friction: 20 } }));
  const sheen = useSpring({
    from: { s: -1 },
    to: { s: 2 },
    loop: true,
    delay: 1200,
    config: { duration: 2600 },
  });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    api.start({ x: dx * MAGNET, y: dy * MAGNET });
  };
  const onLeave = () => api.start({ x: 0, y: 0 });

  const handle = () => {
    if (href === LEAD_HREF) onOpen();
    else window.location.assign(href);
  };

  return (
    <animated.button
      ref={ref}
      type="button"
      onClick={handle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={`group relative inline-flex h-16 cursor-pointer items-center gap-4 overflow-hidden rounded-pill bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-deep)_100%)] pr-2 pl-8 font-display text-body-lg font-semibold text-content-inverse shadow-[0_14px_34px_rgb(41_142_104/0.45)] transition-shadow duration-[var(--duration-normal)] ease-entrance hover:shadow-[0_22px_52px_rgb(41_142_104/0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-inverse sm:h-[4.5rem] sm:pl-10 sm:text-lede ${className}`}
    >
      {/* Glass: a soft highlight along the top edge. */}
      <span aria-hidden className="pointer-events-none absolute inset-px rounded-pill bg-[linear-gradient(180deg,rgb(255_255_255/0.22)_0%,transparent_55%)]" />
      {/* The sheen sweeping across. */}
      <animated.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.35),transparent)]"
        style={{ left: sheen.s.to((v) => `${v * 100}%`) }}
      />
      <span className="relative">{children}</span>
      <span className="relative grid size-12 place-items-center rounded-pill bg-surface text-primary-deep shadow-card transition duration-[var(--duration-normal)] ease-entrance group-hover:translate-x-1 group-hover:scale-110 sm:size-14">
        <ArrowIcon className="size-5 transition-transform duration-[var(--duration-normal)] ease-entrance group-hover:translate-x-0.5 sm:size-6" />
      </span>
    </animated.button>
  );
};
