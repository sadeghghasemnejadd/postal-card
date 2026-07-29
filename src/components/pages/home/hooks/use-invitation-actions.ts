"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { InvitationEvent } from "../types";

const invitationTitle = "کارت دعوت عقد محمد صادق و فاطمه";

async function copyCurrentUrl() {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(window.location.href);
    return;
  }

  const input = document.createElement("textarea");
  input.value = window.location.href;
  input.readOnly = true;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export function useInvitationActions(invitation: InvitationEvent) {
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  const showNotice = useCallback((message: string) => {
    if (noticeTimerRef.current) {
      window.clearTimeout(noticeTimerRef.current);
    }

    setNotice(message);
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), 2_600);
  }, []);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  const shareInvitation = useCallback(async () => {
    const shareData: ShareData = {
      title: invitationTitle,
      text: `با مهر، شما را به تماشای آغاز قصه‌مان دعوت می‌کنیم — ${invitation.persianDate}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await copyCurrentUrl();
      showNotice("لینک دعوت‌نامه کپی شد");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      showNotice("امکان اشتراک‌گذاری وجود ندارد");
    }
  }, [invitation.persianDate, showNotice]);

  const saveToCalendar = useCallback(() => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Mohammad Sadegh & Fatemeh//Engagement//FA",
      "UID:sadegh-fatemeh-1405-06-05",
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      `DTSTART;VALUE=DATE:${invitation.calendarDate}`,
      `DTEND;VALUE=DATE:20260828`,
      `SUMMARY:${invitationTitle}`,
      "DESCRIPTION:یادگاری از روزی که «ما» شدیم",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const file = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = "sadegh-fatemeh-1405-06-05.ics";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(fileUrl);
    showNotice("تاریخ در تقویم ذخیره شد");
  }, [invitation.calendarDate, showNotice]);

  return { notice, saveToCalendar, shareInvitation };
}
