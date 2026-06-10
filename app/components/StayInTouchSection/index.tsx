import Image from "next/image";
import Dialog from "../Dialog";
import styles from "./index.module.css";

export default function StayInTouchSection() {
  return (
    <section id="sign-up" className={styles.section} aria-label="Stay in touch">
      <div className={styles.content}>
        <Image
          className={styles.titleImage}
          src="/stay-in-touch.svg"
          alt="Stay in touch"
          width={696}
          height={168}
          priority={false}
        />

        <p className={styles.copy}>
          Subscribe to our newsletter for the latest updates, announcements and
          news.
        </p>

        <div className={styles.form}>
          <label className="sr-only" htmlFor="stay-email">
            Email
          </label>
          <input
            id="stay-email"
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            aria-label="Email preview"
            readOnly
            tabIndex={-1}
          />
          <Dialog triggerClassName={styles.submit}>OK</Dialog>
        </div>
      </div>
    </section>
  );
}
