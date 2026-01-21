'use client';

import { useStrategyStore } from '@/store/useStrategyStore';
import { StrategyCard } from './StrategyCard';
import styles from './StrategyList.module.css';

export function StrategyList() {
  const { strategies } = useStrategyStore();

  if (strategies.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No strategies yet.</p>
        <p className={styles.hint}>Add some strategies to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={`mono ${styles.count}`}>{strategies.length} STRATEGIES</span>
      </div>
      <div className={styles.strategies}>
        {strategies.map((strategy, index) => (
          <div 
            key={strategy.id} 
            className={styles.item}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <StrategyCard strategy={strategy} />
          </div>
        ))}
      </div>
    </div>
  );
}

