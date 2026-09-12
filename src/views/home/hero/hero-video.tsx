"use client";

import { useEffect, useRef, useState } from "react";

import type { VideoScene } from "../home.types";

/** Seconds before a clip's end at which the next one starts fading in. */
const CROSSFADE = 1.4;

/**
 * The hero's ground: two clips that hand over to each other forever. Both
 * `<video>`s stay mounted; the active one plays while the other waits at
 * its first frame, and when the active one nears its end the other starts
 * and fades in over it. The fade is a two-state opacity transition on token
 * timing (the CSS exception to the springs rule). Readers who prefer reduced
 * motion get the first poster, still.
 */
export const HeroVideo = ({ scenes }: { scenes: VideoScene[] }) => {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const switching = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const onChange = () => setStill(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (still) return;
    const current = refs.current[active];
    if (!current) return;
    switching.current = false;
    current.currentTime = 0;
    void current.play().catch(() => setStill(true));

    const onTime = () => {
      if (switching.current) return;
      if (current.duration && current.currentTime >= current.duration - CROSSFADE) {
        switching.current = true;
        setActive((i) => (i + 1) % scenes.length);
      }
    };
    current.addEventListener("timeupdate", onTime);
    return () => current.removeEventListener("timeupdate", onTime);
  }, [active, scenes.length, still]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-surface-deep">
      {scenes.map((scene, i) => (
        <video
          key={scene.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={scene.src}
          poster={scene.poster}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] ease-entrance ${
            i === active || (still && i === 0) ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};
