import { Fragment, type ReactNode } from "react";

import { LeadModal } from "@/components/lead/lead-modal";
import type { HomeBlock, HomePage } from "@/lib/content/home-page";

import { SiteHeader } from "./header/site-header";
import { Hero } from "./hero/hero";
import { Benefit } from "./sections/benefit";
import { Brands } from "./sections/brands";
import { Categories } from "./sections/categories";
import { Comparison } from "./sections/comparison";
import { Faq } from "./sections/faq";
import { SiteFooter } from "./sections/footer";
import { Numbers } from "./sections/numbers";
import { Pain } from "./sections/pain";
import { ProofStrip } from "./sections/proof-strip";
import { Steps } from "./sections/steps";
import { Testimonials } from "./sections/testimonials";
import { Urgency } from "./sections/urgency";

/**
 * Tina field ids per part of the page. Only passed in the editor preview,
 * where clicking a part opens its form; the public page passes nothing.
 */
export interface EditFields {
  header: string;
  hero: string;
  footer: string;
  /** One id per entry in `page.blocks`, same order. */
  blocks: string[];
}

/** Wraps a part in a click target for Tina, or renders it untouched. */
const Editable = ({ field, children }: { field?: string; children: ReactNode }) =>
  field ? <div data-tina-field={field}>{children}</div> : <Fragment>{children}</Fragment>;

const renderBlock = (block: HomeBlock, benefitIndex: number): ReactNode => {
  switch (block.kind) {
    case "proofStrip":
      return <ProofStrip stats={block.stats} />;
    case "categories":
      return <Categories content={block.content} />;
    case "pain":
      return <Pain content={block.content} />;
    case "testimonials":
      return <Testimonials content={block.content} />;
    case "benefit":
      return (
        <Benefit
          content={block.content}
          index={benefitIndex}
          mediaSide={block.mediaSide ?? (benefitIndex % 2 === 1 ? "start" : "end")}
        />
      );
    case "numbers":
      return <Numbers content={block.content} />;
    case "comparison":
      return <Comparison content={block.content} />;
    case "steps":
      return <Steps content={block.content} />;
    case "faq":
      return <Faq content={block.content} />;
    case "urgency":
      return <Urgency content={block.content} />;
    case "brands":
      return <Brands content={block.content} />;
  }
};

/** Number each benefit block 1, 2, 3 … in page order (heading ids, `#vorteile` anchor). */
const benefitIndices = (page: HomePage): number[] => {
  let count = 0;
  return page.blocks.map(({ block }) => (block.kind === "benefit" ? (count += 1) : 0));
};

/**
 * The home page, assembled from the CMS document: fixed header and hero,
 * the editor-ordered sections, fixed footer and the lead popup. Hook-free,
 * so it renders as a Server Component on the public page and inside the
 * client-side editor preview alike.
 */
export const HomeLayout = ({ page, edit }: { page: HomePage; edit?: EditFields }) => {
  const indices = benefitIndices(page);
  return (
    <div className="relative overflow-x-clip bg-background text-content">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-control focus:bg-surface focus:px-3 focus:py-2 focus:text-content"
      >
        Zum Inhalt springen
      </a>

      <Editable field={edit?.header}>
        <SiteHeader content={page.header} />
      </Editable>

      <main id="main">
        <Editable field={edit?.hero}>
          <Hero content={page.hero} />
        </Editable>
        {page.blocks.map(({ block }, position) => (
          <Editable key={`${block.kind}-${position}`} field={edit?.blocks[position]}>
            {renderBlock(block, indices[position])}
          </Editable>
        ))}
      </main>

      <Editable field={edit?.footer}>
        <SiteFooter content={page.footer} />
      </Editable>
      <LeadModal content={page.leadForm} />
    </div>
  );
};
