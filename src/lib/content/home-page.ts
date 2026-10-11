import { z } from "zod";

import type {
  BenefitContent,
  BrandsContent,
  CategoriesContent,
  ComparisonContent,
  FaqContent,
  FooterContent,
  HeaderContent,
  HeroContent,
  LeadFormContent,
  NumbersContent,
  PainContent,
  Stat,
  StepsContent,
  TestimonialsContent,
  UrgencyContent,
} from "@/views/home/home.types";

/**
 * Turns the page document from TinaCMS (`content/pages/home.json`) into the
 * typed props the home sections already take.
 *
 * The parser is deliberately forgiving: while an editor types in `/admin`, a
 * field is briefly empty (`null` from Tina's GraphQL), a list item is half
 * filled in, a block was just added. None of that may crash the live preview,
 * so blank strings become `""`, blank lists `[]`, images without a file are
 * dropped, and a block that still fails to parse is skipped instead of taking
 * the page down. See `obsidian/backend/cms-tina.md`.
 */

// ── Primitives ───────────────────────────────────────────────────────────────

const str = z
  .string()
  .nullish()
  .transform((v) => v ?? "");

/** Optional copy: blank means "not shown". */
const optStr = z
  .string()
  .nullish()
  .transform((v) => (v ? v : undefined));

const num = z
  .number()
  .nullish()
  .transform((v) => v ?? 0);

const list = <T extends z.ZodType>(item: T) =>
  z
    .array(item)
    .nullish()
    .transform((v) => v ?? []);

const strList = list(str);

const link = z
  .object({ label: str, href: str })
  .nullish()
  .transform((v) => v ?? { label: "", href: "" });

const imageObject = z.object({ src: str, alt: str, width: num, height: num, focus: optStr });

/** An image that may be left out; dropped when no file is picked. */
const optImage = imageObject.nullish().transform((v) => (v && v.src ? v : undefined));

const stat = z.object({ figure: str, label: str });

// ── Fixed parts ──────────────────────────────────────────────────────────────

const header = z.object({
  brand: str,
  nav: list(link),
  phone: link,
  cta: link,
}) satisfies z.ZodType<HeaderContent, unknown>;

const hero = z.object({
  rating: z
    .object({ score: str, stars: num, count: str, href: str })
    .nullish()
    .transform((v) => v ?? { score: "", stars: 0, count: "", href: "" }),
  image: imageObject
    .nullish()
    .transform((v) => v ?? { src: "", alt: "", width: 0, height: 0, focus: undefined }),
  title: str,
  bullets: strList,
  cta: link,
  assurances: strList,
  trust: list(z.object({ label: str, figure: optStr })),
}) satisfies z.ZodType<HeroContent, unknown>;

const leadForm = z.object({
  heading: str,
  intro: str,
  fields: z
    .object({
      brand: str,
      model: str,
      vehicleOther: str,
      year: str,
      mileage: str,
      name: str,
      email: str,
      phone: str,
    })
    .nullish()
    .transform(
      (v) => v ?? { brand: "", model: "", vehicleOther: "", year: "", mileage: "", name: "", email: "", phone: "" },
    ),
  submit: str,
  sending: str,
  success: str,
  error: str,
  privacy: str,
  privacyLink: str,
  close: str,
}) satisfies z.ZodType<LeadFormContent, unknown>;

const socialName = z.enum(["instagram", "facebook", "linkedin"]);

const footer = z.object({
  brand: str,
  tagline: str,
  rating: z
    .object({ score: str, label: str, href: str })
    .nullish()
    .transform((v) => v ?? { score: "", label: "", href: "" }),
  phone: link,
  email: link,
  cta: link,
  columns: list(z.object({ title: str, links: list(link) })),
  hours: z
    .object({ title: str, rows: list(z.object({ day: str, time: str })) })
    .nullish()
    .transform((v) => v ?? { title: "", rows: [] }),
  social: list(z.object({ name: socialName.nullish(), href: str })).transform((items) =>
    items.flatMap((item) => (item.name ? [{ name: item.name, href: item.href }] : [])),
  ),
  copyright: str,
  watermark: optImage,
}) satisfies z.ZodType<FooterContent, unknown>;

// ── Blocks ───────────────────────────────────────────────────────────────────

const categories = z.object({
  eyebrow: str,
  heading: str,
  body: str,
  lanes: list(
    z.object({
      title: str,
      body: str,
      chips: strList,
      front: optImage,
      from: z
        .enum(["left", "right"])
        .nullish()
        .transform((v) => v ?? "left"),
      cars: list(z.object({ name: str, image: optImage, speed: num })).transform((cars) =>
        cars.flatMap((car) =>
          car.image ? [{ name: car.name, image: car.image, speed: car.speed || 1 }] : [],
        ),
      ),
    }),
  ),
  cta: link,
}) satisfies z.ZodType<CategoriesContent, unknown>;

const pain = z.object({
  heading: str,
  body: str,
  pains: strList,
  cta: link,
  image: optImage,
  illustration: optImage,
}) satisfies z.ZodType<PainContent, unknown>;

const testimonials = z.object({
  eyebrow: str,
  heading: str,
  rating: z
    .object({ score: str, count: str })
    .nullish()
    .transform((v) => v ?? { score: "", count: "" }),
  items: list(z.object({ quote: str, name: str, place: str, vehicle: str })),
  cta: link,
}) satisfies z.ZodType<TestimonialsContent, unknown>;

const mediaSide = z.enum(["start", "end"]).nullish().transform((v) => v ?? undefined);

const benefit = z.object({
  intro: optStr,
  eyebrow: str,
  heading: str,
  body: str,
  points: strList,
  cta: link,
  image: optImage,
}) satisfies z.ZodType<BenefitContent, unknown>;

