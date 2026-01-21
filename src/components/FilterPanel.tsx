'use client';

import { useStrategyStore } from '@/store/useStrategyStore';
import type { Team, Difficulty } from '@/types';
import styles from './FilterPanel.module.css';

const TEAMS: Team[] = ['T', 'CT', 'Both'];
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Troll'];

export function FilterPanel() {
  const { settings, setSettings } = useStrategyStore();

  const toggleTeam = (team: Team) => {
    const current = settings.includedTeams;
    const updated = current.includes(team)
      ? current.filter((t) => t !== team)
      : [...current, team];
    
    if (updated.length > 0) {
      setSettings({ includedTeams: updated });
    }
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
        <div className={styles.options}>
          {TEAMS.map((team) => (
            <button
              key={team}
              className={`${styles.option} ${settings.includedTeams.includes(team) ? styles.active : ''}`}
              onClick={() => toggleTeam(team)}
            >
              <span className={`${styles.teamIndicator} ${styles[team.toLowerCase()]}`} />
              {team === 'Both' ? 'T / CT' : team}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Difficulty</h4>
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

