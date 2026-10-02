/**
 * Tracking and lead-capture identifiers.
 *
 * - `META_PIXEL_ID`: the client's Meta Pixel (dataset) id. **Empty = no pixel**:
 *   no script, no Facebook request, no entry in the cookie settings, no section
 *   in the privacy notice. Set `NEXT_PUBLIC_META_PIXEL_ID` on Vercel (or put the
 *   id here) to switch it on. Even then it only loads after the visitor agrees
 *   to "Marketing" — see `lib/tracking/pixel.ts`.
 * - `FUNNEL_BUILDER_URL` / `FUNNEL_SLUG`: where the lead form stores its
 *   submissions (Funnel Builder, project "Voltio", funnel "voltio-ankauf").
 *   Field ids there must match `LeadAnswers` in `lib/tracking/funnel-builder.ts`.
 */
import { publicEnv } from "@/env";

export const META_PIXEL_ID = publicEnv.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const FUNNEL_BUILDER_URL = (
  publicEnv.NEXT_PUBLIC_FUNNEL_BUILDER_URL ?? "https://funnelbuilder.umsatzpilot.com"
).replace(/\/$/, "");

export const FUNNEL_SLUG = "voltio-ankauf";
