import type { Metadata } from "next";

import { impressum } from "@/data/mocks/legal";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import { LegalView } from "@/views/legal/legal-view";

export const metadata: Metadata = generateMetadata({
  title: "Impressum – VOLTIO",
  description: "Anbieterkennzeichnung und Kontaktdaten von VOLTIO.",
  url: "/impressum",
});

export default function ImpressumPage() {
  return <LegalView page={impressum} />;
}
