import type { HomeContent } from "@/views/home/home.types";

/**
 * Voltio's page copy — **taken verbatim from the wireframe** (Figma file
 * yylm21nc34q4XvccygO6K8, page "Landingpage Wireframe", section "Home -
 * Desktop"), on the client's instruction that the copy stand exactly as drawn.
 *
 * Only the hero carries final copy. Every other block still reads as the
 * wireframe's template text ("GEWÜNSCHTE HAUPTAKTION", "Nutzenversprechen &
 * großer Vorteil #1", "Frage #1" …) and is meant to be replaced here, in this
 * one file, once the real wording exists. Nothing on the page is invented
 * social proof: the rating in the hero is the frame's own line.
 *
 * Three things were *not* in the frame and had to be written to make the page
 * work — the lead form's field labels and messages, the FAQ answers (the frame
 * draws collapsed rows with no body), and the footer's lines. All are marked
 * `TODO(voltio)`.
 */

const CTA_HREF = "#anfrage";
const MAIN_ACTION = { label: "GEWÜNSCHTE HAUPTAKTION", href: CTA_HREF };

const BENEFIT_BODY =
  "Unsere Lösung leistet X, Y, Z (benenne den Hauptnutzen, den du bietest, und erkläre, wie du ihn auf eigene bzw. einzigartige Weise erzielst).";
const BENEFIT_MEDIA = {
  strong: "Bild oder Video",
  rest: ", das das zentrale Nutzenversprechen ergänzt und verstärkt",
};
const SOCIAL_PROOF = {
  heading: "Social-Proof-Sektion (Zahlen, Testimonials, Fallstudien etc.)",
  box: "Social Proof",
  cta: MAIN_ACTION,
};

