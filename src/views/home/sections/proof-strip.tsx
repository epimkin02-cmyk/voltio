import { Reveal } from "@/components/ui/reveal";

/** Wireframe frame 1:66 — the thin band under the hero. */
export const ProofStrip = ({ label }: { label: string }) => (
  <div className="border-b border-line-soft bg-surface-strip">
    <Reveal className="mx-auto flex w-full max-w-[75rem] items-center justify-center px-5 py-6 sm:px-8">
      <p className="font-display text-title font-semibold uppercase tracking-eyebrow text-content">
        {label}
      </p>
    </Reveal>
  </div>
);
