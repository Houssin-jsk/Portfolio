import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <Reveal><SectionHeading id="experience-title" index="06" label="Experience & education" title="Learning through" accent="practical work." /></Reveal>
      <div className="timeline">{experience.map((item, index) => <Reveal key={item.title}><article><span>0{index + 1}</span><p>{item.type}</p><div><h3>{item.title}</h3><p>{item.description}</p></div></article></Reveal>)}</div>
    </section>
  );
}
