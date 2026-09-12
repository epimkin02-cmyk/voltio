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

export interface VideoScene {
  /** 16:9 clip. */
  src: string;
  /** Still shown before the clip plays (and for reduced motion). */
  poster: string;
  /**
   * Where the subject sits, as a CSS `object-position`. A portrait phone
   * shows only the middle third of a 16:9 frame, so each scene names the
   * spot the crop must keep — the car, not the scenery.
   */
  focus: string;
}

export interface HeroContent {
  rating: { score: string; stars: number; count: string; href: string };
  /** Two clips that cross-fade into each other forever. */
  video: VideoScene[];
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
  /** A flat illustration floating beside the photograph, on its own depth. */
  illustration?: ImageAsset;
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
  badge: string;
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

export interface FooterColumn {
  title: string;
  links: Link[];
}

export interface FooterContent {
  brand: string;
  tagline: string;
  rating: { score: string; label: string; href: string };
  phone: Link;
  email: Link;
  cta: Link;
  columns: FooterColumn[];
  hours: { title: string; rows: { day: string; time: string }[] };
  social: { name: "instagram" | "facebook" | "linkedin"; href: string }[];
  copyright: string;
  /** Faded lineup behind the footer, as a watermark. */
  watermark?: ImageAsset;
}

export interface ComparisonBadge {
  label: string;
}

export interface Brand {
  name: string;
  /** File under /assets/brands, used as a CSS mask so it takes any colour. */
  slug: string;
}

export interface BrandsContent {
  eyebrow: string;
  heading: string;
  body: string;
  brands: Brand[];
  more: string;
  image?: ImageAsset;
}

export interface CategoryCar {
  name: string;
  image: ImageAsset;
  /** Relative speed on scroll; 1 is the lane's base speed. */
  speed: number;
}

export interface CategoryLane {
  title: string;
  body: string;
  chips: string[];
  /** Front-view cut-out shown on the lane's label card. */
  front?: ImageAsset;
  /** Which edge the cars enter from. */
  from: "left" | "right";
  cars: CategoryCar[];
}

export interface CategoriesContent {
  eyebrow: string;
  heading: string;
  body: string;
  lanes: CategoryLane[];
  cta: Link;
}

export interface HomeContent {
  header: HeaderContent;
  hero: HeroContent;
  stats: Stat[];
  brands: BrandsContent;
  categories: CategoriesContent;
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
