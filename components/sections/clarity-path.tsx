"use client";

import { motion } from "motion/react";

export function ClarityPath() {
  return (
    <section className="clarity" aria-label="Clarity path: information becoming structured">
      <div className="clarity-copy"><span>Raw signal</span><p>Structure gives information direction.</p><span>Clear output</span></div>
      <svg viewBox="0 0 1200 230" role="img" aria-label="Scattered data points aligning into a clear chart path">
        <g className="scatter"><circle cx="40" cy="160" r="4"/><circle cx="105" cy="46" r="3"/><circle cx="175" cy="190" r="5"/><circle cx="245" cy="85" r="3"/><circle cx="315" cy="142" r="4"/></g>
        <path className="path-guide" d="M340 165 C430 160 450 65 550 105 S690 170 760 106 880 48 930 78 1020 115 1170 36" />
        <motion.path className="path-signal" d="M340 165 C430 160 450 65 550 105 S690 170 760 106 880 48 930 78 1020 115 1170 36" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: .45 }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }} />
        <g className="ordered"><circle cx="550" cy="105" r="4"/><circle cx="760" cy="106" r="4"/><circle cx="930" cy="78" r="4"/><circle cx="1170" cy="36" r="4"/></g>
      </svg>
    </section>
  );
}
