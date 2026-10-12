import Link from "next/link";
import type { ComponentProps, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./icon-action.module.css";

type Interaction = { icon: ReactNode; motion?: "forward" | "external" | "down" | "up"; children?: ReactNode };

function ActionContents({ children, icon }: Pick<Interaction, "children" | "icon">) {
  return <><span className={styles.label}>{children}</span><span className={styles.frame} data-orbit-icon aria-hidden="true"><span className={styles.glyph} data-orbit-glyph>{icon}</span></span></>;
}

/** Native destinations with the shared OUAHAD interaction treatment. */
export function IconLink({ icon, motion = "forward", children, className, ...props }: Omit<ComponentProps<typeof Link>, "children"> & Interaction) {
  return <Link {...props} className={`${styles.control} ${className || ""}`} data-motion={motion}><ActionContents icon={icon}>{children}</ActionContents></Link>;
}

/** Icon-only actions must supply aria-label. Client callers own click handlers. */
export function IconButton({ icon, motion = "forward", children, className, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & Interaction) {
  return <button {...props} type={type} className={`${styles.control} ${className || ""}`} data-motion={motion}><ActionContents icon={icon}>{children}</ActionContents></button>;
}
