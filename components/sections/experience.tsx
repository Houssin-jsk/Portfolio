import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  return <section className="section experience" id="education" aria-labelledby="education-title"><Reveal><SectionHeading id="education-title" index="02" label="Education" title="A path from systems" accent="to useful insight." /></Reveal><div className="education-timeline">{siteConfig.education.map((item, index) => <Reveal key={item.period}><article><div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><div><p>{item.period}</p><h3>{item.title}</h3><strong>{item.institution}</strong><span>{item.detail}</span></div></article></Reveal>)}</div><p className="education-location">Based in Tangier, Morocco — learning through academic and personal projects.</p></section>;
}
