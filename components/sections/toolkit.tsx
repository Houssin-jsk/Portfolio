import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Toolkit() {
  return <section className="section toolkit" id="skills" aria-labelledby="skills-title"><Reveal><SectionHeading id="skills-title" index="03" label="Skills" title="Tools grouped" accent="by the work." /></Reveal><div className="skill-categories">{siteConfig.skills.map((group, index) => <Reveal className="skill-category" key={group.label}><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.label}</h3></div><div className="tag-list large">{group.items.map((item) => <small key={item}>{item}</small>)}</div></Reveal>)}</div></section>;
}
