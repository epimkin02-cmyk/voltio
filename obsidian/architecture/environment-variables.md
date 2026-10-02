---
tags: [architecture, config, stable]
updated: 2026-07-17
---

# Environment Variables

Rules for handling configuration and secrets.

## Rules

- Store all secrets in **`.env.local`** — never commit it (it is git-ignored).
- Document every required variable in **`.env.example`** (committed, no real values).
- Reference variables in code via `process.env.VARIABLE_NAME`.
- Prefix with **`NEXT_PUBLIC_`** only if the value is safe to expose to the browser.
  Unprefixed variables are server-only.

## Current variables

| Name | Scope | Purpose |
|------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | public | Site origin (no trailing slash). Drives canonical URLs, OG/Twitter tags, `robots.txt`, `sitemap.xml`, JSON-LD. Falls back to `http://localhost:3000` when unset — **set it in production**. See [[seo-metadata]]. |
| `NEXT_PUBLIC_META_PIXEL_ID` | public | Meta Pixel (dataset) id, digits only. Unset = no pixel, no Meta section in the privacy notice, no service line in the cookie settings. Even when set the pixel loads only after consent to "Marketing". Read through `src/data/tracking.ts`. |
| `NEXT_PUBLIC_FUNNEL_BUILDER_URL` | public | Optional override for the Funnel Builder origin the lead form posts to (default `https://funnelbuilder.umsatzpilot.com`). |

Documented in `.env.example` (committed). Validated by `src/env.ts` (zod):
`publicEnv` for `NEXT_PUBLIC_*` (safe anywhere), `getServerEnv()` for
server-only secrets (route handlers only) — see [[api-architecture]]. Read env
through `src/env.ts`, never `process.env` directly.

> [!important] Optional variables must treat `""` as unset
> `cp .env.example .env` — the documented setup step — leaves declared-but-blank
> keys (`NEXT_PUBLIC_SITE_URL=`), which arrive as `""`, **not** `undefined`. A bare
> `z.url().optional()` rejects `""` as *"Invalid URL"*, so the copy alone broke
> the build. Every optional variable therefore goes through the
> `optionalUrl()` helper in `src/env.ts`, which preprocesses `""` → `undefined`.
> **Follow this for any new optional variable** — `.optional()` on its own is not
> enough.

> [!important] Secret handling
> Secret keys are **unprefixed** — `NEXT_PUBLIC_` is only for values safe in the
> browser. Secrets are read in server code (`app/api/**`); the browser never
> holds one. See [[api-architecture]].

When the next variable is introduced:
1. Add it to `.env.example` with a comment describing it.
2. Add a row to the table above (name, scope, purpose).
3. If it is optional, wrap it so `""` parses as unset (see the note above) —
   otherwise copying `.env.example` breaks it.
4. Add a [[changelog]] entry.

## Related

[[tech-stack]] · [[seo-metadata]] · [[backend/README]]
