import Image from "next/image";
import { siteConfig } from "@/config/site";
import { space } from "@/content/space";
import { ScrollDownIcon } from "./icons";
import { IconLink } from "./icon-action";
import styles from "./identity.module.css";

export function SpaceHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroHeading}>
        <p className={styles.kicker}>OUAHAD SPACE <span>—</span> The world of El Houssaine Ouahad</p>
        <h1 id="hero-title">A curious mind.</h1>
        <p className={styles.heroSubtitle}>An open world.</p>
      </div>
      <figure className={styles.portraitScene}>
        <svg className={styles.orbit} viewBox="0 0 900 550" fill="none" aria-hidden="true">
          <ellipse cx="450" cy="285" rx="420" ry="150" transform="rotate(-22 450 285)" />
        </svg>
        <Image className={styles.heroPortrait} src={siteConfig.personal.portrait} alt="El Houssaine Ouahad" width={2086} height={2989} sizes="(max-width: 600px) 86vw, (max-width: 900px) 420px, 510px" priority />
        <figcaption>El Houssaine Ouahad <span>Always exploring.</span></figcaption>
      </figure>
      <div className={styles.heroIntro}>
        <p>A place for connecting ideas,<br className={styles.desktopBreak} /> questioning the obvious,<br className={styles.desktopBreak} /> and making something new.</p>
        <IconLink className={styles.aboutLink} href="#about" motion="down" icon={<ScrollDownIcon />}>Meet the mind behind it</IconLink>
      </div>
      <div className={styles.focus}>
        <p className={styles.smallLabel}>My fields of exploration</p>
        <ul><li>Artificial Intelligence</li><li>Data</li><li>Web Development</li></ul>
      </div>
      <div className={styles.heroBottom}><span>A personal digital universe</span><span>Curiosity is the starting point.</span></div>
    </section>
  );
}

export function SpaceAbout({ fullPage = false }: { fullPage?: boolean }) {
  const Heading = fullPage ? "h1" : "h2";
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.aboutHeading}>
        <p className={styles.smallLabel}>01 / About Me</p>
        <Heading id="about-title">Connecting dots.<br /><em>Opening possibilities.</em></Heading>
      </div>
      <div className={styles.aboutLead}><p>{space.about.introduction}</p></div>
      <div className={styles.aboutStory}>
        <div><span className={styles.smallLabel}>Where it began</span><p>{space.about.background}</p></div>
        <div><span className={styles.smallLabel}>How he thinks</span><p>{space.about.approach}</p></div>
      </div>
      <div className={styles.aboutSignature}><Image src="/icons/logo_%23077F64.png" alt="" width={1280} height={1280} sizes="140px" /><p>Question. Connect.<br /><em>Keep exploring.</em></p></div>
    </section>
  );
}
