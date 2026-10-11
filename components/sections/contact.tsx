"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FormStatus } from "@/components/sections/booking";

export function Contact() {
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({ type: "idle" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus({ type: "loading" });
    const form = event.currentTarget;
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await response.json(); setStatus(response.ok ? { type: "success", message: data.message } : { type: "error", message: data.error });
    if (response.ok) form.reset();
  }
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-top"><div className="contact-copy"><p><span>09</span> Contact</p><h2 id="contact-title">Let&apos;s make the next<br /><em>signal clear.</em></h2><span>I am open to junior data roles, useful collaborations, and thoughtful digital projects.</span></div><div className="contact-details"><a href={`mailto:${siteConfig.personal.email}`}><Mail />{siteConfig.personal.email}<ArrowUpRight /></a><a href={siteConfig.social.github} target="_blank" rel="noreferrer"><Github />GitHub<ArrowUpRight /></a><p><MapPin />{siteConfig.personal.location}</p>{!siteConfig.social.linkedin && <small>LinkedIn and WhatsApp can be added in config/site.ts when verified.</small>}</div></div>
      <form className="form-card contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" minLength={2} maxLength={100} autoComplete="name" required /></label><label>Email<input name="email" type="email" maxLength={254} autoComplete="email" required /></label></div><label>Subject<input name="subject" minLength={3} maxLength={140} required /></label><label>Message<textarea name="message" rows={6} minLength={10} maxLength={4000} required /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button primary submit-button" disabled={status.type === "loading"}>Send message</button><FormStatus status={status} /></form>
    </section>
  );
}
