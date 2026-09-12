"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useLeadModal } from "@/components/lead/lead-modal-store";

import { ArrowIcon } from "./icons";

export type ButtonVariant = "primary" | "light" | "outline";
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

const VARIANTS: Record<ButtonVariant, string> = {
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
