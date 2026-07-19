"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import { profile, socialLinks } from "@/content/profile";

export function Hero() {
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(7px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <motion.p className="eyebrow" {...enter(0.05)}><span>01</span> Portfolio / Data & BI</motion.p>
        <motion.h1 id="hero-title" {...enter(0.14)}>El Houssaine<br /><strong>Ouahad</strong></motion.h1>
        <motion.div className="hero-role" {...enter(0.26)}><p>{profile.shortRole}</p><span>{profile.positioning}</span></motion.div>
        <motion.div className="hero-actions" {...enter(0.4)}>
          <a className="button primary" href="#work">Explore work <ArrowDown aria-hidden="true" /></a>
          <a className="button secondary" href={`mailto:${profile.email}?subject=CV request`}>Request CV <FileText aria-hidden="true" /></a>
          <a className="icon-link" href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><ArrowUpRight /></a>
        </motion.div>
      </div>
      <motion.div className="portrait-wrap" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .22, ease: [0.16, 1, 0.3, 1] }}>
        <div className="portrait-index"><span>PROFILE / 01</span><span>DATA ANALYST</span></div>
        <div className="portrait-frame"><Image src="/images/profile.png" alt="Portrait of El Houssaine Ouahad" fill priority sizes="(max-width: 768px) 92vw, 44vw" /></div>
        <div className="portrait-foot"><span>Casablanca, Morocco</span><i /><span>Open to useful work</span></div>
      </motion.div>
      <a className="scroll-cue" href="#about"><span>Scroll to structure</span><i /></a>
    </section>
  );
}
