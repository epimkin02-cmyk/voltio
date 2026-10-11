import { parseHomePage } from "@/lib/content/home-page";
import { loadHomePage } from "@/lib/content/load-home-page";

import { HomeLayout } from "./home-layout";

/**
 * Home view — the wireframe's "Home - Desktop" section (Figma
 * yylm21nc34q4XvccygO6K8, node 1:651), block for block, in Transiett's
 * clothes. A Server Component; every animated piece is a client leaf. The
 * copy and the order of the sections come from TinaCMS
 * (`content/pages/home.json`); the lead popup is mounted once and opened by
 * every CTA.
 */
export const HomeView = async () => {
  const payload = await loadHomePage();
  return <HomeLayout page={parseHomePage(payload.data.page)} />;
};
