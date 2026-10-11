import homeDocument from "../../../content/pages/home.json";

import { getServerEnv, publicEnv } from "@/env";

/**
 * What the home view hands to Tina's `useTina`: the GraphQL query it ran,
 * its variables and the result. In the editor, Tina re-runs the same query
 * against the form and pushes fresh data into the page as the editor types.
 */
export interface TinaPagePayload {
  query: string;
  variables: { relativePath: string };
  data: { page: unknown };
}

const variables = { relativePath: "home.json" };

/**
 * Load the home page document. Server-only.
 *
 * With TinaCloud configured (`NEXT_PUBLIC_TINA_CLIENT_ID` + `TINA_TOKEN`) the
 * document comes from Tina's content API, so the editor can attach to it. In
 * development (`yarn dev` runs `tinacms dev`) it comes from Tina's local
 * GraphQL server, which edits the files on disk.
 * Without, or if the API is unreachable, the page renders straight from
 * `content/pages/home.json` — the same file Tina commits to — so the site
 * never goes blank because of the CMS.
 */
export async function loadHomePage(): Promise<TinaPagePayload> {
  const tinaCloud = Boolean(publicEnv.NEXT_PUBLIC_TINA_CLIENT_ID && getServerEnv().TINA_TOKEN);
  const tinaLocal = process.env.NODE_ENV === "development";

  if (tinaCloud || tinaLocal) {
    try {
      const { client } = await import("../../../tina/__generated__/client");
      const result = await client.queries.page(variables);
      return { query: result.query, variables, data: { page: result.data.page } };
    } catch (error) {
      console.error("[tina] content API unavailable, rendering from content/pages/home.json", error);
    }
  }

  return { query: "", variables, data: { page: homeDocument } };
}
