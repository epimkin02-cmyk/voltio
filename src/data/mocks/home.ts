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
    cta: { label: "Fahrzeug bewerten", href: "#anfrage" },
  },

  hero: {
    rating: { score: "5,0", stars: 5, count: "776 Bewertungen" },
    title: "Dein Elektroauto in Ø 5 Tagen zum Bestpreis verkauft",
    bullets: [
      "Wir vergleichen Angebote im gesamten DACH-Raum und garantieren den besten Preis",
      "Von Angebot bis Abholung des Fahrzeugs alles aus einer Hand",
      "Geld nach 5 Tagen auf dem Wunschkonto",
    ],
    cta: { label: "Jetzt Verkauf anfragen", href: "#anfrage" },
    assurances: ["Kostenlos & unverbindlich", "Keine Nachverhandlung", "Abmeldung inklusive"],
    car: {
      src: "/assets/images/hero-car.png",
      alt: "3D-Rendering eines modernen Elektro-Crossovers in Petrol",
      width: 1680,
      height: 900,
    },
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

  pain: {
    heading: "Privat verkaufen kostet Nerven. Und am Ende meistens Geld.",
    body: "Wer sein Elektroauto selbst inseriert, kennt das Spiel: Dutzende Nachrichten, Preisdrücker, Probefahrten ohne Ergebnis. Und beim Händler um die Ecke bekommst du ein Angebot, das den Akku vorsichtshalber schlecht rechnet. Voltio macht es anders: Wir holen für dein Fahrzeug Gebote von über 1.200 geprüften Käufern im gesamten DACH-Raum ein und geben dir den besten Preis als festes Angebot.",
    pains: [
      "Inserate, Anfragen und Besichtigungen fressen Wochen",
      "Händler vor Ort rechnen den Akku pauschal schlecht",
      "Verkauf, Abmeldung und Zahlung liegen bei dir",
    ],
    cta: CTA,
    image: {
      src: "/assets/images/pain.jpg",
      alt: "Privatverkäufer sitzt frustriert vor Laptop mit Fahrzeuginseraten",
      width: 1600,
      height: 1600,
    },
  },

  testimonials: {
    eyebrow: "DAS SAGEN VERKÄUFER",
    heading: "776 Elektroautos verkauft. Und jedes Mal ohne Feilschen.",
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
    cta: CTA,
  },

  benefits: [
    {
      eyebrow: "BESTPREIS-GARANTIE",
      heading: "Ein Angebot, das den ganzen Markt kennt",
      body: "Statt drei Händlern in deiner Stadt fragen wir über 1.200 geprüfte Käufer in Deutschland, Österreich und der Schweiz. Elektroautos werden regional sehr unterschiedlich bewertet. Genau diesen Unterschied holen wir für dich heraus und geben ihn als festen Preis weiter.",
      points: [
        "Angebot innerhalb von 24 Stunden",
        "Festpreis, schriftlich und ohne Nachverhandlung",
        "Ø 1.900 € über dem besten lokalen Händlerangebot",
      ],
      cta: CTA,
      image: {
        src: "/assets/images/benefit-1.jpg",
        alt: "Hände halten ein Smartphone mit mehreren Preisangeboten, im Hintergrund ein Elektroauto",
        width: 1600,
        height: 1600,
      },
    },
    {
      eyebrow: "ALLES AUS EINER HAND",
      heading: "Von der Bewertung bis zur Abholung vor deiner Haustür",
      body: "Du musst nirgendwo hinfahren und niemanden treffen, den du nicht kennst. Unser Fahrer holt das Fahrzeug bei dir ab, prüft es vor Ort in 20 Minuten und nimmt die Papiere mit. Abmeldung, Kaufvertrag und Übergabeprotokoll erledigen wir.",
      points: [
        "Kostenlose Abholung in ganz DACH",
        "Sichtprüfung vor Ort, kein Werkstatttermin",
        "Abmeldung und Kaufvertrag übernehmen wir",
      ],
      cta: CTA,
      image: {
        src: "/assets/images/benefit-2.jpg",
        alt: "Elektroauto wird vor einem Wohnhaus auf einen Transporter geladen",
        width: 1600,
        height: 1600,
      },
    },
    {
      eyebrow: "SCHNELLE AUSZAHLUNG",
      heading: "Geld auf dem Konto, bevor das Auto vom Hof ist",
      body: "Die Überweisung geht bei der Übergabe raus, auf Wunsch per Echtzeitüberweisung. Im Schnitt vergehen von der Anfrage bis zum Geldeingang fünf Tage. Läuft noch eine Finanzierung, lösen wir sie direkt bei der Bank ab und zahlen dir die Differenz aus.",
      points: [
        "Zahlung bei Übergabe, auf Wunsch in Echtzeit",
        "Ablösung von Finanzierung oder Leasing",
        "Kein Bargeld, keine Vorkasse, keine Wartezeit",
      ],
      cta: CTA,
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
    body: "Wir kaufen ausschließlich Elektrofahrzeuge. Deshalb wissen wir, was ein Akku mit 92 % State of Health wert ist, und deshalb kennen unsere Käufer den Unterschied auch.",
    stats: [
      { figure: "776", label: "verkaufte Elektroautos seit 2023" },
      { figure: "1.900 €", label: "durchschnittlich mehr als beim lokalen Händler" },
      { figure: "24 h", label: "bis zum schriftlichen Angebot" },
      { figure: "98 %", label: "würden Voltio weiterempfehlen" },
    ],
    cta: CTA,
  },

  comparison: {
    eyebrow: "DER VERGLEICH",
    heading: "Warum Voltio statt Portal, Händler oder Auktion?",
    body: "Jeder Weg hat seinen Preis. Wir haben die fünf üblichen mit dem verglichen, was bei Voltio Standard ist.",
    cta: CTA,
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
    cta: CTA,
  },

  faq: {
    heading: "Häufig gestellte Fragen",
    body: "Alles, was Verkäufer uns vor der ersten Anfrage fragen. Deine Frage ist nicht dabei? Ruf uns an, wir antworten sofort.",
    items: [
      {
        question: "Welche Elektroautos kauft Voltio an?",
        answer:
          "Alle rein elektrischen Pkw und Transporter ab Erstzulassung 2017, unabhängig von Marke, Laufleistung und Zustand. Plug-in-Hybride kaufen wir nicht an. Ob Kleinwagen, SUV oder Firmenflotte: Trag das Fahrzeug einfach ein, wir melden uns innerhalb von 24 Stunden.",
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
    cta: { label: "Jetzt kostenlos bewerten lassen", href: "#anfrage" },
    assurances: ["Angebot in 24 Stunden", "7 Tage gültig", "Keine Verpflichtung"],
  },

  leadForm: {
    heading: "Kostenlose Bewertung anfragen",
    intro: "Zwei Minuten, keine Verpflichtung. Du bekommst innerhalb von 24 Stunden ein schriftliches Festpreisangebot.",
    fields: {
      vehicle: "Marke & Modell",
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
    tagline: "Der Ankaufservice für Elektroautos in Deutschland, Österreich und der Schweiz.",
    phone: { label: "0800 555 20 20", href: "tel:+498005552020" },
    email: { label: "hallo@voltio.de", href: "mailto:hallo@voltio.de" },
    cta: { label: "Fahrzeug bewerten", href: "#anfrage" },
    legal: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
    ],
    copyright: "© 2026 VOLTIO",
  },
};
