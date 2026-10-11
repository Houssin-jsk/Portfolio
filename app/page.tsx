import { Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="waiting-page">
      <div className="ambient" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />
      <header className="waiting-header">
        <Link className="brand" href="/" aria-label="ouahad.space home">ouahad<span>.space</span></Link>
        <span className="header-note">A new chapter</span>
      </header>
      <main className="waiting-main" id="main-content">
        <div className="status-badge"><span className="status-dot" aria-hidden="true" />New portfolio in progress</div>
        <p className="identity">El Houssaine Ouahad</p>
        <h1>Something new<br />is taking <span>shape.</span></h1>
        <p className="introduction">
          I&apos;m currently rebuilding my portfolio to create a better space
          for my work, projects, ideas, and experiments across AI, Data,
          and Web Development.
        </p>
        <ul className="disciplines" aria-label="Fields of work">
          <li>Artificial Intelligence</li><li>Data</li><li>Web Development</li>
        </ul>
        <div className="build-signal" aria-hidden="true">
          <div className="signal-track"><span /></div>
          <span className="signal-label">Thoughtfully building what&apos;s next</span>
        </div>
      </main>
      <footer className="waiting-footer">
        <p>El Houssaine Ouahad <span aria-hidden="true">·</span> 2026</p>
        {siteConfig.social.github && (
          <a className="social-link" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="El Houssaine Ouahad on GitHub (opens in a new tab)">
            <Github size={16} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={13} aria-hidden="true" />
          </a>
        )}
      </footer>
    </div>
  );
}
