import { loadHomePage } from "@/lib/content/load-home-page";

import { HomeLive } from "./home-live";

/**
 * Editor preview of the home page, loaded by TinaCMS inside `/admin`. Same
 * page as `/`, but rendered through `useTina` so edits show up live.
 */
export const HomeEditView = async () => {
  const payload = await loadHomePage();
  return <HomeLive {...payload} />;
};
