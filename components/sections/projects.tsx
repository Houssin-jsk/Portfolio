import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <section className="section projects" id="work" aria-labelledby="work-title">
      <Reveal><SectionHeading id="work-title" index="04" label="Selected work" title="Work built around" accent="real information." /></Reveal>
      <div className="project-list">
        {projects.map((project, index) => <Reveal key={project.slug}>
          <article className="project-card">
            <span className="project-index">0{index + 1}</span>
            <div className="project-main"><p>{project.category}</p><h3>{project.name}</h3><span>{project.status}</span></div>
            <div className="project-detail"><p>{project.problem}</p><small>{project.contribution}</small><div>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
            <a href={project.slug === "complete-bi-project" ? "#case-study" : `mailto:ouahadhoussin@gmail.com?subject=${encodeURIComponent(project.name)}`} aria-label={`Open ${project.name}`}><ArrowDownRight /></a>
          </article>
        </Reveal>)}
      </div>
    </section>
  );
}
