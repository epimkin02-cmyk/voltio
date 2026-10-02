/**
 * Legal pages. **Every bracketed value is a placeholder** the operator has to
 * fill before launch — company name, address, register, VAT id, the data
 * protection contact, the agency that runs the form system. The structure
 * follows what a German site needs (§ 5 DDG / § 18 MStV for the Impressum,
 * Art. 13 DSGVO for the privacy notice); the wording is a starting point, not
 * legal advice.
 *
 * The privacy notice describes what the site really does: the Meta section
 * appears only while a pixel id is configured (`data/tracking`), and the
 * sections number themselves.
 */
import { META_PIXEL_ID } from "@/data/tracking";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPage {
  title: string;
  intro?: string;
  sections: LegalSection[];
  updated: string;
}

const COMPANY = "[Voltio GmbH]";
const ADDRESS = "[Straße Hausnummer], [PLZ Ort], Deutschland";
const EMAIL = "hallo@voltio.de";
const PHONE = "0800 555 20 20";
/** The agency operating the form system (Funnel Builder) as a processor. */
const FORM_PROCESSOR = "[Dienstleister, Straße Hausnummer, PLZ Ort]";

export const impressum: LegalPage = {
  title: "Impressum",
  updated: "Oktober 2026",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: [`${COMPANY}`, ADDRESS],
    },
    {
      heading: "Vertreten durch",
      paragraphs: ["[Vorname Nachname], Geschäftsführung"],
    },
    {
      heading: "Kontakt",
      paragraphs: [`Telefon: ${PHONE}`, `E-Mail: ${EMAIL}`],
    },
    {
      heading: "Registereintrag",
      paragraphs: ["Eintragung im Handelsregister.", "Registergericht: [Amtsgericht Ort]", "Registernummer: [HRB 00000]"],
    },
    {
      heading: "Umsatzsteuer-ID",
      paragraphs: ["Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [DE000000000]"],
    },
    {
      heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      paragraphs: ["[Vorname Nachname]", ADDRESS],
    },
    {
      heading: "EU-Streitschlichtung",
      paragraphs: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.",
        "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
    {
      heading: "Haftung für Inhalte",
      paragraphs: [
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      ],
    },
    {
      heading: "Markenhinweis",
      paragraphs: [
        "Alle auf dieser Website genannten Fahrzeugmarken und Modellbezeichnungen sind eingetragene Marken der jeweiligen Hersteller und dienen ausschließlich der Beschreibung der von uns angekauften Fahrzeuge. Voltio steht in keiner geschäftlichen Verbindung zu den genannten Herstellern.",
      ],
    },
  ],
};

