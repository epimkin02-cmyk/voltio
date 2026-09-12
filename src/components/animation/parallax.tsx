"use client";

import { animated } from "@react-spring/web";
import { useRef, type ReactNode } from "react";

import { useProgressTrigger } from "@/hooks/animation/use-progress-trigger";

export interface ParallaxProps {
  children: ReactNode;
  /** How far, in px, the child travels while the block crosses the viewport. */
  distance?: number;
  /** Optional sideways travel, in px. */
  distanceX?: number;
  className?: string;
}

/**
 * Depth on scroll: the child drifts by `distance` over the time its box
 * travels through the viewport, on a spring so it never jitters. Positive
 * values move it against the scroll (further away), negative with it.
 */
export const Parallax = ({ children, distance = 80, distanceX = 0, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { interpolatedProgress } = useProgressTrigger({
    elementRef: ref,
    config: { tension: 120, friction: 26 },
  });

  return (
    <animated.div
      ref={ref}
      className={className}
      style={{
        transform: interpolatedProgress.to(
          (p) => `translate3d(${(p - 0.5) * distanceX}px, ${(p - 0.5) * -distance}px, 0)`,
        ),
      }}
    >
      {children}
    </animated.div>
  );
};
