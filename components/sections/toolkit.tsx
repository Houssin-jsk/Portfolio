import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrandIcon } from "@/components/ui/brand-icon";
import { skillGroups } from "@/content/skills";

export function Toolkit() {
  return (
    <section className="section toolkit" id="toolkit" aria-labelledby="toolkit-title">
      <Reveal><SectionHeading index="05" label="Toolkit" title="Tools grouped" accent="by the job." /></Reveal>
      <div className="tool-groups">{skillGroups.map((group) => <Reveal className="tool-group" key={group.label}><p>{group.label}</p><div>{group.skills.map((skill) => <span className="tool" key={skill.name}><BrandIcon icon={skill.icon} /><b>{skill.name}</b></span>)}</div></Reveal>)}</div>
    </section>
  );
}
