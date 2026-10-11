import type { Metadata } from "next";
import Link from "next/link";
import { space } from "@/content/space";
import { SpaceAbout, SpaceContact } from "@/components/design-preview/sections";
import styles from "../preview.module.css";
import { assertPreviewAccess } from "@/lib/preview-access";

export const metadata: Metadata = {
  title: "About El Houssaine — OUAHAD SPACE",
  alternates: { canonical: "/design-preview/about" },
  openGraph: { title: "About El Houssaine — OUAHAD SPACE", url: "/design-preview/about" },
};

export default function AboutPage() {
  assertPreviewAccess();
  return (
    <>
      <div className={styles.breadcrumb}><Link href="/design-preview">← Back to the space</Link></div>
      <SpaceAbout fullPage />
      <section className={styles.story} aria-labelledby="story-title">
        <p className={styles.sectionLabel}>A path shaped by curiosity</p>
        <h2 id="story-title">From how things work<br />to what they <em>could become.</em></h2>
        <div className={styles.storyGrid}>
          <article><span>01 / Foundations</span><h3>Understanding the system</h3><p>{space.about.background} That foundation connects hardware, networks, and the information moving between them.</p></article>
          <article><span>02 / Connections</span><h3>Making information useful</h3><p>His studies in AI and data analysis opened a different set of questions: how to prepare information, find patterns, and communicate them through reports, dashboards, and interfaces.</p></article>
          <article><span>03 / An ongoing practice</span><h3>Learning through the making</h3><p>{space.about.approach} OUAHAD SPACE brings that process together: things he creates, possibilities he explores, and ideas he wants to share along the way.</p></article>
        </div>
      </section>
      <SpaceContact />
    </>
  );
}
