"use client";

import { useState } from "react";
import LoginForm from "../src/frontend/components/LoginForm";
import RegisterForm from "../src/frontend/components/RegisterForm";
import styles from "./styles/landing-page.module.css";
import Button from "../src/frontend/components/ui/Button";

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