const numbers = z.object({
  eyebrow: str,
  heading: str,
  body: str,
  stats: list(stat),
  cta: link,
}) satisfies z.ZodType<NumbersContent, unknown>;

const comparison = z.object({
  eyebrow: str,
  heading: str,
  cta: link,
  brand: str,
  competitors: strList,
  rows: list(
    z.object({
      label: str,
      values: list(
        z.object({
          ok: z
            .boolean()
            .nullish()
            .transform((v) => v ?? false),
        }),
      ).transform((cells) => cells.map((cell) => cell.ok)),
    }),
  ),
}) satisfies z.ZodType<ComparisonContent, unknown>;

const steps = z.object({
  eyebrow: str,
  heading: str,
  items: list(z.object({ title: str, body: str, duration: str, image: optImage })),
  cta: link,
}) satisfies z.ZodType<StepsContent, unknown>;

const faq = z.object({
  heading: str,
  body: str,
  items: list(z.object({ question: str, answer: str })),
  image: optImage,
}) satisfies z.ZodType<FaqContent, unknown>;

const urgency = z.object({
  heading: str,
  body: str,
  cta: link,
  assurances: strList,
}) satisfies z.ZodType<UrgencyContent, unknown>;

const brands = z.object({
  eyebrow: str,
  heading: str,
  body: str,
  brands: list(z.object({ name: str, slug: str })),
  more: str,
  image: optImage,
}) satisfies z.ZodType<BrandsContent, unknown>;

export type HomeBlock =
  | { kind: "proofStrip"; stats: Stat[] }
  | { kind: "categories"; content: CategoriesContent }
  | { kind: "pain"; content: PainContent }
  | { kind: "testimonials"; content: TestimonialsContent }
  | { kind: "benefit"; content: BenefitContent; mediaSide?: "start" | "end" }
  | { kind: "numbers"; content: NumbersContent }
  | { kind: "comparison"; content: ComparisonContent }
  | { kind: "steps"; content: StepsContent }
  | { kind: "faq"; content: FaqContent }
  | { kind: "urgency"; content: UrgencyContent }
  | { kind: "brands"; content: BrandsContent };

/** Each template name, mapped to the parser that turns it into a `HomeBlock`. */
const blockParsers: Record<HomeBlock["kind"], z.ZodType<HomeBlock, unknown>> = {
  proofStrip: z.object({ stats: list(stat) }).transform((v) => ({ kind: "proofStrip" as const, stats: v.stats })),
  categories: categories.transform((content) => ({ kind: "categories" as const, content })),
  pain: pain.transform((content) => ({ kind: "pain" as const, content })),
  testimonials: testimonials.transform((content) => ({ kind: "testimonials" as const, content })),
  benefit: benefit
    .extend({ mediaSide })
    .transform(({ mediaSide: side, ...content }) => ({ kind: "benefit" as const, content, mediaSide: side })),
  numbers: numbers.transform((content) => ({ kind: "numbers" as const, content })),
  comparison: comparison.transform((content) => ({ kind: "comparison" as const, content })),
  steps: steps.transform((content) => ({ kind: "steps" as const, content })),
  faq: faq.transform((content) => ({ kind: "faq" as const, content })),
  urgency: urgency.transform((content) => ({ kind: "urgency" as const, content })),
  brands: brands.transform((content) => ({ kind: "brands" as const, content })),
};

const isBlockKind = (value: string): value is HomeBlock["kind"] => value in blockParsers;

/**
 * Which template a raw block uses. Files on disk carry `_template`; Tina's
 * GraphQL answers with `__typename` instead, e.g. `PageBlocksProofStrip`.
 */
const templateOf = (raw: Record<string, unknown>): string | undefined => {
  if (typeof raw._template === "string") return raw._template;
  if (typeof raw.__typename === "string" && raw.__typename.startsWith("PageBlocks")) {
    const name = raw.__typename.slice("PageBlocks".length);
    return name.charAt(0).toLowerCase() + name.slice(1);
  }
  return undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// ── Page ─────────────────────────────────────────────────────────────────────

export interface ParsedBlock {
  block: HomeBlock;
  /** The untouched block object, kept for Tina's click-to-edit (`tinaField`). */
  raw: Record<string, unknown>;
}

export interface HomePage {
  header: HeaderContent;
  hero: HeroContent;
  blocks: ParsedBlock[];
  leadForm: LeadFormContent;
  footer: FooterContent;
}

const fixedParts = z.object({
  header: header.nullish(),
  hero: hero.nullish(),
  leadForm: leadForm.nullish(),
  footer: footer.nullish(),
});

/** Parse the raw page document. Never throws for content an editor can produce. */
export function parseHomePage(raw: unknown): HomePage {
  const page = isRecord(raw) ? raw : {};
  const fixed = fixedParts.parse({
    header: page.header ?? null,
    hero: page.hero ?? null,
    leadForm: page.leadForm ?? null,
    footer: page.footer ?? null,
  });

  const rawBlocks = Array.isArray(page.blocks) ? page.blocks.filter(isRecord) : [];
  const blocks = rawBlocks.flatMap((rawBlock): ParsedBlock[] => {
    const template = templateOf(rawBlock);
    if (!template || !isBlockKind(template)) return [];
    const result = blockParsers[template].safeParse(rawBlock);
    return result.success ? [{ block: result.data, raw: rawBlock }] : [];
  });

  return {
    header: fixed.header ?? header.parse({}),
    hero: fixed.hero ?? hero.parse({}),
    blocks,
    leadForm: fixed.leadForm ?? leadForm.parse({}),
    footer: fixed.footer ?? footer.parse({}),
  };
}
