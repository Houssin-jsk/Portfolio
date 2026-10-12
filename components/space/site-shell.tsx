import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { space } from "@/content/space";
import { NavigateIcon, ExternalLinkIcon, BackToTopIcon } from "./icons";
import { IconLink } from "./icon-action";
import styles from "./identity.module.css";

function Brand({ compact = false }: { compact?: boolean }) {
  return <Link className={styles.brand} href="/" aria-label="OUAHAD SPACE home"><Image src="/icons/logo_black.png" alt="" width={1280} height={1280} sizes="72px" priority={!compact} /><span>OUAHAD<br />SPACE</span></Link>;
}

export function SpaceHeader() {
  return <header className={styles.header}><Brand /><p className={styles.headerNote}>Independent mind.<br />Interconnected world.</p><nav aria-label="Main navigation">{space.navigation.map(item => <IconLink key={item.label} href={item.href} icon={<NavigateIcon size={16} />}>{item.label}</IconLink>)}</nav></header>;
}

export function SpaceFooter() {
  return <footer className={styles.footer}><Brand compact /><p>© 2026 El Houssaine Ouahad</p><div>{siteConfig.social.github ? <IconLink href={siteConfig.social.github} motion="external" target="_blank" rel="noopener noreferrer" icon={<ExternalLinkIcon size={16} />}>GitHub<span className={styles.srOnly}> (opens in a new tab)</span></IconLink> : null}<IconLink href="#home" motion="up" icon={<BackToTopIcon size={16} />}>Back to top</IconLink></div></footer>;
}
