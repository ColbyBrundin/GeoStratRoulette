'use client';

import styles from './StratButton.module.css';

interface StratButtonProps {
  onSpin: () => void;
}

export function StratButton({ onSpin }: StratButtonProps) {
  return (
    <button 
      className={styles.stratButton}
      onClick={onSpin}
    >
      <span className={styles.stratButtonText}>NEW STRAT</span>
      <div className={styles.stratButtonGlow} />
    </button>
  );
}

