"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import styles from "@/components/auth/landing-page.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.landingPageBackground}>
      <div className={styles.loginContainer} data-e2e="container-register">
        <h1>Registration</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
