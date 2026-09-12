import type { Metadata } from "next";

import { datenschutz } from "@/data/mocks/legal";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import { LegalView } from "@/views/legal/legal-view";

export const metadata: Metadata = generateMetadata({
  title: "Datenschutzerklärung – VOLTIO",
  description: "Wie VOLTIO deine Daten beim Besuch der Website und bei einer Fahrzeugbewertung verarbeitet.",
  url: "/datenschutz",
});

export default function DatenschutzPage() {
  return <LegalView page={datenschutz} />;
}
