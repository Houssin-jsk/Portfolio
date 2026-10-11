import Link from "next/link";
import { siteConfig } from "@/config/site";
import { space } from "@/content/space";
import styles from "@/app/design-preview/preview.module.css";

export function SpaceHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/design-preview" aria-label="OUAHAD SPACE home">OUAHAD<span aria-hidden="true">*</span></Link>
      <nav aria-label="Main navigation">{space.navigation.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
      <span className={styles.edition}>A personal digital space</span>
    </header>
  );
}

export function SpaceFooter() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.wordmark} href="/design-preview">OUAHAD<span aria-hidden="true">*</span></Link>
      <p>El Houssaine Ouahad · 2026</p>
      <div>
        {siteConfig.social.github ? <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub ↗<span className={styles.srOnly}> (opens in a new tab)</span></a> : null}
        {siteConfig.social.linkedin ? <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className={styles.srOnly}> (opens in a new tab)</span></a> : null}
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
