"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { observeReveal } from "@/lib/animation/reveal";

/**
 * Splits a figure like "1.900 €", "98 %", "24 h" or "776" into what counts and
 * what wraps it, so the number can run up while the unit stays put.
 */
const parse = (figure: string) => {
  const match = figure.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, value: Number(digits.replace(/\./g, "")), suffix };
};

const format = (n: number) => Math.round(n).toLocaleString("de-DE");

/** Counts a figure up from zero once it scrolls into view. */
export const CountUp = ({ figure, className }: { figure: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);
  const parsed = parse(figure);

  useEffect(() => {
    if (!ref.current) return;
    return observeReveal(ref.current, () => setGo(true));
  }, []);

  const { n } = useSpring({
    n: go && parsed ? parsed.value : 0,
    config: { tension: 60, friction: 24, clamp: true },
  });

  if (!parsed) return <span className={className}>{figure}</span>;

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {parsed.prefix}
      <animated.span>{n.to(format)}</animated.span>
      {parsed.suffix}
    </span>
  );
};
