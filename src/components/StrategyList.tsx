'use client';

import { useState } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import { StrategyCard } from './StrategyCard';
import styles from './StrategyList.module.css';

export function StrategyList() {
  const { strategies, removeImportedStrategies } = useStrategyStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const importedCount = strategies.filter((s) => s.isImported).length;

  const handleDeleteImported = () => {
    removeImportedStrategies();
    setShowConfirm(false);
  };

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
        {importedCount > 0 && (
          !showConfirm ? (
            <button 
              className={styles.deleteAllBtn}
              onClick={() => setShowConfirm(true)}
            >
              Delete Imported ({importedCount})
            </button>
          ) : (
            <div className={styles.confirmDelete}>
              <span className={styles.confirmText}>Delete {importedCount} imported?</span>
              <button className={styles.confirmYes} onClick={handleDeleteImported}>Yes</button>
              <button className={styles.confirmNo} onClick={() => setShowConfirm(false)}>No</button>
            </div>
          )
        )}
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
