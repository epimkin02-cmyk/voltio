"use client";

import { animated, useTransition } from "@react-spring/web";
import { useEffect, useRef } from "react";

import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

import { LeadForm } from "./lead-form";
import { useLeadModal } from "./lead-modal-store";

import type { LeadFormContent } from "@/views/home/home.types";

const TITLE_ID = "lead-modal-title";

/**
 * The lead popup. Mounted once at the page root; every CTA opens it through
 * the store. Escape and the backdrop close it, Lenis is paused while it is
 * up, and focus returns to whatever opened it.
 */
export const LeadModal = ({ content }: { content: LeadFormContent }) => {
  const open = useLeadModal((s) => s.open);
  const closeModal = useLeadModal((s) => s.closeModal);
  const stopScroll = useScroll((s) => s.stop);
  const startScroll = useScroll((s) => s.start);
  const openerRef = useRef<Element | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    // Focus the first field once the panel is in.
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input")?.focus();
    }, 120);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      startScroll();
      const opener = openerRef.current;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [open, closeModal, stopScroll, startScroll]);

  const transitions = useTransition(open, {
    from: { opacity: 0, y: 24, scale: 0.98 },
    enter: { opacity: 1, y: 0, scale: 1 },
    leave: { opacity: 0, y: 16, scale: 0.98 },
    config: { tension: 300, friction: 30 },
  });

  return transitions((style, show) =>
    show ? (
      <animated.div
        style={{ opacity: style.opacity }}
        className="fixed inset-0 z-[60] flex items-end justify-center bg-scrim p-0 sm:items-center sm:p-6"
        onClick={closeModal}
      >
        <animated.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={TITLE_ID}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: style.y.to((y) => `translateY(${y}px)`),
            scale: style.scale,
          }}
          className="relative max-h-[92svh] w-full max-w-[36rem] overflow-y-auto rounded-t-card bg-surface p-6 text-content shadow-float sm:rounded-card sm:p-8"
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label={content.close}
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-pill text-content-faint transition duration-[var(--duration-fast)] ease-entrance hover:bg-surface-tint hover:text-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-5">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <LeadForm content={content} titleId={TITLE_ID} />
        </animated.div>
      </animated.div>
    ) : null,
  );
};
