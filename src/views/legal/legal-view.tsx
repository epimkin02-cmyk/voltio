import { homeContent } from "@/data/mocks/home";

import { LeadModal } from "@/components/lead/lead-modal";
import { SiteHeader } from "@/views/home/header/site-header";
import { SiteFooter } from "@/views/home/sections/footer";

import type { LegalPage } from "@/data/mocks/legal";

/**
 * The legal pages: the site's own header and footer around a single reading
 * column. The lead popup is mounted here too, so the header's and footer's
 * CTAs work the same way they do on the home page.
 */
export const LegalView = ({ page }: { page: LegalPage }) => (
  <div className="relative overflow-x-clip bg-background text-content">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-control focus:bg-surface focus:px-3 focus:py-2 focus:text-content"
    >
      Zum Inhalt springen
    </a>
    <SiteHeader content={homeContent.header} />

    <main id="main" className="mx-auto w-full max-w-[46rem] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <h1 className="text-heading-compact font-semibold leading-tight tracking-display sm:text-heading">
        {page.title}
      </h1>
      <p className="mt-3 text-small text-content-faint">Stand: {page.updated}</p>
      {page.intro && <p className="mt-8 text-body-lg leading-relaxed text-content-muted">{page.intro}</p>}

      <div className="mt-10 flex flex-col gap-10">
        {page.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3">
            <h2 className="text-title font-semibold leading-snug">{section.heading}</h2>
            {section.paragraphs.map((text) => (
              <p key={text} className="text-body-lg leading-relaxed text-content-muted">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>

    <SiteFooter content={homeContent.footer} />
    <LeadModal content={homeContent.leadForm} />
  </div>
);
