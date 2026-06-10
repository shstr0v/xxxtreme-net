"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import styles from "./index.module.css";

type Artist = {
  id: string;
  city: string;
};

type LineupCategory = {
  id: string;
  label: string;
  accent: string;
  buttonBackground: string;
  image: string;
  sound: string;
  artists: Artist[];
};

const lineupCategories: LineupCategory[] = [
  {
    id: "aliens",
    label: "ALIENS",
    accent: "#56ff02",
    buttonBackground: "#56ff02",
    image: "/alians_tier.png",
    sound: "/sounds/aliens.mp3",
    artists: [
      {
        id: "aliens-01",
        city: "ATL, US",
      },
      {
        id: "aliens-02",
        city: "ATL, US",
      },
      {
        id: "aliens-03",
        city: "ATL, US",
      },
    ],
  },
  {
    id: "gods",
    label: "GODS",
    accent: "#f6ff00",
    buttonBackground: "#f6ff00",
    image: "/gods_tier.png",
    sound: "/sounds/gods.mp3",
    artists: [
      {
        id: "gods-01",
        city: "RICHMOND, VA",
      },
      {
        id: "gods-02",
        city: "Goose Creek, South Carolina",
      },
      {
        id: "gods-03",
        city: "ATL, US",
      },
      {
        id: "gods-04",
        city: "ATL, US",
      },
      {
        id: "gods-05",
        city: "Huntington Park, California",
      },
    ],
  },
  {
    id: "uk",
    label: "UK",
    accent: "#ffffff",
    buttonBackground: "#ffffff",
    image: "/uk_tier.png",
    sound: "/sounds/uk.mp3",
    artists: [
      {
        id: "uk-01",
        city: "LIVERPOOL, UK",
      },
      {
        id: "uk-02",
        city: "LONDON, UK",
      },
      {
        id: "uk-03",
        city: "LONDON, UK",
      },
    ],
  },
  {
    id: "underground",
    label: "UNDERGROUND",
    accent: "#00e5ff",
    buttonBackground: "#00e5ff",
    image: "/underground_tier.png",
    sound: "/sounds/underground.mp3",
    artists: [
      {
        id: "underground-01",
        city: "Copenhagen, DK",
      },
      {
        id: "underground-02",
        city: "Florida, US",
      },
    ],
  },
  {
    id: "russian-sauce",
    label: "RUSSIAN SAUCE",
    accent: "#ff4fb8",
    buttonBackground: "#ff4fb8",
    image: "/russian_tier.png",
    sound: "/sounds/russians.mp3",
    artists: [
      {
        id: "sauce-01",
        city: "MOSCOW, RU",
      },
      {
        id: "sauce-02",
        city: "RIGA, LV",
      },
      {
        id: "sauce-03",
        city: "Bereznyky, RU",
      },
      {
        id: "sauce-04",
        city: "Batumi, Georgia",
      },
      {
        id: "sauce-05",
        city: "Tyumen, RU",
      },
      {
        id: "sauce-06",
        city: "Tyumen, RU",
      },
      {
        id: "sauce-07",
        city: "Noginsk, RU",
      },
      {
        id: "sauce-08",
        city: "Tomsk, RU",
      },
    ],
  },
  {
    id: "djs",
    label: "DJ's",
    accent: "#fd00fd",
    buttonBackground: "#fd00fd",
    image: "/djs.png",
    sound: "/sounds/djs.mp3",
    artists: [
      {
        id: "djs-01",
        city: "AMSTERDAM, NL",
      },
      {
        id: "djs-02",
        city: "CHICAGO, US",
      },
      {
        id: "djs-03",
        city: "TOKYO, JP",
      },
      {
        id: "djs-04",
        city: "LA, US",
      },
      {
        id: "djs-05",
        city: "VARNA, BG",
      },
    ],
  },
];

const repeatedLine = "THE CRAZIEST LINEUP EVER";
const lineupImageVersion = "20260606-1";

export default function LineupSection() {
  const [activeCategory, setActiveCategory] = useState(lineupCategories[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioStartedRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});
  const active =
    lineupCategories.find((category) => category.id === activeCategory) ??
    lineupCategories[0];

  const playCategorySound = (id: string) => {
    const category = lineupCategories.find((item) => item.id === id);
    const audio = audioRef.current;

    if (!category || !audio) {
      return;
    }

    if (audio.src !== new URL(category.sound, window.location.href).href) {
      audio.src = category.sound;
      audio.currentTime = 0;
    }

    audioStartedRef.current = true;
    void audio.play().catch(() => {
      audioStartedRef.current = false;
    });
  };

  const stopLineupSound = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    let frameId = 0;

    const updateActiveCategory = () => {
      frameId = 0;

      const viewportCenter = window.innerHeight * 0.52;
      const sectionRect = sectionRef.current?.getBoundingClientRect();

      if (
        sectionRect &&
        (sectionRect.top > viewportCenter || sectionRect.bottom < viewportCenter)
      ) {
        stopLineupSound();
        return;
      }

      let nextCategory = lineupCategories[0].id;
      let shortestDistance = Number.POSITIVE_INFINITY;

      lineupCategories.forEach((category) => {
        const node = panelRefs.current[category.id];

        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();
        const panelCenter = rect.top + rect.height / 2;
        const distance = Math.abs(panelCenter - viewportCenter);

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nextCategory = category.id;
        }
      });

      setActiveCategory((currentCategory) =>
        currentCategory === nextCategory ? currentCategory : nextCategory,
      );

      if (audioStartedRef.current) {
        playCategorySound(nextCategory);
      }
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveCategory);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateActiveCategory();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (!audioStartedRef.current) {
      return;
    }

    playCategorySound(activeCategory);
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    const node = panelRefs.current[id];

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const targetTop =
      window.scrollY +
      rect.top -
      Math.max((window.innerHeight - rect.height) / 2, 84);

    setActiveCategory(id);
    playCategorySound(id);
    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="line-up"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="lineup-title"
      style={{ "--lineup-accent": active.accent } as CSSProperties}
    >
      <audio ref={audioRef} preload="auto" loop />

      <div className={styles.hype} aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index}>{repeatedLine}</span>
        ))}
      </div>

      <h2 id="lineup-title" className={styles.activeTitle}>
        {active.label}
      </h2>

      <nav className={styles.categoryNav} aria-label="Lineup categories">
        {lineupCategories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              className={styles.categoryButton}
              data-active={isActive}
              onClick={() => scrollToCategory(category.id)}
              style={
                {
                  "--category-color": category.buttonBackground,
                } as CSSProperties
              }
            >
              {category.label}
            </button>
          );
        })}
      </nav>

      <div className={styles.panels}>
        {lineupCategories.map((category) => (
          <article
            key={category.id}
            ref={(node) => {
              panelRefs.current[category.id] = node;
            }}
            className={styles.panel}
            data-category={category.id}
            aria-label={`${category.label} lineup`}
          >
            <div
              className={styles.grid}
              data-category={category.id}
              style={
                {
                  "--panel-accent": category.accent,
                } as CSSProperties
              }
            >
              {category.artists.map((artist) => (
                <article key={artist.id} className={styles.card}>
                  <div className={styles.visual}>
                    <Image
                      className={styles.photo}
                      src={`${category.image}?v=${lineupImageVersion}`}
                      alt=""
                      width={360}
                      height={496}
                      unoptimized
                    />
                  </div>
                  <div className={styles.info}>
                    <h3>UNKNOWN OBJECT</h3>
                    <p>{artist.city}</p>
                  </div>
                  <Dialog triggerClassName={styles.see}>SEE</Dialog>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
