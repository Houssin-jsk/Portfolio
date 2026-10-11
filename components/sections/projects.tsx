"use client";

import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect, useState } from "react";
import { projectCategories, siteConfig, type Project } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = siteConfig.projects.filter((project) => filter === "All" || project.categories.includes(filter));

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    document.body.classList.toggle("menu-open", Boolean(selected));
    return () => { window.removeEventListener("keydown", close); document.body.classList.remove("menu-open"); };
  }, [selected]);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <SectionHeading id="projects-title" index="04" label="Selected projects" title="Work that turns" accent="information into action." />
      <div className="project-filters" role="group" aria-label="Filter projects">
        {projectCategories.map((category) => <button key={category} className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)}>{category}</button>)}
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <article className="project-tile" key={project.slug}>
            <div className="project-visual" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><div><i /><i /><i /><i /></div></div>
            <div className="project-tile-body">
              <p>{project.categories[0]}</p>
              <h3>{project.title}</h3>
              <span>{project.summary}</span>
              <div className="tag-list">{project.tools.slice(0, 4).map((tool) => <small key={tool}>{tool}</small>)}</div>
              <div className="project-links">
                <button onClick={() => setSelected(project)}>View project <ArrowUpRight /></button>
                {project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>}
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X /></button>
            <p className="modal-kicker">{selected.categories.join(" / ")}</p>
            <h2 id="modal-title">{selected.title}</h2>
            <div className="modal-visual" aria-hidden="true"><span>PROJECT / {selected.slug.toUpperCase()}</span><div><i /><i /><i /><i /><i /></div></div>
            <div className="modal-grid">
              <section><h3>Problem</h3><p>{selected.problem}</p></section>
              <section><h3>Objective</h3><p>{selected.objective}</p></section>
              <section><h3>My role</h3><p>{selected.role}</p></section>
              <section><h3>Result / insight</h3><p>{selected.result}</p></section>
              <section className="modal-wide"><h3>Methodology</h3><ol>{selected.methodology.map((step) => <li key={step}>{step}</li>)}</ol></section>
              <section className="modal-wide"><h3>Tools used</h3><div className="tag-list">{selected.tools.map((tool) => <small key={tool}>{tool}</small>)}</div></section>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
