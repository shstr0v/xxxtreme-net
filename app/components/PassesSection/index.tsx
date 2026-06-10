"use client";

import Image from "next/image";
import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import Pass3DModel from "../Pass3DModel";
import styles from "./index.module.css";

const passes = [
  {
    id: "general",
    title: "GENERAL ACCESS",
    code: "PPF5",
    price: 133,
    accent: "#ffffff",
    model: "/models/ga_pass.glb",
  },
  {
    id: "vip",
    title: "VIP ACCESS",
    code: "VIP5",
    price: 266,
    accent: "#56ff02",
    model: "/models/vip_pass.glb",
  },
];

export default function PassesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelAtRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  const activePass = passes[activeIndex];

  const goTo = useCallback((direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + passes.length) % passes.length);
  }, []);

  const nextPreview = useMemo(() => {
    const previous = passes[(activeIndex - 1 + passes.length) % passes.length].title;
    const next = passes[(activeIndex + 1) % passes.length].title;

    return { previous, next };
  }, [activeIndex]);

  return (
    <section
      id="passes"
      className={styles.section}
      aria-labelledby="passes-title"
      onWheel={(event) => {
        const now = Date.now();

        if (Math.abs(event.deltaY) < 28 || now - lastWheelAtRef.current < 360) {
          return;
        }

        lastWheelAtRef.current = now;
        goTo(event.deltaY > 0 ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchStartXRef.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartXRef.current;
        const endX = event.changedTouches[0]?.clientX;

        if (startX === null || endX === undefined) {
          return;
        }

        const delta = endX - startX;

        if (Math.abs(delta) > 44) {
          goTo(delta < 0 ? 1 : -1);
        }

        touchStartXRef.current = null;
      }}
      style={{ "--pass-accent": activePass.accent } as CSSProperties}
    >
      <h2 id="passes-title" className={styles.title} aria-label="Festival passes">
        <Image
          src="/festival_passes.png"
          alt=""
          width={1228}
          height={222}
          className={styles.titleImage}
        />
      </h2>

      <div className={styles.carousel} aria-live="polite">
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(-1)}
          aria-label={`Previous pass: ${nextPreview.previous}`}
        >
          {"<"}
        </button>

        <div className={styles.focus} key={activePass.id}>
          <Pass3DModel
            accent={activePass.accent}
            code={activePass.code}
            model={activePass.model}
            title={activePass.title}
          />
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(1)}
          aria-label={`Next pass: ${nextPreview.next}`}
        >
          {">"}
        </button>
      </div>

      <div className={styles.copy}>
        <p>{activePass.title}</p>
        <span className={styles.purchase}>
          PURCHASE&nbsp;&nbsp;{activePass.price}$
        </span>
      </div>
    </section>
  );
}
