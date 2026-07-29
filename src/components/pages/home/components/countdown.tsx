"use client";

import { useCountdown } from "../hooks/use-countdown";

import styles from "../home.module.css";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

interface CountdownProps {
  eventDate: string;
}

export function Countdown({ eventDate }: CountdownProps) {
  const countdown = useCountdown(eventDate);

  if (countdown.hasStarted) {
    return <p className={styles.countdownStarted}>قصه مشترک ما آغاز شد</p>;
  }

  const items = [
    ["روز", countdown.days],
    ["ساعت", countdown.hours],
    ["دقیقه", countdown.minutes],
    ["ثانیه", countdown.seconds],
  ] as const;

  return (
    <div className={styles.countdownWrap}>
      <p>تا آغاز قصه‌مان</p>
      <div className={styles.countdown} aria-label="شمارش معکوس تا مراسم">
        {items.map(([label, value]) => (
          <div key={label} className={styles.countdownItem}>
            <strong>{toPersianDigits(value)}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
