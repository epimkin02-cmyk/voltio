import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { ComparisonContent } from "../home.types";

const HEADING_ID = "comparison-heading";

const Mark = ({ yes }: { yes: boolean }) =>
  yes ? (
    <span className="grid size-7 place-items-center rounded-pill bg-primary text-content-inverse">
      <CheckIcon className="size-4" />
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
              <th
                scope="col"
                className="rounded-t-card border border-b-0 border-primary/30 bg-surface-tint px-4 pt-8 pb-4 font-display text-small font-semibold text-primary-deep shadow-card"
              >
                {content.brand}
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
                        className={`border-t border-line-soft py-3 ${
                          brand
                            ? `border-x border-primary/30 bg-surface-tint ${
                                last ? "rounded-b-card border-b pb-6" : ""
                              }`
                            : ""
                        }`}
                      >
                        <div className="flex justify-center">
                          <Mark yes={value} />
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
