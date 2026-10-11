import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { designPreview } from "@/config/design-preview";
import { space, explorations, thoughts, type SpaceEntry } from "@/content/space";
import { PalmShadow, OliveBranch, WaveLines } from "./motifs";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";
import styles from "@/app/design-preview/preview.module.css";

export function SpaceHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {designPreview.motifs.palm ? <PalmShadow className={styles.palm} /> : null}
      <div className={styles.heroHeading}>
        <p className={styles.eyebrow}><span aria-hidden="true" />{siteConfig.personal.name}</p>
        <p className={styles.spaceLabel}>OUAHAD SPACE · A world taking shape</p>
        <h1 id="hero-title">Curious mind.<br /><span>Open world.</span></h1>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.heroIntro}>I&apos;m El Houssaine. I connect ideas across <strong>AI, Data, and Web Development</strong>. This is my space for things I make, questions I follow, and discoveries along the way.</p>
        <div className={styles.actions}>
          <a className={styles.primaryButton} href="#creations">Explore the creations <span aria-hidden="true">↗</span></a>
          <a className={styles.textButton} href="#discover">Take a look around <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroFoot}><span>Always asking. Always learning.</span><span>A space that grows with the ideas.</span></div>
      </div>
      <figure className={styles.portraitWorld}>
        <div className={styles.portraitStage}>
          <div className={styles.portraitAtmosphere} aria-hidden="true" />
          <div className={styles.portraitTrace} aria-hidden="true" />
          {designPreview.motifs.waves ? <WaveLines className={styles.heroWaves} /> : null}
          <Image className={styles.heroPortrait} src={siteConfig.personal.portrait} alt="El Houssaine Ouahad" width={2086} height={2989} sizes="(max-width: 700px) 280px, (max-width: 1000px) 42vw, 480px" priority />
          {designPreview.motifs.olive ? <OliveBranch className={styles.heroOlive} /> : null}
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
        <p>{space.about.introduction}</p><p>{space.about.background} {space.about.approach}</p>
        {fullPage ? null : <Link className={styles.textButton} href="/design-preview/about">More about El Houssaine <span aria-hidden="true">↗</span></Link>}
      </div>
      {designPreview.motifs.olive ? <OliveBranch className={styles.olive} /> : null}
    </section>
  );
}

export function SpaceCreations() {
  const projects = designPreview.selectedProjects.flatMap(slug => {
    const project = siteConfig.projects.find(item => item.slug === slug);
    return project ? [project] : [];
  });
  return (
    <section id="creations" className={styles.work} aria-labelledby="creations-title">
      <SectionHeading id="creations-title" label="02 / Creations" title={<>Ideas put to work<span>.</span></>} description={<>Projects, studies, and digital concepts.<br />A few things from the making.</>} />
      <div className={styles.projectGrid}>{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} variant={index === 0 ? "data" : index === 1 ? "ai" : "web"} />)}</div>
    </section>
  );
}

function Collection({ entries, emptyTitle, emptyDescription }: { entries: readonly SpaceEntry[]; emptyTitle: string; emptyDescription: string }) {
  if (entries.length === 0) {
    return <div className={styles.emptyCollection}><span className={styles.collectionStatus}>A space for what&apos;s next</span><h3>{emptyTitle}</h3><p>{emptyDescription}</p></div>;
  }
  return <ul className={styles.entryList}>{entries.map(entry => <li key={entry.slug}><span className={styles.collectionStatus}>{entry.kind}</span><h3><Link href={entry.href}>{entry.title} <span aria-hidden="true">↗</span></Link></h3><p>{entry.description}</p></li>)}</ul>;
}

export function SpaceDiscover() {
  return (
    <section id="discover" className={styles.discover} aria-labelledby="discover-title">
      <SectionHeading id="discover-title" label="03 / Discover" title={<>Leave room for <em>curiosity.</em></>} description={<>Some ideas become things.<br />Others become better questions.</>} />
      <div className={styles.discoverGrid}>
        <section id="explorations" className={styles.explorationPanel} aria-labelledby="explorations-title">
          <div className={styles.panelHeading}><h3 id="explorations-title">Explorations</h3><span aria-hidden="true">↗</span></div>
          <Collection entries={explorations} emptyTitle="The next idea starts here." emptyDescription="A home for interactive experiments, small tools, and unexpected prototypes. Nothing is published here yet — there’s room to try something new." />
        </section>
        <section id="thoughts" className={styles.thoughtPanel} aria-labelledby="thoughts-title">
          <div className={styles.panelHeading}><h3 id="thoughts-title">Thoughts</h3><span aria-hidden="true">✳</span></div>
          <Collection entries={thoughts} emptyTitle="Notes along the way." emptyDescription="Ideas, discoveries, and questions worth keeping. The first notes are still to come. Until then, the conversation is open." />
        </section>
      </div>
    </section>
  );
}

export function SpaceContact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <p className={styles.sectionLabel}>04 / Start a conversation</p>
      <div className={styles.contactRow}>
        <h2 id="contact-title">Have something<br />in <em>mind?</em></h2>
        <div><p>A question, an idea, or a shared curiosity.<br />I&apos;d love to hear it.</p><a href={`mailto:${siteConfig.personal.email}`} className={styles.email}>{siteConfig.personal.email}<span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}
