import type { CollectionsContent } from "@/views/home/collections";
import type { DetailsContent } from "@/views/home/details";
import type { FaqContent } from "@/views/home/faq";
import type { FooterContent } from "@/views/home/footer";
import type { TechnologyContent } from "@/views/home/technology";
import type { HeroContent } from "@/views/home/hero";

/**
 * Voltio's page copy, until a CMS exists.
 *
 * **Everything here is German**, because the audience is a private seller in the
 * DACH region, and the display face is set in caps — so the copy is written to
 * survive uppercasing. That rules out anything whose meaning rides on a capital
 * letter, and it is why the numerals stay Arabic and the units stay abbreviated.
 *
 * **Three things in this file are placeholders and must not go live as they
 * stand.** They are marked `TODO(voltio)` where they sit:
 *   1. the company's real name, address, phone and e-mail (footer + legal),
 *   2. the model-year floors on the collection cards, which are plausible rather
 *      than agreed,
 *   3. every `href: "#"` — no routes exist behind them yet.
 * None of them is invented social proof: there are deliberately no purchase
 * counts, no testimonials and no "recently bought" figures anywhere on this
 * page, because a claim like that has to be true before it is designed.
 */
export const homeHero: HeroContent = {
  logo: {
    src: "/assets/ui/logo-mark.png",
    alt: "Voltio",
    width: 75,
    height: 30,
  },
  nav: [
    { label: "ANKAUF", href: "#ablauf" },
    {
      label: "FAHRZEUGE",
      href: "#fahrzeuge",
      submenu: [
        { label: "KOMPAKT & KLEINWAGEN", href: "#fahrzeuge" },
        { label: "LIMOUSINE & SUV", href: "#fahrzeuge" },
        { label: "PREMIUM & SPORT", href: "#fahrzeuge" },
        { label: "TRANSPORTER", href: "#fahrzeuge" },
      ],
    },
    { label: "PRÜFUNG", href: "#pruefung" },
    { label: "FRAGEN", href: "#fragen" },
  ],
  cart: { label: "0800 000 000", href: "#kontakt" },
  markerStart: {
    lines: ["ANKAUF VON", "ELEKTROFAHRZEUGEN.", "DEUTSCHLANDWEIT."],
  },
  markerEnd: {
    lines: ["FESTPREIS.", "ABHOLUNG INKLUSIVE.", "ZAHLUNG BEI ÜBERGABE."],
  },
  title: [
    "DEIN ELEKTROAUTO IST MEHR WERT,",
    "ALS DU DENKST.",
  ],
  cta: { label: "FAHRZEUG BEWERTEN", href: "#kontakt" },
  badgeStart: {
    icon: {
      src: "/assets/hero/hero-icon-globe.svg",
      alt: "",
      width: 37,
      height: 23,
    },
    caption: "DACH",
    lines: [
      "DEUTSCHLAND, ÖSTERREICH,",
      "SCHWEIZ. WIR KOMMEN",
      "ZU DIR — OHNE KOSTEN.",
    ],
  },
  badgeEnd: {
    icon: {
      src: "/assets/hero/hero-icon-target.svg",
      alt: "",
      width: 23,
      height: 23,
    },
    lines: ["ANGEBOT IN 24 STUNDEN", "SCHRIFTLICH & UNVERBINDLICH"],
  },
  subject: {
    src: "/assets/hero/hero-car.glb",
    label:
      "Elektrofahrzeug in dunklem Lack, langsam gedreht auf dunkler Studiofläche",
  },
  backdrop: {
    src: "/assets/hero/hero-wordmark.png",
    alt: "",
    // Intrinsic size of the plate — 4× the 1257×671 the frame draws it at, so
    // `next/image` has real pixels to serve on a dense display.
    width: 5028,
    height: 2684,
  },
};

/**
 * The five steps of the purchase, in the numbered rows Artefakt used for the
 * garment's specifications.
 *
 * The row layout was built for an ordered list of five and this is one, so the
 * composition is untouched — only the icons were re-drawn, in the same 2.5px
 * stroke language as the ones on the inspection screen below.
 */
