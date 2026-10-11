import { SpaceHero, SpaceAbout } from "./sections";
import { SpaceCreations, SpaceDiscover, SpaceContact } from "./future-sections";
import styles from "./space.module.css";

// Preserved assembly for later phases; no public route mounts this component.
export default function FutureHomepage() {
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
