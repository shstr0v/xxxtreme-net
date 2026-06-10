import Image from "next/image";
import Link from "next/link";
import instagramIcon from "../../icons/ig.svg";
import spotifyIcon from "../../icons/spotify.svg";
import telegramIcon from "../../icons/tg.svg";
import styles from "./index.module.css";

const footerColumns = [
  {
    title: "INFO",
    links: [
      { label: "ABOUT", href: "/about", internal: true },
      { label: "RULES", href: "/rules", internal: true },
      { label: "FAQ", href: "/faq", internal: true },
      { label: "PRIVACY POLICY", href: "/privacy-policy", internal: true },
      { label: "REFUND POLICY", href: "/refund-policy", internal: true },
      { label: "COOKIE POLICY", href: "/cookie-policy", internal: true },
    ],
  },
  {
    title: "CONTACT",
    links: [
      {
        label: "MEDIA ACCREDITATION",
        href: process.env.NEXT_PUBLIC_MEDIA_ACCREDITATION_URL ?? "#",
      },
      {
        label: "PRESS ACCREDITATION",
        href: process.env.NEXT_PUBLIC_PRESS_ACCREDITATION_URL ?? "#",
      },
      { label: "INFLUENCER FORM", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    text: "COPYRIGHT 2026 @ XTREME FESTIVAL",
  },
];

const socialLinks = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/playlist/6kAA9jhJqFH0lXQWw7VEGG",
    icon: spotifyIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/xtreme.area",
    icon: instagramIcon,
  },
  { label: "Telegram", href: "https://t.me/xtremearea", icon: telegramIcon },
];

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.mark} aria-hidden="true">
        <Image src="/logo.png" alt="" width={176} height={147} />
      </div>

      <nav className={styles.columns} aria-label="Footer navigation">
        {footerColumns.map((column) => (
          <section className={styles.column} key={column.title}>
            <h2>{column.title}</h2>
            {column.links ? (
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"internal" in link && link.internal ? (
                      <Link href={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{column.text}</p>
            )}
          </section>
        ))}
      </nav>

      <div className={styles.socials} aria-label="Social links">
        {socialLinks.map((social) => (
          <a
            className={styles.socialLink}
            href={social.href}
            key={social.label}
            aria-label={social.label}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={social.icon} alt="" width={48} height={48} />
          </a>
        ))}
      </div>
    </footer>
  );
}
