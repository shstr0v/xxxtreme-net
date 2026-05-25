"use client";

import { useEffect, useRef } from "react";

export function SiteSoundtrack() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.8;

    const playSoundtrack = () => {
      void audio.play().catch(() => {
        window.addEventListener("pointerdown", playSoundtrack, { once: true });
        window.addEventListener("keydown", playSoundtrack, { once: true });
        window.addEventListener("touchstart", playSoundtrack, { once: true });
      });
    };

    playSoundtrack();

    return () => {
      window.removeEventListener("pointerdown", playSoundtrack);
      window.removeEventListener("keydown", playSoundtrack);
      window.removeEventListener("touchstart", playSoundtrack);
    };
  }, []);

  return (
    <audio ref={audioRef} src="/soundtrack.mp3" preload="auto" loop hidden />
  );
}
