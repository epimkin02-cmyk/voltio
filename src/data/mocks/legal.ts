/**
 * Legal pages. **Every bracketed value is a placeholder** the operator has to
 * fill before launch — company name, address, register, VAT id, the data
 * protection contact. The structure follows what a German site needs (§ 5
 * TMG / § 18 MStV for the Impressum, Art. 13 DSGVO for the privacy notice);
 * the wording is a starting point, not legal advice.
 */

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

export const impressum: LegalPage = {
  title: "Impressum",
  updated: "September 2026",
  sections: [
    {
      heading: "Angaben gemäß § 5 TMG",
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
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
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

export const datenschutz: LegalPage = {
  title: "Datenschutzerklärung",
  updated: "September 2026",
  intro:
    "Wir freuen uns über dein Interesse an Voltio. Der Schutz deiner persönlichen Daten ist uns wichtig. Nachfolgend informieren wir dich darüber, welche Daten wir beim Besuch dieser Website und bei einer Anfrage verarbeiten und welche Rechte du hast.",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [`${COMPANY}, ${ADDRESS}`, `Telefon: ${PHONE} · E-Mail: ${EMAIL}`],
    },
    {
      heading: "2. Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, Browser, Betriebssystem) in Server-Logfiles. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und performanten Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Für die Übermittlung in die USA bestehen Standardvertragsklauseln der EU-Kommission.",
      ],
    },
    {
      heading: "3. Anfrage zur Fahrzeugbewertung",
      paragraphs: [
        "Wenn du über das Formular eine Bewertung anfragst, verarbeiten wir die von dir angegebenen Daten (Marke und Modell, Erstzulassung, Kilometerstand, Name, E-Mail-Adresse, Telefonnummer), um dir ein Angebot zu erstellen und dich dazu zu kontaktieren. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).",
        "Zur Angebotserstellung geben wir die Fahrzeugdaten an Käufer aus unserem Partnernetzwerk weiter. Deine Kontaktdaten erhalten Partner erst, wenn du ein Angebot annimmst. Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
      ],
    },
    {
      heading: "4. Cookies und Einwilligung",
      paragraphs: [
        "Technisch notwendige Cookies setzen wir auf Grundlage von § 25 Abs. 2 TTDSG. Statistik- und Marketing-Cookies setzen wir nur mit deiner Einwilligung (§ 25 Abs. 1 TTDSG, Art. 6 Abs. 1 lit. a DSGVO), die du über den Cookie-Hinweis erteilst und jederzeit über „Cookie-Einstellungen“ im Footer widerrufen kannst. Deine Auswahl speichern wir lokal in deinem Browser.",
      ],
    },
    {
      heading: "5. Videos und Schriften",
      paragraphs: [
        "Die Videos im Kopfbereich und die verwendeten Schriften werden von unserem eigenen Server ausgeliefert. Es findet dabei keine Verbindung zu Drittanbietern wie YouTube oder Google Fonts statt.",
      ],
    },
    {
      heading: "6. Deine Rechte",
      paragraphs: [
        "Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.",
        `Für alle Anliegen zum Datenschutz erreichst du uns unter ${EMAIL}.`,
      ],
    },
    {
      heading: "7. Änderungen",
      paragraphs: [
        "Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage oder unsere Verarbeitung ändert. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.",
      ],
    },
  ],
};
