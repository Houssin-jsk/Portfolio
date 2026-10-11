import type { ReactNode } from "react";
import styles from "@/app/design-preview/preview.module.css";

export function SectionHeading({ id, label, title, description }: { id: string; label: string; title: ReactNode; description?: ReactNode }) {
  return (
    <div className={styles.sectionHead}>
      <div><p className={styles.sectionLabel}>{label}</p><h2 id={id}>{title}</h2></div>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
