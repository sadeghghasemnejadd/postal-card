import { InvitationDetails } from "./components/invitation-details";
import { InvitationHero } from "./components/invitation-hero";
import type { InvitationEvent } from "./types";

import styles from "./home.module.css";

const invitation: InvitationEvent = {
  brideName: "فاطمه نورسیده",
  groomName: "محمد صادق قاسم‌نژاد",
  eventDate: "2026-08-27T00:00:00+03:30",
  calendarDate: "20260827",
  persianDate: "۱۴۰۵/۰۶/۰۵",
  weekday: "پنجشنبه",
  day: "۵",
  monthAndYear: "شهریور ۱۴۰۵",
};

export default async function HomeContainer() {
  return (
    <main className={styles.invitationPage}>
      <InvitationHero invitation={invitation} />
      <InvitationDetails invitation={invitation} />
      <footer className={styles.invitationFooter}>
        <span>{invitation.persianDate}</span>
        <i aria-hidden="true">♥</i>
        <span>
          {invitation.groomName} و {invitation.brideName}
        </span>
      </footer>
    </main>
  );
}
