"use client";

import { Button } from "@/components/ui/button";

import { useInvitationActions } from "../hooks/use-invitation-actions";
import type { InvitationEvent } from "../types";

import styles from "../home.module.css";

interface InvitationActionsProps {
  invitation: InvitationEvent;
}

export function InvitationActions({ invitation }: InvitationActionsProps) {
  const { notice, saveToCalendar, shareInvitation } = useInvitationActions(invitation);

  return (
    <>
      <div className={styles.invitationActions}>
        <Button className={styles.primaryAction} onClick={shareInvitation} type="button">
          اشتراک‌گذاری دعوت‌نامه
          <span aria-hidden="true">↗</span>
        </Button>
        <Button
          className={styles.secondaryAction}
          onClick={saveToCalendar}
          type="button"
          variant="outline"
        >
          ذخیره تاریخ در تقویم
          <span aria-hidden="true">＋</span>
        </Button>
      </div>
      <div
        aria-live="polite"
        className={`${styles.notice} ${notice ? styles.noticeVisible : ""}`}
        role="status"
      >
        {notice}
      </div>
    </>
  );
}