export const homeDetails: DetailsContent = {
  heading: "SO LÄUFT DER ANKAUF.",
  lede: "Fünf Schritte, kein Papierkram auf deiner Seite und keine Fahrt zu einem Händler. Vom Ausfüllen bis zum Geld auf dem Konto vergehen in der Regel wenige Tage.",
  cta: { label: "FAHRZEUG BEWERTEN", href: "#kontakt" },
  features: [
    {
      index: "01",
      icon: {
        src: "/assets/details/details-icon-data.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "FAHRZEUGDATEN",
      body: "MARKE, MODELL, BAUJAHR UND LAUFLEISTUNG. DAUERT ZWEI MINUTEN.",
    },
    {
      index: "02",
      icon: {
        src: "/assets/details/details-icon-valuation.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "BEWERTUNG",
      body: "WIR PRÜFEN AUSSTATTUNG, AKKUZUSTAND UND DIE AKTUELLE MARKTLAGE.",
    },
    {
      index: "03",
      icon: {
        src: "/assets/details/details-icon-offer.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "FESTPREIS-ANGEBOT",
      body: "SCHRIFTLICH, MIT GÜLTIGKEITSDATUM UND OHNE VERPFLICHTUNG FÜR DICH.",
    },
    {
      index: "04",
      icon: {
        src: "/assets/details/details-icon-appointment.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "TERMIN & SICHTPRÜFUNG",
      body: "BEI DIR VOR ORT, ZUM WUNSCHTERMIN — NICHT IN EINER HALLE.",
    },
    {
      index: "05",
      icon: {
        src: "/assets/details/details-icon-payout.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "ZAHLUNG & ABHOLUNG",
      body: "GELD BEI ÜBERGABE, ABMELDUNG UND TRANSPORT ÜBERNEHMEN WIR.",
    },
  ],
};

/**
 * The four vehicle classes Voltio buys.
 *
 * **The photographs are four renders of the hero's own model**, turned to four
 * angles and given four paints, produced from the same GLB, lighting rig and
 * material roles the live scene uses — so the cards and the hero are literally
 * the same car under the same lamps. They stand in for real vehicle photography
 * and should be replaced class by class as it arrives.
 *
 * The `price` slot carries a model-year floor rather than a figure. Artefakt put
 * a price there; a purchase price cannot be stated per class without knowing the
 * car, and inventing a range would be the one dishonest thing on the page.
 * TODO(voltio): confirm the four floors with Egor, or drop the slot.
 */
export const homeCollections: CollectionsContent = {
  heading: "WAS WIR ANKAUFEN.",
  lede: "Reine Elektrofahrzeuge aller Klassen — auch mit laufender Finanzierung, hoher Laufleistung oder sichtbaren Mängeln.",
  products: [
    {
      index: "01",
      name: "KOMPAKT & KLEINWAGEN",
      price: "AB BJ 2017",
      views: [
        {
          src: "/assets/collections/collections-kompakt.png",
          alt: "",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 4,
      defaultView: 1,
      tags: ["ID.3", "ZOE", "CORSA-E", "KONA"],
      href: "#kontakt",
    },
    {
      index: "02",
      name: "LIMOUSINE & SUV",
      price: "AB BJ 2018",
      views: [
        {
          src: "/assets/collections/collections-limousine.png",
          alt: "",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 4,
      defaultView: 1,
      tags: ["MODEL 3", "MODEL Y", "ENYAQ", "IONIQ 5"],
      href: "#kontakt",
    },
    {
      index: "03",
      name: "PREMIUM & SPORT",
      price: "AB BJ 2019",
      views: [
        {
          src: "/assets/collections/collections-premium.png",
          alt: "",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 4,
      defaultView: 1,
      tags: ["TAYCAN", "E-TRON GT", "IX", "EQS"],
      href: "#kontakt",
    },
    {
      index: "04",
      name: "TRANSPORTER",
      price: "AB BJ 2019",
      views: [
        {
          src: "/assets/collections/collections-transporter.png",
          alt: "",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 4,
      defaultView: 1,
      tags: ["ID. BUZZ", "E-VITO", "E-TRANSIT"],
      href: "#kontakt",
    },
  ],
  cta: { label: "MEIN FAHRZEUG BEWERTEN", href: "#kontakt" },
};

/**
 * The five things the inspection actually looks at.
 *
 * This screen's mechanic is a pinned stage whose scroll scrubs a frame reel
 * while one card walks down it, each state drawing a leader line to a point on
 * the artwork. Artefakt pointed those lines at the five material layers of an
 * exploded jacket. **The reel is now a 360° turntable of the car**, so the five
 * anchors point at parts of a vehicle instead — and because the car is turning
 * rather than exploding, an anchor has to name a region that stays roughly where
 * it is through the sweep. That is why the points sit low and central rather
 * than on a specific panel: the battery under the floor, the drive at the axle,
 * the body along the flank, the wheel at the arch, the cabin at the glass.
 *
 * `anchorFx`/`anchorFy` are fractions of the artwork, measured against the
 * settled arrangement of the new reel. Re-measure them if the reel is
 * re-rendered at a different fill or elevation.
 */
export const homeTechnology: TechnologyContent = {
  heading: ["PRÜFUNG", "WAS WIR UNS ANSEHEN"],
  // The second line has a fixed box on the frame layout and clips rather than
  // wraps, so it is written to the length that fits: five short lines, no more.
  lede: [
    "Eine Bewertung ist nur so gut wie das, was sie prüft.",
    "Wir bewerten den tatsächlichen Zustand deines Fahrzeugs — vom State of Health des Akkus bis zum Reifenprofil. Was wir finden, steht im Angebot.",
  ],
  stack: {
    src: "/assets/technology/technology-stack.webp",
    alt: "Elektrofahrzeug, langsam um die eigene Achse gedreht",
    width: 1024,
    height: 954,
  },
  layers: [
    {
      index: "01",
      title: "AKKU & LADELEISTUNG",
      body: "State of Health, Ladezyklen und die tatsächlich erreichte Ladeleistung an AC und DC.",
      icon: { src: "/assets/technology/technology-icon-battery.svg", alt: "", width: 32, height: 32 },
      cardTop: 136,
      cardSideY: 197,
      anchorFx: 0.52,
      anchorFy: 0.62,
    },
    {
      index: "02",
      title: "ANTRIEB & ELEKTRONIK",
      body: "Motor, Leistungselektronik und ausgelesene Fehlerspeicher des Fahrzeugs.",
      icon: { src: "/assets/technology/technology-icon-drive.svg", alt: "", width: 32, height: 32 },
      cardTop: 236,
      cardSideY: 287,
      anchorFx: 0.4,
      anchorFy: 0.58,
    },
    {
      index: "03",
      title: "KAROSSERIE & LACK",
      body: "Spaltmaße, Lackschichtdicke und dokumentierte Vorschäden an der Karosserie.",
      icon: { src: "/assets/technology/technology-icon-body.svg", alt: "", width: 32, height: 32 },
      cardTop: 370,
      cardSideY: 431,
      anchorFx: 0.6,
      anchorFy: 0.48,
    },
    {
      index: "04",
      title: "REIFEN & BREMSEN",
      body: "Profiltiefe, Alter der Reifen und der Zustand von Scheiben und Belägen.",
      icon: { src: "/assets/technology/technology-icon-wheels.svg", alt: "", width: 32, height: 32 },
      cardTop: 492,
      cardSideY: 553,
      anchorFx: 0.68,
      anchorFy: 0.66,
    },
    {
      index: "05",
      title: "INNENRAUM & AUSSTATTUNG",
      body: "Sitze, Bedienteile und die Ausstattungslinie, die den Wiederverkaufswert trägt.",
      icon: { src: "/assets/technology/technology-icon-interior.svg", alt: "", width: 32, height: 32 },
      cardTop: 658,
      cardSideY: 709,
      anchorFx: 0.47,
      anchorFy: 0.44,
    },
  ],
};

/**
 * The five questions a private seller actually asks first.
 *
 * The answers describe an intended process, not a measured one — they are the
 * design's best statement of how Voltio means to work, and Egor has to confirm
 * each before the page goes live. The finance one in particular commits to a
 * bank payoff; TODO(voltio): confirm that is offered.
 */
export const homeFaq: FaqContent = {
  heading: "GUT ZU WISSEN.",
  subject: {
    src: "/assets/hero/hero-car.glb",
    label:
      "Elektrofahrzeug in dunklem Lack, langsam gedreht auf dunkler Studiofläche",
  },
  entries: [
    {
      index: "01",
      question: "KAUFT IHR AUCH MIT LAUFENDER FINANZIERUNG?",
      questionWidth: 195,
      answer:
        "Ja. Wir lösen die Restschuld direkt bei der Bank ab und zahlen dir die Differenz aus. Nenne uns dafür bei der Anfrage einfach den aktuellen Ablösestand.",
    },
    {
      index: "02",
      question: "WAS PASSIERT BEI EINEM SCHWACHEN AKKU?",
      answer:
        "Ein niedriger State of Health senkt den Preis, schließt den Ankauf aber nicht aus. Wir kaufen auch Fahrzeuge mit deutlichem Kapazitätsverlust — der Wert steht dann entsprechend im Angebot.",
    },
    {
      index: "03",
      question: "WIE SCHNELL HABE ICH MEIN GELD?",
      answer:
        "Die Zahlung läuft bei der Übergabe. Auf Wunsch per Echtzeitüberweisung, sodass der Betrag auf deinem Konto ist, bevor wir mit dem Fahrzeug losfahren.",
    },
    {
      index: "04",
      question: "KAUFT IHR AUCH UNFALLWAGEN?",
      answer:
        "Ja. Nenne uns den Schaden bei der Anfrage, dann ist er im Angebot berücksichtigt — und es gibt bei der Übergabe keine Diskussion darüber.",
    },
    {
      index: "05",
      question: "MUSS ICH ZU EUCH FAHREN?",
      answer:
        "Nein. Sichtprüfung und Abholung finden bei dir statt, im gesamten DACH-Raum und ohne Transportkosten für dich.",
    },
  ],
};

/**
 * The footer.
 *
 * The sign-up block keeps Artefakt's newsletter composition but is worded as the
 * enquiry it will become: the real lead form goes to Leadmetrics / Leadtable and
 * is deliberately not wired here yet, so the field is present as design and the
 * endpoint is absent rather than faked.
 *
 * TODO(voltio): every link is `#`, and the legal column needs a real Impressum,
 * Datenschutz and AGB before this is publicly reachable — a German site without
 * them is not merely incomplete, it is non-compliant.
 */
export const homeFooter: FooterContent = {
  logo: {
    src: "/assets/ui/logo-mark.png",
    alt: "Voltio",
    width: 99,
    height: 40,
  },
  columns: [
    {
      heading: { label: "ANKAUF", href: "#ablauf" },
      links: [
        { label: "ABLAUF", href: "#ablauf" },
        { label: "FAHRZEUGE", href: "#fahrzeuge" },
        { label: "PRÜFUNG", href: "#pruefung" },
      ],
    },
    {
      heading: { label: "UNTERNEHMEN", href: "#" },
      links: [
        { label: "ÜBER VOLTIO", href: "#" },
        { label: "KONTAKT", href: "#kontakt" },
      ],
    },
    { heading: { label: "FRAGEN", href: "#fragen" } },
    {
      heading: { label: "RECHTLICHES", href: "#" },
      links: [
        { label: "IMPRESSUM", href: "#" },
        { label: "Datenschutz", href: "#" },
        { label: "AGB", href: "#" },
        { label: "WIDERRUF", href: "#" },
      ],
    },
  ],
  newsletter: {
    heading: "FAHRZEUG BEWERTEN LASSEN.",
    placeholder: "Deine E-Mail",
    consent: "ICH MÖCHTE ZU MEINEM FAHRZEUG KONTAKTIERT WERDEN.",
  },
  copyright: "© 2026 VOLTIO. ANKAUF VON ELEKTROFAHRZEUGEN.",
  social: [
    { label: "INSTAGRAM", href: "#" },
    { label: "FACEBOOK", href: "#" },
    { label: "WHATSAPP", href: "#" },
  ],
};
