import { homeContent } from "@/data/mocks/home";

import { LeadModal } from "@/components/lead/lead-modal";

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
 * Home view — the wireframe's "Home - Desktop" section (Figma
 * yylm21nc34q4XvccygO6K8, node 1:651), block for block, in Transiett's
 * clothes. A Server Component; every animated piece is a client leaf. The
 * lead popup is mounted once here and opened by every CTA.
 */
export const HomeView = () => (
  <div className="relative overflow-x-clip bg-background text-content">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-control focus:bg-surface focus:px-3 focus:py-2 focus:text-content"
    >
      Zum Inhalt springen
    </a>

    <SiteHeader content={homeContent.header} />

    <main id="main">
      <Hero content={homeContent.hero} />
      <ProofStrip stats={homeContent.stats} />
      <Brands content={homeContent.brands} />
      <Categories content={homeContent.categories} />
      <Pain content={homeContent.pain} />
      <Testimonials content={homeContent.testimonials} />
      {homeContent.benefits.map((benefit, index) => (
        <Benefit
          key={benefit.heading}
          content={benefit}
          index={index + 1}
          mediaSide={index % 2 === 0 ? "start" : "end"}
        />
      ))}
      <Numbers content={homeContent.numbers} />
      <Comparison content={homeContent.comparison} />
      <Steps content={homeContent.steps} />
      <Faq content={homeContent.faq} />
      <Urgency content={homeContent.urgency} />
    </main>

    <SiteFooter content={homeContent.footer} />
    <LeadModal content={homeContent.leadForm} />
  </div>
);
