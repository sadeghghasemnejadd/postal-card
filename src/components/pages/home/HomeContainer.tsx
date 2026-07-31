import { BackgroundMusic } from "./components/background-music";
import { EntryEnvelope } from "./components/entry-envelope";
import { InvitationContent } from "./components/invitation-content";
import type { InvitationEvent } from "./types";

const invitation: InvitationEvent = {
  brideName: "فاطمه",
  groomName: "محمد صادق",
  eventDate: "2026-08-27T00:00:00+03:30",
  calendarDate: "20260827",
  persianDate: "۱۴۰۵/۰۶/۰۵",
  weekday: "پنجشنبه",
  day: "۵",
  monthAndYear: "شهریور ۱۴۰۵",
  eventTime: "از ۴ عصر تا پاسی از شب",
};

export default async function HomeContainer() {
  return (
    <main className="overflow-x-hidden bg-[#fff7ee] font-[Vazirmatn,Tahoma,Arial,sans-serif] text-[#69494a]">
      <EntryEnvelope>
        <InvitationContent invitation={invitation} />
      </EntryEnvelope>
      <BackgroundMusic />
    </main>
  );
}
