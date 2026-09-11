export interface Link {
  label: string;
  href: string;
}

export interface HeaderContent {
  brand: string;
  phone: Link;
  cta: Link;
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
  form: LeadFormContent;
}

export interface PainContent {
  heading: string;
  body: string;
  cta: Link;
  media: string;
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
}

export interface ComparisonContent {
  heading: string;
  cta: Link;
  brand: string;
  competitors: string[];
  rows: { label: string; values: boolean[] }[];
}

export interface StepsContent {
  heading: string;
  items: string[];
  cta: Link;
}

export interface FaqContent {
  heading: string;
  items: { question: string; answer: string }[];
}

export interface UrgencyContent {
  heading: string;
  body: string;
  cta: Link;
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
