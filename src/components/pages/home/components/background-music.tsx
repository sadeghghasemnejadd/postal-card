"use client";

import { useCallback, useEffect, useRef } from "react";

const BACKGROUND_TRACK = "/audio/background.mp3";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.3;
    audio.muted = false;

    // Calling play() directly from the first real interaction is required for
    // audible media on mobile browsers. There is deliberately no extra UI.
    const playback = audio.play();

    if (playback) {
      void playback.catch(() => {
        // A device-level mute setting or a browser setting can still block sound.
      });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.3;

    const interactionEvent = "PointerEvent" in window ? "pointerdown" : "touchstart";
    const playAfterFirstInteraction = () => startPlayback();

    window.addEventListener(interactionEvent, playAfterFirstInteraction, { once: true });
    window.addEventListener("keydown", playAfterFirstInteraction, { once: true });

    return () => {
      window.removeEventListener(interactionEvent, playAfterFirstInteraction);
      window.removeEventListener("keydown", playAfterFirstInteraction);
    };
  }, [startPlayback]);

  return <audio loop preload="auto" ref={audioRef} src={BACKGROUND_TRACK} />;
}
