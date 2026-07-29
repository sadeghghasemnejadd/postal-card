import Image from "next/image";

import desktopBackground from "@/docs/assets/pearl-bg-desktop.webp";
import mobileBackground from "@/docs/assets/pearl-bg-mobile.webp";

import type { InvitationEvent } from "../types";
import { Monogram } from "./monogram";

import styles from "../home.module.css";

interface InvitationHeroProps {
  invitation: InvitationEvent;
}

export function InvitationHero({ invitation }: InvitationHeroProps) {
  return (
    <section aria-labelledby="couple-names" className={styles.invitationHero}>
      <Image
        alt=""
        aria-hidden="true"
        className={`${styles.heroBackground} ${styles.desktopBackground}`}
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={desktopBackground}
      />
      <Image
        alt=""
        aria-hidden="true"
        className={`${styles.heroBackground} ${styles.mobileBackground}`}
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={mobileBackground}
      />

      <div className={`${styles.ambientGlow} ${styles.ambientGlowOne}`} />
      <div className={`${styles.ambientGlow} ${styles.ambientGlowTwo}`} />
      <span className={`${styles.floatingPearl} ${styles.pearlOne}`} aria-hidden="true" />
      <span className={`${styles.floatingPearl} ${styles.pearlTwo}`} aria-hidden="true" />
      <span className={`${styles.floatingPearl} ${styles.pearlThree}`} aria-hidden="true" />

      <div className={styles.heroContent}>
        <Monogram />
        <p className={styles.eyebrow}>کارت دعوت عقد</p>
        <p className={styles.openingLine}>با مهر، آغاز قصه‌مان را جشن می‌گیریم</p>

        <h1 className={styles.coupleNames} id="couple-names">
          <span>{invitation.groomName}</span>
          <span className={styles.nameConnector}>و</span>
          <span>{invitation.brideName}</span>
        </h1>

        <div className={styles.dateBlock}>
          <span className={styles.dateLabel}>
            <i />
            تاریخ عقد
            <i />
          </span>
          <time dateTime={invitation.eventDate}>{invitation.persianDate}</time>
        </div>

        <a className={styles.invitationCta} href="#details">
          <span aria-hidden="true" className={styles.ctaFlower}>
            ❧
          </span>
          مشاهده دعوت‌نامه
          <span aria-hidden="true" className={`${styles.ctaFlower} ${styles.ctaFlowerMirror}`}>
            ❧
          </span>
        </a>
      </div>

      <a aria-label="ادامه دعوت‌نامه" className={styles.scrollCue} href="#details">
        <span>ادامه</span>
        <i />
      </a>
    </section>
  );
}
