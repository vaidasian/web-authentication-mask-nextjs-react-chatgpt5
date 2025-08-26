"use client";

import type { ButtonHTMLAttributes } from "react";
import styles from "@/components/auth/landing-page.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
}

export default function Button({ label, variant = "primary", ...props }: ButtonProps) {
  const buttonClass =
    variant === "primary"
      ? `${styles.button} ${styles.buttonPrimary}`
      : `${styles.button} ${styles.buttonSecondary}`;

  return (
    <button {...props} className={buttonClass}>
      {label}
    </button>
  );
}
