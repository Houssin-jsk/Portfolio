"use client";

import { CalendarDays, CheckCircle2, Clock3, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

export function Booking() {
  const today = useMemo(() => new Intl.DateTimeFormat("en-CA", { timeZone: siteConfig.personal.timezone }).format(new Date()), []);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  useEffect(() => {
    if (!date) { setSlots([]); return; }
    const controller = new AbortController();
    setLoadingSlots(true); setTime("");
    fetch(`/api/bookings/availability?date=${date}`, { signal: controller.signal })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error); setSlots(data.slots); setConfigured(data.configured); })
      .catch((error) => { if (error.name !== "AbortError") setStatus({ type: "error", message: "Availability could not be loaded." }); })
      .finally(() => setLoadingSlots(false));
    return () => controller.abort();
  }, [date]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus({ type: "loading" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    setStatus(response.ok ? { type: "success", message: data.message } : { type: "error", message: data.error });
    if (response.ok) { form.reset(); setDate(""); setTime(""); setSlots([]); }
  }

  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <SectionHeading id="booking-title" index="07" label="Book a meeting" title="Choose a time." accent="Skip the back-and-forth." />
      <div className="booking-layout">
        <div className="booking-note"><CalendarDays /><h3>Morocco time, kept simple.</h3><p>Meetings are available Monday to Friday, {siteConfig.availability.startTime}–{siteConfig.availability.endTime}, in 30-minute slots. Weekends and past dates are blocked automatically.</p><div><Clock3 /> {siteConfig.personal.timezone}</div></div>
        <form className="form-card" onSubmit={submit}>
          <div className="form-row"><label>Date<input name="date" type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} required /></label><label>Selected time<input value={time || "Choose a slot below"} readOnly aria-label="Selected meeting time" /></label></div>
          <fieldset className="slot-field"><legend>Available times</legend>{loadingSlots ? <p className="form-hint"><LoaderCircle className="spin" /> Loading slots…</p> : slots.length ? <div className="slot-grid">{slots.map((slot) => <button type="button" className={time === slot ? "is-selected" : ""} key={slot} onClick={() => setTime(slot)}>{slot}</button>)}</div> : <p className="form-hint">{date ? "No times are available on this date." : "Choose a date to see available times."}</p>}</fieldset>
          <input type="hidden" name="time" value={time} />
          <div className="form-row"><label>Full name<input name="fullName" autoComplete="name" minLength={2} maxLength={100} required /></label><label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label></div>
          <label>Optional message<textarea name="message" rows={4} maxLength={1200} /></label>
          <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          {!configured && <p className="setup-note">Online booking needs its Supabase environment variables. You can still contact me directly below.</p>}
          <button className="button primary submit-button" disabled={!time || status.type === "loading"}>{status.type === "loading" ? <><LoaderCircle className="spin" /> Saving…</> : "Request meeting"}</button>
          <FormStatus status={status} />
        </form>
      </div>
    </section>
  );
}

export function FormStatus({ status }: { status: Status }) {
  if (!status.message) return null;
  return <p className={`form-status ${status.type}`} role="status">{status.type === "success" && <CheckCircle2 />}{status.message}</p>;
}