const META_SECTION: LegalSection = {
  heading: "Meta Pixel und Conversions API",
  paragraphs: [
    "Mit deiner Einwilligung in die Kategorie „Marketing“ nutzen wir den Meta Pixel der Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, D04 X2K5, Irland. Der Pixel wird erst nach deiner Einwilligung geladen. Er setzt die Cookies _fbp und _fbc und übermittelt an Meta, dass du diese Seite aufgerufen, das Anfrageformular geöffnet oder eine Anfrage abgeschickt hast, zusammen mit deiner IP-Adresse und Angaben zu deinem Browser. Wir messen damit die Wirkung unserer Anzeigen auf Facebook und Instagram und spielen Anzeigen passender aus. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).",
    "Schickst du mit dieser Einwilligung eine Anfrage ab, melden wir den Abschluss zusätzlich von unserem Server an Meta (Conversions API). Dabei übermitteln wir Name, E-Mail-Adresse und Telefonnummer ausschließlich als Hashwert (SHA-256), dazu IP-Adresse, Browserangabe und die Kennungen aus den Pixel-Cookies. Ohne deine Einwilligung findet keine Übermittlung an Meta statt.",
    "Meta kann die Daten auch in die USA übermitteln. Die Meta Platforms, Inc. ist unter dem EU-US Data Privacy Framework zertifiziert. Für die Erhebung und Übermittlung der Daten sind wir gemeinsam mit Meta verantwortlich (Art. 26 DSGVO); die Vereinbarung findest du unter https://www.facebook.com/legal/controller_addendum. Deine Einwilligung kannst du jederzeit über „Cookie-Einstellungen“ im Footer widerrufen.",
  ],
};

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Verantwortlicher",
    paragraphs: [`${COMPANY}, ${ADDRESS}`, `Telefon: ${PHONE} · E-Mail: ${EMAIL}`],
  },
  {
    heading: "Hosting",
    paragraphs: [
      "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, Browser, Betriebssystem) in Server-Logfiles. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und performanten Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Für die Übermittlung in die USA bestehen Standardvertragsklauseln der EU-Kommission.",
    ],
  },
  {
    heading: "Anfrage zur Fahrzeugbewertung",
    paragraphs: [
      "Wenn du über das Formular eine Bewertung anfragst, verarbeiten wir die von dir angegebenen Daten (Marke und Modell, Erstzulassung, Kilometerstand, Name, E-Mail-Adresse, Telefonnummer), um dir ein Angebot zu erstellen und dich dazu zu kontaktieren. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).",
      `Das Formular betreibt in unserem Auftrag ${FORM_PROCESSOR} mit einem eigenen Formularsystem (Auftragsverarbeitung nach Art. 28 DSGVO). Die Anfragen werden in einer Datenbank der Supabase Inc. am Standort Frankfurt am Main gespeichert, die Anwendung läuft bei Vercel. Gespeichert wird erst, wenn du das Formular abschickst.`,
      "Zusammen mit der Anfrage speichern wir die Adresse der Seite, über die du gekommen bist, die verweisende Seite, Kampagnen-Angaben aus dem Link (zum Beispiel utm_source) und den verwendeten Browser. So sehen wir, über welchen Weg eine Anfrage zustande kam. Zusätzlich zählen wir ohne Personenbezug, wie oft das Formular geöffnet, begonnen und abgeschickt wird. Rechtsgrundlage ist unser berechtigtes Interesse an der Auswertung unserer Werbung (Art. 6 Abs. 1 lit. f DSGVO).",
      "Zur Angebotserstellung geben wir die Fahrzeugdaten an Käufer aus unserem Partnernetzwerk weiter. Deine Kontaktdaten erhalten Partner erst, wenn du ein Angebot annimmst. Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    heading: "Cookies und Einwilligung",
    paragraphs: [
      "Technisch notwendige Speicherungen nehmen wir auf Grundlage von § 25 Abs. 2 TDDDG vor. Statistik- und Marketing-Dienste setzen wir nur mit deiner Einwilligung ein (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO), die du über den Cookie-Hinweis erteilst und jederzeit über „Cookie-Einstellungen“ im Footer widerrufen kannst. Deine Auswahl speichern wir lokal in deinem Browser.",
    ],
  },
  ...(META_PIXEL_ID ? [META_SECTION] : []),
  {
    heading: "Schriften, Bilder und Videos",
    paragraphs: [
      "Schriften, Bilder und Videos werden von unserem eigenen Server ausgeliefert. Es findet dabei keine Verbindung zu Drittanbietern wie YouTube oder Google Fonts statt.",
    ],
  },
  {
    heading: "Deine Rechte",
    paragraphs: [
      "Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.",
      `Für alle Anliegen zum Datenschutz erreichst du uns unter ${EMAIL}.`,
    ],
  },
  {
    heading: "Änderungen",
    paragraphs: [
      "Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage oder unsere Verarbeitung ändert. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.",
    ],
  },
];

export const datenschutz: LegalPage = {
  title: "Datenschutzerklärung",
  updated: "Oktober 2026",
  intro:
    "Wir freuen uns über dein Interesse an Voltio. Der Schutz deiner persönlichen Daten ist uns wichtig. Nachfolgend informieren wir dich darüber, welche Daten wir beim Besuch dieser Website und bei einer Anfrage verarbeiten und welche Rechte du hast.",
  sections: PRIVACY_SECTIONS.map((section, index) => ({
    ...section,
    heading: `${index + 1}. ${section.heading}`,
  })),
};
