'use client';

import styles from './RouletteWheel.module.css';

interface RouletteWheelProps {
  isSpinning: boolean;
  onSpin: () => void;
}

export function RouletteWheel({ isSpinning, onSpin }: RouletteWheelProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}>
        {/* Outer ring */}
        <svg className={styles.outerRing} viewBox="0 0 300 300">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-orange)" />
              <stop offset="50%" stopColor="var(--accent-cyan)" />
              <stop offset="100%" stopColor="var(--accent-orange)" />
            </linearGradient>
          </defs>
          <circle 
            cx="150" 
            cy="150" 
            r="145" 
            fill="none" 
            stroke="url(#ringGradient)" 
            strokeWidth="3"
            strokeDasharray="20 10"
            className={styles.dashedRing}
          />
          <circle 
            cx="150" 
            cy="150" 
            r="130" 
            fill="none" 
            stroke="var(--border-color)" 
            strokeWidth="1"
          />
        </svg>

        {/* Inner content */}
        <div className={styles.innerCircle}>
          <div className={styles.crosshair}>
            <div className={styles.crosshairLine} />
            <div className={styles.crosshairLine} />
            <div className={styles.crosshairDot} />
          </div>
          
          {isSpinning ? (
            <div className={styles.spinningText}>
              <span className={`mono ${styles.processingText}`}>PROCESSING</span>
              <div className={styles.loadingDots}>
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          ) : (
            <div className={styles.readyText}>
              <span className={styles.readyLabel}>READY</span>
            </div>
          )}
        </div>
        
        {/* Corner decorations */}
        <div className={`${styles.corner} ${styles.topLeft}`} />
        <div className={`${styles.corner} ${styles.topRight}`} />
        <div className={`${styles.corner} ${styles.bottomLeft}`} />
        <div className={`${styles.corner} ${styles.bottomRight}`} />
      </div>

      <button 
        className={`${styles.spinButton} ${isSpinning ? styles.disabled : ''}`}
        onClick={onSpin}
        disabled={isSpinning}
      >
        <span className={styles.spinButtonText}>
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </span>
        <div className={styles.spinButtonGlow} />
      </button>
    </div>
  );
}

