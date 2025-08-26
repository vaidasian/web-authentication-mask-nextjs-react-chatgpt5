"use client";

import Link from "next/link";
import styles from "@/components/auth/landing-page.module.css";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className={styles.landingPageBackground}>
      <div className={styles.loginContainer} data-e2e="container-login">
        <h1>Welcome to the Game</h1>
        <p>Login or register a new manager to start playing!</p>

        <Link href="/auth/login" passHref>
          <Button label="Login" variant="primary" data-e2e="btn-login" />
        </Link>

        <Link href="/auth/register" passHref>
          <Button label="Create New Manager" variant="secondary" data-e2e="btn-register" />
        </Link>
      </div>
    </div>
  );
}
