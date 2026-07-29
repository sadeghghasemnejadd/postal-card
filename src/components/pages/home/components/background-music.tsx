"use client";

import { useCallback, useEffect, useRef } from "react";

const BACKGROUND_TRACK = "/audio/background.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
    } catch {
      // Most browsers require the first audible playback to follow a user interaction.
      // The one-time interaction listeners below retry playback when that happens.
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const playAfterInteraction = () => {
      void startPlayback();
    };

    if (audio) {
      audio.volume = 0.3;
    }

    void startPlayback();
    window.addEventListener("pointerdown", playAfterInteraction, { once: true, passive: true });
    window.addEventListener("keydown", playAfterInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", playAfterInteraction);
      window.removeEventListener("keydown", playAfterInteraction);
    };
  }, [startPlayback]);

  return <audio autoPlay loop preload="metadata" ref={audioRef} src={BACKGROUND_TRACK} />;
}
