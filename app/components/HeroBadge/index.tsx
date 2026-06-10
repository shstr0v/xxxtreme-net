import type { ReactNode } from "react";
import styles from "./index.module.css";

type HeroBadgeColor = "white" | "pink" | "green";

type HeroBadgeProps = {
  children: ReactNode;
  color?: HeroBadgeColor;
  className?: string;
};

export default function HeroBadge({
  children,
  color = "white",
  className = "",
}: HeroBadgeProps) {
  return (
    <span className={[styles.badge, styles[color], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
