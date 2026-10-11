import type { ReactNode } from "react";
import { SpaceHeader, SpaceFooter } from "./site-shell";
import styles from "./space.module.css";
import tokens from "./tokens.module.css";

export default function SpaceShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${tokens.theme} ${styles.preview}`} id="home">
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <SpaceHeader /><main id="main-content">{children}</main><SpaceFooter />
    </div>
  );
}
