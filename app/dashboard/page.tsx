"use client";

import { useState } from "react";
import styles from "@/components/dashboard/dashboard.module.css";

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
      {/* progress bar as hockey stick */}
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

      {/* interactive ball */}
      <div className={styles.hockeyBall} onClick={handleBallClick}>
        <span className={styles.logo}>Logo</span>
      </div>

      {caughtPlayers === maxPlayers && (
        <div className={styles.accountUnlocked}>
          Congratulations, you collected a team full of legends and are now ready for the game!
        </div>
      )}
    </div>
  );
}
