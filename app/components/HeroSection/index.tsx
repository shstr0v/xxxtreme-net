import Image from "next/image";
import Dialog from "../Dialog";
import HeroBadge from "../HeroBadge";
import badgeStyles from "../HeroBadge/index.module.css";
import styles from "./index.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <Image
        src="/triple_cans.png"
        alt=""
        width={400}
        height={460}
        priority
        className={`${styles.sideImage} ${styles.cans}`}
        aria-hidden="true"
      />
      <Image
        src="/conus.png"
        alt=""
        width={382}
        height={360}
        priority
        className={`${styles.sideImage} ${styles.conus}`}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <HeroBadge color="white" className={badgeStyles.first}>
          THE FIRST
        </HeroBadge>
        <HeroBadge color="pink" className={badgeStyles.genre}>
          HIP^HOP
        </HeroBadge>

        <h1 id="hero-title" className={styles.title} aria-label="XTREME FESTIVAL">
          <Image
            src="/header.png"
            alt=""
            width={1402}
            height={250}
            priority
            className={styles.titleImage}
          />
        </h1>
        <p className={styles.subtitle}>IN BULGARIA</p>
        <Dialog triggerClassName={styles.cta}>PRE^REGISTER</Dialog>
      </div>
    </section>
  );
}
