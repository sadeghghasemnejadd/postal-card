import styles from "../home.module.css";

export function Monogram() {
  return (
    <div className={styles.monogram} aria-hidden="true">
      <span className={`${styles.monogramRing} ${styles.monogramRingRight}`} />
      <span className={`${styles.monogramRing} ${styles.monogramRingLeft}`} />
      <span className={`${styles.monogramLeaf} ${styles.monogramLeafOne}`} />
      <span className={`${styles.monogramLeaf} ${styles.monogramLeafTwo}`} />
      <span className={styles.monogramStem} />
    </div>
  );
}
