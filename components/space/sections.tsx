import Image from "next/image";
import { siteConfig } from "@/config/site";
import { spaceConfig } from "@/config/space";
import { space } from "@/content/space";
import { PalmShadow, OliveBranch, WaveLines } from "./motifs";
import styles from "./space.module.css";

export function SpaceHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {spaceConfig.motifs.palm ? <PalmShadow className={styles.palm} /> : null}
      <div className={styles.heroHeading}>
        <p className={styles.eyebrow}><span aria-hidden="true" />{siteConfig.personal.name}</p>
        <p className={styles.spaceLabel}>OUAHAD SPACE · A world taking shape</p>
        <h1 id="hero-title">Curious mind.<br /><span>Open world.</span></h1>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.heroIntro}>I&apos;m El Houssaine. I connect ideas across <strong>AI, Data, and Web Development</strong>. This is my space for things I make, questions I follow, and discoveries along the way.</p>
        <div className={styles.actions}>
          <a className={styles.primaryButton} href="#about">Behind the space <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroFoot}><span>Always asking. Always learning.</span><span>A space that grows with the ideas.</span></div>
      </div>
      <figure className={styles.portraitWorld}>
        <div className={styles.portraitStage}>
          <div className={styles.portraitAtmosphere} aria-hidden="true" />
          <div className={styles.portraitTrace} aria-hidden="true" />
          {spaceConfig.motifs.waves ? <WaveLines className={styles.heroWaves} /> : null}
          <Image className={styles.heroPortrait} src={siteConfig.personal.portrait} alt="El Houssaine Ouahad" width={2086} height={2989} sizes="(max-width: 700px) 280px, (max-width: 1000px) 42vw, 480px" priority />
          {spaceConfig.motifs.olive ? <OliveBranch className={styles.heroOlive} /> : null}
          <span className={styles.worldNote}>Explore. Connect. Create.</span>
        </div>
        <figcaption><span>El Houssaine Ouahad</span><span>Always exploring <i aria-hidden="true">↗</i></span></figcaption>
      </figure>
    </section>
  );
}

export function SpaceAbout({ fullPage = false }: { fullPage?: boolean }) {
  const Heading = fullPage ? "h1" : "h2";
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.aboutSide}>
        <p className={styles.sectionLabel}>01 / Behind the space</p>
        <div className={styles.portrait}><Image src={siteConfig.personal.portrait} alt="El Houssaine Ouahad" width={300} height={360} sizes="(max-width: 700px) 160px, 220px" /></div>
        <p className={styles.portraitCaption}>A curious mind. A practical approach.</p>
      </div>
      <div className={styles.aboutCopy}>
        <Heading id="about-title">A little analytical.<br />A little <em>unexpected.</em></Heading>
        <p>{space.about.introduction}</p>
        <p>{space.about.background}</p>
        <p>{space.about.approach}</p>
      </div>
      {spaceConfig.motifs.olive ? <OliveBranch className={styles.olive} /> : null}
    </section>
  );
}


