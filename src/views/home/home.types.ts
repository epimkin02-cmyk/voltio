export interface Link {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeaderContent {
  brand: string;
  nav: Link[];
  phone: Link;
  cta: Link;
}

export interface TrustCard {
  label: string;
  /** Optional big figure shown before the label, e.g. the rating. */
  figure?: string;
}

export interface LeadFormContent {
  heading: string;
  intro: string;
  fields: {
    vehicle: string;
    year: string;
    mileage: string;
    name: string;
    email: string;
    phone: string;
  };
  submit: string;
  sending: string;
  success: string;
  error: string;
  privacy: string;
  close: string;
}

export interface HeroContent {
  rating: { score: string; stars: number; count: string };
  title: string;
  bullets: string[];
  cta: Link;
  /** Friction reducers under the button: short, comma-free assurances. */
  assurances: string[];
  /** The 3D-rendered car on the right, cut out on transparency. */
  car?: ImageAsset;
  /** Floating cards around the car — the page's trust signals. */
  trust: TrustCard[];
}

export interface Stat {
  figure: string;
  label: string;
}

export interface PainContent {
  heading: string;
  body: string;
  /** The "old way" pains, one line each. */
  pains: string[];
  cta: Link;
  image?: ImageAsset;
}

export interface Testimonial {
  quote: string;
  name: string;
  place: string;
  vehicle: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  heading: string;
  rating: { score: string; count: string };
  items: Testimonial[];
  cta: Link;
}

export interface NumbersContent {
  eyebrow: string;
  heading: string;
  body: string;
  stats: Stat[];
  cta: Link;
}

export interface BenefitContent {
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  cta: Link;
  image?: ImageAsset;
}

export interface ComparisonContent {
  eyebrow: string;
  heading: string;
  body: string;
  cta: Link;
  brand: string;
  competitors: string[];
  rows: { label: string; values: boolean[] }[];
}

export interface StepItem {
  title: string;
  body: string;
  duration: string;
  image?: ImageAsset;
}

export interface StepsContent {
  eyebrow: string;
  heading: string;
  items: StepItem[];
  cta: Link;
}

export interface FaqContent {
  heading: string;
  body: string;
  items: { question: string; answer: string }[];
  image?: ImageAsset;
}

export interface UrgencyContent {
  heading: string;
  body: string;
  cta: Link;
  assurances: string[];
}

export interface FooterContent {
  brand: string;
  tagline: string;
  phone: Link;
  email: Link;
  cta: Link;
  legal: Link[];
  copyright: string;
}

export interface HomeContent {
  header: HeaderContent;
  hero: HeroContent;
  stats: Stat[];
  pain: PainContent;
  testimonials: TestimonialsContent;
  benefits: BenefitContent[];
  numbers: NumbersContent;
  comparison: ComparisonContent;
  steps: StepsContent;
  faq: FaqContent;
  urgency: UrgencyContent;
  leadForm: LeadFormContent;
  footer: FooterContent;
}
