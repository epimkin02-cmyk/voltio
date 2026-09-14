import type { HomeContent } from "@/views/home/home.types";

/**
 * Voltio's page copy.
 *
 * Structure follows the wireframe (Figma yylm21nc34q4XvccygO6K8, "Home -
 * Desktop", node 1:651). The wording is real copy written on 2026-09-12 to
 * replace the wireframe's template text. **Every figure, testimonial and
 * guarantee here is invented for the draft** — swap in the real numbers and
 * real customer quotes before launch. The phone number and e-mail are
 * placeholders too.
 */

const CTA = { label: "Jetzt kostenlos bewerten lassen", href: "#anfrage" };

export const homeContent: HomeContent = {
  header: {
    brand: "VOLTIO",
    nav: [
      { label: "Vorteile", href: "#vorteile" },
      { label: "Vergleich", href: "#vergleich" },
      { label: "Ablauf", href: "#ablauf" },
      { label: "FAQ", href: "#faq" },
    ],
    phone: { label: "0800 555 20 20", href: "tel:+498005552020" },
    cta: { label: "Anfrage stellen", href: "#anfrage" },
  },

  hero: {
    rating: { score: "5,0", stars: 5, count: "Lies unsere 776 Bewertungen", href: "#bewertungen" },
    // The hero photograph. The footage loop from 12 Sep (three clips in
    // `public/assets/video/`) is still wired in `hero.tsx`: add a `video`
    // array here and it plays instead of the picture.
    image: {
      src: "/assets/images/hero-handshake.jpg",
      alt: "Verkäufer und Voltio-Ankäufer mit iPad geben sich vor einem weißen Tesla in der Hofeinfahrt die Hand",
      width: 2400,
      height: 1350,
      focus: "70% 50%",
    },
    title: "Dein Hybrid & Elektro-Auto in Ø\u00a05\u00a0Tagen zum Bestpreis verkauft",
    bullets: [
      "Wir vergleichen Angebote im gesamten DACH-Raum und garantieren den besten Preis",
      "Von Angebot bis Abholung des Fahrzeugs alles aus einer Hand",
      "Geld nach 5 Tagen auf dem Wunschkonto",
    ],
    cta: { label: "Jetzt Verkauf anfragen", href: "#anfrage" },
    assurances: ["Kostenlos & unverbindlich", "Keine Nachverhandlung"],
    trust: [
      { figure: "5,0", label: "776 Bewertungen" },
      { figure: "Ø 5", label: "Tage bis zum Geld auf dem Wunschkonto" },
      { label: "Bestpreis im gesamten DACH-Raum garantiert" },
    ],
  },

  stats: [
    { figure: "776+", label: "verkaufte Elektroautos" },
    { figure: "1.200+", label: "Händler & Käufer im Netzwerk" },
    { figure: "Ø 5 Tage", label: "von der Anfrage bis zur Auszahlung" },
    { figure: "100 %", label: "kostenlos und unverbindlich" },
  ],

  brands: {
    eyebrow: "ALLE MARKEN",
    heading: "Wir kaufen jedes Elektroauto an. Egal, welches Logo vorne drauf ist.",
    body: "Vom Tesla bis zum Dacia Spring, vom Firmen-Transporter bis zum Kleinwagen: Wenn es elektrisch fährt, machen wir dir ein Angebot. Das sind die Marken, die wir am häufigsten kaufen.",
    brands: [
      { name: "Tesla", slug: "tesla" },
      { name: "Mercedes-Benz", slug: "mercedes" },
      { name: "BMW", slug: "bmw" },
      { name: "Audi", slug: "audi" },
      { name: "Volkswagen", slug: "volkswagen" },
      { name: "Hyundai", slug: "hyundai" },
      { name: "Kia", slug: "kia" },
      { name: "BYD", slug: "byd" },
      { name: "Porsche", slug: "porsche" },
      { name: "Polestar", slug: "polestar" },
      { name: "Škoda", slug: "skoda" },
      { name: "Volvo", slug: "volvo" },
      { name: "Renault", slug: "renault" },
      { name: "Nissan", slug: "nissan" },
      { name: "MG", slug: "mg" },
      { name: "Opel", slug: "opel" },
      { name: "Peugeot", slug: "peugeot" },
      { name: "Mini", slug: "mini" },
      { name: "smart", slug: "smart" },
      { name: "Fiat", slug: "fiat" },
    ],
    more: "… und jede weitere Marke mit Elektroantrieb.",
    image: { src: "/assets/images/ill-savings.jpg", alt: "", width: 1200, height: 797 },
  },

  categories: {
    eyebrow: "PKW UND TRANSPORTER",
    heading: "Wir bekommen auf jedes Hybrid und Elektrofahrzeug die besten Konditionen in ganz Europa",
    body: "Privatwagen, Firmenwagen, Leasingrückläufer oder die ganze Flotte: Unsere Käufer suchen jede Klasse. Scroll weiter und schau, was bei uns täglich vom Hof rollt.",
    lanes: [
      {
        title: "Pkw",
        body: "Kompakt, Limousine, SUV oder Coupé. Jedes Alter ab 2017, jede Laufleistung.",
        chips: ["Model 3 & Y", "ID.3 & ID.4", "EQE & EQS", "i4 & iX", "Ioniq 5 & 6", "Q4 e-tron", "Seal & Atto 3"],
        front: { src: "/assets/cars/tesla-front.png", alt: "Tesla Model Y von vorn", width: 1200, height: 686 },
        from: "left",
        cars: [
          { name: "Tesla Model Y", image: { src: "/assets/cars/tesla.png", alt: "Tesla Model Y", width: 1400, height: 514 }, speed: 1 },
        ],
      },
      {
        title: "Transporter & Vans",
        body: "eVito, ID. Buzz, e-Transit, Zoe Van und Co. Auch mit Firmenbeschriftung, auch als Flotte.",
        chips: ["ID. Buzz", "eVito & EQV", "e-Transit", "e-Expert", "Zoe Van"],
        front: { src: "/assets/cars/idbuzz-front.png", alt: "VW ID. Buzz von vorn", width: 1200, height: 686 },
        from: "right",
        cars: [
          { name: "VW ID. Buzz", image: { src: "/assets/cars/idbuzz.png", alt: "Volkswagen ID. Buzz", width: 1400, height: 514 }, speed: 1 },
        ],
      },
    ],
    cta: CTA,
  },

  pain: {
    heading: "Privat verkaufen kostet Nerven. Und am Ende meistens Geld.",
    body: "Wer sein Elektroauto selbst inseriert, kennt das Spiel: Dutzende Nachrichten, Preisdrücker, Probefahrten ohne Ergebnis. Und beim Händler um die Ecke bekommst du ein Angebot, mit dem du nicht zufrieden bist. Voltio macht es anders: Wir holen für dein Fahrzeug Gebote von über 1.200 geprüften Käufern im gesamten DACH-Raum ein und geben dir den besten Preis als festes Angebot.",
    pains: [
      "Inserate, Anfragen und Besichtigungen kosten mehrere Wochen",
      "Händler vor Ort rechnen den Akku pauschal schlecht",
      "Verhandlung, Verkauf und der Papierkram liegt bei dir",
    ],
    cta: { label: "Kostenfreie Anfrage stellen", href: "#anfrage" },
    image: {
      src: "/assets/images/pain.jpg",
      alt: "Privatverkäufer sitzt frustriert vor Laptop mit Fahrzeuginseraten",
      width: 1600,
      height: 1600,
    },
    illustration: { src: "/assets/images/ill-handshake.jpg", alt: "", width: 1200, height: 797 },
  },

  testimonials: {
    eyebrow: "DAS SAGEN VERKÄUFER",
    heading: "Was 776 zufriedene Kunden sagen:",
    rating: { score: "5,0", count: "776 Bewertungen" },
    items: [
      {
        quote:
          "Zwei Händler wollten mir 21.500 € für meinen ID.3 geben. Über Voltio kam ein Angebot aus Österreich mit 24.900 €. Vier Tage später war das Geld da und das Auto abgeholt.",
        name: "Markus H.",
        place: "Nürnberg",
        vehicle: "VW ID.3 Pro, 2021",
      },
      {
        quote:
          "Ich hatte Angst vor der Akku-Diskussion. Voltio hat den State of Health selbst geprüft, der Preis stand danach fest und wurde bei der Übergabe nicht mehr angefasst.",
        name: "Sandra K.",
        place: "Zürich",
        vehicle: "Tesla Model 3 Long Range, 2020",
      },
      {
        quote:
          "Anfrage am Montag, Angebot am Dienstag, Abholung am Freitag. Abmeldung haben die auch übernommen. Einfacher geht Autoverkauf nicht.",
        name: "Thomas B.",
        place: "Graz",
        vehicle: "Hyundai Ioniq 5, 2022",
      },
    ],
    cta: { label: "Jetzt kostenfreie Anfrage stellen", href: "#anfrage" },
  },

  benefits: [
    {
      intro: "So funktioniert es:",
      eyebrow: "BESTPREIS-GARANTIE",
      heading: "Wir übernehmen die Vergleicharbeit. Du bekommst das beste Angebot im DACH-Raum",
      body: "Statt bei vereinzelten Händlern anzufragen greifen wir bei Voltio auf unser Netzwerk aus über 1.200 geprüften Käufern zurück. Wir übernehmen die gesamte Vergleicharbeit und garantieren dir innerhalb von 24 Stunden das beste Angebot am Markt.",
      points: [
        "Angebot innerhalb von 24 Stunden",
        "Festpreis, schriftlich und ohne Nachverhandlung",
        "Ø 1.900 € über dem besten lokalen Händlerangebot",
      ],
      cta: { label: "Jetzt kostenfreie Anfrage stellen", href: "#anfrage" },
      image: {
        src: "/assets/images/benefit-1.jpg",
        alt: "Hände halten ein Smartphone mit mehreren Preisangeboten, im Hintergrund ein Elektroauto",
        width: 1600,
        height: 1600,
      },
    },
    {
      eyebrow: "ALLES AUS EINER HAND",
      heading: "Wir bewerten dein Fahrzeug und holen es vor deiner Haustüre ab.",
      body: "Du musst nirgendwo hinfahren und niemanden treffen, den du nicht kennst. Unser Fahrer holt das Fahrzeug bei dir ab, prüft es vor Ort in 20 Minuten und nimmt die Papiere mit. Kaufvertrag und Übergabeprotokoll übernehmen wir.",
      points: [
        "Kostenlose Abholung in ganz Deutschland",
        "Sichtprüfung vor Ort, kein Werkstatttermin",
        "Kaufvertrag übernehmen wir",
      ],
      cta: { label: "Jetzt kostenfreie Anfrage stellen", href: "#anfrage" },
      image: {
        src: "/assets/images/benefit-2.jpg",
        alt: "Elektroauto wird vor einem Wohnhaus auf einen Transporter geladen",
        width: 1600,
        height: 1600,
      },
    },
    {
      eyebrow: "SCHNELLE AUSZAHLUNG",
      heading: "In 5 Tagen hast du den Verkaufspreis auf deinem Wunschkonto.",
      body: "Die Überweisung geht nach der Übergabe raus, auf Wunsch per Echtzeitüberweisung. Im Schnitt vergehen von der Anfrage bis zum Geldeingang fünf Tage. Läuft noch eine Finanzierung, lösen wir sie direkt bei der Bank ab und zahlen dir die Differenz aus.",
      points: [
        "Zahlung nach der Übergabe, auf Wunsch in Echtzeit",
        "Ablösung von Finanzierung oder Leasing",
        "Kein Bargeld, keine Vorkasse, keine Wartezeit",
      ],
      cta: { label: "Jetzt kostenfreie Anfrage stellen", href: "#anfrage" },
      image: {
        src: "/assets/images/benefit-3.jpg",
        alt: "Verkäufer mit Zahlungsbestätigung auf dem Smartphone bei der Schlüsselübergabe",
        width: 1600,
        height: 1600,
      },
    },
  ],

  numbers: {
    eyebrow: "VOLTIO IN ZAHLEN",
    heading: "Warum über 700 Verkäufer uns ihr Elektroauto anvertraut haben",
    body: "Wir kaufen ausschließlich Hybrid und Elektrofahrzeuge. Deshalb wissen wir, was ein Akku mit 92 % State of Health wert ist, und deshalb kennen unsere Käufer den Unterschied auch.",
    stats: [
      { figure: "776", label: "verkaufte Elektroautos seit 2023" },
      { figure: "1.900 €", label: "durchschnittlich mehr als beim lokalen Händler" },
      { figure: "24 h", label: "bis zum schriftlichen Angebot" },
      { figure: "98 %", label: "würden Voltio weiterempfehlen" },
    ],
    cta: { label: "In 2 Minuten kostenfreie Anfrage stellen", href: "#anfrage" },
  },

  comparison: {
    eyebrow: "DER VERGLEICH",
    heading: "Warum Voltio statt Portal, Händler oder Auktion?",
    cta: { label: "In 2 Minuten kostenfreie Anfrage stellen", href: "#anfrage" },
    brand: "Voltio",
    competitors: [
      "Händler vor Ort",
      "Kleinanzeigen",
      "Online-Ankäufer",
      "Leasing-Rückgabe",
      "Auktionsplattform",
    ],
    rows: [
      { label: "Bestpreis aus dem gesamten DACH-Raum", values: [true, false, false, false, false, true] },
      { label: "Festpreis ohne Nachverhandlung", values: [true, false, false, false, true, false] },
      { label: "Kostenlose Abholung zu Hause", values: [true, false, false, true, false, false] },
      { label: "Akku-Bewertung nach State of Health", values: [true, false, false, false, false, false] },
      { label: "Geld in Ø 5 Tagen auf dem Konto", values: [true, true, false, true, false, false] },
    ],
  },

  steps: {
    eyebrow: "SO FUNKTIONIERT ES",
    heading: "In drei Schritten zum verkauften Elektroauto",
    items: [
      {
        title: "Fahrzeug eintragen",
        duration: "2 Minuten",
        body: "Marke, Modell, Erstzulassung und Kilometerstand reichen. Fotos und Akku-Daten kannst du nachreichen oder uns überlassen.",
        image: { src: "/assets/images/step-1.jpg", alt: "", width: 1200, height: 797 },
      },
      {
        title: "Bestpreis-Angebot erhalten",
        duration: "innerhalb von 24 Stunden",
        body: "Wir holen Gebote aus unserem Käufernetzwerk ein und schicken dir das beste als schriftliches Festpreisangebot. Du entscheidest in Ruhe.",
        image: { src: "/assets/images/step-2.jpg", alt: "", width: 1200, height: 797 },
      },
      {
        title: "Abholung und Auszahlung",
        duration: "Ø 5 Tage nach Anfrage",
        body: "Unser Fahrer holt das Auto bei dir ab, prüft es vor Ort und überweist den vereinbarten Betrag noch bei der Übergabe.",
        image: { src: "/assets/images/step-3.jpg", alt: "", width: 1200, height: 797 },
      },
    ],
    cta: { label: "Kostenfreie Anfrage stellen", href: "#anfrage" },
  },

  faq: {
    heading: "Häufig gestellte Fragen",
    body: "Alles, was Verkäufer uns vor der ersten Anfrage fragen. Deine Frage ist nicht dabei? Ruf uns an, wir antworten sofort.",
    items: [
      {
        question: "Welche Fahrzeuge kauft Voltio an?",
        answer:
          "Alle Elektroautos und Plug-in-Hybride ab Erstzulassung 2017, Pkw wie Transporter, unabhängig von Marke, Laufleistung und Zustand. Ob Kleinwagen, SUV oder Firmenflotte: Trag das Fahrzeug einfach ein, wir melden uns innerhalb von 24 Stunden.",
      },
      {
        question: "Wie wird der Akku bewertet?",
        answer:
          "Wir lesen bei der Abholung den State of Health über die Diagnoseschnittstelle aus und legen ihn dem Angebot zugrunde. Ein Akku mit 90 % und mehr gilt als sehr gut. Auch bei niedrigeren Werten kaufen wir an, der Preis wird dann transparent angepasst. Nachträgliche Abzüge wegen des Akkus gibt es bei uns nicht.",
      },
      {
        question: "Was passiert, wenn noch eine Finanzierung oder ein Leasing läuft?",
        answer:
          "Kein Problem. Wir lösen die Restschuld direkt bei deiner Bank oder Leasinggesellschaft ab und überweisen dir die Differenz. Du brauchst nur die Ablösebestätigung, alles Weitere übernehmen wir.",
      },
      {
        question: "Ist das Angebot wirklich verbindlich?",
        answer:
          "Ja. Das schriftliche Angebot gilt sieben Tage und wird bei der Übergabe nur angepasst, wenn das Fahrzeug erkennbar von deinen Angaben abweicht, zum Beispiel bei nicht genannten Unfallschäden. In über 95 % der Fälle bleibt der Preis exakt so, wie er im Angebot steht.",
      },
      {
        question: "Wie schnell bekomme ich mein Geld?",
        answer:
          "Die Überweisung geht direkt bei der Übergabe raus, auf Wunsch per Echtzeitüberweisung. Im Schnitt vergehen von der Anfrage bis zum Geldeingang fünf Tage. Bargeld gibt es nicht, du bekommst den vollen Betrag auf das Konto, das du uns nennst.",
      },
      {
        question: "Muss ich mich um die Abmeldung kümmern?",
        answer:
          "Nein. Unser Fahrer nimmt Zulassungsbescheinigung Teil I und II sowie die Kennzeichen mit, wir melden das Fahrzeug ab und schicken dir die Abmeldebestätigung per E-Mail. Auch den Kaufvertrag und das Übergabeprotokoll bringen wir fertig ausgefüllt mit.",
      },
    ],
    image: { src: "/assets/images/faq.jpg", alt: "", width: 1200, height: 797 },
  },

  urgency: {
    heading: "Dein Elektroauto verliert jeden Monat an Wert. Dein Angebot nicht.",
    body: "Gebrauchte Elektroautos verlieren im Schnitt 1,5 % ihres Werts pro Monat. Wer heute anfragt, hat morgen ein Festpreisangebot, das sieben Tage gilt. Kostenlos, unverbindlich und ohne einen einzigen Besichtigungstermin.",
    cta: { label: "Kostenfreie Anfrage stellen", href: "#anfrage" },
    assurances: ["Angebot in 24 Stunden", "7 Tage gültig", "Keine Verpflichtung"],
  },

  leadForm: {
    heading: "Kostenlose Bewertung anfragen",
    intro: "Zwei Minuten, keine Verpflichtung. Du bekommst innerhalb von 24 Stunden ein schriftliches Festpreisangebot.",
    fields: {
      brand: "Marke wählen",
      model: "Modell wählen",
      vehicleOther: "Marke & Modell eintragen",
      year: "Erstzulassung",
      mileage: "Kilometerstand",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
    },
    submit: "Angebot anfordern",
    sending: "Wird gesendet …",
    success: "Danke! Wir melden uns innerhalb von 24 Stunden mit deinem Angebot.",
    error: "Das hat nicht geklappt. Bitte versuche es noch einmal oder ruf uns an.",
    privacy: "Mit dem Absenden stimmst du der Verarbeitung deiner Daten zur Angebotserstellung zu.",
    close: "Schließen",
  },

  footer: {
    brand: "VOLTIO",
    tagline: "Der Ankaufservice für Elektroautos in Deutschland, Österreich und der Schweiz. Bestpreis, Abholung und Auszahlung aus einer Hand.",
    rating: { score: "5,0", label: "Lies unsere 776 Bewertungen", href: "#bewertungen" },
    phone: { label: "0800 555 20 20", href: "tel:+498005552020" },
    email: { label: "hallo@voltio.de", href: "mailto:hallo@voltio.de" },
    cta: { label: "Fahrzeug bewerten", href: "#anfrage" },
    columns: [
      {
        title: "Unternehmen",
        links: [
          { label: "Über uns", href: "#zahlen" },
          { label: "Kontakt", href: "#anfrage" },
          { label: "Impressum", href: "/impressum" },
          { label: "Datenschutz", href: "/datenschutz" },
          { label: "Cookie-Einstellungen", href: "#cookies" },
        ],
      },
      {
        title: "Verkaufen",
        links: [
          { label: "Vorteile", href: "#vorteile" },
          { label: "Marken & Modelle", href: "#kategorien" },
          { label: "So funktioniert es", href: "#ablauf" },
          { label: "Vergleich", href: "#vergleich" },
          { label: "Häufige Fragen", href: "#faq" },
        ],
      },
    ],
    hours: {
      title: "Erreichbarkeit",
      rows: [
        { day: "Mo – Fr", time: "09:00 – 19:00" },
        { day: "Samstag", time: "10:00 – 16:00" },
        { day: "Sonntag", time: "geschlossen" },
      ],
    },
    social: [
      // TODO(voltio): profile URLs — an entry with an empty href is not rendered.
      { name: "instagram", href: "" },
      { name: "facebook", href: "" },
      { name: "linkedin", href: "" },
    ],
    copyright: "© 2026 VOLTIO. Alle Rechte vorbehalten.",
    watermark: { src: "/assets/images/footer-lineup.jpg", alt: "", width: 2400, height: 1350 },
  },
};
