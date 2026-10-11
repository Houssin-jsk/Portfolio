import { Download, Eye, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CvSection() {
  return <section className="cv-section" aria-labelledby="cv-title"><div><p>CV / PROFILE</p><h2 id="cv-title">A concise view of my education, skills, and projects.</h2><span>{siteConfig.personal.cvPath ? "View or download the current PDF version." : "The verified CV PDF has not been added to this project yet."}</span></div><div className="cv-actions">{siteConfig.personal.cvPath ? <><a className="button primary" href={siteConfig.personal.cvPath} target="_blank"><Eye /> View CV</a><a className="button secondary" href={siteConfig.personal.cvPath} download><Download /> Download CV</a></> : <a className="button secondary" href={`mailto:${siteConfig.personal.email}?subject=CV request`}><Mail /> Request my CV</a>}<a className="text-link" href="#contact">Contact me</a></div></section>;
}