export const homeContent: HomeContent = {
  header: {
    brand: "VOLTIO",
    phone: { label: "333-333-3333", href: "tel:3333333333" },
    cta: { label: "CTA-Button", href: CTA_HREF },
  },

  hero: {
    rating: { score: "5,0", stars: 5, count: "776 Bewertungen" },
    title: ["Dein Elektroauto in", "Ø 5 Tagen zum Bestpreis verkauft"],
    bullets: [
      "Wir vergleichen Angebote im gesamten DACH-Raum und garantieren den besten Preis",
      "Von Angebot bis Abholung des Fahrzeugs alles aus einer Hand",
      "Geld nach 5 Tagen auf dem Wunschkonto",
    ],
    cta: { label: "Jetzt verkauf anfragen", href: CTA_HREF },
    note: "REIBUNG und FUDs REDUZIEREN (ANGST, UNSICHERHEIT, ZWEIFEL)",
    image: {
      src: "/assets/images/hero.jpg",
      alt: "",
      width: 2400,
      height: 1357,
    },
    form: {
      heading: "Lead-Formular, um den Bereich „Above the Fold“ optimal zu nutzen.",
      // TODO(voltio): field labels and messages are not in the wireframe.
      fields: {
        vehicle: "Marke & Modell",
        year: "Erstzulassung",
        mileage: "Kilometerstand",
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
      },
      submit: "Jetzt verkauf anfragen",
      sending: "Wird gesendet …",
      success: "Anfrage gesendet. Wir melden uns bei dir.",
      error: "Das hat nicht geklappt. Bitte versuche es noch einmal.",
      privacy: "Mit dem Absenden stimmst du der Verarbeitung deiner Daten zu.",
    },
  },

  proofStrip: "SOCIAL PROOF #2",

  pain: {
    heading:
      "Sprich den größten Schmerzpunkt an, den du löst, sowie den „alten Weg“ und verknüpfe beides mit deinem einzigartigen Nutzen",
    body: "Nutze diesen Abschnitt, um die Schmerzpunkte deines idealen Interessenten lebendig zu beschreiben und die Schwächen des Status quo aufzuzeigen. So zeigst du, dass du weißt, was er durchmacht. Ergänze das mit deinem einzigartigen Nutzenversprechen und Differenzierungsmerkmal.",
    cta: MAIN_ACTION,
    media: "Optionales Bild oder Video",
    image: {
      src: "/assets/images/pain.jpg",
      alt: "Privatverkäufer am Küchentisch, frustriert über unübersichtliche Fahrzeuginserate am Laptop",
      width: 1600,
      height: 1600,
    },
  },

  socialProof: SOCIAL_PROOF,

  benefits: [
    {
      eyebrow: "TRAUMERGEBNIS IN KÜRZE",
      heading: "Nutzenversprechen & großer Vorteil #1 („WIIFM“)",
      body: BENEFIT_BODY,
      cta: MAIN_ACTION,
      media: BENEFIT_MEDIA,
      image: {
        src: "/assets/images/benefit-1.jpg",
        alt: "Hand hält ein Smartphone mit einem Vergleich mehrerer Preisangebote, im Hintergrund ein Elektroauto",
        width: 1600,
        height: 1600,
      },
    },
    {
      eyebrow: "TRAUMERGEBNIS IN KÜRZE",
      heading: "Nutzenversprechen & großer Vorteil #2 („WIIFM“)",
      body: BENEFIT_BODY,
      cta: MAIN_ACTION,
      media: BENEFIT_MEDIA,
      image: {
        src: "/assets/images/benefit-2.jpg",
        alt: "Elektroauto wird vor einem Wohnhaus auf einen Transporter geladen, der Fahrer übergibt Unterlagen",
        width: 1600,
        height: 1600,
      },
    },
    {
      eyebrow: "TRAUMERGEBNIS IN KÜRZE",
      heading: "Nutzenversprechen & großer Vorteil #3 („WIIFM“)",
      body: BENEFIT_BODY,
      cta: MAIN_ACTION,
      media: BENEFIT_MEDIA,
      image: {
        src: "/assets/images/benefit-3.jpg",
        alt: "Mann vor seinem Haus zeigt lächelnd eine Zahlungsbestätigung auf dem Smartphone und übergibt den Autoschlüssel",
        width: 1600,
        height: 1600,
      },
    },
  ],

  comparison: {
    heading:
      "Nutzenorientierte Headline – wie du es machst und was dich unterscheidet",
    cta: MAIN_ACTION,
    brand: "Deine Marke",
    competitors: [
      "Konkurrent 1",
      "Konkurrent 2",
      "Konkurrent 3",
      "Konkurrent 4",
      "Konkurrent 5",
    ],
    // The tick pattern is the frame's own, column by column: brand first.
    rows: [
      { label: "Punkt #1", values: [true, false, false, false, false, false] },
      { label: "Punkt #2", values: [true, false, false, false, false, false] },
      { label: "Punkt #3", values: [true, false, true, false, false, true] },
      { label: "Punkt #4", values: [true, false, true, false, false, true] },
      { label: "Punkt #5", values: [true, false, false, false, false, false] },
    ],
  },

  steps: {
    heading:
      "Wie funktioniert es? {Lass den Erfolg als sehr wahrscheinlich und mühelos erreichbar erscheinen}",
    items: ["Schritt #1", "Schritt #2", "Schritt #3"],
    cta: MAIN_ACTION,
  },

  faq: {
    heading: "Häufig gestellte Fragen",
    // TODO(voltio): the frame draws the rows collapsed; the answers are stand-ins.
    items: [
      { question: "Frage #1", answer: "Antwort #1" },
      { question: "Frage #2", answer: "Antwort #2" },
      { question: "Frage #3", answer: "Antwort #3" },
      { question: "Frage #4", answer: "Antwort #4" },
      { question: "Frage #5", answer: "Antwort #5" },
      { question: "Frage #6", answer: "Antwort #6" },
    ],
  },

  urgency: {
    heading: "Warum sollten Menschen heute handeln? (Dringlichkeit erzeugen)",
    body: "Formuliere den einen letzten Grund, warum Menschen dein Unternehmen für deine Leistung oder dein Produkt kontaktieren sollten. Das ist deine letzte Chance, ihre Aufmerksamkeit zu gewinnen.",
    cta: MAIN_ACTION,
  },

  // TODO(voltio): the frame's footer is a single word, "Footer". These lines are
  // the minimum a German site needs; the legal links have no pages behind them yet.
  footer: {
    brand: "VOLTIO",
    phone: { label: "333-333-3333", href: "tel:3333333333" },
    cta: { label: "CTA-Button", href: CTA_HREF },
    legal: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
    ],
    copyright: "© 2026 VOLTIO",
  },
};
