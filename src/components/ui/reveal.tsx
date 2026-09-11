"use client";

import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import type { Tags } from "@/types/springs";

export interface RevealProps {
  children: ReactNode;
  tag?: Tags;
  /** Stagger, in ms, after the element enters the viewport. */
  delay?: number;
  className?: string;
  id?: string;
}

/**
 * The page's one reveal: a short rise and a fade, played once. Every section
 * uses it so the whole page moves with one gesture.
 */
export const Reveal = ({ children, tag = "div", delay = 0, className, id }: RevealProps) => (
  <Inview
    tag={tag}
    id={id}
    mode="once"
    from={{ opacity: 0, y: 24 }}
    to={{ opacity: 1, y: 0 }}
    delayIn={delay}
    config={{ tension: 170, friction: 26 }}
    className={className}
  >
    {children}
  </Inview>
);
