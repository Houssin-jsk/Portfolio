import Link from "next/link";
import { siteConfig } from "@/config/site";
import { spaceConfig } from "@/config/space";
import { explorations, thoughts, type SpaceEntry } from "@/content/space";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";
import styles from "./space.module.css";

// Preserved for future phases. These sections are not mounted publicly in V3.
export function SpaceCreations() {
  const projects = spaceConfig.selectedProjects.flatMap(slug => {
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

