/**
 * Validated environment variables.
 *
 * `publicEnv` holds `NEXT_PUBLIC_*` values — inlined into the client bundle,
 * safe in the browser. `getServerEnv()` holds server-only values (secrets) —
 * never read it from client code; on the client those values are `undefined`.
 *
 * A missing/invalid variable fails fast with a clear zod error rather than
 * surfacing as a confusing runtime bug later.
 */

import { z } from "zod";

/**
 * Treat an empty env var as unset.
 *
 * `cp .env.example .env` leaves declared-but-blank keys (`NEXT_PUBLIC_SITE_URL=`),
 * which reach us as `""` — and `""` is not `undefined`, so an `.optional()`
 * schema would reject it as "Invalid URL". Without this, the documented setup
 * flow would break every optional variable the moment someone copied the
 * example file.
 */
const optionalUrl = () =>
  z.preprocess((v) => (v === "" ? undefined : v), z.url().optional());

/** A Meta Pixel (dataset) id is a string of digits; anything else is a typo. */
const optionalPixelId = () =>
  z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().regex(/^\d{6,20}$/, "Meta Pixel id must be digits only").optional(),
  );

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl(),
  /** Meta Pixel id. Unset = no pixel at all. Loads only after marketing consent. */
  NEXT_PUBLIC_META_PIXEL_ID: optionalPixelId(),
});

/**
 * Server-only values — never as `NEXT_PUBLIC_`. The three webhook URLs carry
 * their own access tokens; `app/api/lead` forwards every lead to each one set.
 */
const serverSchema = z.object({
  LEADMETRICS_WEBHOOK_URL: optionalUrl(),
  LEADTABLE_WEBHOOK_URL: optionalUrl(),
  UMSATZPILOT_LEADS_WEBHOOK_URL: optionalUrl(),
});

/** Public env — safe to read anywhere (server or client). */
export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
});

let cachedServerEnv: z.infer<typeof serverSchema> | undefined;

/**
 * Server-only env. Call from route handlers / server code only — parsed
 * lazily so the client bundle never evaluates it.
 */
export function getServerEnv() {
  cachedServerEnv ??= serverSchema.parse({
    LEADMETRICS_WEBHOOK_URL: process.env.LEADMETRICS_WEBHOOK_URL,
    LEADTABLE_WEBHOOK_URL: process.env.LEADTABLE_WEBHOOK_URL,
    UMSATZPILOT_LEADS_WEBHOOK_URL: process.env.UMSATZPILOT_LEADS_WEBHOOK_URL,
  });
  return cachedServerEnv;
}
