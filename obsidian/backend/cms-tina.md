---
tags: [backend, cms]
updated: 2026-10-12
---

# CMS — TinaCMS (visual editing)

Voltio's page copy is edited in **TinaCMS**: a Git-backed CMS with a visual
editor. Content is a JSON file in the repo; every save is a commit; Vercel
redeploys from it. No database. Chosen over [[cms-payload]] for this project —
see ADR-0050.

## Where things live

| Path | What |
|------|------|
| `content/pages/home.json` | **All page copy** — header, hero, the section blocks, lead popup, footer. Single source of truth (replaced `src/data/mocks/home.ts`). |
| `tina/config.ts` | Schema: which fields the editor shows, German labels, the block templates. |
| `tina/defaults/brands.json` | Default content when an editor adds the "Alle Marken" block. |
| `tina/tina-lock.json` | Compiled schema TinaCloud reads. **Commit it**; regenerate with `yarn dev` after any schema change. |
| `tina/__generated__/`, `public/admin/` | Built by `tinacms build` / `tinacms dev`. Git-ignored. |
| `src/lib/content/load-home-page.ts` | Server loader: TinaCloud → local Tina server (dev) → `home.json` on disk (fallback). |
| `src/lib/content/home-page.ts` | Forgiving zod parser: raw document → the typed section props in `home.types.ts`. |
| `src/views/home/home-layout.tsx` | Renders the page from the parsed document. Hook-free, so server and editor share it. |
| `src/views/home/home-live.tsx` | Client wrapper with `useTina` — editor preview only. |
| `src/app/bearbeiten/page.tsx` | Editor preview route (`noindex`, disallowed in robots). |
| `scripts/tina-build.mjs` | Runs `tinacms build` (cloud) or a local build when credentials are missing. |

## How it renders

- **`/`** (public) is a Server Component: `loadHomePage()` → `parseHomePage()` →
  `HomeLayout`. Static, identical markup to the pre-CMS page (verified by HTML
  diff on 2026-10-12). No Tina code in its client bundle.
- **`/bearbeiten`** is what Tina's admin loads in its iframe. `HomeLive` calls
  `useTina`, so form edits appear live; `useEditState` wraps every part of the
  page in a `data-tina-field` div so a click opens its form. Outside the editor
  the wrappers are not rendered.
- **Legal pages** read header, footer and popup copy from the same document.

## Editing model

- Fixed: header, hero, lead popup, footer.
- **Blocks** (`blocks` list): Zahlen-Leiste, Fahrzeugklassen, Problem,
  Kundenstimmen, Vorteil, Voltio in Zahlen, Vergleichstabelle, Ablauf, FAQ,
  Abschluss, Alle Marken. Reorder by drag, duplicate, remove, add.
- Benefit blocks have `mediaSide` (image left/right); numbering for heading ids
  and the `#vorteile` anchor follows page order.
- Images use Tina's repo media (`public/assets/uploads`). Width/height are
  editable fields — update them when swapping an image.

## Environment

| Variable | Where | Note |
|----------|-------|------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Vercel + `.env` | From app.tina.io → project |
| `TINA_TOKEN` | Vercel + `.env` (server-only, `getServerEnv()`) | Read-only content token |
| `NEXT_PUBLIC_TINA_BRANCH` | optional | Defaults to `VERCEL_GIT_COMMIT_REF`, then `tina-cms` |

Without the two credentials the build falls back to a local Tina build and the
site renders from disk — the page never depends on Tina being up.

## Local editing

`yarn dev` runs `tinacms dev -c "next dev"`: open `/admin`, edits are written
straight to `content/pages/home.json` (no TinaCloud needed).

## Changing the schema

1. Edit `tina/config.ts` (field names must match `home-page.ts`).
2. Update the parser in `src/lib/content/home-page.ts` and, if needed,
   `home.types.ts`.
3. Run `yarn dev` once to regenerate `tina/tina-lock.json`; commit it.

## Related

[[cms-payload]] · [[environment-variables]] · [[tech-stack]] · [[decisions-log]]
