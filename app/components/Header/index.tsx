import Image from "next/image";
import Link from "next/link";
import Dialog from "../Dialog";
import RotatingLogo3D from "../RotatingLogo3D";
import styles from "./index.module.css";

const navItems = ["LiNeUp", "XcLuSiVe_PaRtIeS"];

export default function Header() {
  return (
    <header className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <div className={styles.links}>
          {navItems.map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`}>
              {item}
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
