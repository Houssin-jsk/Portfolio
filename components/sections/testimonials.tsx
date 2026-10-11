"use client";

import { FormEvent, useEffect, useState } from "react";
import { FormStatus } from "@/components/sections/booking";
import { SectionHeading } from "@/components/ui/section-heading";

type Testimonial = { id: string; name: string; comment: string };

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({ type: "idle" });
  useEffect(() => { fetch("/api/testimonials").then((r) => r.json()).then((data) => setItems(data.testimonials ?? [])).catch(() => undefined); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus({ type: "loading" });
    const form = event.currentTarget;
    const response = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await response.json(); setStatus(response.ok ? { type: "success", message: data.message } : { type: "error", message: data.error });
    if (response.ok) form.reset();
  }
  return <section className="section testimonials" id="testimonials" aria-labelledby="testimonials-title"><SectionHeading id="testimonials-title" index="08" label="Comments" title="Thoughtful words," accent="published with care." /><div className="testimonial-layout"><div>{items.length ? <div className="testimonial-list">{items.map((item) => <blockquote key={item.id}><p>“{item.comment}”</p><cite>{item.name}</cite></blockquote>)}</div> : <div className="empty-state"><span>MODERATION / ACTIVE</span><h3>No approved comments yet.</h3><p>New submissions remain private until they are reviewed and approved.</p></div>}</div><form className="form-card compact" onSubmit={submit}><h3>Leave a comment</h3><p>Your email is private and will never be displayed.</p><div className="form-row"><label>Name<input name="name" minLength={2} maxLength={100} required /></label><label>Private email<input name="email" type="email" maxLength={254} required /></label></div><label>Comment<textarea name="comment" rows={5} minLength={10} maxLength={1200} required /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button secondary submit-button" disabled={status.type === "loading"}>Submit for review</button><FormStatus status={status} /></form></div></section>;
}
