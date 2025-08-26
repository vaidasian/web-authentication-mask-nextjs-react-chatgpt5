"use client";

import LoginForm from "@/components/auth/LoginForm";
import styles from "@/components/auth/landing-page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.landingPageBackground}>
      <div className={styles.loginContainer} data-e2e="container-login">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
