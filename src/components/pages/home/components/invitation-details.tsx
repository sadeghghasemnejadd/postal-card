import type { InvitationEvent } from "../types";
import { Countdown } from "./countdown";
import { InvitationActions } from "./invitation-actions";

import styles from "../home.module.css";

interface InvitationDetailsProps {
  invitation: InvitationEvent;
}

export function InvitationDetails({ invitation }: InvitationDetailsProps) {
  return (
    <section aria-labelledby="details-title" className={styles.detailsSection} id="details">
      <div aria-hidden="true" className={`${styles.detailsOrnament} ${styles.ornamentTopRight}`}>
        ❦
      </div>
      <div aria-hidden="true" className={`${styles.detailsOrnament} ${styles.ornamentBottomLeft}`}>
        ❦
      </div>

      <div className={styles.detailsCard}>
        <p className={styles.sectionKicker}>به نام آن‌که عشق را آفرید</p>
        <h2 id="details-title">یادگاری از روزی که «ما» شدیم</h2>

        <div aria-hidden="true" className={styles.goldDivider}>
          <i />
          <span>◇</span>
          <i />
        </div>

        <p className={styles.invitationCopy}>
          با قلبی سرشار از مهر، شما را به تماشای آغاز فصل مشترک زندگی‌مان دعوت می‌کنیم.
        </p>

        <div aria-label="تاریخ مراسم" className={styles.ceremonyDate}>
          <span>{invitation.weekday}</span>
          <strong>{invitation.day}</strong>
          <span>{invitation.monthAndYear}</span>
        </div>

        <Countdown eventDate={invitation.eventDate} />
        <InvitationActions invitation={invitation} />

        <p className={styles.closingLine}>بودنتان، گرمای این خاطره خواهد بود</p>
        <p className={styles.signature}>
          {invitation.groomName} و {invitation.brideName}
        </p>
      </div>
    </section>
  );
}
