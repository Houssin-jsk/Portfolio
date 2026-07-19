import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5 md:px-10">
      <Link className="text-lg font-semibold tracking-[-0.08em]" href="/" aria-label="El Houssaine Ouahad, home">
        EO<span className="text-[var(--mint)]">.</span>
      </Link>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Portfolio foundation</p>
    </header>
  );
}
