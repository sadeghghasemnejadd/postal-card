"use client";

import { useEffect, useState } from "react";

import type { CountdownValues } from "../types";

const EMPTY_COUNTDOWN: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  hasStarted: false,
};

function getCountdown(eventDate: string): CountdownValues {
  const distance = Math.max(0, new Date(eventDate).getTime() - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
    hasStarted: distance === 0,
  };
}

export function useCountdown(eventDate: string): CountdownValues {
  const [countdown, setCountdown] = useState<CountdownValues>(EMPTY_COUNTDOWN);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown(eventDate));

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1_000);

    return () => window.clearInterval(intervalId);
  }, [eventDate]);

  return countdown;
}
