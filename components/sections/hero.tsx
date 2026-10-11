"use client";

import { motion } from "motion/react";
import { ArrowDown, CalendarDays, Mail } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Hero() {
  const enter = (delay: number) => ({ initial: { opacity: 0, y: 18, filter: "blur(7px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: .65, delay, ease: [0.16, 1, .3, 1] as const } });
  return <section className="hero" id="top" aria-labelledby="hero-title"><div className="hero-grid" aria-hidden="true" /><div className="hero-copy"><motion.p className="eyebrow" {...enter(.05)}><span>PORTFOLIO / 2026</span> Tangier, Morocco</motion.p><motion.h1 id="hero-title" {...enter(.14)}>El Houssaine<br /><strong>Ouahad</strong></motion.h1><motion.div className="hero-role" {...enter(.26)}><p>{siteConfig.personal.role}</p><span>{siteConfig.personal.intro}</span></motion.div><motion.div className="hero-actions" {...enter(.4)}><a className="button primary" href="#projects">View projects <ArrowDown /></a><a className="button secondary" href="#booking">Book a meeting <CalendarDays /></a><a className="icon-link" href="#contact" aria-label="Contact El Houssaine"><Mail /></a></motion.div></div><motion.div className="portrait-wrap" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .22, ease: [0.16, 1, .3, 1] }}><div className="portrait-index"><span>PROFILE / 01</span><span>DATA + AI</span></div><div className="portrait-frame"><Image src={siteConfig.personal.portrait} alt="Portrait of El Houssaine Ouahad" fill priority sizes="(max-width: 768px) 92vw, 44vw" /></div><div className="portrait-foot"><span>{siteConfig.personal.location}</span><i /><span>Open to opportunities</span></div></motion.div><a className="scroll-cue" href="#about"><span>Discover my work</span><i /></a></section>;
}
