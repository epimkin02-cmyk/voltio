import { defineConfig, type Template, type TinaField } from "tinacms";

import brandsDefault from "./defaults/brands.json";

/**
 * TinaCMS — visual editing for the Voltio landing page.
 *
 * All page copy lives in `content/pages/home.json`. Editors open `/admin`,
 * see the live page next to a form, and every save is a Git commit on the
 * branch below; Vercel redeploys from it. Sections in the middle of the page
 * are *blocks*: they can be reordered, duplicated, removed and added from the
 * sidebar. Header, hero, lead form and footer are fixed.
 *
 * See `obsidian/backend/cms-tina.md`.
 */

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "tina-cms";

// ── Field helpers ────────────────────────────────────────────────────────────

const text = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
});

const longText = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  ui: { component: "textarea" },
});

const textList = (name: string, label: string): TinaField => ({
  type: "string",
  name,
  label,
  list: true,
});

const link = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [text("label", "Text"), text("href", "Ziel", "#anfrage, /impressum, tel:… oder https://…")],
});

const linkList = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  list: true,
  ui: { itemProps: (item: { label?: string }) => ({ label: item?.label }) },
  fields: [text("label", "Text"), text("href", "Ziel")],
});

const imageFields = (withFocus = false): TinaField[] => [
  { type: "image", name: "src", label: "Bild" },
  text("alt", "Alt-Text", "Kurze Bildbeschreibung für Screenreader und Google. Leer lassen bei reiner Deko."),
  {
    type: "number",
    name: "width",
    label: "Breite (px)",
    description: "Originalgröße des Bildes. Beim Tausch an das neue Bild anpassen, sonst wird es verzerrt.",
  },
  { type: "number", name: "height", label: "Höhe (px)" },
  ...(withFocus
    ? [text("focus", "Bildausschnitt", "Wichtigster Punkt im Bild, z. B. „70% 50%“ (horizontal vertikal).")]
    : []),
];

const image = (name: string, label: string, withFocus = false): TinaField => ({
  type: "object",
  name,
  label,
  fields: imageFields(withFocus),
});

const stats = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  list: true,
  ui: { itemProps: (item: { figure?: string; label?: string }) => ({ label: `${item?.figure ?? ""} ${item?.label ?? ""}`.trim() }) },
  fields: [text("figure", "Zahl"), text("label", "Beschriftung")],
});

const headingBlock = (): TinaField[] => [
  text("eyebrow", "Überzeile"),
  longText("heading", "Überschrift"),
];

// ── Blocks (the reorderable middle of the page) ─────────────────────────────

const proofStrip: Template = {
  name: "proofStrip",
  label: "Zahlen-Leiste",
  ui: { defaultItem: { stats: [{ figure: "100 %", label: "Neue Kennzahl" }] } },
  fields: [stats("stats", "Kennzahlen")],
};

const categories: Template = {
  name: "categories",
  label: "Fahrzeugklassen (Pkw & Transporter)",
  fields: [
    ...headingBlock(),
    longText("body", "Text"),
    {
      type: "object",
      name: "lanes",
      label: "Spuren",
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title }) },
      fields: [
        text("title", "Titel"),
        longText("body", "Text"),
        textList("chips", "Modell-Chips"),
        image("front", "Frontansicht (Karte)"),
        {
          type: "string",
          name: "from",
          label: "Autos fahren ein von",
          options: [
            { value: "left", label: "links" },
            { value: "right", label: "rechts" },
          ],
        },
        {
          type: "object",
          name: "cars",
          label: "Fahrzeuge",
          list: true,
          ui: { itemProps: (item: { name?: string }) => ({ label: item?.name }) },
          fields: [
            text("name", "Name"),
            image("image", "Seitenansicht"),
            { type: "number", name: "speed", label: "Tempo beim Scrollen", description: "1 = normal" },
          ],
        },
      ],
    },
    link("cta", "Button"),
  ],
};

const pain: Template = {
  name: "pain",
  label: "Problem (Privatverkauf)",
  fields: [
    longText("heading", "Überschrift"),
    longText("body", "Text"),
    textList("pains", "Schmerzpunkte"),
    link("cta", "Button"),
    image("image", "Foto"),
    image("illustration", "Illustration"),
  ],
};

