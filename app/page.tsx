"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth//RegisterForm";
import styles from "@/components/auth/landing-page.module.css";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={styles.landingPageBackground}>
      <div className={styles.loginContainer}>
        {showRegister ? <RegisterForm /> : <LoginForm />}

        <Button
          onClick={() => setShowRegister(!showRegister)}
          label={showRegister ? "Back To Game" : "Create New Manager"}
          variant="secondary"
        />
      </div>
    </div>
  );
}
