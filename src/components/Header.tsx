'use client';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20 2L37 11V29L20 38L3 29V11L20 2Z" 
              stroke="currentColor" 
              strokeWidth="2"
              fill="none"
            />
            <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="20" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="28" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className={styles.logoText}>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>CS2</span> STRAT ROULETTE
          </h1>
        </div>
      </div>
      
      <div className={styles.decoration}>
        <span className={`mono ${styles.version}`}>v1.0.0</span>
      </div>
    </header>
  );
}

