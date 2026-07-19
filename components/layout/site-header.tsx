"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { href: "#about", label: "About" }, { href: "#case-study", label: "Case study" },
  { href: "#work", label: "Work" }, { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle("menu-open", open); return () => document.body.classList.remove("menu-open"); }, [open]);
  return (
    <header className="site-header">
      <Link className="wordmark" href="#top" aria-label="El Houssaine Ouahad, home">EO<span>.</span></Link>
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>)}
      </nav>
      <a className="header-status" href="mailto:ouahadhoussin@gmail.com"><i />Available for conversation</a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
