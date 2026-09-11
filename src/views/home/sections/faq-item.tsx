"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useId, useRef, useState } from "react";

import { ChevronIcon } from "@/components/ui/icons";

export interface FaqItemProps {
  question: string;
  answer: string;
}

/**
 * One accordion row. The panel's height is sprung from its measured content,
 * the chevron turns with it — both on the same spring so they arrive together.
 */
export const FaqItem = ({ question, answer }: FaqItemProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // The panel's natural height, read off the DOM when the row opens — refs
  // are not read during render.
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(open ? (panelRef.current?.scrollHeight ?? 0) : 0);
  }, [open]);

  const spring = useSpring({
    height,
    opacity: open ? 1 : 0,
    rotate: open ? 180 : 0,
    config: { tension: 220, friction: 28 },
  });

  return (
    <div className="border-b border-line">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-body-lg font-semibold text-content transition duration-[var(--duration-fast)] ease-entrance hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span>{question}</span>
          <animated.span
            aria-hidden
            style={{ transform: spring.rotate.to((r) => `rotate(${r}deg)`) }}
            className="grid size-8 shrink-0 place-items-center rounded-pill bg-surface-tint text-primary"
          >
            <ChevronIcon className="size-4" />
          </animated.span>
        </button>
      </h3>
      <animated.div
        id={`${id}-panel`}
        role="region"
        aria-hidden={!open}
        style={{ height: spring.height, opacity: spring.opacity }}
        className="overflow-hidden"
      >
        <div ref={panelRef} className="pb-6 text-body-lg leading-relaxed text-content-muted">
          {answer}
        </div>
      </animated.div>
    </div>
  );
};
