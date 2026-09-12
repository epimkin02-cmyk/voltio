"use client";

import { animated, useSpring } from "@react-spring/web";
import type { ReactNode } from "react";

export interface FloatProps {
  children: ReactNode;
  /** Bob amplitude in px. */
  amplitude?: number;
  /** Phase offset so neighbours don't bob in step. */
  delay?: number;
  className?: string;
}

/** A slow, endless bob — the floating cards hovering beside the hero car. */
export const Float = ({ children, amplitude = 6, delay = 0, className }: FloatProps) => {
  const { y } = useSpring({
    from: { y: -amplitude },
    to: { y: amplitude },
    loop: { reverse: true },
    delay,
    config: { tension: 12, friction: 14, precision: 0.01 },
  });
  return (
    <animated.div className={className} style={{ y }}>
      {children}
    </animated.div>
  );
};
