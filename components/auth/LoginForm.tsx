"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/services/auth";
import styles from "@/components/auth/landing-page.module.css";
import PrimaryButton from "@/components/ui/Button";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(username, password);
    if (res.token) {
      setToken(res.token);
      router.push("/dashboard");
    } else {
      alert(res.error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin} data-e2e="form-login">
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
      <PrimaryButton type="submit" data-e2e="btn-login" label="Go!" />
    </form>
  );
}
