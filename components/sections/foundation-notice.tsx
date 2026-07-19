import { ArrowDown } from "lucide-react";

export function FoundationNotice() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-73px)] max-w-6xl items-end px-6 py-16 md:px-10 md:py-24" aria-labelledby="foundation-title">
      <div className="max-w-4xl">
        <p className="mb-7 font-mono text-xs uppercase tracking-[0.12em] text-[var(--mint)]">01 / Foundation</p>
        <h1 id="foundation-title" className="text-5xl font-semibold leading-[0.88] tracking-[-0.075em] sm:text-7xl md:text-8xl">
          El Houssaine<br />Ouahad
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          AI Technician / Data Analyst. The portfolio structure is being prepared for a focused editorial redesign.
        </p>
        <span className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-[var(--text)]">
          Foundation phase <ArrowDown aria-hidden="true" size={15} className="text-[var(--mint)]" />
        </span>
      </div>
    </section>
  );
}
