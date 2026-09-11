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
}

export interface HeroContent {
  rating: { score: string; stars: number; count: string };
  title: [string, string];
  bullets: string[];
  cta: Link;
  note: string;
  /** The 3D-rendered car on the right, cut out on transparency. */
  car?: ImageAsset;
  /** Floating cards around the car — the page's trust signals. */
  trust: TrustCard[];
}

export interface PainContent {
  heading: string;
  body: string;
  cta: Link;
  media: string;
  image?: ImageAsset;
}

export interface SocialProofContent {
  heading: string;
  box: string;
  cta: Link;
}

export interface BenefitContent {
  eyebrow: string;
  heading: string;
  body: string;
  cta: Link;
  media: { strong: string; rest: string };
  image?: ImageAsset;
}

export interface ComparisonContent {
  heading: string;
  cta: Link;
  brand: string;
  competitors: string[];
  rows: { label: string; values: boolean[] }[];
}

export interface StepItem {
  title: string;
  image?: ImageAsset;
}

export interface StepsContent {
  heading: string;
  items: StepItem[];
  cta: Link;
}

export interface FaqContent {
  heading: string;
  items: { question: string; answer: string }[];
  image?: ImageAsset;
}

export interface UrgencyContent {
  heading: string;
  body: string;
  cta: Link;
  form: LeadFormContent;
}

export interface FooterContent {
  brand: string;
  phone: Link;
  cta: Link;
  legal: Link[];
  copyright: string;
}

export interface HomeContent {
  header: HeaderContent;
  hero: HeroContent;
  proofStrip: string;
  pain: PainContent;
  socialProof: SocialProofContent;
  benefits: BenefitContent[];
  comparison: ComparisonContent;
  steps: StepsContent;
  faq: FaqContent;
  urgency: UrgencyContent;
  footer: FooterContent;
}
