"use client";

import { useEffect, useRef } from "react";

export function SiteSoundtrack() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    let isPlaying = false;

    if (!audio) {
      return;
    }

    audio.volume = 0.8;
    audio.muted = false;

    const playSoundtrack = () => {
      if (isPlaying) {
        return;
      }

      void audio
        .play()
        .then(() => {
          isPlaying = true;
          removeFallbackListeners();
        })
        .catch(() => {
          addFallbackListeners();
        });
    };

    const addFallbackListeners = () => {
      window.addEventListener("pointerdown", playSoundtrack, { once: true });
      window.addEventListener("keydown", playSoundtrack, { once: true });
      window.addEventListener("touchstart", playSoundtrack, { once: true });
    };

    const removeFallbackListeners = () => {
      window.removeEventListener("pointerdown", playSoundtrack);
      window.removeEventListener("keydown", playSoundtrack);
      window.removeEventListener("touchstart", playSoundtrack);
    };

    playSoundtrack();

    window.addEventListener("load", playSoundtrack);
    window.addEventListener("focus", playSoundtrack);
    window.addEventListener("pageshow", playSoundtrack);
    document.addEventListener("visibilitychange", playSoundtrack);
    audio.addEventListener("canplaythrough", playSoundtrack);

    return () => {
      removeFallbackListeners();
      window.removeEventListener("load", playSoundtrack);
      window.removeEventListener("focus", playSoundtrack);
      window.removeEventListener("pageshow", playSoundtrack);
      document.removeEventListener("visibilitychange", playSoundtrack);
      audio.removeEventListener("canplaythrough", playSoundtrack);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/soundtrack.mp3"
      preload="auto"
      autoPlay
      loop
      playsInline
      hidden
    />
  );
}