const testimonials: Template = {
  name: "testimonials",
  label: "Kundenstimmen",
  fields: [
    ...headingBlock(),
    {
      type: "object",
      name: "rating",
      label: "Bewertung",
      fields: [text("score", "Note"), text("count", "Anzahl")],
    },
    {
      type: "object",
      name: "items",
      label: "Stimmen",
      list: true,
      ui: { itemProps: (item: { name?: string }) => ({ label: item?.name }) },
      fields: [longText("quote", "Zitat"), text("name", "Name"), text("place", "Ort"), text("vehicle", "Fahrzeug")],
    },
    link("cta", "Button"),
  ],
};

const benefit: Template = {
  name: "benefit",
  label: "Vorteil (Bild + Text)",
  ui: {
    defaultItem: {
      eyebrow: "NEUER VORTEIL",
      heading: "Überschrift des Vorteils",
      body: "Beschreibung des Vorteils.",
      points: ["Erster Punkt"],
      cta: { label: "Jetzt kostenfreie Anfrage stellen", href: "#anfrage" },
      mediaSide: "start",
    },
  },
  fields: [
    text("intro", "Einleitung darüber", "Optional: zentrierte Überschrift über dem Block, z. B. „So funktioniert es:“"),
    ...headingBlock(),
    longText("body", "Text"),
    textList("points", "Stichpunkte"),
    link("cta", "Button"),
    image("image", "Bild"),
    {
      type: "string",
      name: "mediaSide",
      label: "Bild-Position",
      options: [
        { value: "start", label: "Bild links" },
        { value: "end", label: "Bild rechts" },
      ],
    },
  ],
};

const numbers: Template = {
  name: "numbers",
  label: "Voltio in Zahlen",
  fields: [...headingBlock(), longText("body", "Text"), stats("stats", "Kennzahlen"), link("cta", "Button")],
};

const comparison: Template = {
  name: "comparison",
  label: "Vergleichstabelle",
  fields: [
    ...headingBlock(),
    text("brand", "Erste Spalte (wir)"),
    textList("competitors", "Weitere Spalten"),
    {
      type: "object",
      name: "rows",
      label: "Zeilen",
      list: true,
      ui: { itemProps: (item: { label?: string }) => ({ label: item?.label }) },
      fields: [
        text("label", "Kriterium"),
        {
          type: "object",
          name: "values",
          label: "Häkchen je Spalte",
          description: "In Spalten-Reihenfolge: zuerst wir, dann die weiteren Spalten.",
          list: true,
          ui: { itemProps: (item: { ok?: boolean }) => ({ label: item?.ok ? "✓ ja" : "✗ nein" }) },
          fields: [{ type: "boolean", name: "ok", label: "Erfüllt" }],
        },
      ],
    },
    link("cta", "Button"),
  ],
};

const steps: Template = {
  name: "steps",
  label: "Ablauf in Schritten",
  fields: [
    ...headingBlock(),
    {
      type: "object",
      name: "items",
      label: "Schritte",
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title }) },
      fields: [text("title", "Titel"), text("duration", "Dauer"), longText("body", "Text"), image("image", "Bild")],
    },
    link("cta", "Button"),
  ],
};

const faq: Template = {
  name: "faq",
  label: "Häufige Fragen",
  fields: [
    longText("heading", "Überschrift"),
    longText("body", "Text"),
    {
      type: "object",
      name: "items",
      label: "Fragen",
      list: true,
      ui: { itemProps: (item: { question?: string }) => ({ label: item?.question }) },
      fields: [text("question", "Frage"), longText("answer", "Antwort")],
    },
    image("image", "Bild"),
  ],
};

const urgency: Template = {
  name: "urgency",
  label: "Abschluss mit Anfrage",
  fields: [longText("heading", "Überschrift"), longText("body", "Text"), link("cta", "Button"), textList("assurances", "Zusicherungen")],
};

const brands: Template = {
  name: "brands",
  label: "Alle Marken (Logo-Raster)",
  ui: { defaultItem: brandsDefault },
  fields: [
    ...headingBlock(),
    longText("body", "Text"),
    {
      type: "object",
      name: "brands",
      label: "Marken",
      list: true,
      ui: { itemProps: (item: { name?: string }) => ({ label: item?.name }) },
      fields: [text("name", "Name"), text("slug", "Logo-Datei", "Dateiname unter public/assets/brands, ohne Endung")],
    },
    text("more", "Zeile unter dem Raster"),
    image("image", "Illustration"),
  ],
};

