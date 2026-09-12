import { Reveal } from "@/components/ui/reveal";

import type { Stat } from "../home.types";

/** Wireframe frame 1:66 — the band under the hero, now four key figures. */
export const ProofStrip = ({ stats }: { stats: Stat[] }) => (
  <div className="border-b border-line-soft bg-surface-strip">
    <Reveal tag="ul" className="mx-auto grid w-full max-w-[75rem] grid-cols-2 gap-x-6 gap-y-6 px-5 py-8 sm:px-8 lg:grid-cols-4 lg:gap-x-10">
      {stats.map((stat) => (
        <li key={stat.label} className="flex flex-col items-center gap-1 text-center">
          <span className="font-display text-heading-compact font-bold leading-none text-primary-deep">
            {stat.figure}
          </span>
          <span className="text-small font-medium text-content-muted">{stat.label}</span>
        </li>
      ))}
    </Reveal>
  </div>
);
