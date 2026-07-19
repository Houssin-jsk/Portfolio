import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <Reveal><SectionHeading index="02" label="About" title="Structure first." accent="Meaning next." /></Reveal>
      <div className="about-body">
        <Reveal className="about-principle"><span>Working principle</span><p>Raw data becomes useful when someone gives it structure, meaning, and direction.</p></Reveal>
        <Reveal className="about-copy" delay={.08}>{profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</Reveal>
      </div>
    </section>
  );
}
