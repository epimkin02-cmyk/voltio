import { homeContent } from "@/data/mocks/home";

import { SiteHeader } from "./header/site-header";
import { Hero } from "./hero/hero";
import { Benefit } from "./sections/benefit";
import { Comparison } from "./sections/comparison";
import { Faq } from "./sections/faq";
import { SiteFooter } from "./sections/footer";
import { Pain } from "./sections/pain";
import { ProofStrip } from "./sections/proof-strip";
import { SocialProof } from "./sections/social-proof";
import { Steps } from "./sections/steps";
import { Urgency } from "./sections/urgency";

/**
 * Home view — the wireframe's "Home - Desktop" section (Figma
 * yylm21nc34q4XvccygO6K8, node 1:651), block for block, in Transiett's
 * clothes. A Server Component; every animated piece is a client leaf.
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
      <ProofStrip label={homeContent.proofStrip} />
      <Pain content={homeContent.pain} />
      <SocialProof content={homeContent.socialProof} id="social-proof-1" />
      {homeContent.benefits.map((benefit, index) => (
        <Benefit
          key={benefit.heading}
          content={benefit}
          index={index + 1}
          mediaSide={index % 2 === 0 ? "start" : "end"}
        />
      ))}
      <SocialProof content={homeContent.socialProof} id="social-proof-2" />
      <Comparison content={homeContent.comparison} />
      <Steps content={homeContent.steps} />
      <Faq content={homeContent.faq} />
      <Urgency content={homeContent.urgency} />
    </main>

    <SiteFooter content={homeContent.footer} />
  </div>
);
