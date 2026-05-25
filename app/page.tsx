"use client";

import { useEffect, useState } from "react";

type PopupWindow = {
  id: number;
  left: number;
  top: number;
  scale: number;
  zIndex: number;
};

const tickerItems = Array.from({ length: 5 }, (_, index) => (
  <span key={index}>VARNA * SECRET LOCATION * XX.XX</span>
));

function ErrorWindow({
  className = "",
  titleId = "error-title",
}: {
  className?: string;
  titleId?: string;
}) {
  return (
    <div
      className={`error-window ${className}`}
      role="alert"
      aria-labelledby={titleId}
    >
      <div className="window-titlebar">
        <h1 id={titleId}>Error</h1>
        <button className="close-button" type="button" aria-label="Close" />
      </div>

      <div className="window-body">
        <div className="warning-mark" aria-hidden="true">
          <span>!</span>
        </div>

        <p>Content is unavailable yet.</p>

        <button className="ok-button" type="button">
          OK
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [popups, setPopups] = useState<PopupWindow[]>([]);

  useEffect(() => {
    const timers: number[] = [];
    const popupCount = 26;

    for (let index = 0; index < popupCount; index += 1) {
      const delay = index * 120 + Math.random() * 45;

      const timer = window.setTimeout(() => {
        setPopups((current) => [
          ...current,
          {
            id: index,
            left: Math.random() * 100,
            top: 5 + Math.random() * 90,
            scale: 0.42 + Math.random() * 0.34,
            zIndex: 20 + index,
          },
        ]);
      }, delay);

      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className="page-shell">
      <div className="ticker" aria-label="Event details">
        <div className="ticker-track">
          <div className="ticker-group">{tickerItems}</div>
          <div className="ticker-group" aria-hidden="true">
            {tickerItems}
          </div>
        </div>
      </div>

      <div className="popup-layer" aria-hidden="true">
        {popups.map((popup) => (
          <div
            className="popup-window"
            key={popup.id}
            style={{
              left: `${popup.left}%`,
              top: `${popup.top}%`,
              zIndex: popup.zIndex,
              transform: `translate(-50%, -50%) scale(${popup.scale})`,
            }}
          >
            <ErrorWindow
              className="error-window--popup"
              titleId={`popup-title-${popup.id}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
