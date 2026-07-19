import { ArrowUpRight, FileText, Github, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { profile, socialLinks } from "@/content/profile";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact-copy"><p><span>07</span> Contact</p><h2 id="contact-title">Let&apos;s make the next<br /><em>signal clear.</em></h2></Reveal>
      <Reveal className="contact-actions" delay={.08}>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight aria-hidden="true" /></a>
        <div><a href={socialLinks.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />GitHub</a><a href={`mailto:${profile.email}?subject=CV request`}><FileText aria-hidden="true" />Request CV</a><a href={`mailto:${profile.email}?subject=LinkedIn profile`}><Mail aria-hidden="true" />Request LinkedIn</a></div>
      </Reveal>
    </section>
  );
}
