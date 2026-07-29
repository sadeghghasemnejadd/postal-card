"use client";

import { useCountdown } from "../hooks/use-countdown";

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
    return <p className="mt-3 text-center text-xs text-[#987573]">قصه مشترک ما آغاز شد</p>;
  }

  const items = [
    ["روز", countdown.days],
    ["ساعت", countdown.hours],
    ["دقیقه", countdown.minutes],
    ["ثانیه", countdown.seconds],
  ] as const;

  return (
    <div className="mt-3 w-full">
      <p className="mb-2 text-center text-[0.64rem] text-[#987573]">تا آغاز قصه‌مان</p>
      <div className="grid grid-cols-4 gap-1.5" aria-label="شمارش معکوس تا مراسم">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex min-h-13 min-w-0 flex-col items-center justify-center rounded-xl border border-[#d19a91]/30 bg-[#fffdf9]/60 px-1 shadow-[0_8px_18px_rgba(105,73,74,0.04)] transition hover:-translate-y-0.5 hover:bg-[#fffdf9]"
          >
            <strong className="text-base font-normal tabular-nums text-[#69494a] sm:text-lg">
              {toPersianDigits(value)}
            </strong>
            <span className="mt-0.5 text-[0.54rem] text-[#987573]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