// ── Fixed parts ──────────────────────────────────────────────────────────────

const header: TinaField = {
  type: "object",
  name: "header",
  label: "Kopfzeile",
  fields: [text("brand", "Marke"), linkList("nav", "Navigation"), link("phone", "Telefon"), link("cta", "Button")],
};

const hero: TinaField = {
  type: "object",
  name: "hero",
  label: "Hero (ganz oben)",
  fields: [
    longText("title", "Hauptüberschrift (H1)"),
    textList("bullets", "Stichpunkte"),
    link("cta", "Button"),
    textList("assurances", "Zusicherungen unter dem Button"),
    {
      type: "object",
      name: "rating",
      label: "Bewertung",
      fields: [
        text("score", "Note"),
        { type: "number", name: "stars", label: "Sterne" },
        text("count", "Text"),
        text("href", "Link"),
      ],
    },
    {
      type: "object",
      name: "trust",
      label: "Vertrauens-Karten",
      list: true,
      ui: { itemProps: (item: { label?: string }) => ({ label: item?.label }) },
      fields: [text("figure", "Zahl (optional)"), text("label", "Text")],
    },
    image("image", "Hintergrundbild", true),
  ],
};

const leadForm: TinaField = {
  type: "object",
  name: "leadForm",
  label: "Anfrage-Formular (Popup)",
  fields: [
    text("heading", "Überschrift"),
    longText("intro", "Einleitung"),
    {
      type: "object",
      name: "fields",
      label: "Feld-Beschriftungen",
      fields: [
        text("brand", "Marke"),
        text("model", "Modell"),
        text("vehicleOther", "Freitext Marke & Modell"),
        text("year", "Erstzulassung"),
        text("mileage", "Kilometerstand"),
        text("name", "Name"),
        text("email", "E-Mail"),
        text("phone", "Telefon"),
      ],
    },
    text("submit", "Absende-Button"),
    text("sending", "Text beim Senden"),
    longText("success", "Erfolgsmeldung"),
    longText("error", "Fehlermeldung"),
    longText("privacy", "Datenschutz-Satz"),
    text("privacyLink", "Datenschutz-Linktext"),
    text("close", "Schließen-Text"),
  ],
};

const footer: TinaField = {
  type: "object",
  name: "footer",
  label: "Fußzeile",
  fields: [
    text("brand", "Marke"),
    longText("tagline", "Beschreibung"),
    {
      type: "object",
      name: "rating",
      label: "Bewertung",
      fields: [text("score", "Note"), text("label", "Text"), text("href", "Link")],
    },
    link("phone", "Telefon"),
    link("email", "E-Mail"),
    link("cta", "Button"),
    {
      type: "object",
      name: "columns",
      label: "Link-Spalten",
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title }) },
      fields: [text("title", "Titel"), linkList("links", "Links")],
    },
    {
      type: "object",
      name: "hours",
      label: "Erreichbarkeit",
      fields: [
        text("title", "Titel"),
        {
          type: "object",
          name: "rows",
          label: "Zeiten",
          list: true,
          ui: { itemProps: (item: { day?: string }) => ({ label: item?.day }) },
          fields: [text("day", "Tag"), text("time", "Uhrzeit")],
        },
      ],
    },
    {
      type: "object",
      name: "social",
      label: "Social Media",
      list: true,
      ui: { itemProps: (item: { name?: string }) => ({ label: item?.name }) },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Netzwerk",
          options: ["instagram", "facebook", "linkedin"],
        },
        text("href", "Profil-Link", "Leer = Symbol wird nicht angezeigt"),
      ],
    },
    text("copyright", "Copyright"),
    image("watermark", "Hintergrundbild"),
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "page",
        label: "Seiten",
        path: "content/pages",
        format: "json",
        ui: {
          // The editor previews `/bearbeiten`: the home page wired for live editing.
          router: ({ document }) => (document._sys.filename === "home" ? "/bearbeiten" : undefined),
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Seitenname", isTitle: true, required: true },
          header,
          hero,
          {
            type: "object",
            name: "blocks",
            label: "Sektionen",
            description: "Reihenfolge per Ziehen ändern, über „+“ neue Sektionen einfügen.",
            list: true,
            templates: [proofStrip, categories, pain, testimonials, benefit, numbers, comparison, steps, faq, urgency, brands],
          },
          leadForm,
          footer,
        ],
      },
    ],
  },
});
