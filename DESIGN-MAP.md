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
| Navigation | `1:22` | `views/home/header` → `SiteHeader` | Logo left; phone (`1:36`) + CTA (`1:38`) right. No nav items in the frame |
| Hero | `1:39` | `views/home/hero` → `Hero` | Copy left (`1:41`), lead form card right (`1:64`, 637×530). Frame asks for image + 60% scrim; painted as `hero-ground` until a photograph exists. Holds the `h1` (`1:46`) |
| Proof strip | `1:66` | `sections/proof-strip` | 81 tall grey band, "SOCIAL PROOF #2" (`1:69`) |
| Pain | `1:70` | `sections/pain` | Headline `1:78`, body `1:79`, CTA `1:82`, media slot `1:83` (574×534) |
| Social proof | `1:85` | `sections/social-proof` (`social-proof-1`) | Heading `1:89`, box `1:92` (1200×311), CTA `1:95`. Angled mint band |
| Benefit 1 | `1:96` | `sections/benefit` (media start) | Eyebrow `1:103`, heading `1:104`, body `1:105`, CTA `1:108`, media `1:99` |
| Benefit 2 | `1:109` | `sections/benefit` (media end) | `1:114` / `1:115` / `1:116` / `1:119`, media `1:121` |
| Benefit 3 | `1:122` | `sections/benefit` (media start) | `1:129` / `1:130` / `1:131` / `1:134`, media `1:125` |
| Social proof | `1:135` | `sections/social-proof` (`social-proof-2`) | Same composition as `1:85` |
| Comparison | `1:146` | `sections/comparison` | Heading `1:150`, CTA `1:153`, rows `1:159`–`1:171`, columns `1:177`–`1:205`. Tick pattern is the frame's; brand column lifted |
| Steps | `1:313` | `sections/steps` | Heading `1:317`, cards `1:320`–`1:324`, CTA `1:327`. Angled mint band |
| FAQ | `1:328` | `sections/faq` + `faq-item` | Heading `1:332`, rows `1:338`–`1:373`, drawn collapsed — answers are stand-ins |
| Urgency | `1:376` | `sections/urgency` | Heading `1:380`, body `1:381`, CTA `1:384`. Deep-green band, as Transiett's closing block |
| Footer | `1:385` | `sections/footer` | The frame says only "Footer" (`1:389`); built with brand, phone, CTA, legal links |

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
