'use client';

import type { Strategy } from '@/types';
import { useStrategyStore } from '@/store/useStrategyStore';
import styles from './StrategyCard.module.css';

interface StrategyCardProps {
  strategy: Strategy;
  isResult?: boolean;
}

export function StrategyCard({ strategy, isResult = false }: StrategyCardProps) {
  const { removeStrategy } = useStrategyStore();

  return (
    <div className={`${styles.card} ${isResult ? styles.resultCard : ''}`}>
      {isResult && (
        <div className={styles.resultBanner}>
          <span className="mono">YOUR STRATEGY</span>
        </div>
      )}
      
      <div className={styles.header}>
        <h3 className={styles.name}>{strategy.name}</h3>
        {!isResult && (
          <button 
            className={styles.deleteBtn}
            onClick={() => removeStrategy(strategy.id)}
            aria-label="Delete strategy"
          >
            ×
          </button>
        )}
      </div>

      <p className={styles.description}>{strategy.description}</p>

      <div className={styles.footer}>
        <div className={styles.badges}>
          <span className={`team-badge ${strategy.team.toLowerCase()}`}>
            {strategy.team === 'Both' ? 'T / CT' : strategy.team}
          </span>
          <span className={`diff-badge ${strategy.difficulty.toLowerCase()}`}>
            {strategy.difficulty}
          </span>
        </div>
        
        {strategy.map && (
          <span className={styles.map}>{strategy.map}</span>
        )}
      </div>
    </div>
  );
}

