"use client";

import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import styles from "./index.module.css";

type DialogProps = {
  children: ReactNode;
  triggerClassName?: string;
  endpoint?: string;
  title?: string;
  description?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Dialog({
  children,
  triggerClassName,
  endpoint = "/api/newsletter",
  title = "STAY IN TOUCH",
  description = "Drop your email and we will send only the important updates.",
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  function openDialog() {
    setSubmitState("idle");
    setMessage("");
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      closeDialog();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source:
            typeof window === "undefined" ? undefined : window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Newsletter request failed");
      }

      form.reset();
      setSubmitState("success");
      setMessage("YOU ARE ON THE LIST.");
    } catch {
      setSubmitState("error");
      setMessage("SOMETHING BROKE. TRY AGAIN.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <>
      <button
        className={triggerClassName}
        type="button"
        aria-haspopup="dialog"
        onClick={openDialog}
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={`${emailId}-title`}
        onClick={handleBackdropClick}
      >
        <div className={styles.panel}>
          <button
            className={styles.close}
            type="button"
            aria-label="Close email signup"
            onClick={closeDialog}
          >
            X
          </button>

          <p className={styles.kicker}>XXXTREME</p>
          <h2 id={`${emailId}-title`} className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor={emailId}>
              Email
            </label>
            <input
              id={emailId}
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              required
            />
            <button className={styles.submit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "..." : "OK"}
            </button>
          </form>

          {message ? (
            <p className={styles.message} role="status">
              {message}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
