import type { Metadata } from "next";

import { HomeEditView } from "@/views/home/edit";

/** Editor preview for TinaCMS (`/admin`). Never indexed. */
export const metadata: Metadata = {
  title: "Vorschau – VOLTIO",
  robots: { index: false, follow: false },
};

export default function EditPage() {
  return <HomeEditView />;
}
