"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Dialog from "../Dialog";
import RotatingLogo3D from "../RotatingLogo3D";
import styles from "./index.module.css";

const navItems = [
  { label: "LiNeUp", href: "/#line-up" },
  { label: "XcLuSiVe_PaRtIeS", href: "/#xclusive^parties" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="header-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <button
          type="button"
          className={styles.backdrop}
          data-open={isMenuOpen}
          aria-label="Close navigation menu"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <div
          id="header-navigation"
          className={styles.links}
          data-open={isMenuOpen}
        >
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </div>

        <Link className={styles.logo} href="/" aria-label="XXXTREME home">
          <RotatingLogo3D />
        </Link>

        <div className={styles.actions}>
          <div className={styles.location} aria-label="Event location">
            <Image src="/bg.png" alt="Bulgarian flag" width={34} height={20} />
            <span>Varna, BG</span>
          </div>
          <Dialog triggerClassName={styles.signup}>SIGN UP</Dialog>
        </div>
      </nav>
    </header>
  );
}
