"use client";

const BACKGROUND_TRACK = "/audio/background.mp3";
export const BACKGROUND_MUSIC_ID = "background-music";

export function playBackgroundMusic() {
  const audio = document.getElementById(BACKGROUND_MUSIC_ID) as HTMLAudioElement | null;

  if (!audio) {
    return;
  }

  audio.volume = 0.3;
  audio.muted = false;

  // This function is called directly from the invitation's click handler so
  // mobile browsers recognise it as a user-initiated playback request.
  const playback = audio.play();

  if (playback) {
    void playback.catch(() => {
      // Device-level mute and browser-level media settings cannot be overridden.
    });
  }
}

export function BackgroundMusic() {
  return <audio id={BACKGROUND_MUSIC_ID} loop preload="auto" src={BACKGROUND_TRACK} />;
}
