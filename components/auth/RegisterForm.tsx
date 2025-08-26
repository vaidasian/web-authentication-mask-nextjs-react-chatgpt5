"use client";

import { useState } from "react";
import styles from "./landing-page.module.css";
import PrimaryButton from "../ui/Button";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "Password length needs to have at least 8 chars, a number and a capital letter."
      );
      return;
    }

    if (password !== passwordConfirm) {
      setMessage("Passwords don't match.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Registration successful! Please activate your account.");
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordConfirm("");
    } else {
      setMessage(data.error || "Registration failed.");
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleRegister} data-e2e="form-register">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
        required
        data-e2e="input-email"
      />
      <input
        type="text"
        placeholder="Manager Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField}
        required
        data-e2e="input-username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField}
        required
        data-e2e="input-password"
      />
      <input
        type="password"
        placeholder="Password Confirm"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className={styles.inputField}
        required
        data-e2e="input-password-confirm"
      />
      <PrimaryButton type="submit" data-e2e="btn-register" label="Create New Manager" />

      {message && <p className={styles.message} data-e2e="msg">{message}</p>}
    </form>
  );
}
