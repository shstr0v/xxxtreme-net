"use client";

import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import styles from "./index.module.css";

const aboutItems = [
  {
    id: "wtf",
    label: "WTF is that?",
    copy: (
      <>
        <strong>XCLUSIVE PARTIES</strong> is a special series of events, which will be
        held in the different cities and unique non-standard venues in Bulgaria.
        <br />
        Attending those shows will allow you to buy a ticket for the main festival
        at the better price!
      </>
    ),
  },
  {
    id: "benefits",
    label: "The benefits to attend",
    copy: (
      <>
        Secret locations, limited capacity, and the first access window for the
        festival passes. Every party unlocks a cleaner route into XXXTREME.
      </>
    ),
  },
  {
    id: "access",
    label: "How to use points",
    copy: (
      <>
        Collect your access at the door, keep your invite active, and use it for
        member pricing when festival registration opens.
      </>
    ),
  },
];

const tickerText = "XCLUSIVE PARTIES";

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frameId = 0;

    const updateActive = () => {
      frameId = 0;

      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.999);
      const nextIndex = Math.floor(progress * aboutItems.length);

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActive);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateActive();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollToItem = (index: number) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const targetTop =
      window.scrollY +
      section.getBoundingClientRect().top +
      (section.offsetHeight - window.innerHeight) *
        (index / Math.max(aboutItems.length - 1, 1));

    setActiveIndex(index);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <section
      id="xclusive^parties"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="about-title"
    >
      <div className={styles.sticky}>
        <AboutTicker position="top" />

        <div className={styles.content}>
          <h2 id="about-title" className="sr-only">
            About Xclusive Parties
          </h2>

          <div className={styles.copy} aria-live="polite">
            <p key={aboutItems[activeIndex].id}>{aboutItems[activeIndex].copy}</p>
          </div>

          <div className={styles.side}>
            <nav className={styles.tabs} aria-label="About sections">
              {aboutItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.tab}
                  data-active={activeIndex === index}
                  onClick={() => scrollToItem(index)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Dialog triggerClassName={styles.access}>GET ACCESS</Dialog>
          </div>
        </div>

        <AboutTicker position="bottom" />
      </div>
    </section>
  );
}

function AboutTicker({ position }: { position: "top" | "bottom" }) {
  const className =
    position === "bottom"
      ? `${styles.ticker} ${styles.tickerBottom}`
      : styles.ticker;

  return (
    <div className={className} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {Array.from({ length: 2 }, (_, groupIndex) => (
          <div className={styles.tickerGroup} key={groupIndex}>
            {Array.from({ length: 8 }, (_, itemIndex) => (
              <span key={itemIndex}>{tickerText}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
