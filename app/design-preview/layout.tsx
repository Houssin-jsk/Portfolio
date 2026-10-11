import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { assertPreviewAccess } from "@/lib/preview-access";
import { SpaceHeader, SpaceFooter } from "@/components/design-preview/site-shell";
import styles from "./preview.module.css";
import tokens from "./tokens.module.css";

export const metadata: Metadata = {
  title: "OUAHAD SPACE — A personal digital universe",
  description: "Creations, explorations, and ideas from El Houssaine Ouahad, across AI, Data, and Web Development.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/design-preview" },
  openGraph: { title: "OUAHAD SPACE", description: "A personal space for curiosity, clarity, and creation.", url: "/design-preview" },
  twitter: { card: "summary", title: "OUAHAD SPACE", description: "A personal space for curiosity, clarity, and creation." },
};
export const viewport: Viewport = { themeColor: "#f7f5ef" };

export default function SpaceLayout({ children }: { children: ReactNode }) {
  // Preview source stays intact, but unfinished pages must not ship publicly.
  // `npm run dev` remains the supported way to evaluate the experiment locally.
  assertPreviewAccess();
  return (
    <div className={`${tokens.theme} ${styles.preview}`} id="home">
      <a href="#preview-main" className={styles.skipLink}>Skip to content</a>
      <SpaceHeader /><main id="preview-main">{children}</main><SpaceFooter />
    </div>
  );
}
