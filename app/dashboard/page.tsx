// DashboardPage.tsx
"use client";

import { useState } from "react";
import styles from "../styles/dashboard.module.css";

export default function DashboardPage() {
  const [caughtPlayers, setCaughtPlayers] = useState(0);
  const maxPlayers = 11;

  const handleBallClick = () => {
    if (caughtPlayers < maxPlayers) {
      setCaughtPlayers(caughtPlayers + 1);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Fortschrittsbalken als Feldhockeyschläger */}
      <div className={styles.progressBar}>
        {Array.from({ length: maxPlayers }).map((_, index) => (
          <div
            key={index}
            className={`${styles.progressStep} ${
              index < caughtPlayers ? styles.activeStep : ""
            }`}
          ></div>
        ))}
      </div>

      {/* Interaktiver Ball */}
      <div className={styles.hockeyBall} onClick={handleBallClick}>
        <span className={styles.logo}>Logo</span>
      </div>

      {caughtPlayers === maxPlayers && (
        <div className={styles.accountUnlocked}>
          Dein Manager-Account ist freigegeben!
        </div>
      )}
    </div>
  );
}
