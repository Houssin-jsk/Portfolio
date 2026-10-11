import { SpaceHero, SpaceAbout, SpaceCreations, SpaceDiscover, SpaceContact } from "@/components/design-preview/sections";
import styles from "./preview.module.css";

export default function DesignPreview() {
  return (
    <>
      <SpaceHero />
      <div className={styles.disciplineStrip} aria-label="Areas of exploration">
        <span>Artificial Intelligence</span><i aria-hidden="true">✳</i>
        <span>Data & insights</span><i aria-hidden="true">✳</i><span>Web Development</span>
      </div>
      <SpaceAbout />
      <SpaceCreations />
      <SpaceDiscover />
      <SpaceContact />
    </>
  );
}
