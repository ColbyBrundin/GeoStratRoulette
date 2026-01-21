'use client';

import { useStrategyStore } from '@/store/useStrategyStore';
import type { Difficulty } from '@/types';
import styles from './FilterPanel.module.css';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export function FilterPanel() {
  const { settings, setSettings } = useStrategyStore();

  const selectTeam = (team: 'T' | 'CT') => {
    setSettings({ selectedTeam: team });
  };

  const toggleDifficulty = (diff: Difficulty) => {
    const current = settings.includedDifficulties;
    const updated = current.includes(diff)
      ? current.filter((d) => d !== diff)
      : [...current, diff];
    
    if (updated.length > 0) {
      setSettings({ includedDifficulties: updated });
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={`mono ${styles.label}`}>FILTERS</span>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Team</h4>
        <div className={styles.teamButtons}>
          <button
            className={`${styles.teamBtn} ${styles.tBtn} ${settings.selectedTeam === 'T' ? styles.active : ''}`}
            onClick={() => selectTeam('T')}
          >
            <span className={styles.teamIndicator} />
            T
          </button>
          <button
            className={`${styles.teamBtn} ${styles.ctBtn} ${settings.selectedTeam === 'CT' ? styles.active : ''}`}
            onClick={() => selectTeam('CT')}
          >
            <span className={styles.teamIndicator} />
            CT
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Selected Difficulties</h4>
        <div className={styles.options}>
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              className={`${styles.option} ${styles.diffOption} ${settings.includedDifficulties.includes(diff) ? styles.active : ''}`}
              onClick={() => toggleDifficulty(diff)}
              data-difficulty={diff.toLowerCase()}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
