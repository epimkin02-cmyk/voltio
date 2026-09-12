# Design map

Figma nodes behind the implemented UI. QA and any later pass re-fetch from
here — a section without a node ID cannot be verified against its design.

**Figma file key:** `yylm21nc34q4XvccygO6K8` ("Transiett" — the wireframe)
**Source URL:** https://www.figma.com/design/yylm21nc34q4XvccygO6K8/Transiett?node-id=0-1
**Brand reference:** https://transiett.com/ — palette, type (Poppins / Figtree),
angled bands, soft-shadow cards. Voltio is Transiett's partner and shares the look.
**Frame width:** 1440, content column 1200 (120 margins). A mobile section
(`1:652`, 414 wide) mirrors the desktop blocks stacked.

The wireframe is low-fidelity: grey boxes, purple placeholder buttons, template
copy. **The copy is carried verbatim** on the client's instruction; the visual
treatment comes from the brand reference, not from the frame.

| Block | Node | View / component | Notes |
|-------|------|------------------|-------|
| Navigation | `1:22` | `views/home/header` → `SiteHeader` | 64px bar: inline SVG logo (`ui/logo`), four section links (ours — the frame has none), phone (`1:36`) + CTA (`1:38`) |
| Hero | `1:39` | `views/home/hero` → `Hero` | Copy left (`1:41`); right half is the cut-out 3D car on a glowing floor with three floating trust cards (rating, Ø 5 days, best price). **The lead form (`1:64`) moved to the closing section** at the client's request. Holds the `h1` (`1:46`) |
| Brands | — (Transiett's "Most popular brands") | `sections/brands` | Logo tiles as CSS masks over `public/assets/brands/*.svg`; parallax illustration left |
| Categories | — (Transiett's "Key Categories") | `sections/categories` | Scroll-driven real EV cut-outs, one per lane, `public/assets/cars/`; label cards with front views; sticky stage |
| Proof strip | `1:66` | `sections/proof-strip` | Grey band, four key figures (the frame's "SOCIAL PROOF #2", `1:69`) |
| Pain | `1:70` | `sections/pain` | Headline `1:78`, body `1:79`, CTA `1:82`, media slot `1:83` (574×534) |
| Testimonials | `1:85` | `sections/testimonials` | The frame's first social-proof block (`1:89`/`1:92`/`1:95`) as rating + three quote cards. Angled mint band |
| Benefit 1 | `1:96` | `sections/benefit` (media start) | Eyebrow `1:103`, heading `1:104`, body `1:105`, CTA `1:108`, media `1:99` |
| Benefit 2 | `1:109` | `sections/benefit` (media end) | `1:114` / `1:115` / `1:116` / `1:119`, media `1:121` |
| Benefit 3 | `1:122` | `sections/benefit` (media start) | `1:129` / `1:130` / `1:131` / `1:134`, media `1:125` |
| Numbers | `1:135` | `sections/numbers` | The frame's second social-proof block as four big figures on cards |
| Comparison | `1:146` | `sections/comparison` | Heading `1:150`, CTA `1:153`, rows `1:159`–`1:171`, columns `1:177`–`1:205`. Tick pattern is the frame's; brand column lifted |
| Steps | `1:313` | `sections/steps` | Heading `1:317`, three steps `1:320`–`1:324` as illustration + number + title (Transiett's "How does it work"), CTA `1:327`. Angled mint band |
| FAQ | `1:328` | `sections/faq` + `faq-item` | Heading `1:332`, rows `1:338`–`1:373`, drawn collapsed — answers are stand-ins |
| Urgency | `1:376` | `sections/urgency` | Heading `1:380`, body `1:381`, one button (`1:384`) that opens the lead popup. Deep-green band, as Transiett's closing block |
| Lead popup | `1:64` | `components/lead/lead-modal` + `lead-form` | The frame's hero form, as a dialog every CTA opens (`ButtonLink` with `href="#anfrage"`) |
| Footer | `1:385` | `sections/footer` | Transiett's footer: watermark lineup (`images/footer-lineup.jpg`), brand + rating, link columns, hours, social |

## Assets

None from the frame: its only exports are a 256px checker placeholder behind
the hero (`1:39`) and a phone glyph (`1:31`), both replaced by CSS and an
inline SVG. Icons (check, cross, star, phone, chevron, arrow) live in
`src/components/ui/icons.tsx`.

The photographs in `public/assets/images/` were generated on 2026-09-11
(Higgsfield, gpt_image_2, 2k) to the brand's palette — generic cars without
badges, no readable text — and are stand-ins until real photography exists.

| File | Slot | Size |
|------|------|------|
| `hero-car.png` | 3D-rendered EV (cut out, transparent) standing under the hero copy (`1:39`); the ground stays the `hero-ground` gradient | 1640×740 |
| `pain.jpg` | Pain media slot (`1:83`) | 1600×1600 |
| `benefit-1.jpg` | Benefit 1 media (`1:99`) | 1600×1600 |
| `benefit-2.jpg` | Benefit 2 media (`1:121`) | 1600×1600 |
| `benefit-3.jpg` | Benefit 3 media (`1:125`) | 1600×1600 |
| `step-1.jpg` … `step-3.jpg` | Flat illustrations above the three steps (`1:320`–`1:324`), Transiett's style, blended with `multiply` onto the mint band | 1200×797 |
| `faq.jpg` | Illustration beside the FAQ rows (`1:328`) | 1200×797 |
