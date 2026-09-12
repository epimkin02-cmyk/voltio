import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { ComparisonContent } from "../home.types";

const HEADING_ID = "comparison-heading";

const Mark = ({ yes, brand = false }: { yes: boolean; brand?: boolean }) =>
  yes ? (
    <span
      className={`grid place-items-center rounded-pill ${
        brand ? "size-9 bg-surface text-primary-deep shadow-card" : "size-7 bg-primary text-content-inverse"
      }`}
    >
      <CheckIcon className={brand ? "size-5" : "size-4"} />
      <span className="sr-only">Ja</span>
    </span>
  ) : (
    <span className="grid size-7 place-items-center text-content-faint">
      <CrossIcon className="size-4" />
      <span className="sr-only">Nein</span>
    </span>
  );

/**
 * Wireframe frame 1:146 — the feature table. The brand column is lifted off
 * the grid, as the frame draws it; the tick pattern is the frame's own. Below
 * `lg` the table scrolls inside its own box rather than squeezing six columns
 * onto a phone.
 */
export const Comparison = ({ content }: { content: ComparisonContent }) => (
  <section id="vergleich" aria-labelledby={HEADING_ID} className="scroll-mt-16 py-16 sm:py-20 lg:py-24">
    <div className="mx-auto flex w-full max-w-[75rem] flex-col items-center gap-10 px-5 sm:px-8">
      <Reveal className="flex flex-col items-center gap-4">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <SectionHeading id={HEADING_ID} align="center">
          {content.heading}
        </SectionHeading>
        <p className="max-w-[40rem] text-center text-body-lg leading-relaxed text-content-muted">{content.body}</p>
      </Reveal>

      <Reveal delay={140} className="w-full overflow-x-auto pt-4 pb-6">
        <table className="w-full min-w-[46rem] border-separate border-spacing-0 text-center">
          <thead>
            <tr>
              <th scope="col" className="w-[13rem] pb-6 text-left" />
              {/* The brand column is a raised deep-green pillar with the
                  wordmark at its head and a badge above — the one column on
                  the table that is drawn, not just filled. */}
              <th scope="col" className="relative px-2 pt-10 pb-5">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 rounded-pill bg-star px-3 py-1 text-fine font-bold uppercase tracking-eyebrow text-content whitespace-nowrap">
                  {content.badge}
                </span>
                <span className="absolute inset-x-0 top-6 bottom-0 rounded-t-card bg-[linear-gradient(180deg,var(--primary)_0%,var(--primary-deep)_100%)] shadow-float" aria-hidden />
                <span className="relative flex justify-center pt-2">
                  <Logo tone="light" className="scale-90" />
                  <span className="sr-only">{content.brand}</span>
                </span>
              </th>
              {content.competitors.map((name) => (
                <th
                  key={name}
                  scope="col"
                  className="px-3 pt-8 pb-4 font-display text-small font-semibold text-content"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, rowIndex) => {
              const last = rowIndex === content.rows.length - 1;
              return (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border-t border-line-soft py-4 pr-4 text-left font-display text-small font-semibold text-content"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, colIndex) => {
                    const brand = colIndex === 0;
                    return (
                      <td
                        key={colIndex}
                        className={`py-3 ${
                          brand
                            ? `relative bg-primary-deep ${last ? "rounded-b-card pb-7 shadow-float" : ""}`
                            : "border-t border-line-soft"
                        }`}
                      >
                        {brand && <span aria-hidden className="absolute inset-x-4 top-0 h-px bg-line-inverse" />}
                        <div className="relative flex justify-center">
                          <Mark yes={value} brand={brand} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Reveal>
      <Reveal delay={80}>
        <ButtonLink href={content.cta.href} arrow>
          {content.cta.label}
        </ButtonLink>
      </Reveal>
    </div>
  </section>
);
