import type { Project } from "@/config/site";
import styles from "./space.module.css";

type ProjectCardProps = { project: Project; index: number; variant: "data" | "ai" | "web" };

export function ProjectCard({ project, index, variant }: ProjectCardProps) {
  return (
    <article className={styles.projectCard}>
      <figure className={`${styles.projectVisual} ${styles[variant]}`}>
        <div className={styles.visualTop}><span>OU / {String(index + 1).padStart(2, "0")}</span><span>{variant === "data" ? "Data → clarity" : variant === "ai" ? "Input → insight" : "Identity → interface"}</span></div>
        <div className={styles.visualDrawing} aria-hidden="true">
          {variant === "data" ? <div className={styles.bars}><i /><i /><i /><i /><i /></div> : variant === "ai" ? <div className={styles.nodes}><i /><i /><i /><span>AI</span></div> : <div className={styles.typeStudy}><span>B.</span><div><i /><i /><i /></div></div>}
        </div>
        <figcaption>Concept sketch · not a product screenshot</figcaption>
      </figure>
      <div className={styles.projectBody}>
        <p className={styles.projectCategory}>{project.categories[0]}</p>
        <h3>{project.title}</h3>
        <p className={styles.projectSummary}>{project.summary}</p>
        <ul className={styles.tags} aria-label="Tools">{project.tools.slice(0, 3).map(tool => <li key={tool}>{tool}</li>)}</ul>
        <details className={styles.projectDetails}>
          <summary>Explore the project <span aria-hidden="true">↗</span></summary>
          <div><h4>Objective</h4><p>{project.objective}</p><h4>My contribution</h4><p>{project.role}</p><h4>Outcome</h4><p>{project.result}</p></div>
        </details>
      </div>
    </article>
  );
}
