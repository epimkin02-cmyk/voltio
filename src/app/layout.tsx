import type { Metadata, Viewport } from "next";

/** Poppins (display) and Figtree (body) — Transiett's pairing, self-hosted via
 *  @fontsource so the build never reaches out to a font CDN. */
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      {/* `suppressHydrationWarning` on the body only: browser extensions write
          their own attributes onto <body> before React hydrates. */}
      <body className="font-body" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <ReducedMotion />
          <LazyCookie />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
