import type { ReactNode } from "react";

/** The small uppercase line above a section heading. */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-display text-fine font-semibold uppercase tracking-eyebrow text-primary">
    {children}
  </p>
);
