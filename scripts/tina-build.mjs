/**
 * Builds the TinaCMS admin and generated client before `next build`.
 *
 * With TinaCloud credentials (`NEXT_PUBLIC_TINA_CLIENT_ID` + `TINA_TOKEN`, set
 * in Vercel) it builds against TinaCloud, so `/admin` works on the deployed
 * site. Without them it does a local build: the site still renders from
 * `content/pages/*.json`, only the online editor is unavailable.
 */
import { execSync } from "node:child_process";

const cloud = Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN);
const args = cloud ? "build" : "build --local --skip-indexing --skip-cloud-checks";

console.log(`[tina] ${cloud ? "TinaCloud build" : "no TinaCloud credentials, local build"}`);
execSync(`tinacms ${args} --noTelemetry`, { stdio: "inherit" });
